import React,{useState} from 'react'
import "./Login.css";
import {useHistory} from "react-router-dom";

function Login() {

    const [input,setInput]=useState({email:"",password:""});
    const [message,setMessage]=useState("");
    const history=useHistory();
    const [errors,setErrors]=useState();

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
           localerrors["password"]="Password Cannot be Empty"
            handle=false;
        }
        setErrors({localerrors})
        return handle;
    }
    const handleForgotPasswordValidation=()=>{
        let handle=true;
        let localerrors={};
        if(input.email=="")
        {
            localerrors["email"]="Email Cannot be Empty"
            handle=false;
        }
        setErrors({localerrors})
        return handle;
    }
    const forgotPassword=()=>{
        if(handleForgotPasswordValidation())
        {
            let data={email:input.email}
            fetch("https://freshdeskclone.herokuapp.com/forgotPasswordUser",{
                method:"POST",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                if(data.message==="Email sent to Your Account. Kindly, Verify"){
                    setMessage("Email sent to Your Account. Kindly, Verify 😇")   
                }
            })
            .catch((error)=>{
                setMessage("Error while processing the Request. Kindly try again 😞")   
            })
        }
        else{
            setMessage("Email cannot be Empty. Email is mandatory")
        }
        

    }
    const login=()=>{
        setMessage("");
        if(handleValidation())
        {
            fetch("https://freshdeskclone.herokuapp.com/login",{
                method:"POST",
                body:JSON.stringify(input),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                if(data.message=="Success"){
                    sessionStorage.setItem("email",input.email.toString());
                    sessionStorage.setItem("token",data.token);
                    sessionStorage.setItem("role",data.role)
                    history.push("/servicerequesthome")
                    
                }
                else{
                    setMessage(data.message);
                }
            })
            .catch((error)=>{
                setMessage("Error while processing the Request. Kindly try again 😞")   
            })
        }
        else{
            setMessage("Values cannot be Empty. All fields are mandatory")
        }
    }
    const signUp=()=>{
        history.push("/signup")
    }
    return (
        <div className="login__page">
            <h1 className="head">Welcome to FreshDesk Clone</h1>
            <h2 className="head">FreshDesk Clone Login Page</h2>
           <div className="login__border">
            <input type="text" className="input" name="email"  onChange={changeInput} value={input.email} placeholder=" Email Address"></input>
            <br></br><span  className="login__error" style={{color: "red"}}>{errors?.localerrors?.email}</span>
            <input type="password" className="input" name="password"  onChange={changeInput} value={input.password} placeholder=" Password"></input>
            <br></br><span  className="login__error" style={{color: "red"}}>{errors?.localerrors?.password}</span>
            <button className="login__button" onClick={login}>Login</button>
            <div className="login__anchor__div"><a href="#" className="login__anchor" onClick={forgotPassword}>Forgot Password?</a></div><p></p>
            <div className="login__signup_div"><span className="login__span">No Account?</span><a href="#" className="login__signup" onClick={signUp}>SignUp?</a></div>
            <p className="login__message">{message}</p>
           </div>
           
        </div>
    )
}

export default Login