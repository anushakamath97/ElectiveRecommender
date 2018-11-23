import os,sys,inspect
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
sys.path.insert(0,currentdir)

from content_based import electiveBasedRecommend
from gensim.models import Word2Vec
import numpy as np
from keras.models import load_model
import pandas as pd
import tensorflow as tf

def getRNNpredictions(rnn_input, elective_no):
	with tf.Session() as sess:
		rnn_model = load_model('app/models/keywords.h5')
		rnn_model.compile(loss='categorical_crossentropy',optimizer='RMSProp', metrics=['accuracy'])
		rnn_predictions = rnn_model.predict(rnn_input)
	# Load dataset
	elective_data = pd.read_csv('app/static/data/electives_data.csv')

	indices = []

	#indices of electives pertaining to current semester
	pool1_indices = [ i for i in range(len(elective_data["Elective_no"])) if elective_data["Elective_no"][i] == elective_no[0]]
	top2_indices = rnn_predictions[0,pool1_indices].argsort()[-2:][::-1]
	indices.append([pool1_indices[top2_indices[0]], pool1_indices[top2_indices[1]] ])
	if elective_no[0] == 7:
		return [elective_data['Course_name'].iloc[indices[0]].tolist(),]
	pool2_indices = [ i for i in range(len(elective_data["Elective_no"])) if elective_data["Elective_no"][i] == elective_no[1]]
	top2_indices = rnn_predictions[0,pool2_indices].argsort()[-2:][::-1]
	indices.append([pool2_indices[top2_indices[0]], pool2_indices[top2_indices[1]] ])
	return [elective_data['Course_name'].iloc[indices[0]].tolist(), elective_data['Course_name'].iloc[indices[1]].tolist()] 

def getPerformancePredictions(usn, elective_no):
	# Load dataset

	if elective_no == 8:
		return []
	elective_data = pd.read_csv('app/static/data/electives_data.csv')

	#indices of electives pertaining to current semester
	pool_indices = [ i for i in range(len(elective_data["Elective_no"])) if elective_data["Elective_no"][i] == elective_no and elective_data['Prerequisites'][i] != "Not Available"]
	pool_prereq = elective_data['Prerequisites'].iloc[pool_indices].tolist()

	if len(pool_prereq) == 0:
		return []

	core_subjects = pd.read_csv('app/static/data/coresubject_data.csv').transpose()
	
	batch = usn.upper().split('FB')[1][:2]
	grades = []
	for course in pool_prereq:
		for i in range(5):
			if course in core_subjects[i].tolist():
				sem = core_subjects[i].tolist()[0]
				dataframe = pd.read_csv('app/static/data/sem'+str(sem)+'_20'+batch+'batch.csv')
				row = dataframe.index[dataframe['USN']==usn].tolist()[0]
				grades.append(dataframe[course].iloc[row][0])
				break

	
	courses = []
	for i in range(len(grades)):
		if grades[i] == 'S':
			grades[i] = 10
		elif grades[i] == 'A':
			grades[i] = 9
		elif grades[i] == 'B':
			grades[i] = 8
		elif grades[i] == 'C':
			grades[i] = 7
		elif grades[i] == 'D':
			grades[i] = 6
		elif grades[i] == 'E':
			grades[i] = 5
		elif grades[i] == 'F':
			grades[i] = 4
	if len(pool_prereq) == 1 and grades[0] >= 7:
		return pool_prereq
	grades_index = np.array(grades).argsort()[-2:][::-1]
	indices = [pool_indices[gr_idx] for gr_idx in grades_index]
	return elective_data['Course_name'].iloc[indices].tolist()

def getSpecializationCourses(specialization, elective_no):
	# Load dataset
	elective_data = pd.read_csv('app/static/data/electives_data.csv')
	#indices of electives pertaining to current semester
	pool1_indices = [ i for i in range(len(elective_data["Elective_no"])) if elective_data["Elective_no"][i] == elective_no[0] and specialization in elective_data['Specialization'][i]]
	pool2_indices = [ i for i in range(len(elective_data["Elective_no"])) if elective_data["Elective_no"][i] == elective_no[1] and specialization in  elective_data['Specialization'][i]]
	return (elective_data['Course_name'].iloc[pool1_indices].tolist(), elective_data['Course_name'].iloc[pool2_indices].tolist())
	
	

