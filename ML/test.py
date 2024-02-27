import numpy as np


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



corpus = [
    ['apple', 'orange', 'banana'],
    ['banana', 'kiwi', 'apple'],
    ['orange', 'apple', 'kiwi', 'kiwi']
]

# Create an instance of SimpleCountVectorizer
vectorizer = SimpleCountVectorizer()

# Fit and transform the corpus
count_matrix = vectorizer.fit_transform(corpus)

# Display the vocabulary and count matrix
print("Vocabulary:", vectorizer.vocabulary_)
print("Count Matrix:")
print(count_matrix)