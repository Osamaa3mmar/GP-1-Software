import { createContext, useState } from "react";


export const SignupContext=createContext();


const SignupContextProvider=({children})=>{
    const [email,setEmail]=useState(null);
    const [id,setId]=useState(null);
    console.log(id);
    return (
        <SignupContext.Provider value={{id,email,setEmail,setId}}>
            {children}
        </SignupContext.Provider>
    )
}

export default SignupContextProvider;