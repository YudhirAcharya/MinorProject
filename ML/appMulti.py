#pip install flask flask-cors

import pickle
import pandas as pd
import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import os
app = Flask(__name__)
CORS(app)


# with open('./cosine_similarity_matrix.pkl', 'rb') as file:
#     cosine_sim_matrix = pickle.load(file)


#df = pd.read_csv(r'D:\MinorProject\ML\indian food dataset.csv')
data_url = 'http://127.0.0.1:3001/foods'
response = requests.get(data_url)
data = response.json()
df = pd.DataFrame(data)
# data_frame = df[['FoodID', 'TranslatedRecipeName','keywords']]

import re
def clean_ingredients(ingredient):
    cleaned_ingredient = re.sub(r'[\s\(\)]', '', ingredient) 
    return cleaned_ingredient

df = pd.DataFrame(data['data']['rows'])

df['CleanedIngredients'] = df['CleanedIngredients'].apply(lambda x: ','.join([clean_ingredients(ingredient) for ingredient in x.split(',')]))

df['CleanedIngredients'] = df['CleanedIngredients'].apply(lambda x: x.split())


df['Cuisine'] = df['Cuisine'].apply(lambda x: ','.join([clean_ingredients(ingredient) for ingredient in x.split(',')]))
df['Cuisine'] = df['Cuisine'].apply(lambda x: x.split())

df['keywords'] = df['CleanedIngredients'] + df['Cuisine']

data_frame = df[['FoodID', 'TranslatedRecipeName', 'keywords']]

data_frame.loc[:, 'keywords'] = data_frame['keywords'].apply(lambda x: " ".join(x))
data_frame.loc[:, 'keywords'] = data_frame['keywords'].apply(lambda x: x.replace(',', ' '))


from nltk.stem.porter import PorterStemmer
ps = PorterStemmer()

def stem(text):
  y = []
  for i in text.split():
    y.append(ps.stem(i))
  return " ".join(y)

data_frame.loc[:, 'keywords'] = data_frame['keywords'].apply(stem)

def preprocess_keywords(keyword_string):
    return keyword_string.split()
data_frame.loc[:, 'preprocessed_keywords'] = data_frame['keywords'].apply(preprocess_keywords)

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



def cosine_similarity_model():
    print('running model')
    num_recipes = len(data_frame)
    cosine_sim_matrix = np.zeros((num_recipes, num_recipes))
    for i in range(num_recipes):
        for j in range(num_recipes):
            cosine_sim_matrix[i, j] = cosine_similarity(keywords_matrix[i], keywords_matrix[j])
        print(f"for {i}, {j} {cosine_sim_matrix[i,j]} " )
    with open('cosine_similarity_matrix.pkl', 'wb') as file:
        pickle.dump(cosine_sim_matrix, file)
    

filename = "cosine_similarity_matrix.pkl"
if os.path.exists(filename):
    with open(filename, 'rb') as file:
        cosine_sim_matrix = pickle.load(file)
    print('pickle file loaded successfully')
else:
    cosine_similarity_model()

# try:
#     file_path = os.path.join(os.getcwd(), 'cosine_similarity_matrix.pkl')
#     with open(file_path, 'rb') as file:
#         cosine_sim_matrix = pickle.load(file)
#     print("Cosine similarity matrix loaded from file.")
# except FileNotFoundError:
#     print("Cosine similarity matrix file not found. Computing the matrix...")
#     # If the file does not exist, compute the cosine similarity matrix
#     cosine_similarity_model()
#     # Load the matrix from file after computing
#     with open(file_path, 'rb') as file:
#         cosine_sim_matrix = pickle.load(file)
# except Exception as e:
#     print(f"An error occurred while loading the cosine similarity matrix: {e}")

def recommend_recipes(food_list):
    all_recommendations = []
    recommended_indices = set()

    for food in food_list:
       
        if food in data_frame['TranslatedRecipeName'].values:
            food_index = data_frame[data_frame['TranslatedRecipeName'] == food].index[0]
            distances = cosine_sim_matrix[food_index]
            food_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:5]

            recommendations = [{'index': i[0], 'name': data_frame.iloc[i[0]].TranslatedRecipeName} for i in food_list]
            all_recommendations.extend(recommendations)

   
    all_recommendations = sorted(all_recommendations, key=lambda x: x['index'], reverse=True)
    unique_recommendations = []

    for recommendation in all_recommendations:
        if recommendation['index'] not in recommended_indices:
            unique_recommendations.append(recommendation)
            recommended_indices.add(recommendation['index'])

    # top unique recommendations
    unique_recommendations = unique_recommendations[:100]
    return unique_recommendations




@app.route('/recommend_multi', methods=['POST'])
def recommend():
    data = request.get_json()
    recipe_names = data.get('recipe_names', None)

    if recipe_names is not None and len(recipe_names) > 0:
        # If fewer than 5 food names are provided, use all available names
        recipe_names = recipe_names[:5]
        recommendations = recommend_recipes(recipe_names)
        return jsonify({'recommendations': recommendations})
    else:
        return jsonify({'error': 'Invalid request or missing recipe_names (should be a list of at least 1 food name)'}), 400
    
if __name__ == '__main__':
    app.run(debug=True)
#run flask as: python appMulti.py