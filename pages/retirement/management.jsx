import React from 'react'
import Nav from './../../components/Nav';
import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function Management() {
const [user, setuser] = useState("")
useEffect(() => {
  if(localStorage.getItem("token") && !user ){
    setuser(
      JSON.parse(
          localStorage.getItem("user")
      )
)
      }

})

 if(user){
  return (
    <div>
        <Nav />
        <div className="content">
        <div className="row-flex fit white round-edge padding section">
            <img src="/leave.svg" className='width-100-max fit' alt="" />
            <div>
            <div className="h1">
                Retirement Management
        </div>
        <div className="section row-flex text-bold">
                    <Link href="/dashboard">Dashboard</Link>
                    /
                    <Link href="#">Retirement Management</Link>
                </div>
            </div>
        </div>

        <div className="m-section">
          <div className="card">
           <div className="h4"> Active service until <span className="text-bold p-text h4">{user.retirementAge}</span> </div>
          </div>
        </div>
        </div>
    </div>
  )
 }else{
  return <></>
 }
}
