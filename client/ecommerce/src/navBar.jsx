import { Link } from "react-router-dom";
import "./navBar.css";
import DropDown from "./DropDown";
import { useState } from "react";

function NavBar() {
  const [visibleDropdown,setVisibleDropdown] = useState(null)
  
  const handleMouseEnter = (league) =>{
   setVisibleDropdown(league)
  }
  
  const handleMouseLeave = () =>{
    setVisibleDropdown(null)
  }

  return(
    <>
      <div className = "navBar">

        <div className = "dropdown">
        <button onMouseEnter={() => handleMouseEnter("nba")} onMouseLeave={handleMouseLeave} className="link">NBA</button>
        {visibleDropdown === "nba" && <DropDown league={"nba"}/>}
        </div>

        <div className="dropdown">
          <button onMouseEnter={() => handleMouseEnter("nfl")} onMouseLeave={handleMouseLeave} className="link">NFL</button>
          {visibleDropdown === "nfl" && <DropDown league={"nfl"}/>}
        </div>

        <div className="dropdown">
            <button onMouseEnter={() => handleMouseEnter("mlb")} onMouseLeave={handleMouseLeave} className="link">MLB</button>
            {visibleDropdown === "mlb" && <DropDown league={"mlb"}/>}
          </div>

        
        
      </div>
    </>
  ) 
}

export default NavBar;
