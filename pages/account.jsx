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
            <div className="padding">
            <div className="h4">
            {user.firstName} {user.middleName} {user.surname}
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
                  {/* <div className="col sm-12 md-6 lg-6 padding">
                     <span className="text-bold"> Appointment:</span> {user.presentAppointment}
                  </div>
                  <div className="col sm-12 md-6 lg-6 padding">
                     <span className="text-bold"> Address:</span> {user.address}
                  </div> */}
                  {
                     !user.editfield ?
                     <div className="col sm-12 md-12 lg-12 padding">
                     <Link href={`/form/${user._id}`}>
                     <button className="btn primaryBtn section ">
                     Complete registration <i className="icon-pencil"></i>
                     </button>
                     </Link>
                   </div>
                   :""
                  }
           
               </div>
              </div>
          </div>
     </div>
      </div>
    )
}else{return ""}
}
