/*
import { ThemeProvider } from "@mui/material";
import theme from "./theme/index";
*/
import { CartProvider } from "./contexts/CartContext";
import CartPage from "./pages/Cart/CartPage";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/auth/authLayout";
import SignUp from "./pages/signup/SignUp";
import SignupContextProvider from "./component/signup/SignupContext";
import Verify from "./pages/verify/Verify";
import { ToastContainer, Zoom } from "react-toastify";
import Login from "./pages/Login/Login";
import MainPage from "./pages/MainPage/MainPage";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Profile from "./pages/Profile/Profile";
import CoursesPage from "./pages/Courses/CoursesPage";
import LoginCheck from "./component/protected_route/LoginCheck";
import UserContextProvider from "./Context/userContext";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import HomeAdmin from "./pages/AdminPages/HomeAdmin";
import EnrollmentsAdmin from "./pages/AdminPages/EnrollmentsAdmin";
import CoursesAdmin from "./pages/AdminPages/CoursesAdmin";
import InstructorsAdmin from "./pages/AdminPages/InstructorsAdmin";
import StudentsAdmin from "./pages/AdminPages/StudentsAdmin";
import TransactionsAdmin from "./pages/AdminPages/TransactionsAdmin";
import ReportsAdmin from "./pages/AdminPages/ReportsAdmin";
import { createTheme, ThemeProvider } from "@mui/material";
import CourseDetails from "./pages/Course/CourseDetails";
import ClassRoomsUser from "./pages/UserClassRooms/ClassRoomsUser";
import AuthProtectedRout from "./component/protected_route/AuthProtectedRout";
export default function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#6366f1",
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
        <div>
          Landing Page <Link to={"/auth/login"}>Login</Link>{" "}
        </div>
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
        },
      ],
    },
    {
      path: "main",
      element: (
        <LoginCheck>
          <UserContextProvider>
            <MainLayout />
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
          path:"courses",
          element:<CoursesPage/>
        },{
          path:'course/:id',
          element:<CourseDetails/>
        },{
          path:"classrooms",
          element:<ClassRoomsUser/>

        }
      ]
    },{
      path:'dashboard',
      element:<UserContextProvider><DashboardLayout/></UserContextProvider>,
      children:[
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "courses",
          element: <CoursesAdmin />,
          children: [],
        },
        {
          path: "cart",
          element: <CartPage />,
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        <UserContextProvider>
          <DashboardLayout />
        </UserContextProvider>
      ),
      children: [
        {
          index: true,
          element: <HomeAdmin />,
        },
        { path: "home", element: <HomeAdmin /> },
        { path: "enrollments", element: <EnrollmentsAdmin /> },
        { path: "courses", element: <CoursesAdmin /> },
        { path: "instructors", element: <InstructorsAdmin /> },
        { path: "students", element: <StudentsAdmin /> },
        { path: "transactions", element: <TransactionsAdmin /> },
        { path: "reports", element: <ReportsAdmin /> },
      ],
    },
  ]);
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <UserContextProvider>
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
          
        </UserContextProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
