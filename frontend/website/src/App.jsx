import {createBrowserRouter, Link, RouterProvider} from 'react-router-dom';
import AuthLayout from './layouts/auth/authLayout';
import SignUp from './pages/signup/SignUp';
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
          element:<SignUp/>,
        }

      ]
    }
  ]);
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}
