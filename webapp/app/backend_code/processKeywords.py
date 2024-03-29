import pandas as pd
from gensim.models import Word2Vec
import numpy as np

# Load dataset
elective_data = pd.read_csv('app/static/data/'+'electives_data.csv')

#elective_data = elective_data.dropna(subset=["Keywords"])

keywords = list(map(lambda s: list(map(lambda x: x.strip().lower(),s.split(','))),elective_data["Keywords"].tolist()))

max_seq_len = 0

for key in keywords:
	if len(key) > max_seq_len:
		max_seq_len = len(key)

print(max_seq_len)

vec_size = 32
model = Word2Vec(keywords, size = vec_size, window = 1, min_count = 1)
model.save('app/models/w2v.bin')
pad_seq = np.zeros(vec_size, dtype=np.float32)
data = []
for (i,keylist) in enumerate(keywords):
	data.append([])
	for key in keylist:
		data[i].append(model[key])
	while(len(data[i]) != max_seq_len):
		data[i].append(pad_seq)

np.save("app/models/keywordsData.npy", data)





