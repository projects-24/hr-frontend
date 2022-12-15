import React from 'react'
import Nav from '../../components/Nav'
import {useState} from 'react';
import { TextField , MenuItem} from '@mui/material';

export default function Maternity() {
    const [message, setmessage] = useState("")
    const Submit  =  ()=>{
        if(message){

        }else{
            alert("Make sure to enter message before you can submit")
        }
    }
  return (
    <div>
        <Nav />
        <div className="content">
            <div className="padding">
            <div className="h1">Maternity Leave</div>
            <div className="section text-bold">Make sure to enter all details correctly before submitting the form</div>
            </div>
            <div className="m-section">
            <form>
                <div className="row">
               
                    <div className="col sm-12 md-12 lg-12 padding">
                        <div className='text-bold'>Date of delivery</div>
                        <TextField variant='outlined' type="date" fullWidth/>
                    </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                        <TextField variant='outlined' select label="Type of birth" fullWidth>
                            <MenuItem value="Natural Birth">Natural Birth</MenuItem>
                            <MenuItem value="Censerian">Censerian</MenuItem>
                        </TextField>
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
                        <TextField variant='outlined' type="text" label="Memo" multiline rows={3} fullWidth/>
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
