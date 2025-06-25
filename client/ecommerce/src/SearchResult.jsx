import React from "react";
import "./SearchResult.css"
import {Link} from "react-router-dom"

export const SearchResult = ({result}) =>{
    return <div className="search-result"> 
    <Link to ={`/item/${result.product_id}`}>{result.product_description}</Link></div>
}