import React,{useState} from "react";
import "./SignUp.css";
import "./ForgotPass.css";
import "./Login.css";
import {useTranslation} from "react-i18next";


const ChangePassWord=()=>{

    const [input,setInput]=useState({confirmpass:"",newpassword:"",mobemail:""});
    const {t,i18n}=useTranslation();

    const changeInput=(e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    const search=()=>{
        let email=false;
        let validemailmob=false;
        let mobile=false;
        let mobemail=input.mobemail;
        console.log(mobemail)
        console.log("inside store")
        if(mobemail.indexOf('@')!=-1){
            let index=mobemail.lastIndexOf('.');
            console.log(index-mobemail.indexOf('@'))
            if(index-mobemail.indexOf('@')>=3){
                if(mobemail.length-index>=2){
                    validemailmob=true;
                    email=true;
                    
                }
                else{
                    validemailmob=false;
                }
            }
            else{
                validemailmob=false
            }
        }
        else{
            mobile=true;
           for(let k=0;k<mobemail.length;k++)
           {
               if(!(mobemail.charAt(k)>='0' && mobemail.charAt(k)<='9')){
                validemailmob=false;
                break;
               }
           }
           if(mobemail.length!=10){
               validemailmob=false;
           }

        }
        if(input.confirmpass!==input.newpassword){
            validemailmob=false;
            alert("Password does not match")
        }
        if(validemailmob){
      
            fetch("https://manasa-facebook-clone.herokuapp.com/changepassword",{
                method:"PUT",
                body:JSON.stringify(input),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                alert(data.message)
            })
        }
        else{
            alert("Invalid Email Address or Mobile Number")
        }
    }
    const loginPage=(e)=>{
        e.preventDefault();
        let validemailmob=true;
        let email=false;
        let mobile=false;
        let mobemail=input.email;
        console.log(mobemail)
        console.log("inside store")
        if(mobemail.indexOf('@')!=-1){
            let index=mobemail.lastIndexOf('.');
            console.log(index-mobemail.indexOf('@'))
            if(index-mobemail.indexOf('@')>=3){
                if(mobemail.length-index>=2){
                    validemailmob=true;
                    email=true;
                    
                }
                else{
                    validemailmob=false;
                }
            }
            else{
                validemailmob=false
            }
        }
        else{
            mobile=true;
           for(let k=0;k<mobemail.length;k++)
           {
               if(!(mobemail.charAt(k)>='0' && mobemail.charAt(k)<='9')){
                validemailmob=false;
                break;
               }
           }
           if(mobemail.length!=10){
               validemailmob=false;
           }

        }
        console.log(validemailmob)
        if(validemailmob){
            fetch("https://manasa-facebook-clone.herokuapp.com/login1",{
                method:"POST",
                body:JSON.stringify(input),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                alert(data.message)
            })
        }
        
    

    }
    return (
        <>
        <div className="header">
            <h1 className="h1">
                <span>facebook</span></h1>
            <table cellSpacing="0" role="presentation" className="headerForm">
                <tbody>
                <tr>
                    <td className="label"><label for="email">{t("emailorphone")}</label></td>
                    <td className="label2"><label for="pass">{t("pass")}</label></td>
                </tr>
                <tr>
                    <td><input type="text" name="email" id="email" value={input.email}   onChange={changeInput}></input></td>
                    <td><input type="password" name="password" id="password" value={input.password} onChange={changeInput}></input></td>
                    <td></td>
                    <td><button className="login" onClick={loginPage}>{t("login")}</button></td>
                </tr>
                <tr>
                    <td></td>
                    <td ><a href="#" className="label3">{t("forgottenaccount")}</a></td>
                </tr>
            </tbody>
            </table>
        </div>
        <div className="forAccount">
        <h2 className="find">Change Password</h2>
        <p></p>
        <input type="text" className="input__EmailMob" name="mobemail" value={input.mobemail} onChange={changeInput} placeholder="Email or phone number"></input><p></p>
        <input type="password" className="input__EmailMob" name="newpassword" id="newpassword" placeholder={t("newpassword")} value={input.newpassword} onChange={changeInput}></input><p></p>
        <input type="password" className="input__EmailMob" name="confirmpass" id="confirm" placeholder="Confirm Password" value={input.confirmpass} onChange={changeInput}></input><p></p>
        <span className="find"></span>
        <button className="search__button3" onClick={search}>Change Password</button>&nbsp;
      
        </div>
        </>
    )

}

export default ChangePassWord