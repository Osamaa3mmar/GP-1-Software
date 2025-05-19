import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AuthProtectedRout({children}) {
    const token=localStorage.getItem("token");
    if(token){
        toast.info("Logout first!")
        return <Navigate to={'/main'}/>
    }
  return (
    <>
    {children}
    </>
  )
}
