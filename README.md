
![View the Report](https://github.com/HaseebSiddiqi/NLP-Project/blob/master/src/image/Sentiment%20Predictor.pdf)

![View the Report](https://github.com/HaseebSiddiqi/NLP-Project/blob/master/src/image/models.png)
![View the Report](https://github.com/HaseebSiddiqi/NLP-Project/blob/master/src/image/models%20result.png)

### To run 
Install neccassary libraries  
pip install Flask Flask-Cors joblib nltk tqdm textblob scikit-learn

npm install 

First start the flask server: 

cd flask_app
python app.py

Then in a seprate terminal
Type npm start to start the website








In command prompt test the model

curl -X POST http://127.0.0.1:5000/predict -H "Content-Type: application/json" -d "{\"text\": \"Sample review\"}"