/*
import { ThemeProvider } from "@mui/material";
import theme from "./theme/index";
*/
import { CartProvider } from "./contexts/CartContext";
import CartPage from "./pages/Cart/CartPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/auth/authLayout";
import SignUp from "./pages/signup/SignUp";
import SignupContextProvider from "./component/signup/SignupContext";
import Verify from "./pages/verify/Verify";
import { ToastContainer, Zoom } from "react-toastify";
import Login from "./pages/Login/Login";
import MainPage from "./pages/MainPage/MainPage";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Profile from "./pages/Profile/Profile";
import RealProfile from "./pages/Profile/RealProfile";
import CoursesPage from "./pages/Courses/CoursesPage";
import LoginCheck from "./component/protected_route/LoginCheck";
import UserContextProvider from "./Context/userContext";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import HomeAdmin from "./pages/AdminPages/HomeAdmin";
import EnrollmentsAdmin from "./pages/AdminPages/EnrollmentsAdmin";
import CoursesAdmin from "./pages/AdminPages/CoursesAdmin";
import InstructorsAdmin from "./pages/AdminPages/InstructorsAdmin";
import StudentsAdmin from "./pages/AdminPages/StudentsAdmin";
// import TransactionsAdmin from "./pages/AdminPages/TransactionsAdmin";
import ReportsAdmin from "./pages/AdminPages/ReportsAdmin";
import { createTheme, ThemeProvider } from "@mui/material";
import CourseDetails from "./pages/Course/CourseDetails";
import ClassRoomsUser from "./pages/UserClassRooms/ClassRoomsUser";
import AuthProtectedRout from "./component/protected_route/AuthProtectedRout";
import OrgNotificationsContextProvider from "./Context/NotificationsOrgContext";
import Notifications from "./component/Notifications/Notifications";
// import Landing from "./pages/Landing/Landing";
import LandingPage from "./pages/Landing/Landing";
import AcademyProfile from "./pages/AcademyProfile/AcademyProfile";
import InstructorProfile from "./pages/InstructorProfile/InstructorProfile";
import UserNotificationsContextProvider from "./Context/NotificationsUserContext";
import CoursesAdminTemp from "./pages/AdminPages/CoursesAdminTemp";
import ForgetPassword from "./pages/ForgetPassword/ForgetPAssword";
import ClassroomsListPage from "./pages/UserClassRooms/ClassroomsListPage";
import Checkout from "./pages/Cart/Checkout";
import { CourseProvider } from './Context/CourseContext';
export default function App() {
 

  const theme = createTheme({
    palette: {
      primary: {
        main: "#654dbf",
      },
      secondary: {
        main: "#f5f5f5",
      },
      warning: {
        main: "#ff6a45",
      },
    },
  });
  // const router=createBrowserRouter([
  //   {path:'/',
  //     element:<div>Landing Page <Link to={'/auth/login'}>Login</Link> </div>
  //   },
  //   {
  //     path:"auth",
  //     element:<AuthLayout/>,
  //     children:[
  //       {
  //         index:true,
  //         element:<Login/>,
  //       },
  //       {path:"login",
  //         element:<Login/>,
  //       }, {path:"signup",
  //         element:
  //         <SignupContextProvider>
  //         <SignUp/>
  //         </SignupContextProvider>,
  //       },{
  //         path:"verify/:id",
  //         element:<Verify/>
  //       }
  //     ]
  //   },
  // ]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LandingPage/>
      ),
    },
    {
      path: "auth",
      element: <AuthProtectedRout><AuthLayout/></AuthProtectedRout>,
      children: [
        {
          index: true,
          element: <Login />,
        },
        { path: "login", element: <Login /> },
        {
          path: "signup",
          element: (
            <SignupContextProvider>
              <SignUp />
            </SignupContextProvider>
          ),
        },
        {
          path: "verify/:id",
          element: <Verify />,
        },{
          path:'forget',
          element:<ForgetPassword/>
        }
      ],
    },
    {
      path: "main",
      element: (
        <LoginCheck>
          <UserContextProvider>
            <UserNotificationsContextProvider>
            <MainLayout />
            </UserNotificationsContextProvider>
          </UserContextProvider>
        </LoginCheck>
      ),
      children: [
        {
          index: true,
          element: <MainPage />,
        },
        {
          path: "main",
          element: <MainPage />,
        },{
          path:"profile",
          element:<Profile/>,
        },{
          path:"profile/user/:id?",
          element:<RealProfile/>,
        },{
          path:"courses",
          element:<CoursesPage/>
        },{
          path:"cart",
          element:<CartPage/>,
          children:[
            {
              path:"checkout",
              element:<Checkout/>
            }
          ]
        },{
          path:'course/:id',
          element:<CourseDetails/>
        },{
          path:"classrooms",
          element:<ClassroomsListPage/>,
          children:[
            {path:":id",element:<ClassRoomsUser/>}
          ]
        },
        {
          path:"academy/profile/:id",
          element:<AcademyProfile />
        },
        {
          path:"instructor/profile/:id",
          element:<InstructorProfile />
        }
      ]
    },
    {
      path: "dashboard",
      element: (
        <LoginCheck>
         <UserContextProvider>
         <OrgNotificationsContextProvider>
           <DashboardLayout/>
           </OrgNotificationsContextProvider>
           </UserContextProvider>
           </LoginCheck>
      ),
      children: [
        {
          index: true,
          element: <HomeAdmin />,
        },
        { path: "home", element: <HomeAdmin /> },
        { path: "enrollments", element: <EnrollmentsAdmin /> },
        { path: "courses", element: <CoursesAdmin /> },
        { path: "courses/:id", element: <CoursesAdminTemp /> },
        { path: "instructors", element: <InstructorsAdmin /> },
        { path: "students", element: <StudentsAdmin /> },
        { path: "reports", element: <ReportsAdmin /> },
        { path: "notifications", element: <Notifications type={"org"}/> },
      ],
    },
  ]);
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <UserContextProvider>
          <CourseProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
            transition={Zoom}
            closeButton={false}
          />
          
          <RouterProvider router={router} />
          </CourseProvider>
        </UserContextProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
