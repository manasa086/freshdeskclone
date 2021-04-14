import React,{useState} from 'react';
import {useHistory} from "react-router-dom"; 
import "./Leads.css";
function Service() {
    const [input,setInput]=useState({requestname:"",requestdescription:"",requestername:"",requesteremail:"",requestermobile:""})
    const [errors,setErrors]=useState();
    const [message,setMessage]=useState("");
    const history=useHistory();

    const changeInput=(e)=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }
    const navigateBack=()=>{
        history.push("/servicerequesthome")
    }
    const handleValidation=()=>{

        let handle=true;
        let localerrors={};
        if(input.requestname=="")
        {
            localerrors["requestname"]="Request Name Cannot be Empty"
            handle=false;
        }
        if(input.requestdescription=="")
        {
           localerrors["requestdescription"]="Request Description Cannot be Empty"
            handle=false;
        }
        if(input.requestername=="")
        {
            localerrors["requestername"]="Requester Name  Cannot be Empty";
            handle=false;
        }
        if(input.requesteremail=="")
        {
            localerrors["requesteremail"]="Requester Email  Cannot be Empty";
            handle=false;
        }
        if(input.requestermobile=="")
        {
            localerrors["requestermobile"]="Requester Mobile Number   Cannot be Empty";
            handle=false;
        }
        setErrors({localerrors})
        return handle;
    }

    const saveServiceRequest=()=>{
        setMessage("");
        if(handleValidation()){
            input.email=sessionStorage.getItem("email");
            input.token=sessionStorage.getItem("token");
            fetch("https://freshdeskclone.herokuapp.com/saveServiceRequestDetails",{
                method:"POST",
                body:JSON.stringify(input),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                setMessage(data.message);
                setInput({requestname:"",requestdescription:"",requestername:"",requesteremail:"",requestermobile:""})
            })
        }
        else{
            setMessage("Values cannot be Empty. All fields are mandatory")
        }
    }

    return (
        <div className="lead__page">
            <h2 className="heading">Ticket Creation Form</h2>
            <div className="lead__border1">

                <label className="lead__label">Request Name:</label>
                <input type="text" className="input" name="requestname" value={input.requestname} onChange={changeInput} placeholder="Request Name"></input>
                <br></br> <span  className="lead__error" style={{color: "red"}}>{errors?.localerrors?.requestname}</span><br></br>
                <label className="lead__label">Request Description:</label>
                <textarea className="textarea" name="requestdescription" value={input.requestdescription} onChange={changeInput} placeholder="Request Description"></textarea>
                <br></br> <span  className="lead__error" style={{color: "red"}}>{errors?.localerrors?.requestdescription}</span><br></br>
                <label className="lead__label">Requester Name:</label>
                <input type="text" className="input" name="requestername" value={input.requestername} onChange={changeInput} placeholder="Requester Name"></input>
                <br></br> <span  className="lead__error" style={{color: "red"}}>{errors?.localerrors?.requestername}</span><br></br>
                <label className="lead__label">Requester Email:</label>
                <input type="email" className="input" name="requesteremail" value={input.requesteremail} onChange={changeInput} placeholder="Requester Email"></input>
                <br></br> <span  className="lead__error" style={{color: "red"}}>{errors?.localerrors?.requesteremail}</span><br></br>
                <label className="lead__label">Requester Mobile Number:</label>
                <input type="text" className="input" name="requestermobile" value={input.requestermobile} onChange={changeInput} placeholder="Requester Mobile Number"></input>
                <br></br> <span  className="lead__error" style={{color: "red"}}>{errors?.localerrors?.requestermobile}</span><br></br>
                <button className="lead__button" onClick={saveServiceRequest}>Save Ticket</button>
                <p className="lead__message">{message}</p>
                {message?<a href="#" className="lead__anchor" onClick={navigateBack}>Click this link to navigate back</a>:null}
            </div>
        </div>
    )
}

export default Service