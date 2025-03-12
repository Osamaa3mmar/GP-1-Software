import {createBrowserRouter, Link, RouterProvider} from 'react-router-dom';
export default function App() {
  const router=createBrowserRouter([
    {path:'/',
      element:<div>Landing Page <Link to={'/auth/login'}>Login</Link> </div>
    },
    {path:"auth",
      element:<div>Auth Layout </div>,
      children:[
        {
          index:true,
          element:<div>Login</div>,
        },
        {path:"login",
          element:<div>Login</div>,
        }, {path:"signup",
          element:<div>signup</div>,
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
