import React,{useState,useContext} from "react"
import {Link} from "react-router-dom";
import { AuthContext } from "./AuthProvider";

function LogIn(){
    
    const [formData,setFormData] = useState({
        username:"",
        password:"",
    })

    const{login} = useContext(AuthContext)

    const[message,setMessage] = useState("");

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const res = await fetch("http://localhost:3000/user/log-in",{
                method: "POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json();

            if(res.ok){
                localStorage.setItem("token",data.token);
                setFormData({username:"",password:""})
                login()
            }else{
                setMessage(data.error || "Something went wrong");
            }
        }catch(err){
            console.error("Error sub")
        }
    }

    return(
        <>
            <form id="signIn">
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange = {handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange = {handleChange} required />
                <button type = "submit" onClick={handleSubmit} >Sign in</button>
            </form>

            <button className="signUp"><Link to = '/signup'>Sign up</Link></button>
        </>


    )
}

export default LogIn