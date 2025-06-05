import {  createContext, useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";
import axios from "axios";



export const OsamaCartContext=createContext();

const OsamaCartContextProvider=({children})=>{
    const [cartCount, setCartCount] = useState(0);
    const getCartCount=async()=>{
    try{
        const {data}=await axios.get("http://localhost:4545/cart/get",{
            headers:{
                token: localStorage.getItem("token"),
            }
        });
        setCartCount(data.cart.courses.length);
    }catch(error){
        console.error("Error fetching cart count:", error);
    }
    }
    useEffect(()=>{
        getCartCount();
    },[]);
    return (
        <OsamaCartContext.Provider value={{cartCount,setCartCount}}>
            {children}
        </OsamaCartContext.Provider>
    )
}

export default OsamaCartContextProvider;

