#pip install flask flask-cors
import pickle
import pandas as pd
import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the cosine similarity matrix 
with open('./cosine_similarity_matrix.pkl', 'rb') as file:
    cosine_sim_matrix = pickle.load(file)

df = pd.read_csv(r'D:\MinorProject\ML\indian food dataset.csv')
# data_frame = df[['FoodID', 'TranslatedRecipeName','keywords']]

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

def recommend_recipes(food_list):
    recommendations_list = []
    for food in food_list:
        food_index = data_frame[data_frame['TranslatedRecipeName'] == food].index[0]
        distances = cosine_sim_matrix[food_index]
        food_list_indices = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:5]
        recommendations = [{'index': i[0], 'name': data_frame.iloc[i[0]].TranslatedRecipeName} for i in food_list_indices]
        recommendations_list.append({'recipe_name': food, 'recommendations': recommendations})
    return recommendations_list

@app.route('/recommendmulti', methods=['POST'])
def recommend():
    data = request.get_json()
    recipe_names = data.get('recipe_names', [])

    if recipe_names:
        recommendations = recommend_recipes(recipe_names)
        return jsonify({'recommendations': recommendations})
    else:
        return jsonify({'error': 'Invalid request. Please provide at least one recipe name'}), 400

if __name__ == '__main__':
    app.run(debug=True)
#run flask as: python app.py