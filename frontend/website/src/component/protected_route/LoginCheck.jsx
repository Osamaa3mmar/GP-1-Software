import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginCheck({children}) {

    const token=localStorage.getItem("token");


    if(!token){
        toast.warning("Login First !");
        return <Navigate to={'/auth'}/>
    }
    
  return children
}
