import {createBrowserRouter, Link, RouterProvider} from 'react-router-dom';
import AuthLayout from './layouts/auth/authLayout';
import SignUp from './pages/signup/SignUp';
import SignupContextProvider from './component/signup/SignupContext';
import Verify from './pages/verify/Verify';
import { ToastContainer, Zoom } from 'react-toastify';
import Login from './pages/Login/Login';
import MainPage from './pages/MainPage/MainPage';
import MainLayout from './layouts/MainLayout/MainLayout';
import Profile from './pages/Profile/Profile';
export default function App() {
  const router=createBrowserRouter([
    {path:'/',
      element:<div>Landing Page <Link to={'/auth/login'}>Login</Link> </div>
    },
    {path:"auth",
      element:<AuthLayout/>,
      children:[
        {
          index:true,
          element:<Login/>,
        },
        {path:"login",
          element:<Login/>,
        }, {path:"signup",
          element:
          <SignupContextProvider>
          <SignUp/>
          </SignupContextProvider>,
        },{
          path:"verify/:id",
          element:<Verify/>
        }

      ]
    },
    {
      path:"main",
      element:<MainLayout/>,
      children:[
        {
          index:true,
          element:<MainPage/>,
        },
        {
          path:"main",
          element:<MainPage/>,
        },
        {
          path:"profile",
          element:<Profile/>,
        }
      ]
    }
  ]);
  return (
    <div>
      <ToastContainer
position="top-center"
autoClose={2500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={true}
rtl={false}
pauseOnFocusLoss
draggable
theme="light"
transition={Zoom}
closeButton={false}/>
      <RouterProvider router={router}/>
    </div>
  )
}
