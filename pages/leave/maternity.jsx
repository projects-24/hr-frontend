import React from 'react'
import Nav from '../../components/Nav'
import {useState ,useRef , useEffect} from 'react';
import { TextField , MenuItem} from '@mui/material';
import Axios from "axios"
import endPoint from '../../components/endPoint';
import Alert from '../../Funcss/Components/Alert';
export default function Maternity() {
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
    const Submit  =  (e)=>{
        e.preventDefault()
       const current = form.current
       const date_of_delivery = current["dateofdelivery"].value
       const type_of_birth = current["typeofbirth"].value
       const officer_taking_over = current["officertakingover"].value
       const start_date = current["startdate"].value
       const end_date = current["enddate"].value
       const memo = current["memo"].value

       if(date_of_delivery && type_of_birth && officer_taking_over && start_date && end_date && memo){
        Axios.post(endPoint + "" , {

        }, 
        {
            headers:{authorization:`Bearer ${token}`}
        }
        )
       }else{
        setmessage("Make sure to enter all credentials")
       }
    }

    
  return (
    <div>
        <Nav />
        <div className="message">
         {
            message ?
            <Alert type="info" message={message}/>
            :""
         }
         </div>
        <div className="content">
            <div className="padding">
            <div className="h1">Maternity Leave</div>
            <div className="section text-bold">Make sure to enter all details correctly before submitting the form</div>
            </div>
            <div className="m-section">
            <form ref={form}>
                <div className="row">
               
                    <div className="col sm-12 md-12 lg-12 padding">
                        <div className='text-bold'>Date of delivery</div>
                        <TextField variant='outlined' type="date" name="dateofdelivery" fullWidth/>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField variant='outlined' name="typeofbirth" select label="Type of birth" fullWidth>
                            <MenuItem value="Natural Birth">Natural Birth</MenuItem>
                            <MenuItem value="Censerian">Censerian</MenuItem>
                        </TextField>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField variant='outlined' name="officertakingover" type="text" label="Officer taking over" fullWidth/>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <div className='text-bold'>Start Date</div>
                        <TextField variant='outlined' name="startdate" type="date" fullWidth/>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <div className='text-bold'>End Date</div>
                        <TextField variant='outlined' name="enddate" type="date" fullWidth/>
                    </div>
                    <div className="col sm-12 md-12 lg-12 padding">
                        <TextField variant='outlined' name="memo" type="text" label="Memo" multiline rows={3} fullWidth/>
                    </div>
                    <div className="col sm-12 md-12 lg-12 padding">
                    <button onClick={Submit} className="btn primaryBtn">Submit Request <i className="icon-paper-plane"></i></button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}
