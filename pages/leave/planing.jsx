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
import dynamic from "next/dynamic"
const Excel = dynamic(()=>import("./../../components/Excel") ,{ssr:false})
import Departments from "../../data/departments"
import Header from '../../components/Header';
import Button from 'funuicss/ui/button/Button';
import Text from 'funuicss/ui/text/Text';
import { GetToken } from '../../components/Functions';
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
  const [startDate, setstartDate] = useState("")
  const [endDate, setendDate] = useState("")
const [isAdmin, setisAdmin] = useState(false)
useEffect(() => {
  if(!token){
     GetToken()
     .then(res => {
      setuser(res.user)
      settoken(res.token)
     })
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
        clearTimeout()
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
    clearTimeout()
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


  const handleClose = ()=>{
    setOpen(false)
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
        <Nav active={4}/>
       <div className="padding">
       <Header sub_dir={"Leave Requests" } sub_dir_route={"/leave/requests"} title={"Leave Planing"} sub_title={"Plan and manage your leave."}/>
       </div>
        {
          !user.auth_level ?
        <div className='row-flex fit padding-top-30' style={{justifyContent:"flex-end"}}>
          <Button raised bg="primary " onClick={()=>setrender("plan")}>Plan Leave</Button>
          <Button raised bg="dark200 " onClick={()=>setrender("requests")}>Show all</Button>

        </div>
                  :""
                }
        <div className="section padding row-flex">
       <div>
     
       </div>
       {/* <div>
       <div className="minSection">Department</div>
        <select className='input full-width borderedInput white' placeholder="Department" select name="" id=""  onChange={(e)=>setdepartment(e.target.value)}>
        <option value="">All Departments</option>
        {
        Departments &&
        Departments.map(docs=>(
        <option value={docs.department} key={docs.department}> {docs.department} </option>
        ))
        }
        </select>
       </div> */}

        </div>
        
        <div className="section" >
          {
            render === "requests" ?
            <div className=' padding'>
     
            <div className="_card tableContainer">
              <table className="table" id='records'>
                <thead>
                <th>Staff ID</th>
                  <th>Full Name</th>
                  <th>Department</th>
                  <th>Section</th>
                  <th>Leave</th>
                  <th>Start Date</th>
                  <th>End Date</th>
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
                   }).filter(filtD=>{
                    if(startDate && endDate){
                      if(
                        parseInt(filtD.start_date.slice(filtD.start_date.length - 3, filtD.start_date.length)) 
                       >=
                       parseInt(startDate.slice(startDate.length - 3, startDate.length)) 
                       ){
                        return filtD
                       }
                    }else{
                      return filtD
                    }
                   })
                   .map(doc=>(
                    
                    <tr key={doc._id}>
                      <td>{doc.staffDetails.staffId}</td>
                      <td>{doc.staffDetails.firstname + doc.staffDetails.middleName + doc.staffDetails.lastName}</td>
                      <td>{doc.staffDetails.department}</td>
                      <td>{doc.staffDetails.section}</td>
                      <td>{doc.type_leave}</td>
                      <td>{doc.start_date.toString().split("-").reverse().join("-")}</td>
                      <td>{doc.end_date.toString().split("-").reverse().join("-")}</td>
                     
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
      <div className="_card fit">
      <Text size='small' bold color='primary'>Proposed Start Date</Text>
      <input type="date" id='startDate' className='input full-width borderedInput' name='startdate' />
  </div>
      </div>
      <div className="col sm-6 lg-6 md-6 padding">
      <div className="_card fit">
      <Text size='small' bold color='primary'>Proposed End Date</Text>
      <input type="date" id='endDate' className='input full-width borderedInput' name='enddate' />
  </div>
      </div>


      <div className=" col sm-12 md-12 lg-12 padding">
    <div className="_card">
      <Text size='small' bold color='primary'>type of leave</Text>
     <div className="padding">
      <select name="leavetype" id="leaveType" className="input borderedInput full-width">
      <option value="annual">Annual</option>
      <option value="sick">Sick</option>
      {/* <option value="casual">Casual</option> */}
      <option value="study">Study</option>
      </select>
     </div>
    </div>
      </div>
</div>
  </form>

<div className="padding text-right">
   {/* Submit btn */}
<Button bg='gradient' raised onClick={handlePlaning}>
Submit  <i className="icon-paper-plane"></i>
</Button>
</div>
</div>

          }
   



        </div>
    </div>
  )
 }else{
  return <Nav />
 }
}
