import React from 'react'
import Nav from '../../components/Nav'
import {useEffect, useState} from "react"
import Axios  from 'axios';
import endPoint from '../../components/endPoint';
export default function Password() {
  const [password, setpassword] = useState("")
  const [token, settoken] = useState("")
  const [user, setuser] = useState("")
  useEffect(() => {
    if(localStorage.getItem("token")  && !token ){
        settoken(
            JSON.parse(
                localStorage.getItem("token")
            )
        )
        setuser(
            JSON.parse(
                localStorage.getItem("user")
            )
        )
    }
})

  const Change = ()=>{
    if(password){
      Axios.patch(endPoint + "/staff/change-password/" + user._id , {password:password} ,   {
        headers: {
             authorization: `Bearer ${token}`,
           
          }
           
       }).then(()=>{
        alert("password changed successfully")
       }).catch(err=>alert(err.message))
    }else{
      alert("Make sure to enter your new password")
    }
  }
  if(user){
    return (
      <div>
          <Nav />
          <div className="content">
          <div className="width-500-max center">
          <div>
           <div className="h1">Change your password</div>
      <div className="text-bold section">
      Enter a valid password to change your password
      </div>
           </div>
           <div className="padding-top-40">
           <div className="text-bold">For {user.firstName}</div>
            <div className="section">
            <input type="password" className="input" placeholder='Enter your new password' onChange={(e)=>setpassword(e.target.value)}/>
              </div>
            <button className="btn primaryBtn section" onClick={Change}> Change password </button>
            </div>
          </div>
          </div>
      </div>
    )
  }else{
    return ""
  }
  
}
