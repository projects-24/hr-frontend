import Link from 'next/link'
import React from 'react'
import Nav from './../../components/Nav';
import { useState } from 'react';

export default function Profiling() {
    const [search, setsearch] = useState("")
    const [print, setprint] = useState(false)
    const handlePrint = ()=>{
        new Promise((resolve, reject) => {
            setprint(true)
            resolve()
        }).then(()=>{
            window.print()
            setprint(false)
        })
    }
  return (
    <div className='content'>
        {
            !print ?
            <Nav />
            : ""
        }        {
            !print ?
        <div className="row">
            <div className="col sm-12 md-6 lg-6 padding">
            <div className="h1">Staff Profiling</div>
          <div className='text-bold section'>
          Check all staffs, add and edit staff details and profile
         </div>
         <div className="section">
            <Link href="/dashboard">
               <div class="padding-top-10 text-bold p-text">
                <i className="icon-grid"></i>  DASHBOARD
               </div>
            </Link>
         </div>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
                <img src="/collaborate.svg" className='fit' alt="" />
            </div>
        </div>
        :""
        }
                {
            !print ?
        <div className="section row">
            <div className="col sm-8 lg-8 md-8 padding">
                <input type="text" className='input' placeholder='Search for staff' onChange={(e)=>setsearch(e.target.value)} />
            </div>
            <div className="col sm-4 lg-4 md-4 padding">
                <button className="btn primaryBtn full-width" onClick={()=>window.location.assign("/form/personal")}>
                    NEW STAFF
                </button>
            </div>
        </div>
        :""
                }
        <div className="padding-top-50">
        {
            !print ?
            <div className="section">
            <button className="button success text-white" onClick={handlePrint}>
            <i className="icon-printer"></i>    Print
            </button>
            </div>
            :""}
            <div className="padding">
                
            <table className='table border'>
                <thead>
                    <th>Fullname</th>
                    <th>Post</th>
                    <th>Directorate</th>
                    <th>Contact</th>
                    <th>Edit</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Iddris Abdul Wahab</td>
                        <td>GHS</td>
                        <td>Wa</td>
                        <td>0552500930</td>
                        <td>
                            Edit 
                        </td>
                    </tr>
                    <tr>
                        <td>Iddris Abdul Wahab</td>
                        <td>GHS</td>
                        <td>Wa</td>
                        <td>0552500930</td>
                        <td>
                            Edit 
                        </td>
                    </tr>
                    <tr>
                        <td>Iddris Abdul Wahab</td>
                        <td>GHS</td>
                        <td>Wa</td>
                        <td>0552500930</td>
                        <td>
                            Edit 
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
  )
}
