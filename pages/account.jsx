import React from 'react'
import Nav from '../components/Nav'
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Account() {
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
          <Nav />
     <div className="content">
     <div className="row">
              <div className="col sm-12 md-4 lg-4 padding">
                  <img src="/avatar.svg" className='fit' alt="" />
              </div>
              <div className="col sm-12 md-8 lg-8 padding">
               <div className="card">
               <div className="padding">
                  <div className="row-flex space-between">
                  <div className="h4">
            {user.firstname} {user.middleName} {user.lastName}
            </div>
            <div>
               active service until <span className="text-bold p-text"> {user.retirementAge}</span>
            </div>
                  </div>
               <div className="section positionText">{user.grade}</div>
            </div>
               <div className="row">
   
                  <div className="col sm-12 md-6 lg-6 padding">
                     <span className="text-bold"> Department:</span> {user.department}
                  </div>
                  <div className="col sm-12 md-6 lg-6 padding">
                     <span className="text-bold"> Section:</span> {user.section}
                  </div>
                  <div className="col sm-12 md-6 lg-6 padding">
                     <span className="text-bold"> Employment status:</span> {user.employmentStatus}
                  </div>
                  <div className="col sm-12 md-6 lg-6 padding">
                     <span className="text-bold"> Grade:</span> {user.grade}
                  </div>
                  <div className="col sm-12 md-6 lg-6 padding">
                     <span className="text-bold"> Position:</span> {user.position}
                  </div>
         
           
                  <div className="col sm-12 md-6 lg-6 padding">
                     <span className="text-bold"> Address:</span> {user.address}
                  </div>
         
           
               </div>
               </div>
              </div>
          </div>
     </div>
      </div>
    )
}else{return ""}
}
