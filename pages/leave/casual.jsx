import React from 'react'
import Nav from '../../components/Nav'
import {useState} from 'react';
import { TextField , MenuItem} from '@mui/material';

export default function Casual() {
    const [message, setmessage] = useState("")
    const [daysRequired , setdaysRequired]  = useState(0)
    const Submit  =  ()=>{
    }
  return (
    <div>
        <Nav />
        <div className="content">
            <div className="padding">
            <div className="h1">Casual Leave</div>
            <div className="section text-bold">Make sure to enter all details correctly before submitting the form</div>
            </div>
            <div className="m-section">
            <form>
                <div className="row">
               
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField 
                        variant='outlined' 
                        type="number" 
                        label="Number of days required (Max of 10 days)" 
                        fullWidth
                        />
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField variant='outlined' type="text" label="Officer taking over" fullWidth/>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <div className='text-bold'>Start Date</div>
                        <TextField variant='outlined' type="date" fullWidth/>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <div className='text-bold'>End Date</div>
                        <TextField variant='outlined' type="date" fullWidth/>
                    </div>
                    <div className="col sm-12 md-12 lg-12 padding">
                        <div className='text-bold'>Resumption Date</div>
                        <TextField variant='outlined' type="date" fullWidth/>
                    </div>
                    <div className="col sm-12 md-12 lg-12 padding">
                        <TextField variant='outlined' type="text" label="Reason" multiline rows={3} fullWidth/>
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
