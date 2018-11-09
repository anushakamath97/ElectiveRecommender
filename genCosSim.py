# Import Pandas
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
# Import linear_kernel
from sklearn.metrics.pairwise import linear_kernel
import numpy as np

# Load dataset
elective_data = pd.read_csv('electives_data.csv')

#Define a TF-IDF Vectorizer Object. Remove all english stop words such as 'the', 'a'
tfidf = TfidfVectorizer(stop_words='english')

#Replace NaN with an empty string
elective_data['Description'] = elective_data['Description'].fillna('')

#Since we separted sentences by ;. Remove them.
elective_data['Description'] = elective_data['Description'].replace(";","")

#Construct the required TF-IDF matrix by fitting and transforming the data
tfidf_matrix = tfidf.fit_transform(elective_data['Description'])

'''
#Output the shape of tfidf_matrix
print(tfidf_matrix.shape)

keywords = tfidf.get_feature_names()
print(keywords)
'''

# Compute the cosine similarity matrix
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
np.save("cosine_similarity.npy",cosine_sim)


#Construct a reverse map of indices and movie titles
indices = pd.Series([x for x in range(len(elective_data['Course_name']))], index=elective_data['Course_name']).drop_duplicates()

# Function that takes in movie title as input and outputs most similar movies
def get_recommendations(title, cosine_sim=cosine_sim):
    # Get the index of the movie that matches the title
    idx = indices[title]

    # Get the pairwsie similarity scores of all movies with that movie
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sort the movies based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the scores of the 10 most similar movies
    sim_scores = sim_scores[1:11]

    # Get the movie indices
    movie_indices = [i[0] for i in sim_scores]

    # Return the top 10 most similar movies
    return elective_data['Course_name'].iloc[movie_indices]

print(get_recommendations('Advanced Machine Learning'))

