import Link from "next/link";
import Nav from "../components/Nav";
import {useRef} from 'react';
import endPoint from "../components/endPoint";
import {useEffect, useState} from "react"
import Axios  from 'axios';
export default function Register() {
    const form = useRef(null)
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
const handleLogin = (e) => {
    e.preventDefault()
const current = form.current
const userName =  current["name"].value
const email =  current["email"].value
const contact =  current["contact"].value
const post =  current["post"].value
const directorate =  current["directorate"].value
const section =  current["section"].value
const role =  current["role"].value
if(userName && email && contact && post && directorate && section && role){
Axios.post(endPoint + "/staff/register" , {
name:userName,
email:email,
contact:contact,
post:post,
directorate:directorate,
section:section,
password:12345,
role:role

},   {
    headers: {
         authorization: `Bearer ${token}`,
       
      }
       
   }).then(()=>alert("account created successfully"))
   .catch(err=>alert(err.message))
}else{
    alert("Make sure to enter all details")
}
};
return (
<div>
<div className="">
<Nav />
<div className="content">
<div className="width-600-max ">
<div className="m-section">
 <div className="padding">
 <div className="h1">Register Account</div>
    <div className="text-bold section">
    Enter a valid email and password to login your account
    </div>
 </div>
</div>
<div className="section">
   <form ref={form}>
   <div className="row">
    <div className="col sm-12 md-6 lg-6 padding">
        <input
        type="text"
        name="name"
        className="input"
        id=""
        placeholder="Name"
        />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
        <input
        type="email"
        name="email"
        className="input"
        id=""
        placeholder="Email"
        />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
        <input
        type="tel"
        name="contact"
        className="input"
        id=""
        placeholder="Contact"
        />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
        <input
        type="text"
        name="post"
        className="input"
        id=""
        placeholder="Post"
        />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
        <input
        type="text"
        name="directorate"
        className="input"
        id=""
        placeholder="Directorate"
        />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
        <input
        type="text"
        name="section"
        className="input"
        id=""
        placeholder="Section"
        />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
        <input
        type="text"
        name="role"
        className="input"
        id=""
        placeholder="Role"
        />
    </div>

    <div className="col sm-12 md-6 lg-6 padding">
    <button className="primaryBtn btn full-width" onClick={handleLogin}>CREATE ACCOUNT <i className="icon-user-following"></i></button>
    </div>
    {/* <div className="col sm-12 md-12 lg-12 padding">
            <Link href="/dashboard">
               <button class="button info text-white">
                <i className="icon-grid"></i> BACK TO DASHBOARD
               </button>
            </Link>
         </div> */}
    </div>
   </form>
</div>
</div>
</div>
</div>
</div>
);
}
