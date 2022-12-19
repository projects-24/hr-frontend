import React from 'react'
import Nav from '../../components/Nav'
import TextField from '@mui/material/TextField';
import Loader from '../../components/loader';
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import endPoint from '../../components/endPoint';
import Alert from './../../Funcss/Components/Alert';
import Axios from 'axios';

export default function Annual() {
    const [loading, setloading] = useState(false)
    const [days, setdays] = useState(0)
    const [reffered, setreffered] = useState(0)
    const [token, settoken] = useState("")
    const [user, setuser] = useState("")  
    const form = useRef(null)
    const [message, setmessage] = useState("")
    useEffect(()=>{
        setTimeout(()=>{
            setmessage(null)
        }, 4000)
    },[message])
    useEffect(() => {
        const remaining = document.querySelector("#remaining")
        remaining.value = parseInt(days) + parseInt(reffered)
    },[reffered , days])
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
    const Submit  = (e)=>{
        e.preventDefault()
        const current = form.current
        const number_of_days = current["days"].value
        const leave_address = current["leaveaddress"].value
        const home_address = current["homeaddress"].value
        const date_of_leave = current["dateofleave"].value
        const days_reffered_on_leave = current["daysrefferedonleave"].value
        const days_remaining = current["daysremaining"].value
        const days_requested = current["daysrequested"].value
        const officer_taking_over = current["officertakingover"].value
        const resumption_date = current["resumedate"].value

        const Doc = {
            number_of_days:number_of_days,
        homeAddress:home_address,
        leaveAddress:leave_address,
        deferredDays:days_reffered_on_leave,
        numberRequested:days_requested,
        date_of_leave: date_of_leave,
        number_of_days_on_leave:days_remaining,
        officerTakingover:officer_taking_over,
        resumptionDate: resumption_date,
        staffDetails:user._id
    }


    if(number_of_days && leave_address && home_address && date_of_leave && days_reffered_on_leave && days_remaining && days_requested && officer_taking_over && resumption_date){
        setloading(true)
        Axios.post(endPoint + "/annualleave/register" , Doc , {
            headers:{ authorization:`Bearer ${token}`}
        }).then(()=>{
            setloading(false)
            setmessage("Leave requested successfully")
           setTimeout(() => {
            window.location.reload()
           }, 3000);
        }).catch(err=>{
            setmessage(err.message)
            setloading(false)
        })
    }else{
        setloading(false)
        setmessage("Make sure to enter all details")
    }
    }
  return (
    <div>
        { loading ?
            <Loader />
            :""
        }
        <Nav />
        <div className="content">
         <div className="message">
         {
            message ?
            <Alert type="info" message={message}/>
            :""
         }
         </div>
            <div className="h1">Annual Leave</div>
            <div className="section text-bold">Make sure to enter all details correctly</div>
            <div className="m-section">
           <form ref={form}>
           <div className="row">
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField fullWidth type="text" name='days' onChange={(e)=>setdays(e.target.value)} variant="outlined" label='Number Of Days' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField fullWidth type="text" name='leaveaddress' variant="outlined" label='Leave Address' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField fullWidth type="text" name='homeaddress' variant="outlined" label='Home Address' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <div className="text-bold">Date Of Leave</div>
                        <TextField autoFocus fullWidth type="date" name='dateofleave' variant="standard" />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField fullWidth type="text" name='daysrefferedonleave' onChange={(e)=>setreffered(e.target.value)} variant="outlined" label='Days Reffered On Last Year' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <div className="text-bold">Number Of days Remaining</div>
                        <TextField fullWidth type="text" disabled autoFocus id='remaining' name='daysremaining' variant="standard"  />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField fullWidth type="text" name='daysrequested' variant="outlined" label='Number Of days Requested' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                    <TextField fullWidth type="text" name='officertakingover' variant="outlined" label='Officer Taking Over' />
                    </div>
                    <div className="col sm-12 md-12 lg-12 padding">
                        <div className="text-bold">Resumption date</div>
                        <TextField fullWidth type="date" name='resumedate' />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <button className='primaryBtn btn full-width' onClick={Submit}> Submit Request <i className="icon-paper-plane"></i></button>
                    </div>
                </div>
           </form>
            </div>
        </div>
    </div>
  )
}
