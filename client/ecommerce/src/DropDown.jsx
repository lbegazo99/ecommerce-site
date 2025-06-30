import { useEffect, useState } from "react";
import "./DropDown.css"
import { Link } from "react-router-dom";

function DropDown({league}){
    const [teamNames,setTeamNames] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/${league}/teams`)
        .then((res) => res.json())
        .then((data) => setTeamNames(data))
        .catch((err) => console.error("fetch error",err))
    },[])


    return (
       <div id = "container">
          {
              teamNames.map((teamName,id) => (
                 <Link to = {`/product/${teamName.team}`} ><div key={id}>{teamName.team}</div></Link>
               ))
          }
       </div>
    )
}

export default DropDown;