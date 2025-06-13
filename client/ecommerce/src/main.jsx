import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import LogIn from './logIn'
import SignUp from './signUp'
import ProductList from './ProductList'

import { RouterProvider } from 'react-router'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path:"/login",
    element:<LogIn/>
  },
  {
    path:"/signup",
    element:<SignUp/>
  },
  {
    path:"/ProductList/:category",
    element:<ProductList/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
