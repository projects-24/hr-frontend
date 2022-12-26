import Link from 'next/link';
import React from 'react'
import Nav from './../../components/Nav';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
export default function Planing() {
  const [user, setuser] = useState(null)
  useEffect(() => {
    if(!user){
        if(localStorage.getItem("user")){
            setuser(
                JSON.parse(
                    localStorage.getItem("user")
                )
            )
        }
    }
})
 if(user){
  return (
    <div>
        <Nav noSideBar/>
        <div className="row padding-top-80" style={{alignItems:"flex-start"}}>
        <div className='col sm-12 md-6 lg-6 padding'>
          <div className="card">
            <table className="table">
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
                <tr>
                  <td>00393</td>
                  <td>Iddris abdul wahab</td>
                  <td>IT</td>
                  <td>No department</td>
                  <td>Annual</td>
                  <td>01/01/2023</td>
                  <td>01/01/2024</td>
                </tr>
                <tr>
                  <td>00393</td>
                  <td>Iddris abdul wahab</td>
                  <td>IT</td>
                  <td>No department</td>
                  <td>Annual</td>
                  <td>01/01/2023</td>
                  <td>01/01/2024</td>
                </tr>
                <tr>
                  <td>00393</td>
                  <td>Iddris abdul wahab</td>
                  <td>IT</td>
                  <td>No department</td>
                  <td>Annual</td>
                  <td>01/01/2023</td>
                  <td>01/01/2024</td>
                </tr>
                <tr>
                  <td>00393</td>
                  <td>Iddris abdul wahab</td>
                  <td>IT</td>
                  <td>No department</td>
                  <td>Annual</td>
                  <td>01/01/2023</td>
                  <td>01/01/2024</td>
                </tr>
                <tr>
                  <td>00393</td>
                  <td>Iddris abdul wahab</td>
                  <td>IT</td>
                  <td>No department</td>
                  <td>Annual</td>
                  <td>01/01/2023</td>
                  <td>01/01/2024</td>
                </tr>
              </tbody>
            </table>
          </div>
</div>

          <div className='col sm-12 md-6 lg-6 padding'>
          <div className="row-flex">
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
                <div className="m-section">
                <div className="row">
                    <div className="col sm-6 lg-6 md-6 padding">
                    <div className="card fit">
                    <div className="text-bold minSection">Proposed Start Date</div>
                    <input type="date" className='input' />
                </div>
                    </div>
                    <div className="col sm-6 lg-6 md-6 padding">
                    <div className="card fit">
                    <div className="text-bold minSection">Proposed End Date</div>
                    <input type="date" className='input' />
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
                    <select name="leavetype" id="" className="input">
                    <option value="annual">Annual</option>
                    <option value="maternity">Maternity</option>
                    <option value="casual">Casual</option>
                    <option value="study">Study</option>
                    </select>
                   </div>
                  </div>
                    </div>
            </div>
                </div>
 
          </div>



 {/* Submit btn */}
        <button className="btn submitNewstaff">
        Submit  <i className="icon-paper-plane"></i>
        </button>
        </div>
    </div>
  )
 }else{
  return <></>
 }
}
