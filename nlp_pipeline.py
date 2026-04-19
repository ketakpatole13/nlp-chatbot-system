import spacy
from transformers import pipeline
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from sklearn.feature_extraction.text import TfidfVectorizer
import textstat
import numpy as np
from collections import Counter, defaultdict
import re

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Load emotion classifier
emotion_classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", return_all_scores=True)

# VADER sentiment analyzer
vader = SentimentIntensityAnalyzer()

def run_nlp_pipeline(text: str) -> dict:
    """
    Run the full NLP pipeline on the text and return structured data.
    """
    # Validate input
    if not text or not isinstance(text, str) or not text.strip():
        return {
            "metadata": {"filename": "", "total_sentences": 0, "total_words": 0, "unique_words": 0, "dominant_emotion": ""},
            "emotion_arc": [],
            "emotion_distribution": {},
            "sentiment_timeline": [],
            "entities": [],
            "entity_cooccurrence": [],
            "pos_distribution": {},
            "keywords": [],
            "readability": {},
            "lexical_diversity": {}
        }

    # Truncate if too long
    sentences = [sent.text.strip() for sent in nlp(text).sents if sent.text.strip()]
    if len(sentences) > 500:
        sentences = sentences[:500]
        text = ' '.join(sentences)

    # Sentence tokenization
    total_sentences = len(sentences)

    # Emotion classification
    emotion_arc = []
    emotion_counts = Counter()
    batch_size = 16
    try:
        for i in range(0, len(sentences), batch_size):
            batch = sentences[i:i+batch_size]
            results = emotion_classifier(batch)
            for j, result in enumerate(results):
                idx = i + j
                # Handle case where result might be a string or unexpected format
                if isinstance(result, str):
                    continue
                if not isinstance(result, list):
                    result = [result]
                # Get the emotion with highest score
                best_emotion = max(result, key=lambda x: x.get('score', 0) if isinstance(x, dict) else 0)
                emotion = best_emotion.get('label', 'unknown')
                score = best_emotion.get('score', 0)
                emotion_arc.append({
                    "sentence_index": idx,
                    "sentence": sentences[idx],
                    "emotion": emotion,
                    "score": score
                })
                emotion_counts[emotion] += 1
    except Exception as e:
        print(f"Error in emotion classification: {str(e)}")
        emotion_arc = []
        emotion_counts = Counter()

    # Emotion distribution
    total_emotions = sum(emotion_counts.values())
    emotion_distribution = {emotion: (count / total_emotions) * 100 if total_emotions > 0 else 0 for emotion, count in emotion_counts.items()}

    # Dominant emotion
    dominant_emotion = emotion_counts.most_common(1)[0][0] if emotion_counts else ""

    # Sentiment analysis
    sentiment_timeline = []
    try:
        for idx, sentence in enumerate(sentences):
            scores = vader.polarity_scores(sentence)
            sentiment_timeline.append({
                "sentence_index": idx,
                "positive": scores.get('pos', 0),
                "negative": scores.get('neg', 0),
                "neutral": scores.get('neu', 0),
                "compound": scores.get('compound', 0)
            })
    except Exception as e:
        print(f"Error in sentiment analysis: {str(e)}")
        sentiment_timeline = []

    # Named Entity Recognition
    doc = nlp(text)
    entities = []
    entity_counter = Counter()
    try:
        for ent in doc.ents:
            if ent.label_ in ['PERSON', 'ORG', 'GPE', 'DATE']:
                entity_counter[(str(ent.text), ent.label_)] += 1

        entities = [{"text": text, "label": label, "count": count} for (text, label), count in entity_counter.items()]
    except Exception as e:
        print(f"Error in named entity recognition: {str(e)}")
        entities = []

    # Entity co-occurrence
    entity_cooccurrence = []
    cooccur = defaultdict(int)
    try:
        for sent in sentences:
            sent_doc = nlp(sent)
            sent_entities = [str(ent.text) for ent in sent_doc.ents if ent.label_ in ['PERSON', 'ORG', 'GPE', 'DATE']]
            for i in range(len(sent_entities)):
                for j in range(i+1, len(sent_entities)):
                    pair = tuple(sorted([sent_entities[i], sent_entities[j]]))
                    cooccur[pair] += 1

        entity_cooccurrence = [{"source": pair[0], "target": pair[1], "weight": weight} for pair, weight in cooccur.items()]
    except Exception as e:
        print(f"Error in entity co-occurrence: {str(e)}")
        entity_cooccurrence = []

    # POS Tagging
    pos_counts = Counter()
    try:
        for token in doc:
            if token.pos_ in ['NOUN', 'VERB', 'ADJ', 'ADV', 'PRON', 'DET']:
                pos_counts[token.pos_] += 1
            else:
                pos_counts['OTHER'] += 1

        pos_distribution = dict(pos_counts)
    except Exception as e:
        print(f"Error in POS tagging: {str(e)}")
        pos_distribution = {}

    # TF-IDF Keywords
    keywords = []
    try:
        vectorizer = TfidfVectorizer(stop_words='english', max_features=20)
        tfidf_matrix = vectorizer.fit_transform([text])
        feature_names = vectorizer.get_feature_names_out()
        scores = tfidf_matrix.toarray()[0]
        keywords = [{"word": str(word), "score": float(score)} for word, score in zip(feature_names, scores) if score > 0]
        keywords.sort(key=lambda x: x['score'], reverse=True)
    except Exception as e:
        print(f"Error in TF-IDF keyword extraction: {str(e)}")
        keywords = []

    # Readability metrics
    readability = {}
    try:
        flesch_reading_ease = textstat.flesch_reading_ease(text)
        flesch_kincaid_grade = textstat.flesch_kincaid_grade(text)
        gunning_fog = textstat.gunning_fog(text)
        avg_sentence_length = textstat.avg_sentence_length(text)
        avg_word_length = textstat.avg_letter_per_word(text)

        readability = {
            "flesch_reading_ease": flesch_reading_ease,
            "flesch_kincaid_grade": flesch_kincaid_grade,
            "gunning_fog": gunning_fog,
            "avg_sentence_length": avg_sentence_length,
            "avg_word_length": avg_word_length
        }
    except Exception as e:
        print(f"Error in readability metrics: {str(e)}")
        readability = {}

    # Lexical diversity
    lexical_diversity = {}
    try:
        words = re.findall(r'\b\w+\b', text.lower())
        total_words = len(words)
        unique_words = len(set(words))
        ttr = unique_words / total_words if total_words > 0 else 0
        word_counts = Counter(words)
        rare_word_count = sum(1 for count in word_counts.values() if count == 1)

        lexical_diversity = {
            "ttr": ttr,
            "unique_words": unique_words,
            "total_words": total_words,
            "rare_word_count": rare_word_count
        }
    except Exception as e:
        print(f"Error in lexical diversity: {str(e)}")
        lexical_diversity = {}

    # Metadata
    metadata = {
        "filename": "",  # Will be set in main.py
        "total_sentences": total_sentences,
        "total_words": total_words,
        "unique_words": unique_words,
        "dominant_emotion": dominant_emotion
    }

    return {
        "metadata": metadata,
        "emotion_arc": emotion_arc,
        "emotion_distribution": emotion_distribution,
        "sentiment_timeline": sentiment_timeline,
        "entities": entities,
        "entity_cooccurrence": entity_cooccurrence,
        "pos_distribution": pos_distribution,
        "keywords": keywords,
        "readability": readability,
        "lexical_diversity": lexical_diversity
    }