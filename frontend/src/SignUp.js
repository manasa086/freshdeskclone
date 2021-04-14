import React,{useState} from 'react';
import {useHistory} from "react-router-dom";
import "./SignUp.css"

function SignUp() {

    const [input,setInput]=useState({firstname:"",lastname:"",email:"",password:""});
    const [errors,setErrors]=useState();
    const [message,setMessage]=useState("");
    const history=useHistory();

    const login=()=>{
        history.push("/login");
    }
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
        if(input.firstname=="")
        {
           localerrors["firstname"]="First Name Cannot be Empty"
            handle=false;
        }
        if(input.lastname=="")
        {
            localerrors["lastname"]="Last Name Cannot be Empty";
            handle=false;
        }
        if(input.password=="")
        {
            localerrors["password"]="Password Cannot be Empty"
            handle=false;
        }
        setErrors({localerrors})
        return handle;
    }
    const register=()=>
    {
        setMessage("");
        if(handleValidation())
        {
        
            fetch("https://freshdeskclone.herokuapp.com/signup",{
                method:"POST",
                body:JSON.stringify(input),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
               
                if(data.message==="Email Sent to Your Email Account. Please Verify")
                {
                    setMessage("Email Sent to Your Email Account. Please Verify 😃")
                } 
                else{
                    setMessage("Email Already Exists.Kindly Provide another Email 😐") 
                }
            })
        }
        else{
                // console.log(errors)
                setMessage("Values cannot be Empty. All fields are mandatory")
        }
    }

    return (
        <div className="signup__page">
             <h1 className="head">FreshDesk Clone Signup Page</h1>
           <div className="signup__border">
           <input type="text" className="input" name="firstname"  onChange={changeInput} value={input.firstname} placeholder=" First Name"></input>
           <span  className="signup__error" style={{color: "red"}}>{errors?.localerrors?.firstname}</span>
            <input type="text" className="input" name="lastname"  onChange={changeInput} value={input.lastname} placeholder=" Last Name"></input>
            <br></br><span  className="signup__error" style={{color: "red"}}>{errors?.localerrors?.lastname}</span>
            <input type="email" className="input" name="email"  onChange={changeInput} value={input.email} placeholder=" Email Address"></input>
            <br></br><span  className="signup__error" style={{color: "red"}}>{errors?.localerrors?.email}</span>
            <input type="password" className="input" name="password"  onChange={changeInput} value={input.password} placeholder=" Password"></input>
            <br></br><span  className="signup__error" style={{color: "red"}}>{errors?.localerrors?.password}</span>
            <button className="signup__button" onClick={register}>Signup</button>
            <div className="signup__signup_div"><span className="signup__span">Have an Account?</span><a href="#" className="signup__login" onClick={login}>Login?</a></div>
            <p className="signup__message">{message}</p>
           </div>
        </div>
    )
}

export default SignUp