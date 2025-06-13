import {Link} from "react-router-dom";
function header(){
    return(
        <>
            <div>
                <div className="logo"></div>
                <div className="searchBox"></div>
                <button><Link to = "/login">Log In</Link></button>
                <div className="cart"></div>
            </div>
        </>
    );
}

export default header;