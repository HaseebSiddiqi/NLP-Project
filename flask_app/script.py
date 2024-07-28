import re
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from tqdm.notebook import tqdm
from textblob import TextBlob

nltk.download('stopwords')
nltk.download('punkt')
# Define custom stopwords
stop_words = set(stopwords.words('english'))
negations = {"not", "n't", "no","never", "don't", "isn't"}
custom_stopwords = stop_words - negations


def preprocess_text(text):
    if not isinstance(text, str):
        return ''

    text = text.lower()
    text = re.sub(r'https?://\S+', '', text)
    text = re.sub(r'@\w+', '', text)
    text = re.sub(r'#', '', text)
    text = re.sub(r'\d+', '', text)
    text = re.sub(r'<.*?>', '', text)
    text = re.sub(r'[^\w\s]', '', text)
    text = re.sub(r'\s+', ' ', text)
    
    words = word_tokenize(text)
    words = [w for w in words if w.lower() not in custom_stopwords]
    preprocessed_text = ' '.join(words)
    return preprocessed_text



# Define the custom sentiment analysis function
def custom_sentiment_analysis(text):
    # Ensure the input is a string
    if not isinstance(text, str):
        text = str(text)

    # Define keywords indicating positive, neutral, and negative sentiment
    positive_keywords = ["five stars", "five star", "four stars", "four star"]
    neutral_keywords = ["three stars", "three star"]
    negative_keywords = ["one stars", "one star", "two stars", "two star"]

    # Check if any positive keyword is present in the text
    contains_positive_keyword = any(keyword in text for keyword in positive_keywords)

    # Check if any neutral keyword is present in the text
    contains_neutral_keyword = any(keyword in text for keyword in neutral_keywords)

    # Check if any negative keyword is present in the text
    contains_negative_keyword = any(keyword in text for keyword in negative_keywords)

    # If positive keyword is present, assign a very high positive score
    if contains_positive_keyword:
        return {'pos': 1.0, 'neg': 0.0, 'neu': 0.0, 'compound': 1.0}  # Very high positive score

    # If neutral keyword is present, assign a neutral score
    elif contains_neutral_keyword:
        return {'pos': 0.0, 'neg': 0.0, 'neu': 1.0, 'compound': 0.0}  # Neutral score

    # If negative keyword is present, assign a very high negative score
    elif contains_negative_keyword:
        return {'pos': 0.0, 'neg': 1.0, 'neu': 0.0, 'compound': -1.0}  # Very high negative score

    # If no keyword is present, use VADER for sentiment analysis
    else:
        sia = SentimentIntensityAnalyzer()
        return sia.polarity_scores(text)

# Download the VADER lexicon
nltk.download('vader_lexicon')

# Initialize the VADER SentimentIntensityAnalyzer
sia = SentimentIntensityAnalyzer()

def get_sentiment_vader(text):
    # Ensure the input is a string
    if not isinstance(text, str):
        text = str(text)

    # Get sentiment scores using the custom sentiment analysis function
    custom_scores = custom_sentiment_analysis(text)
    pos_score = custom_scores["pos"]
    compound = custom_scores["compound"]


    if compound == 1.0:
        return 'Positive'

    elif compound > 0.38:  # Adjust threshold as needed
        return 'Positive'

    elif compound < 0.0:  # Adjust threshold as needed
        return 'Negative'

    else:
        return 'Neutral'

def get_sentiment(polarity):

    if  polarity < 0.05:
        return 'Negative'
    elif polarity > 0.16:
        return 'Positive'
    else:
        return 'Neutral'
    

def get_textblob_sentiment(preprocessed_text):
    blob = TextBlob(preprocessed_text)
    polarity = blob.sentiment.polarity
    return get_sentiment(polarity)