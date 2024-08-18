import React, { useState } from 'react';


export default function Models() {
    const [inputText, setInputText] = useState('');
    const [lrPrediction, setLrPrediction] = useState('');
    const [svmPrediction, setSvmPrediction] = useState('');
    const [mlpPrediction, setMlpPrediction] = useState('');
    const [vadersPrediction, setVadersPrediction] = useState('');
    const [textblobPrediction, setTextblobPrediction] = useState('');
    
    const handlePrediction = async () => {
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: inputText })
        });

        if (!response.ok) {
            console.error('Error:', response.statusText);
            return;
        }

        const data = await response.json();
        setLrPrediction(data['lr prediction']);
        setSvmPrediction(data['svm prediction']);
        setMlpPrediction(data['mlp prediction']);
        setMlpPrediction(data['mlp prediction']);
        setVadersPrediction(data['vaders_sentiment']);
        setTextblobPrediction(data['textblob_sentiment']);
        
    };

    return (
        <>

            <h1>Models</h1>
            <div className= 'container-wrapper'>

            <div className='examples'>
                <h2> Review Examples</h2>
                <h3> Positive Review</h3>
                <p>Great flip flop I normally wear a 10 in flip flops, to get the smidge of extra shoe after the heel, 
                    and this 9/10 size does not offer enough of that smidge. But I think a size up would not have looked
                    right. There is no arch support. But the sole and shoe is sturdy. Good shoe, but I have had ones more comfy.</p>
                <h3>Neutral Review</h3>
                <p>Works great for the sun, not very durable The hat worked great for keeping the sun out of your face, but after 
                    using it for a week at the beach the woven material at the top of the hat began to crack. It still functions 
                    fine but I am not sure how many more uses it will have.	</p>
                <h3> Negative Review</h3>
                <p>Too Short - Poor Quality The dresses were ridiculously short. The quality was very poor.
                     The material reminded me of cheap convenience store children's Halloween costumes. I was
                      very disappointed. The dresses photogragh much better than they actually look. I will not
                       purchase from this supplier again.</p>
            </div>
            
            <div className='container'> 
            <div className='textbox'>
                <textarea
                    rows="4"
                    cols="50"
                    value={inputText}
                    x
                    placeholder='Enter a product review and click "Predict" to analyze its sentiment. Note: These models were trained on reviews from fashion products'
                    onChange={(e) => setInputText(e.target.value)}
                    
                />
                
            </div>
            
            <div className='Submit'> 
                <button  onClick={handlePrediction}>Predict</button>
            </div>

            <div className="Predictions"> 
                <h3>Model Predictions</h3>
            {lrPrediction && <p>LR Prediction: {lrPrediction}</p>}
            {svmPrediction && <p>SVM Prediction: {svmPrediction}</p>}
            {mlpPrediction && <p>MLP Prediction: {mlpPrediction}</p>}
            {vadersPrediction && <p>Vaders Prediction: {vadersPrediction}</p>}
            {textblobPrediction && <p>Text Blob Prediction: {textblobPrediction}</p>}
            </div>

            </div>

            <div className='models'>
                <h2> Model Accuracy</h2>
                <h3> Logistic Regression</h3>
                <p>LR Accuracy: 0.77</p>
                <p>
                    <strong>Negative: </strong>
                    
                    Precision: 0.76 | Recall: 0.81 | F1-Score: 0.78 
                </p>
                <p>
                    <strong>Neutral: </strong>
                    
                    Precision: 0.71 | Recall: 0.66 | F1-Score: 0.69 
                </p>
                <p>
                    <strong>Positive: </strong>
                    
                    Precision: 0.83 | Recall: 0.82 | F1-Score: 0.83 
                </p>

                <h3> Support Vector Machine</h3>
                <p>SVM Accuracy: 0.76</p>
                <p>
                    <strong>Negative: </strong>
                    
                    Precision: 0.76 | Recall: 0.79 | F1-Score: 0.77 
                </p>
                <p>
                    <strong>Neutral: </strong>
                    
                    Precision: 0.68 | Recall: 0.69 | F1-Score: 0.68 
                </p>
                <p>
                    <strong>Positive: </strong>
                    
                    Precision: 0.86 | Recall: 0.80 | F1-Score: 0.83 
                </p>
                <h3> Multi Layer Perceptron</h3>
                <p>MLP Accuracy: 0.77</p>
                <p>
                    <strong>Negative: </strong>
                    
                    Precision: 0.77 | Recall: 0.80 | F1-Score: 0.78 
                </p>
                <p>
                    <strong>Neutral: </strong>
                    
                    Precision: 0.70 | Recall: 0.68 | F1-Score: 0.69 
                </p>
                <p>
                    <strong>Positive: </strong>
                    
                    Precision: 0.82 | Recall: 0.83 | F1-Score: 0.83 
                </p>
               
                <h3> Vaders</h3>
                <p>Vaders Accuracy: 0.66</p>
                <p>
                    <strong>Negative: </strong>
                    
                    Precision: 0.82 | Recall: 0.63 | F1-Score: 0.71 
                </p>
                <p>
                    <strong>Neutral: </strong>
                    
                    Precision: 0.70 | Recall: 0.39 | F1-Score: 0.5 
                </p>
                <p>
                    <strong>Positive: </strong>
                   
                    Precision: 0.57 | Recall: 0.96 | F1-Score: 0.72 
                </p>
                
                
                <h3> Text Blob</h3>
                <p>Text Blob Accuracy: 0.55</p>
                <p>
                    <strong>Negative: </strong>
                    
                    Precision: 0.59 | Recall: 0.62 | F1-Score: 0.61 
                </p>
                <p>
                    <strong>Neutral: </strong>
                    
                    Precision: 0.49 | Recall: 0.20 | F1-Score: 0.28 
                </p>
                <p>
                    <strong>Positive: </strong>
                    
                    Precision: 0.54 | Recall: 0.84 | F1-Score: 0.66 
                </p>
                
                
            </div>
            </div>
            
           

          
            
        </>
    );
}
