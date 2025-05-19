import {  createContext } from "react";
import useFetch from "../Hooks/useFetch";



export const UserContext=createContext();

const UserContextProvider=({children})=>{
    const token =localStorage.getItem("token");
    const {data}=useFetch("http://localhost:4545/user/my-profile",token);


    return (
        <UserContext.Provider value={{user:data?data.user?data.user:null:null}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;

