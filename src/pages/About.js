import Header from '../components/Header'
import pdf from '../image/Sentiment Predictor.pdf';
export default function About(){
    return(
        <>
            <h1> Report</h1>
            <iframe src={pdf} width="1000" height="700"></iframe>
        </>
    )
}