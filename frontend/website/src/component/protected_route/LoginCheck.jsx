import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function LoginCheck({ children }) {
  const token = localStorage.getItem("token");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!token && !showToast) {
      toast.warning("Login First!");
      setShowToast(true);
    }
  }, [token, showToast]);

  if (!token) {
    return <Navigate to="/auth" />;
  }

  return children;
}
