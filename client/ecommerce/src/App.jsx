import Header from "./header";
import NavBar from "./navBar";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";



function App(){
   return(
      <>
      <AuthProvider>
         <Header/>
         <NavBar/>
         <Outlet/>
      </AuthProvider>
      </>
   )
}



export default App;