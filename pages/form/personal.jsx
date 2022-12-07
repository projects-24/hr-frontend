import React, { useRef } from 'react'
import Nav from './../../components/Nav';
import { useState } from 'react';
import Link from 'next/link';
import Axios  from 'axios';
import endPoint from '../../components/endPoint';

export default function Personal() {
    const [crime, setcrime] = useState(false)
    const [dismissed, setdismissed] = useState(false)
    const [personal, setpersonal] = useState(true)
    const [parents, setparents] = useState(true)
    const [school, setschool] = useState(true)
    const form = useRef(null)

    const submitData = (e)=>{
        e.preventDefault()
        const current = form.current
        const id = current["id"].value
        const email = current["email"].value
        const password = current["password"].value

        //personal details
        const staffType = current["staffType"].value
        const post = current["post"].value
        const ghanaCard = current["ghanaCard"].value
        const surName = current["surname"].value
        const middleName = current["middlename"].value
        const lastName = current["lastname"].value
        const gender = current["gender"].value
        const address = current["surname"].value
        const nationality = current["surname"].value
        const tel = current["surname"].value
        const dob = current["surname"].value
        const salary = current["surname"].value
        const appointment = current["surname"].value

        // marital status
        const maritalStatus = current["maritalStatus"].value
        const spouse = current["surname"].value
        const availableChildren = current["availableChildren"].value
        const nextKin = current["nextKin"].value
        const nextKin_Relation = current["nextKinRelation"].value

        //department
        const department = current["surname"].value
        const section = current["section"].value

        //passport
        const passport = current["surname"].value
        const passportIssueDate = current["surname"].value
        const passportplace = current["surname"].value

        //other
        const crime = current["surname"].value
        const crimereason = current["surname"].value
        const service = current["surname"].value
        const servicereason = current["surname"].value

        //father
        const father = current["father"].value
        const fatheroccupation = current["fatheroccupation"].value
        const fathernationality = current["fathernationality"].value
        const fatherdob = current["fatherdob"].value

        //mother
        const mother = current["mother"].value
        const motheroccupation = current["motheroccupation"].value
        const mothernationality = current["mothernationality"].value
        const motherdob = current["motherdob"].value

        //school
        const school = current["school"].value
        const from = current["from"].value
        const to = current["to"].value
        const particulars = current["particulars"].value

        const data  = {
            email:email,
            password:password,
            personalSetails:{
            staffId:id,
            surname:surName,
            middleName:middleName,
            lastName:lastName,
            gender:gender,
            department:department,
            address:address,
            nationality:nationality,
            ghanaCard:ghanaCard,
            contact:tel,
            dob:dob,
            salaryLevel:salary,
            typeStaff:staffType,
            presentAppointment:appointment,
            post:post
            },
            maritalDetail:{
            maritalStatus:maritalStatus,
            spouse:spouse,
            availableChildren:availableChildren,
            nextKin:nextKin,
            nextKin_Relation:nextKin_Relation

            },
            departmentDetails:{
                department:department,
                section:section
            },
            passportDetails:{
            passportNumber:passport,
            passportIssueDate:passportIssueDate,
            placeIssue:passportplace
            },
            otherDetails:{
                crimeConvict: crime == "yes" ? true : false,
                detailReason:crimereason,
                dismissedPublicService:service == "yes" ? true : false,
                publicServiceReason:servicereason,
            },
            father:{
                fullName:father,
                occupation:fatheroccupation,
                nationality:fathernationality,
                placeofBirth:fatherdob

            },
            mother:{
                fullName:mother,
                occupation:motheroccupation,
                nationality:mothernationality,
                placeofBirth:motherdob

            },

            school:{
                schoolname:school,
                yearFrom:from,
                yearTo:to,
                particulars:particulars
            }
    



        }
        Axios.post(endPoint + "/staff/register" , data).then(()=>{
            alert("successfully registered")
        }).catch(err=>{
            alert(err.message)
        })
    }
  return (
    <div className='content'>
        <Nav />
        <form ref={form}>
            <div>
                        <div className="row">
            <div className="col sm-12 md-8 lg-8 padding">
            <div className="h1 p-text">Personal Records Form</div>
            <div className='section'>Make sure to enter all details before submitting</div>
            </div>
            <div className="col sm-12 md-4 lg-4 padding">
                <img src="/profiling.svg"  className='fit' alt="" />
            </div>
        </div>
        <div className="padding-top-20">
            <div className="row">
            <div className="col sm-12 md-12 lg-12 section padding">
                <div className="h4">Personal Details</div>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='email' className='input' placeholder='Email' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="password" name='password' className='input' placeholder='Password' />
            </div>
            <div className="col sm-12 md-12 lg-12 padding">
            <input type="text" name='id' className='input' placeholder='Staff ID' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='surname' className='input' placeholder='Surname' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='middlename' className='input' placeholder='Middle Name' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='lastname' className='input' placeholder='Lastname' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='post' className='input' placeholder='Post' />
            </div>

            <div className="col sm-12 md-12 lg-12 padding">
            <textarea rows={5} name='address' className='input' placeholder='Address' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='nationality' className='input' placeholder='Nationality' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='ghanaCard' className='input' placeholder='Ghana Card' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='appointment' className='input' placeholder='Present Appointment' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='tel' className='input' placeholder='Tel Number' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <select name="gender" id="" className="input">
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
                <div className="text-bold">Date of birth</div>
            <input type="date" name='dob' className='input' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="number" name='Salary' className='input' placeholder='Salary' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="number" name='staffType' className='input' placeholder='Salary' />
            </div>
            <div className="col sm-12 md-12 lg-12 padding">
                <div className="h4">Marital Details</div>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <select name="maritalStatus" id="" className="input">
                <option value="">Marital Status</option>
                <option value="married">Married</option>
                <option value="single">Single</option>
                <option value="Divorced">Divorced</option>
            </select>
            </div>
        
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='spouse' className='input' placeholder='Name Of Spouse' />
            </div>
        
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="number" name='availableChildren' className='input' placeholder='Number of children' />
            </div>
        
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='nextKin' className='input' placeholder='Next of kin' />
            </div>
        
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='nextKinRelation' className='input' placeholder='Relation with next of kin' />
            </div>
       
            <div className="col sm-12 md-12 lg-12  padding-top-20">
                <div className="h4 padding">Passport Details</div>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='passport' className='input' placeholder='Name' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="date" name='passportdate' className='input' placeholder='Date' />
            </div>
            <div className="col sm-12 md-12 lg-12  padding">
            <input type="text" name='passportplace' className='input' placeholder='Place Of Issue' />
            </div>
            <div className="col sm-12 md-12 lg-12 padding">
                <div className="h4">Department Details</div>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='department' className='input' placeholder='Department' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='section' className='input' placeholder='Section' />
            </div>
            <div className="col sm-12 md-12 lg-12 padding-top-20">
                <div className="h4 padding">Other Details</div>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
                <div className="text-bold">Convicted Of A Crime</div>
            <select name="crime" id="" className="input" onChange={(e)=>{
                if(e.target.value === "yes"){
                    setcrime(true)
                }else if (e.target.value === "no"){
                    setcrime(false)
                }
            }}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
            {
                crime ?
                <div className="section">
            <input type="text" name='crimereason' className='input' placeholder='Enter details' />
            </div>
            :""
            }
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
                <div className="text-bold">Ever dismissed from a public service</div>
            <select name="service" id="" className="input" onChange={(e)=>{
                if(e.target.value === "yes"){
                    setdismissed(true)
                }else if (e.target.value === "no"){
                    setdismissed(false)
                }
            }}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
            {
                dismissed ?
                <div className="section">
            <input type="text" name='servicereason' className='input' placeholder='Enter details' />
            </div>
            :""
            }
            </div>
            {/* <div className="col sm-12 md-6 lg-6 padding">
             <button className="btn primaryBtn full-width" onClick={()=>window.location.assign("/form/parents")}>Next Step</button>
            </div> */}
            </div>
        </div>
            </div>

            <div>
  <div className='edgeDesign'>
        <div className="">
            <div className="row-flex">
                <div className="dash active"></div>
                <div className="dash active"></div>
                <div className="dash"></div>
            </div>
            <div>
                <div className="row">
                <div className="col sm-12 md-12 lg-12 padding">
                <div className="h4">Father</div>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='father' className='input' placeholder='Fullname' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='fatheroccupation' className='input' placeholder='Occupation' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='fathernationality' className='input' placeholder='Nationality' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="date" name='fatherdob' className='input' placeholder='Date Of Birth' />
            </div>
                <div className="col sm-12 md-12 lg-12 padding-top-20">
                <div className="h4 padding">Mother</div>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='mother' className='input' placeholder='Fullname' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='motheroccupation' className='input' placeholder='Occupation' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='mothernationality' className='input' placeholder='Nationality' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="date" name='motherdob' className='input' placeholder='Date Of Birth' />
            </div>
            {/* <div className="col sm-12 md-6 lg-6 padding">
          <Link href="/form/personal" className='text-bold p-text'>
           <i className="icon-arrow-left"></i> BACK TO PERSONAL 
          </Link>
            </div> */}
                </div>
            </div>
        </div>
    </div>
            </div>

            <div>
    <div className='edgeDesign'>
        <div >
            <div className="row-flex">
                <div className="dash active"></div>
                <div className="dash active"></div>
                <div className="dash active"></div>

            </div>
            <div>
                <div className="row">
                <div className="col sm-12 md-12 lg-12 padding">
                <div className="h4">School</div>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='school' className='input' placeholder='School' />
            </div>
            <div className="col sm-12 md-3 lg-3 padding">
            <input type="text" name='from' className='input' placeholder='From' />
            </div>
            <div className="col sm-12 md-3 lg-3 padding">
            <input type="text" name='to' className='input' placeholder='To' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='particulars' className='input' placeholder='Particulars' />
            </div>
  
            <div className="col sm-12 md-6 lg-6 padding">
              <button className="btn primaryBtn full-width" onClick={submitData}>Submit</button>
            </div>
            {/* <div className="col sm-12 md-6 lg-6 padding">
          <Link href="/form/parents" className='text-bold p-text'>
           <i className="icon-arrow-left"></i> BACK TO PARENTS 
          </Link>

            </div> */}
                </div>
            </div>
        </div>
    </div>
            </div>


            </form>
    </div>
  )
}
