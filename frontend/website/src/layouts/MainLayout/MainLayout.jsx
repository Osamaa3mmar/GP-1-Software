import { Outlet } from "react-router-dom";
import MainNavbar from "../../component/MainLayoutNavbar/MainNavbar";
import DashboardButton from "../../component/MainLayoutNavbar/DashboardButton";

export default function MainLayout() {
  return (
    <div>
      <MainNavbar/>
      <Outlet/>
      <DashboardButton/>
    </div>
  )
}
