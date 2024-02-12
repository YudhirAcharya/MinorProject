import numpy as np
import pandas as pd

df = pd.read_csv(r'D:\MinorProject\ML\indian food dataset.csv')

df = df[['FoodID', 'TranslatedRecipeName', 'Cuisine', 'Cleaned-Ingredients']]

import re
def clean_ingredients(ingredient):
    cleaned_ingredient = re.sub(r'[\s\(\)]', '', ingredient) 
    return cleaned_ingredient

df['Cleaned-Ingredients'] = df['Cleaned-Ingredients'].apply(lambda x: ','.join([clean_ingredients(ingredient) for ingredient in x.split(',')]))

df['Cleaned-Ingredients'] = df['Cleaned-Ingredients'].apply(lambda x: x.split())

df['Cuisine'] = df['Cuisine'].apply(lambda x: ','.join([clean_ingredients(ingredient) for ingredient in x.split(',')]))

df['Cuisine'] = df['Cuisine'].apply(lambda x: x.split())

df['keywords'] = df['Cleaned-Ingredients'] + df['Cuisine']


data_frame = df[['FoodID',	'TranslatedRecipeName', 'keywords']]

data_frame['keywords'] = data_frame['keywords'].apply(lambda x:" ".join(x))

data_frame['keywords'] = data_frame['keywords'].apply(lambda x: x.replace(',', ' '))


from nltk.stem.porter import PorterStemmer
ps = PorterStemmer()

def stem(text):
  y = []
  for i in text.split():
    y.append(ps.stem(i))
  return " ".join(y)

data_frame['keywords'] = data_frame['keywords'].apply(stem)

def preprocess_keywords(keyword_string):
    return keyword_string.split()
data_frame['preprocessed_keywords'] = data_frame['keywords'].apply(preprocess_keywords)


class SimpleCountVectorizer:
    def __init__(self):
        self.vocabulary_ = None

    def fit_transform(self, corpus):
        unique_tokens = set(token for doc in corpus for token in doc)
        self.vocabulary_ = {token: i for i, token in enumerate(unique_tokens)}

        matrix = np.zeros((len(corpus), len(unique_tokens)))

        for i, doc in enumerate(corpus):
            for token in doc:
                matrix[i, self.vocabulary_[token]] += 1

        return matrix

vectorizer = SimpleCountVectorizer()
keywords_matrix = vectorizer.fit_transform(data_frame['preprocessed_keywords'])

def cosine_similarity(vector_a, vector_b):
    dot_product = np.dot(vector_a, vector_b)
    norm_a = np.linalg.norm(vector_a)
    norm_b = np.linalg.norm(vector_b)

    similarity = dot_product / (norm_a * norm_b) if norm_a * norm_b != 0 else 0

    return similarity

import pickle

def cosine_similarity_model():
    num_recipes = len(data_frame)
    cosine_sim_matrix = np.zeros((num_recipes, num_recipes))
    for i in range(num_recipes):
        for j in range(num_recipes):
            cosine_sim_matrix[i, j] = cosine_similarity(keywords_matrix[i], keywords_matrix[j])
        print(f"for {i}, {j} {cosine_sim_matrix[i,j]} " )
    with open('cosine_similarity_matrix.pkl', 'wb') as file:
        pickle.dump(cosine_sim_matrix, file)
    
      

try:
    with open('cosine_similarity_matrix.pkl', 'rb') as file:
        cosine_sim_matrix = pickle.load(file)
    print("Cosine similarity matrix loaded from file.")
except FileNotFoundError:
    # If the file does not exist, compute the cosine similarity matrix
    cosine_similarity_model()
    # Load the matrix from file after computing
    with open('cosine_similarity_matrix.pkl', 'rb') as file:
        cosine_sim_matrix = pickle.load(file)



def recommend(food):
  food_index = data_frame[data_frame['TranslatedRecipeName'] == food].index[0]
  distances = cosine_sim_matrix[food_index]
  food_list = sorted(list(enumerate(distances)), reverse = True, key=lambda x:x[1])[1:21]

  for i in food_list:
    print(i[0], data_frame.iloc[i[0]].TranslatedRecipeName)


recommend('Ravioli Lasagna')