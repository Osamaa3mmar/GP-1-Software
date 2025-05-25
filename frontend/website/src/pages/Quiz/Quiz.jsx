import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function Quiz() {
    
    const [questions, setQuestions] = useState([]);
    const {quizId}=useParams();
    const getQustions=async ()=>{
        try{
            const {data}=await axios.get(''+quizId);
            setQuestions(data.qustions);
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getQustions();
    },[]);
  return (
    <div>
       
    </div>
  )
}
 