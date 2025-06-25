import {Link} from "react-router-dom";
import "./header.css"
import { FaShoppingCart } from "react-icons/fa";
import SearchBar from "./searchBar";
import {useState,useContext} from "react";
import { SearchResultsList } from "./SearchResultsList";
import { AuthContext } from "./AuthProvider";
function Header(){
    const[results,setResults] = useState([]);
    const{isLoggedIn,logout} = useContext(AuthContext)

    const handleLogout = () =>{
        logout();
    }

    return(
        <>
            <div id="header">
                <div id="top">
                    <button id = "signUpPromotion">SIGN UP AND SAVE 10%</button>
                    <div className="left-side">
                      { !isLoggedIn && <button id = "loginButton" style={{backgroundColor:"inherit"}} ><Link to = "/login">Log In</Link></button>}
                      { isLoggedIn && <button id = "logOutButton" style={{backgroundColor:"inherit"}} onClick = {handleLogout}>Log Out</button>}
                      <button id="cart"><FaShoppingCart /></button>
                    </div>
                </div>
                <div id="bottom">
                    <div id="logo">All American</div>
                    <div className="searchBarContainer">
                        <SearchBar setResults = {setResults}/>
                        <SearchResultsList results={results}/>
                    </div>
                </div>
                
            </div>
        </>
    );
}


export default Header;