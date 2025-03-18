import axios from 'axios';
import  { useEffect, useState } from 'react'

export default function useFetch(url,auth) {
    const [data,setData]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);

    const getData=async ()=>{
        setLoading(true);
        try{
        const {data}=await axios.get(url,{
            headers:{
                token:auth
            }
        });
        setData(data);
        console.log(data);
    }catch(error){
        setError(error);
    }
    finally{
        setLoading(false);
    }
    }

    useEffect(()=>{
        getData();
    },[url,auth])



  return {data,loading,error}
}
