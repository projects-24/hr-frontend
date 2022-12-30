import Link from 'next/link';
import React from 'react'
import Nav from './../../components/Nav';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import endPoint from '../../components/endPoint';
import Alert from './../../Funcss/Components/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import dynamic from "next/dynamic"
const Excel = dynamic(()=>import("./../../components/Excel") ,{ssr:false})
import Departments from "../../data/departments"

export default function Planing() {
  const [user, setuser] = useState(null)
  const [token, settoken] = useState("")
  const [message, setmessage] = useState("")
  const [success, setsuccess] = useState("")
  const [docs, setdocs] = useState("")
  const [render, setrender] = useState("requests")
  const [open, setOpen] = useState(false)
  const [userDoc, setuserDoc] = useState("")
  const [filter, setfilter] = useState("")
  const [canUserApprove, setcanUserApprove] = useState(false)
  const [exportTrigger, setexportTrigger] = useState(false)
  const [department, setdepartment] = useState("")

  useEffect(() => {
  if(user && !canUserApprove){
    if(user.position === "Deputy Director" ||
      user.position === "Government Statistician (CEO)"
      || user.position === "Deputy Gov Statistician (DGS)" ||
      user.position === "Director" ||
      user.position === "Deputy Director" ||
      user.position === "Sectional Head"
      ){
      setcanUserApprove(true)
    }
  }
  })

  useEffect(()=>{
    setTimeout(()=>{
        setmessage(null)
    }, 4000)
},[message])
  useEffect(()=>{
    setTimeout(()=>{
        setsuccess(null)
    }, 4000)
},[success])
  const form = useRef(null)
  useEffect(() => {
    if(localStorage.getItem("token")  && !token ){
        settoken(
            JSON.parse(
                localStorage.getItem("token")
            )
        )
        setuser(
            JSON.parse(
                localStorage.getItem("user")
            )
        )
    }
})
const handlePlaning = (e)=>{
e.preventDefault()
const current = form.current
const id = user._id
const type_leave = current["leavetype"].value
const start_date = current["startdate"].value
const end_date = current["enddate"].value

const data = {
  staffDetails_id:id,
  type_leave:type_leave,
  start_date:start_date,
  end_date:end_date
}

if(start_date && end_date && type_leave){
Axios.post(endPoint + "/leaveplanner/register" , data , {
  headers:{
    authorization:`Bearer ${token}`
  }
}).then(()=>{
  const location = window.location.href
  Axios.post(endPoint + "/notification",{
    sender_id:user._id,
    message:`Request made by ${user.firstname} ${user.middleName} ${user.lastName} to plan leave, click on the link below to verify or disapprove request`,
    link:location,
    receiver:"leaveplaning",
    date:new Date()
  }, {
    headers:{
      authorization:`Bearer ${token}`
    }
  } 
  ).then(()=>{
    setsuccess("Request made successfully")
    document.querySelector("#startDate").value = ""
    document.querySelector("#endDate").value = ""
    document.querySelector("#leaveType").value = ""
    setdocs(null)
    setrender("requests")
  })
}).catch(err=>setmessage(err.message))
}else{
  setmessage("Make sure to enter all compulsory fields")
  clearTimeout()
}
}
useEffect(() => {
  if(!docs && user){
  Axios.get(endPoint  + "/leaveplanner/showall" , {
      headers:{
          authorization:`Bearer ${token}`
      }
  }).then(dataDocs=>{
     const getDocs = dataDocs.data.LeavePlanner
     setdocs(getDocs.filter(filt=>{
      if(user.position === "Government Statistician (CEO)"
        || user.position === "Deputy Gov Statistician (DGS)"
        || user.department === "Human resource"
        ){
         return getDocs
     }else if(user.position === "Director" || user.position === "Deputy Director" ){
         if(filt.staffDetails.department === user.department){
             return filt
         }
     }else if(user.position === "Sectional Head"){
             if(filt.staffDetails.section === user.section){
               return filt
             }
     }else if(user.position === "Unit Head"){
         if(filt.staffDetails.section === user.unit){
           return filt
         }
     }else if(user.position === "Officer"){
      if(filt.staffDetails._id === user._id){
        return filt
      }
     }
   }))
  }).catch(err=>{
    clearTimeout()
    console.log(err.message) 
  })
  }
  })

  const handleClose = ()=>{
    setOpen(false)
  }

  const Approved = ()=>{
    var locale = "en-us";
    var today = new Date();
    var day = today.getDate();
    var fullDay = ("0" + day).slice(-2);
    var longMonth = today.toLocaleString(locale, { month: "long" });
    var year = today.getFullYear();
    const fullDate = longMonth + " " + fullDay + ", " + year
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    Axios.patch(endPoint + "/leaveplanner/update/" +  userDoc._id , {approval:true, isPending:false} , {
      headers:{
        authorization:`Bearer ${token}`
      }
    }).then(()=>{
      const location = window.location.href
      Axios.post(endPoint + "/notification",{
        sender_id:user._id,
        message:`${userDoc.staffDetails.firstname} ${userDoc.staffDetails.middleName} ${userDoc.staffDetails.lastName}, your leave plan have been approved by ${user.firstname} ${user.middleName} ${user.lastName} (${user.position})`,
        link:location,
        receiver:userDoc.staffDetails._id,
        date:fullDate
      }, {
        headers:{
          authorization:`Bearer ${token}`
        }
      } 
      ).then(()=>{
        setsuccess("Approved successfully")
        setOpen(false)
        setdocs(null)
      })

    }).catch(err=>{
      setmessage(err.message)
      setOpen(false)
    })
  }
  const disApproved = ()=>{
    var locale = "en-us";
    var today = new Date();
    var day = today.getDate();
    var fullDay = ("0" + day).slice(-2);
    var longMonth = today.toLocaleString(locale, { month: "long" });
    var year = today.getFullYear();
    const fullDate = longMonth + " " + fullDay + ", " + year
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    Axios.patch(endPoint + "/leaveplanner/update/" +  userDoc._id , {approval:false , isPending:false} , {
      headers:{
        authorization:`Bearer ${token}`
      }
    }).then(()=>{
      const location = window.location.href
      Axios.post(endPoint + "/notification",{
        sender_id:user._id,
        message:`${userDoc.staffDetails.firstname} ${userDoc.staffDetails.middleName} ${userDoc.staffDetails.lastName}, your leave plan have been disapproved by ${user.firstname} ${user.middleName} ${user.lastName} (${user.position})`,
        link:location,
        receiver:userDoc.staffDetails._id,
        date:fullDate
      }, {
        headers:{
          authorization:`Bearer ${token}`
        }
      } 
      ).then(()=>{
        setsuccess("disapproved")
        setOpen(false)
        setdocs(null)
      })

    }).catch(err=>{
      setmessage(err.message)
      setOpen(false)
    })
  }

  const exportExcel = ()=>{
    new Promise((resolve, reject) => {
      setexportTrigger(true)
      resolve()
    }).then(()=>{
      setexportTrigger(false)
    })
    }

 if(user){
  return (
    <div className='content'>
      <Excel Trigger = {exportTrigger} />
      {
        render === "requests" ?
        <div className="exportBtnContainer">
      <button className='exportBtn' onClick={exportExcel}><i className="lni lni-add-files"></i> Export Excel</button>
      </div>
      :""
      }

{
  userDoc ?
  <Dialog open={open} onClose={handleClose}>
  <DialogContent>
    <div className="text-center section">
      <img src="/question.svg" className='width-200' alt="" />
    </div>
    <div className='section text-bold'>
      Do your want to approve leave plan for <span className="p-text"> {userDoc.staffDetails.firstname + " " + userDoc.staffDetails.middleName + " " +  userDoc.staffDetails.lastName}</span>
    </div>
  </DialogContent>
  <DialogActions>
    <Button color='error' onClick={disApproved}>Declined</Button>
    <button className='primaryBtn btn ' onClick={Approved}> Approve <i className="icon-paper-plane"></i></button>

  </DialogActions>
</Dialog>
:""
}
         {
            message ?
           <div className="message">
             <Alert type="danger"  message={message}/>
           </div>
            :""
         }
         {
            success ?
           <div className="message">
             <Alert type="success" message={success}/>
           </div>
            :""
         }
        <Nav/>
        <div className="row-flex fit white round-edge padding section">
            <img src="/leave.svg" className='width-100-max fit' alt="" />
            <div>
            <div className="h1">
                Leave Planing
        </div>
        <div className="section row-flex text-bold">
                    <Link href="/dashboard">Dashboard</Link>
                    /
                    <Link href="#">Leave planing</Link>

                </div>
            </div>
        </div>
        <div className='row-flex fit padding-top-30' style={{justifyContent:"flex-end"}}>
          <button className="btn p-text" onClick={()=>setrender("requests")}>Show all</button>
          <button className="btn primaryBtn" onClick={()=>setrender("plan")}>Plan Leave</button>
        </div>
        <div className="section padding row-flex">
       <div>
       <div className="minSection text-bold">Select status</div>
          <select name="" id="" className='input white' onChange={(e)=>setfilter(e.target.value)}>
            <option value="">All</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="disapproved">Disapproved</option>
          </select>
       </div>
       <div>
       <div className="minSection text-bold">Department</div>
        <select className='input white' placeholder="Department" select name="" id=""  onChange={(e)=>setdepartment(e.target.value)}>
        <option value="">All Departments</option>
        {
        Departments &&
        Departments.map(docs=>(
        <option value={docs.department} key={docs.department}> {docs.department} </option>
        ))
        }
        </select>
       </div>
        </div>
        <div className="section" >
          {
            render === "requests" ?
            <div className=' padding'>
            <div className="card tableContainer">
              <table className="table" id='records'>
                <thead>
                <th>Staff ID</th>
                  <th>Full Name</th>
                  <th>Department</th>
                  <th>Section</th>
                  <th>Leave</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>status</th>
              {
                canUserApprove ?
                <th>Approve/Declined</th>
                :""
              }
                </thead>
                <tbody>
                  {
                    docs ?
                    docs.filter(filt=>{
                    if(filter === "" ){
                      return docs
                    }
                    else if(filter === "pending" && filt.isPending ){
                      return filt
                    }
                    else if(filter === "approved" && filt.approval){
                      return filt
                    }
                    else if(filter === "disapproved" && !filt.approval){
                      return filt
                    }
                   }).filter(dFilt=>{
                   if(department === ""){
                    return docs
                   }else{
                    if(department === dFilt.staffDetails.department){
                      return dFilt
                    }
                   }
                   })
                   .map(doc=>(
                    
                    <tr key={doc._id}>
                      <td>{doc.staffDetails.staffId}</td>
                      <td>{doc.staffDetails.firstname + doc.staffDetails.middleName + doc.staffDetails.lastName}</td>
                      <td>{doc.staffDetails.department}</td>
                      <td>{doc.staffDetails.section}</td>
                      <td>{doc.type_leave}</td>
                      <td>{doc.start_date}</td>
                      <td>{doc.end_date}</td>
                      <td>{
                      doc.approval ? 
                      <span className="success text-white text-small round-edge" style={{padding:"5px"}}>
                        approved</span> 
                        : 
                        !doc.approval && !doc.isPending? <span className="danger text-white text-small round-edge" style={{padding:"5px"}}>
                        Disapproved
                        </span> :
                        doc.isPending ? 
                        <span className="info text-white text-small round-edge" style={{padding:"5px"}}>
                        Pending
                        </span>  : ""
                      }

                          
                        </td>
                    {
                      canUserApprove  && doc.isPending  ? 
                      <td>
                      <button className='btn p-text text-small' onClick={()=>{
                        setuserDoc(doc)
                        setOpen(true)
                      }}>
                        options
                      </button>
                    </td>
                    : <td  className='text-center'>-</td>
                    }
                    </tr>
                   ))
                   :""
                  }
                </tbody>
              </table>
            </div>
  </div>
  :       <div className=''>
   
  <form ref={form} className="">
  <div className="row">
      <div className="col sm-6 lg-6 md-6 padding">
      <div className="card fit">
      <div className="text-bold minSection">Proposed Start Date</div>
      <input type="date" id='startDate' className='input' name='startdate' />
  </div>
      </div>
      <div className="col sm-6 lg-6 md-6 padding">
      <div className="card fit">
      <div className="text-bold minSection">Proposed End Date</div>
      <input type="date" id='endDate' className='input' name='enddate' />
  </div>
      </div>
      <div className=" col sm-12 md-12 lg-12 padding">
    <div className="card">
      <div className="h4 padding">Personal details</div>
      <div className="row">
        <div className="col sm-12 md-6 lg-6 padding">
          <div className="minSection text-bold">Staff ID</div>
          <input type="text" name='staffId' disabled className='input' defaultValue={user.staffId} placeholder='Staff ID'/>
        </div>
        <div className="col sm-12 md-6 lg-6 padding">
          <div className="minSection text-bold">Full Name</div>
          <input type="text" name='fullname' disabled className='input' defaultValue={user.firstname + " " + user.middleName + " " + user.lastName} placeholder='Staff ID'/>
        </div>
      </div>
    </div>
      </div>
      <div className=" col sm-12 md-12 lg-12 padding">
    <div className="card">
      <div className="h4 padding">Department Details</div>
      <div className="row">
        <div className="col sm-12 md-6 lg-6 padding">
          <div className="minSection text-bold">Department</div>
          <input type="text" name='department' disabled className='input' defaultValue={user.department}/>
        </div>
        <div className="col sm-12 md-6 lg-6 padding">
          <div className="minSection text-bold">Section</div>
          <input type="text" name='section' disabled className='input' defaultValue={user.section} />
        </div>
      </div>
    </div>
      </div>
      <div className=" col sm-12 md-12 lg-12 padding">
    <div className="card">
      <div className="h4 padding">Type of Leave</div>
     <div className="padding">
      <select name="leavetype" id="leaveType" className="input">
      <option value="annual">Annual</option>
      <option value="maternity">Maternity</option>
      <option value="casual">Casual</option>
      <option value="study">Study</option>
      </select>
     </div>
    </div>
      </div>
</div>
  </form>

 {/* Submit btn */}
<button className="btn submitNewstaff" onClick={handlePlaning}>
Submit  <i className="icon-paper-plane"></i>
</button>
</div>

          }
   



        </div>
    </div>
  )
 }else{
  return <></>
 }
}
