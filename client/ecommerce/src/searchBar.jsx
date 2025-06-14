import React, {useState,useEffect} from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css"


export const SearchBar = ({setResults}) =>{

    const [input,setInput] = useState("")
    
    useEffect(() => {
        if(input.trim() == ""){
            setResults([])
            return;
        }

        fetch(`http://localhost:3000/products/all/${input}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched:",data)
                setResults(data)})
            .catch((err) => console.error("Fetch error:",err));
    },[input])



    return <div className="input-wrapper">
        <FaSearch id = "search-icon"/>
        <input placeholder="Type to search..." value={input} onChange= {(e) => setInput(e.target.value)}/>
    </div>
}

export default SearchBar;