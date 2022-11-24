import React from 'react'
import Nav from './../../components/Nav';
import { useState } from 'react';

export default function Personal() {
    const [crime, setcrime] = useState(false)
    const [dismissed, setdismissed] = useState(false)
  return (
    <div className='content'>
        <Nav />
        <div className="row">
            <div className="col sm-12 md-8 lg-8 padding">
            <div className="h1 p-text">Personal Records Form</div>
            <div className='section'>Make sure to enter all details before submitting</div>
            </div>
            <div className="col sm-12 md-4 lg-4 padding">
                <img src="/profiling.svg"  className='fit' alt="" />
            </div>
        </div>
        <div className="padding-top-20">
            <div className="row">
            <div className="col sm-12 md-12 lg-12 padding">
                <div className="h4">Personal Details</div>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='surname' className='input' placeholder='Surname' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='lastname' className='input' placeholder='Lastname' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='post' className='input' placeholder='Post' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='department' className='input' placeholder='Surname' />
            </div>
            <div className="col sm-12 md-12 lg-12 padding">
            <textarea rows={5} name='address' className='input' placeholder='Address' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='nationality' className='input' placeholder='Nationality' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='tel' className='input' placeholder='Tel Number' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='surname' className='input' placeholder='Surname' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
                <div className="text-bold">Date of birth</div>
            <input type="date" name='dob' className='input' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="number" name='Salary' className='input' placeholder='Surname' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='appointment' className='input' placeholder='Present Appointment' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='spouse' className='input' placeholder='Name Of Spouse' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <select name="gender" id="" className="input">
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            </div>
            <div className="col sm-12 md-12 lg-12  padding-top-20">
                <div className="h4 padding">Passport Details</div>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='spouse' className='input' placeholder='Name' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='passportdate' className='input' placeholder='Date' />
            </div>
            <div className="col sm-12 md-12 lg-12  padding">
            <input type="text" name='place' className='input' placeholder='Place Of Issue' />
            </div>
            <div className="col sm-12 md-12 lg-12 padding-top-20">
                <div className="h4 padding">Other Details</div>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
                <div className="text-bold">Convicted Of A Crime</div>
            <select name="crime" id="" className="input" onChange={(e)=>{
                if(e.target.value === "yes"){
                    setcrime(true)
                }else if (e.target.value === "no"){
                    setcrime(false)
                }
            }}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
            {
                crime ?
                <div className="section">
            <input type="text" name='crimereason' className='input' placeholder='Enter details' />
            </div>
            :""
            }
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
                <div className="text-bold">Ever dismissed from a public service</div>
            <select name="service" id="" className="input" onChange={(e)=>{
                if(e.target.value === "yes"){
                    setdismissed(true)
                }else if (e.target.value === "no"){
                    setdismissed(false)
                }
            }}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
            {
                dismissed ?
                <div className="section">
            <input type="text" name='servicereason' className='input' placeholder='Enter details' />
            </div>
            :""
            }
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
             <button className="btn primaryBtn full-width" onClick={()=>window.location.assign("/form/parents")}>Next Step</button>
            </div>
            </div>
        </div>
    </div>
  )
}
