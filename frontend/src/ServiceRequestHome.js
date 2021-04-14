import React,{useEffect,useState} from 'react';
import "./ServiceRequest.css";
import {useHistory} from "react-router-dom"


function ServiceRequestHome() {
    const [serviceRequest,setserviceRequest]=useState([]);
    const [message,setMessage]=useState("");
    const [status,setStatus]=useState("");
    const [filterValue,setFilterValue]=useState("All");
    const [serviceRequestMessage,setserviceRequestMessage]=useState("");
    const history=useHistory();
    const [noData,setNoData]=useState("");
    
    useEffect(()=>{
        let data={
            email:sessionStorage.getItem("email"),
            token:sessionStorage.getItem("token")
        }
        console.log(data)
        fetch("https://freshdeskclone.herokuapp.com/getServiceRequestData",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setserviceRequest(data.message);
            console.log(data.message)
            if(data.message.length==0)
            {
                setNoData("No Service Requests Created")
            }
        })
    },[])
    
    const changeStatus=(e)=>{
        setStatus(e.target.value);
    }
    const logout=()=>{
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("token");
        history.push("/");
    }
    const changeStatusSubmit=(user)=>{
       
        setMessage("")
        if(status=="--default--"){
            setMessage("Select Status to Update 😐")  
        }
        else{
            user.status=status.toString();
            user.email=sessionStorage.getItem("email");
            user.token=sessionStorage.getItem("token");
            console.log(user)
            fetch("https://freshdeskclone.herokuapp.com/updateServiceRequestData",{
                method:"PUT",
                body:JSON.stringify(user),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                setMessage(data.message);
            })
        }
    }
    const filter=()=>{
        // setserviceRequestMessage("");
        setMessage("");
        let data={
            email:sessionStorage.getItem("email"),
            token:sessionStorage.getItem("token")
        }
        fetch("https://freshdeskclone.herokuapp.com/getServiceRequestData",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            // console.log(data)
            if(filterValue!="All")
            {
                let data1=data.message.filter((each)=>each.status==filterValue)
                if(data1.length>0)
                    setserviceRequest(data1);
                else
                {
                    setserviceRequest(data1);
                    setserviceRequestMessage("NoData");
                }
            }
            else{
                setserviceRequest(data.message)
            }
        })
    }
    
    const navigateToCreation=()=>{
        history.push("/service")
    }
    
    const navigateToServiceRequest=()=>{
        history.push("/servicerequesthome")
    }
    const changeClassName=()=>{
        let x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
    const setFilter=(e)=>{
        setFilterValue(e.target.value);
    }
    if(serviceRequest.length>0)
    {
        return (
            <div className="admin__page">
                <div className="topnav" id="myTopnav">
               
                <span className="admin__span" id="content1">FreshDesk Clone</span>
      
        <a className="cursor" onClick={navigateToServiceRequest}>Tickets</a>
        <a className="cursor button1" onClick={logout}>Logout</a>
        <a href="javascript:void(0);" className="icon" onClick={changeClassName}>
        <i class="fa fa-bars"></i>
        </a>
        </div>
        <button className="lead__heading2" onClick={navigateToCreation}>➕ Create Ticket</button>
        <h4 className="lead__heading"><span className="lead__head">Filter Ticket By:</span>&nbsp;&nbsp;<select className="lead__filter" onChange={setFilter}>
            <option value="All">All</option>
            <option value="Created">Created</option>
            <option value="Open">Open</option>
            <option value="InProcess">InProcess</option>
            <option value="Released">Released</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option></select>&nbsp;&nbsp;
            <button className="lead__filter_button" onClick={filter}>Filter</button></h4>
            <h4 className="lead__heading1">Filtered Tickets Information</h4>
        <table className="admin__table3">
                <thead>
                    <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Request Name</th>
                    <th scope="col" >Request Description</th>
                    <th scope="col" >Requester Name</th>
                    <th scope="col" >Requester Email</th>
                    <th scope="col">Status</th>
                    <th scope="col">Mobile</th>
                   <th scope="col">Select Status to Change</th>
                   <th scope="col">Change Status</th>
                    </tr>
                    </thead>
                    {serviceRequest.map((user,index)=>{
                        let email_index=user.requesteremail.indexOf("@");
                        return(<tbody key={index}>
                            <tr>
                            <td data-label="S.No" scope="row">{index+1}</td>
                            <td data-label="Request Name">{user.requestname}</td>
                            <td data-label="Request Description">{user.requestdescription}</td>
                            <td data-label="Requester Name">{user.requestername}</td>
                            <td data-label="Requester Email"><span className="admin__gmail">{user.requesteremail.substring(0,email_index)}<br></br>{user.requesteremail.substring(email_index,user.requesteremail.length)}</span></td>
                            <td data-label="Status">{user.status}</td>
                            <td data-label="Requester Mobile">{user.requestermobile}</td>
                            <td data-label="Select Status to Change"><select className="admin__changeStatus" onChange={changeStatus} >
                                <option value="--default--">--select--</option>
                                <option value="Created">Created</option>
                                <option value="Open">Open</option>
                                <option value="InProcess">InProcess</option>
                                <option value="Released">Released</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Completed">Completed</option></select></td>
                            
                            <td data-label="Change Status"><button  className="admin__button"  onClick={()=>changeStatusSubmit(user)}>Change Status</button></td>
                            </tr>
                            </tbody>)
                        })
                }
                
        </table>
        {message?<p className="admin__message">{message}</p>:null}
        
        </div>
        
        )
    }
    else if(serviceRequestMessage=="NoData")
    {
        return (
            <div className="admin__page">
                <div className="topnav" id="myTopnav">
              
                <span className="admin__span" id="content1">FreshDesk Clone</span>
        <a className="cursor" >Tickets</a>
        <a className="cursor button1" onClick={logout}>Logout</a>
        <a href="javascript:void(0);" className="icon" onClick={changeClassName}>
        <i class="fa fa-bars"></i>
        </a>
        </div>
        <button className="lead__heading2" onClick={navigateToCreation}>➕ Create Ticket</button>
        <h4 className="lead__heading"><span className="lead__head">Filter Tickets By:</span>&nbsp;&nbsp;<select className="lead__filter" onChange={setFilter}>
            <option value="All">All</option>
            <option value="Created">Created</option>
            <option value="Open">Open</option>
            <option value="InProcess">InProcess</option>
            <option value="Released">Released</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option></select>&nbsp;&nbsp;
            <button className="lead__filter_button" onClick={filter}>Filter</button></h4>
        <h4 className="lead__heading">No Data Available</h4>
        </div>
        
        )
    }
    else if(noData=="No Service Requests Created")
    {
        return (
            <div className="admin__page">
                <div className="topnav" id="myTopnav">
              
                <span className="admin__span" id="content1">FreshDesk Clone</span>
        <a className="cursor" onClick={navigateToServiceRequest}>Tickets</a>
        <a className="cursor button1" onClick={logout}>Logout</a>
        <a href="javascript:void(0);" className="icon" onClick={changeClassName}>
        <i class="fa fa-bars"></i>
        </a>
        </div>
        <button className="lead__heading2" onClick={navigateToCreation}>➕ Create Ticket</button>
        <h4 className="lead__heading">No Tickets Created</h4>
        </div>
        )
    }
    else{
        return (<h1 className="blink">FreshDesk Clone Application</h1>)
    }
}

export default ServiceRequestHome