import React from "react"
import { useState } from "react"

function SignUp(){
    const [formData,setFormData] = useState({
        userName:"",
        email:"",
        password:"",
        firstName:"",
        lastName:""
    })

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const res = await fetch("http://localhost:3000/user/sign-up",{
                method: "POST",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            console.log(data.token);

            if(res.ok){
                setMessage("User created successfully");
                setFormData({userName:"",email:"",password:"",firstName:"",lastName:""})
            }else{
                setMessage(data.error || "Something went wrong");
            }
        }catch(err){
            console.log("error")
        }

    }



    return(
        <>
            <form id="signIn">
                <input type="text" name="userName" placeholder="Username" value={formData.userName} onChange = {handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange = {handleChange} required/>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange = {handleChange} required />
                <input type="text" name = "firstName" placeholder="First Name" value={formData.firstName} onChange = {handleChange} required />
                <input type="text" name = "lastName" placeholder="Last Name" value={formData.lastName} onChange = {handleChange} required />
                <button onClick={handleSubmit} type = "submit">Sign up</button>
            </form>
        </>
    )

}

export default SignUp