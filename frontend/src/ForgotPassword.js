import React,{useState} from 'react';
import "./ForgotPassword.css";
import {useHistory} from "react-router-dom";

function ForgotPassword() {

    const [input,setInput]=useState({email:"",password:"",confirm_password:""});
    const [message,setMessage]=useState("")
    const [errors,setErrors]=useState();
    const history=useHistory();

    const changeInput=(e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }
    const handleValidation=()=>{

        let handle=true;
        let localerrors={};
        if(input.email=="")
        {
            localerrors["email"]="Email Cannot be Empty"
            handle=false;
        }
        if(input.password=="")
        {
           localerrors["password"]="Confirm Password Cannot be Empty"
            handle=false;
        }
        if(input.confirm_password=="")
        {
            localerrors["confirm_password"]="Password Cannot be Empty";
            handle=false;
        }
        setErrors({localerrors})
        return handle;
    }
    const changePassword=()=>{
        setMessage("");
        if(handleValidation())
        {
            if(input.password!=input.confirm_password)
            {
                setMessage("Both Password should match 😐"); 
            }
            else{
                fetch("https://freshdeskclone.herokuapp.com/changePassword",{
                    method:"PUT",
                    body:JSON.stringify(input),
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                .then((res)=>res.json())
                .then((data)=>{
                    if(data.message==="Data Updated Successfully")
                    {
                        setMessage("Password Changed SuccessFully 😃"); 
                    }
                    else{
                        setMessage(data.message)
                    }
                })
            }
        }
        else{
            setMessage("Values cannot be Empty. All fields are mandatory")
        }

    }
    const login=()=>{
        history.push("/login")
    }

    return (
        <>
        <h1 className="heading">FreshDesk Clone Application</h1>
        <div className="forgot__border">
            <h2 className="heading">Forgot Password</h2>
            <input type="email" name="email" className="input" onChange={changeInput} value={input.email} placeholder=" Email"></input>
            <br></br><span  className="forgot__error" style={{color: "red"}}>{errors?.localerrors?.email}</span>
            <input type="password" name="password" className="input" onChange={changeInput} value={input.password} placeholder=" Password"></input>
            <br></br> <span  className="forgot__error" style={{color: "red"}}>{errors?.localerrors?.password}</span>
            <input type="password" name="confirm_password" className="input" onChange={changeInput} value={input.confirm_password} placeholder=" Confirm Password"></input>
            <br></br><span  className="forgot__error" style={{color: "red"}}>{errors?.localerrors?.confirm_password}</span>
            <button className="forgot__button" onClick={changePassword}>Change Password</button>
            {message?<p className="forgot__message">{message}</p>:null}
            {message=="Password Changed SuccessFully 😃"?<a href="#" className="forgot__anchor" onClick={login}>Click this link to login</a>:null}
        </div>
        </>
    )
}

export default ForgotPassword