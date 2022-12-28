import React from 'react'
import Nav from './../../components/Nav';
import Link from 'next/link';
import { useEffect } from 'react';
export default function Management() {
useEffect(() => {
    const callNotification = ()=>{
        window.Notification.requestPermission().then(perm =>{
            if(perm === "granted"){
               new Notification("This is my title",{body:"Come on notification visit:https://google.com" , icon:"../../public/favicon.png"})
            }else{
                alert("Make sure to grant notification permission")
            }
        })
       }
    
       callNotification()
})

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
                    <Link href="#">Retirment Management</Link>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}
