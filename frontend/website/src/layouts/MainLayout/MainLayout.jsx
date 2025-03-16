import { Outlet } from "react-router-dom";
import MainNavbar from "../../component/MainLayoutNavbar/MainNavbar";

export default function MainLayout() {
  return (
    <div>
      <MainNavbar/>
      <Outlet/>
    </div>
  )
}
