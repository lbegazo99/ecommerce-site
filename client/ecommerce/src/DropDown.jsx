import { useEffect, useState } from "react";
import "./DropDown.css"

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
                 <div key={id}>{teamName.team}</div>
               ))
          }
       </div>
    )
}

export default DropDown;