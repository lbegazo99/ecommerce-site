import {Link} from "react-router-dom";
function navBar(){
    return(
        <>
            <div>
               <button className="navBarButton"><Link to = "/ProductList/nba">NBA</Link></button>
               <button className="navBarButton">NFL</button>
               <button className="navBarButton">MLB</button>
            </div>
        </>
    )
}

export default navBar;