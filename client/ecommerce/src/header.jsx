import {Link} from "react-router-dom";
import "./header.css"
import { FaShoppingCart } from "react-icons/fa";
import SearchBar from "./searchBar";
import { useState } from "react";
import { SearchResultsList } from "./SearchResultsList";
function Header(){
    const[results,setResults] = useState([]);
    return(
        <>
            <div id="header">
                <div id="top">
                    <button id = "signUpPromotion">SIGN UP AND SAVE 10%</button>
                    <div className="left-side">
                        <button id = "loginButton" style={{backgroundColor:"inherit"}} ><Link to = "/login">Log In</Link></button>
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