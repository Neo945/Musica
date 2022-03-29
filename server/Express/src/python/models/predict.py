import numpy as np
import pandas as pd
import pickle


def predict(his):
    with open('model.pickle', 'rb') as f:
        try:
            score = pickle.load(f)
            total_score = []
            for i in his:
                total_score += list(enumerate(score[int(i) - 1]))
            sorted_total_score = sorted(total_score,
                                        reverse=True, key=lambda x: x[1])[:len(his) + 6]
            sorted_total_score = list(
                filter(lambda x: x[0]+1 not in his, sorted_total_score))
            # print(sorted_total_score)
            return sorted_total_score[:len(his) + 6]
        except:
            return []
