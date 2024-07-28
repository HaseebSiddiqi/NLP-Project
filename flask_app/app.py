from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from script import preprocess_text, get_sentiment_vader, get_textblob_sentiment


app = Flask(__name__)
CORS(app)  # Add this line to enable CORS for your Flask app


lr_model = joblib.load('../Notebook/lr_model.pkl')
svm_model = joblib.load('../Notebook/svm_model.pkl')
mlp_model = joblib.load('../Notebook/mlp_model.pkl')
tfidf_vectorizer = joblib.load('../Notebook/tfidf_vectorizer.pkl')


# Route for prediction
@app.route('/predict', methods=['POST'])
def lr_predict():
    # Get the data from the POST request
    data = request.get_json()
    text = data.get('text')

    # Check if text is not None
    if text is None:
        return jsonify({'error': 'No text provided'}), 400

    # Preprocess the text
    preprocessed_text = preprocess_text(text)
    
    # Vectorize the input text
    text_vectorized = tfidf_vectorizer.transform([preprocessed_text])

  
    
    # Make predictions using the loaded models
    lr_prediction = lr_model.predict(text_vectorized)
    svm_prediction = svm_model.predict(text_vectorized)
    mlp_prediction = mlp_model.predict(text_vectorized)
    vader_prediction = get_sentiment_vader(preprocessed_text)
    textblob_prediction = get_textblob_sentiment(preprocessed_text)
    
    # Return the predictions as JSON
    response = {
        'lr prediction': lr_prediction[0],
        'svm prediction': svm_prediction[0],
        'mlp prediction': mlp_prediction[0],
        'vaders_sentiment': vader_prediction,
        'textblob_sentiment': textblob_prediction
    }
    return jsonify(response)



# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
