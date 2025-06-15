import { Outlet } from "react-router-dom";
import MainNavbar from "../../component/MainLayoutNavbar/MainNavbar";
import DashboardButton from "../../component/MainLayoutNavbar/DashboardButton";
import ChatButton from "../../component/MainLayoutNavbar/ChatButton";
import { useContext } from "react";
import { UserContext } from "../../Context/userContext";

export default function MainLayout() {
  const {user}=useContext(UserContext);
  return (
    <div>
      <MainNavbar/>
      <Outlet/>
      {user?.role=='owner'?
      <DashboardButton/>
      :
        <ChatButton/>
      }
    </div>
  )
}
