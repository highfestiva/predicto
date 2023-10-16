#!/usr/bin/env python3

from flask import Flask, send_from_directory
import numpy as np
import pandas as pd
from random import randint


app = Flask('Predicto')
embeddings = {}


def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


@app.route('/')
def favicon():
    return send_from_directory('static', 'index.html')


@app.route('/en/game/<game>/<guess>')
def do_guess(game, guess):
    r = embeddings.get(guess)
    if not r:
        return {'error': "I'm sorry, I don't know this word"}
    return {'distance':r[0], 'lemma':guess, 'word':guess}


@app.route('/en/tip/<game>/<pos>')
def tip(game, pos):
    pos = int(pos)
    word,embedding = word_embedding[pos]
    return {'distance':pos, 'lemma':word, 'word':word}


@app.route('/en/giveup/<game>')
def giveup(game):
    pos = 0
    word,embedding = word_embedding[pos]
    return {'distance':pos, 'lemma':word, 'word':word}


if __name__ == '__main__':
    df = pd.read_feather('.db')
    embeddings = {word:embedding for word,embedding in zip(df.word, df.embedding)}
    j = randint(0, len(df)-1)
    em = df.embedding[j]
    word_embedding = sorted([(w,e) for w,e in embeddings.items()], key=lambda kv:-cosine_similarity(em, kv[1]))
    embeddings = {word:(i,embedding) for i,(word,embedding) in enumerate(word_embedding, 1)}
    app.run(host='127.0.0.1', port=6060, debug=True, threaded=True)