def getTopElectives(final_list, pool_no):
	pool = [] 
	pool_weights = []
	for elec in final_list['pool'+str(pool_no)]:
		pool_weights.append(final_list['pool'+str(pool_no)][elec])
		pool.append(elec)

	pool_weights = np.array(pool_weights)
	indices = pool_weights.argsort()[-2:][::-1]
	return pool[indices[0]],pool[indices[1]]

def getSuggestions(usn, interests, weights, old_electives = None, specialization=None):
	'''
	Suggest electives based on the user inputs.

	Arguments:
		interests - a list of string (max 38) of interests from our dataset (since we use a w2v model that's
			trained on our dataset the user cannot enter new words for which we cannot get the vector)
		specialization - One of the three in string or None
		old_electives - list of string with previous elective names
	'''
	usn = usn.upper()
	interest_weight, specialization_weight, performance_weight = [weight/sum(weights) for weight in weights]
	
	elective_no = [len(old_electives)+1, len(old_electives)+2]
	final_list = {'pool1':{}, 'pool2':{}}
	if specialization is not None or specialization != 'none':
		#Do something
		spec_predictions = getSpecializationCourses(specialization, elective_no)
		for (i,list_) in enumerate(spec_predictions):
			for elec in spec_predictions[i]:
				if elec in final_list['pool'+str(i+1)]:
					final_list['pool'+str(i+1)][elec] += specialization_weight
				else:
					final_list['pool'+str(i+1)][elec] = specialization_weight

	if old_electives is None:
		#5th sem no old electives 
		print()
	else:
		predictions = electiveBasedRecommend(old_electives)
		for (i,list_) in enumerate(predictions):
			for elec in predictions[i]:
				if elec in final_list['pool'+str(i+1)]:
					final_list['pool'+str(i+1)][elec] += interest_weight
				else:
					final_list['pool'+str(i+1)][elec] = interest_weight
	
	#these two parameters are set while training the word2vec model		
	vec_size = 32
	max_seq_len = 38

	#to make sequences of equal length
	pad_seq = np.zeros(vec_size, dtype=np.float32)
	
	#load the pre-trained word2vec model
	w2v = Word2Vec.load('app/models/w2v.bin')

	#populate input for rnn model to get electives based on interests
	vectorList = []
	for interest_ in interests:
		vectorList.append(w2v[interest_.lower()])
	while(len(vectorList) != max_seq_len):
		vectorList.append(pad_seq)

	rnn_input = np.reshape(vectorList, [-1,max_seq_len,vec_size])
	rnn_predictions = getRNNpredictions(rnn_input, elective_no)
	for (i,list_) in enumerate(rnn_predictions):
			for elec in rnn_predictions[i]:
				if elec in final_list['pool'+str(i+1)]:
					final_list['pool'+str(i+1)][elec] += interest_weight
				else:
					final_list['pool'+str(i+1)][elec] = interest_weight

	for elec_no in elective_no:
		perf_predictions = getPerformancePredictions(usn, elec_no)
		for elec in perf_predictions:
			if elec in final_list['pool'+str(i+1)]:
				final_list['pool'+str(i+1)][elec] += performance_weight
			else:
				final_list['pool'+str(i+1)][elec] = performance_weight
	
	if elective_no[0] == 7:
		return {'pool1':getTopElectives(final_list,1)}
	return {'pool1':getTopElectives(final_list,1), 'pool2':getTopElectives(final_list,2)}	

if __name__ == "__main__":
	print(getSuggestions('01FB15ECS048',["deep learning","math","text normalization","image processing","image storage","networking","security","perimeter security"], [80, 40, 30], old_electives = ["Advanced Algorithms","Data Analytics"], specialization = "Data Science"))
