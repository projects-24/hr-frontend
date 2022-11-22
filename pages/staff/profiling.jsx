import Link from 'next/link'
import React from 'react'
import Nav from './../../components/Nav';

export default function Profiling() {
  return (
    <div className='content'>
        <Nav />
        <div className="row">
            <div className="col sm-12 md-6 lg-6 padding">
            <div className="h1">Staff Profiling</div>
          <div className='text-bold section'>
          Check all staffs, add and edit staff details and profile
         </div>
         <div className="section">
            <Link href="/dashboard">
               <button class="button">
                <i className="icon-grid"></i>  DASHBOARD
               </button>
            </Link>
         </div>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
                <img src="/collaborate.svg" className='fit' alt="" />
            </div>
        </div>
        <div className="section row">
            <div className="col sm-8 lg-8 md-8 padding">
                <input type="text" className='input' placeholder='Search for staff' />
            </div>
            <div className="col sm-4 lg-4 md-4 padding">
                <button className="btn primaryBtn full-width">
                    NEW STAFF
                </button>
            </div>
        </div>
        <div className="padding-top-50">
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
