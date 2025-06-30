import "./navBar.css";
import DropDown from "./DropDown";
import { useState } from "react";

function NavBar() {
  const [visibleDropdown,setVisibleDropdown] = useState(null)
  
  const handleMouseEnter = (league) =>{
   setVisibleDropdown(league)
  }
  
  const handleMouseLeave = () =>{
   const hideTimeout = setTimeout(() => {
      setVisibleDropdown(null)
    },2000)

  }

  return(
    <>
      <div className = "navBar">

        <div onMouseEnter={() => handleMouseEnter("nba")} onMouseLeave={handleMouseLeave} className = "dropdown">
        <button className="link">NBA</button>
        {visibleDropdown === "nba" && <DropDown league={"nba"}/>}
        </div>

        <div onMouseEnter={() => handleMouseEnter("nfl")} onMouseLeave={handleMouseLeave} className="dropdown">
          <button className="link">NFL</button>
          {visibleDropdown === "nfl" && <DropDown league={"nfl"}/>}
        </div>

        <div  onMouseEnter={() => handleMouseEnter("mlb")} onMouseLeave={handleMouseLeave} className="dropdown">
            <button className="link">MLB</button>
            {visibleDropdown === "mlb" && <DropDown league={"mlb"}/>}
          </div>

        
        
      </div>
    </>
  ) 
}

export default NavBar;
