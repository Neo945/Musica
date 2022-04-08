from multiprocessing import connection
import os
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pandas as pd
from scipy import sparse
import pickle


def generate_model():
    # mongoexport --db abc --collection result --fields _id,name,marks --type=csv --out d:\result-2.csv

    vlqs = pd.read_csv('mytable.csv')
    vlqs = vlqs.fillna('')
    vlqs = vlqs.values
    vlqs = np.concatenate(
        (vlqs[:, 2:3], vlqs[:, 5:6], vlqs[:, 7:8]), axis=1)
    vlqs = np.apply_along_axis(lambda row: " ".join(row),
                               axis=1,
                               arr=vlqs)
    cv = CountVectorizer()
    cv_matrix = cv.fit_transform(list(vlqs))
    print(cv_matrix)
    score = cosine_similarity(cv_matrix)
    print(score)
    with open('model.pickle', 'wb') as f:
        pickle.dump(score, f)


generate_model()
