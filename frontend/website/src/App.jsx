import {createBrowserRouter, Link, RouterProvider} from 'react-router-dom';
import AuthLayout from './layouts/auth/authLayout';
import SignUp from './pages/signup/SignUp';
import SignupContextProvider from './component/signup/SignupContext';
import Verify from './pages/verify/Verify';
import { Bounce, ToastContainer, Zoom } from 'react-toastify';
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
          element:<div>Login</div>,
        },
        {path:"login",
          element:<div>Login</div>,
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
/>
      <RouterProvider router={router}/>
    </div>
  )
}
