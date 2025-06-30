import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import LogIn from './logIn'
import SignUp from './signUp'
import ProductList from './ProductList'
import { RouterProvider } from 'react-router'
import Item from './Item'
import { Home } from './home'
import Cart from './Cart'
import Product from './Product'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        index: true,
        element: <Home/>
      },
      {
        path:"login",
        element:<LogIn/>
      },
      {
        path:"signup",
        element:<SignUp/>
      },
      {
        path:"ProductList/:category",
        element:<ProductList/>
      },
      {
        path:"item/:id",
        element:<Item/>
      },
      {
        path:"cart",
        element:<Cart/>
      },
      {
        path:"product/:teamName",
        element:<Product/>
      }
    ]
  },
  
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
