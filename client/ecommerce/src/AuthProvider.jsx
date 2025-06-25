import { createContext,useState,useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedin(!!localStorage.getItem("token"));
        }

        window.addEventListener("storage",handleStorageChange);

        return () => {
            window.removeEventListener("storage",handleStorageChange);
        }
    },[])

    const logout = () =>{
        localStorage.removeItem("token")
        setIsLoggedIn(false);
    }
    const login = () =>{
        setIsLoggedIn(true);
    }

    return(
        <AuthContext.Provider value={{isLoggedIn,login,logout}}>
            {children}
        </AuthContext.Provider>
    )

}