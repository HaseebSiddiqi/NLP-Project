Install neccassary libarays 
pip install Flask Flask-Cors joblib nltk tqdm textblob scikit-learn

npm install 

First start the flask server: 

cd flask_app
python app.py

Then in a seprate terminal
Type npm start to start the website








In command prompt test the model

curl -X POST http://127.0.0.1:5000/predict -H "Content-Type: application/json" -d "{\"text\": \"Sample review\"}"