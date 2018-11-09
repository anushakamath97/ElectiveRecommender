import pandas as pd
import numpy as np
from itertools import groupby 

# Function that takes in movie title as input and outputs most similar movies
def get_recommendations(oldElective, elective_no):

	# Load dataset
	elective_data = pd.read_csv('electives_data.csv')

	#indices of electives pertaining to current semester
	elective_indices = [ i for i in range(len(elective_data["Elective_no"])) if elective_data["Elective_no"][i] == elective_no]

	#load the pre-computed cosine similarity matrix
	cosine_sim = np.load("cosine_similarity.npy")

	#Construct a reverse map of indices and course names
	indices = pd.Series([x for x in range(len(elective_data['Course_name']))], index=elective_data['Course_name']).drop_duplicates()

	# Get the index of the old elective
	idx = indices[oldElective]

	# Get the pairwsie similarity scores of all electives with old elective
	sim_scores = list(enumerate(cosine_sim[idx]))

	# Sort the movies based on the similarity scores
	sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

	#Get top 15 
	sim_scores = sim_scores[1:16]

	# Get the recommended electives' indices
	recommended_indices = [i[0] for i in sim_scores if i[0] in elective_indices]

	# Return the similar electives
	return elective_data['Course_name'].iloc[recommended_indices].tolist()
	'''
	else:
		return elective_data['Course_name'].iloc[recommended_indices].tolist()
	'''


def electiveBasedRecommend(usn, isEvenSem, oldElectives):
	#convert usn to lower case and get year and semester
	year = 18 #can get from time module also
	curr_year = year - int(usn.lower().split("fb")[1][:2]) 

	if(isEvenSem):
		curr_sem = curr_year * 2
	else:
		curr_year += 1
		curr_sem = curr_year*2 - 1

	#elective numbers for current semester
	elective_no = [(curr_sem-4)*2 - 1, (curr_sem-4)*2]

	recommendations = []
	for (i,elec_no) in enumerate(elective_no):
		recommendations.append([])
		for elec in oldElectives:
			recommendations[i] += get_recommendations(elec, elec_no)
		print([(g[0], len(list(g[1]))) for g in groupby(sorted(recommendations[i]))])

electiveBasedRecommend('01FB15ECS048', False, ['Big Data','Data Analytics', 'Computer Network Security','Digital Image Processing'])	
