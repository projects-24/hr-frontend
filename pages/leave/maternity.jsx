import React from 'react'
import Nav from '../../components/Nav'
import {useState} from 'react';

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
            <div className="h1">Maternity Leave</div>
            <div className="section text-bold">Make sure to enter your message</div>
            <div className="m-section">
             <textarea onChange={(e)=>setmessage.target.value} name="" id="" cols="30" className='input' placeholder='Enter your message here' rows="10"></textarea>
            <div className="section">
                <button onClick={Submit} className="btn primaryBtn">Submit Request <i className="icon-paper-plane"></i></button>
            </div>
            </div>
        </div>
    </div>
  )
}
