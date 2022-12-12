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
const id = current["id"].value
const email = current["email"].value
const password = current["password"].value
const title = current["title"].value

const firstName = current["firstName"].value
const surName = current["surname"].value
const middleName = current["middlename"].value

const grade = current["grade"].value
const section = current["section"].value

if(email && password){
Axios.post(endPoint + "/staff/register/" , 
{
email:email,
password:password,

personalDetails:{
staffId:id,
title:title,
surname:surName,
middleName:middleName,
firstName:firstName,
gender:"",
address: "",
nationality:"",
ghanaCard:"",
ssnitNumber:"",
contact: "",
dob: ""
},

maritalDetail:{
maritalStatus:"",
spouse:"",
availableChildren:false,
numberChildren:"",
nextKin:"",
nextKin_Relation:"",
nextKin_Tel: "",
nextKin_Address:""
},

departmentDetails:{
department:"",
section:section,
region:""
},

jobInformation:{
jobTitle:"",
grade:grade,
employmentStatus:"",
appointDate:"",
salaryLevel: "",
status:""

},

passportDetails:{
passportNumber:"",
passportIssueDate:"",
placeIssue:""
},

otherDetails:{
crimeConvict: false,
detailReason: "",
dismissedPublicService:false,
publicServiceReason: "" 
},

father: {
fullName:"",
occupation: "",
nationality:"",
placeofBirth:"",
alive_or_dead:""

},

mother: {
fullName:"",
occupation:"",
nationality:"",
placeofBirth: "",
alive_or_dead: ""

},

school:{
schoolname: "",
yearFrom: "",
yearTo: "",
type_of_certificate:"",
particulars: ""
}

}
,   {
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
        name="id"
        className="input"
        id=""
        placeholder="Staff ID"
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
        type="password"
        name="password"
        className="input"
        id=""
        placeholder="Password"
        />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
        <input
        type="text"
        name="firstName"
        className="input"
        id=""
        placeholder="First Name"
        />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
        <input
        type="text"
        name="surname"
        className="input"
        id=""
        placeholder="Surname"
        />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
        <input
        type="text"
        name="middlename"
        className="input"
        id=""
        placeholder="Middle Name"
        />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
    <select type="text" name='title' className='input' >
                <option value="">Title</option>
                <option value="Prof">Prof</option>
                <option value="Dr.">Dr.</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
            </select>
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
        name="grade"
        className="input"
        id=""
        placeholder="Grade"
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
