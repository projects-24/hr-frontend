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
        const surName = current["surname"].value
        const middleName = current["middlename"].value
        const lastName = current["lastname"].value
        const gender = current["gender"].value
        const department = current["surname"].value
        const address = current["surname"].value
        const nationality = current["surname"].value
        const tel = current["surname"].value
        const dob = current["surname"].value
        const salary = current["surname"].value
        const appointment = current["surname"].value
        const spouse = current["surname"].value
        const passport = current["surname"].value
        const passportIssueDate = current["surname"].value
        const passportplace = current["surname"].value
        const crime = current["surname"].value
        const crimereason = current["surname"].value
        const service = current["surname"].value
        const servicereason = current["surname"].value
        const school1 = current["school1"].value
        const from1 = current["from1"].value
        const to1 = current["to1"].value
        const school2 = current["school2"].value
        const from2 = current["from2"].value
        const to2 = current["to2"].value
        const school3 = current["school3"].value
        const from3 = current["from3"].value
        const father = current["father"].value
        const fatheroccupation = current["fatheroccupation"].value
        const fathernationality = current["fathernationality"].value
        const fatherdob = current["fatherdob"].value
        const mother = current["mother"].value
        const motheroccupation = current["motheroccupation"].value
        const mothernationality = current["mothernationality"].value
        const motherdob = current["motherdob"].value

        const data  = {
            staffId:id,
            surname:surName,
            middleName:middleName,
            lastName:lastName,
            department:department,
            address:address,
            nationality:nationality,
            contact:tel,
            dob:dob,
            salaryLevel:salary,
            presentAppointment:appointment,
            spouse:spouse,
            gender:gender,
            passportNumber:passport,
            passportIssueDate:passportIssueDate,
            placeIssue:passportplace,
            crimeConvict: crime == "yes" ? true : false,
            detailReason:crimereason,
            dismissedPublicService:service == "yes" ? true : false,
            publicServiceReason:servicereason,
            school:school1,
            yearFrom:from1,
            yearTo:to1,



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
            <div className="col sm-12 md-6 lg-6 padding">
                <div className="h4">Personal Details</div>
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
            {/* <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='post' className='input' placeholder='Post' />
            </div> */}
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='department' className='input' placeholder='Department' />
            </div>
            <div className="col sm-12 md-12 lg-12 padding">
            <textarea rows={5} name='address' className='input' placeholder='Address' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='nationality' className='input' placeholder='Nationality' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='tel' className='input' placeholder='Tel Number' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
                <div className="text-bold">Date of birth</div>
            <input type="date" name='dob' className='input' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="number" name='Salary' className='input' placeholder='Salary' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='appointment' className='input' placeholder='Present Appointment' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='spouse' className='input' placeholder='Name Of Spouse' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <select name="gender" id="" className="input">
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
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
            <input type="text" name='school1' className='input' placeholder='School' />
            </div>
            <div className="col sm-12 md-3 lg-3 padding">
            <input type="text" name='from1' className='input' placeholder='From' />
            </div>
            <div className="col sm-12 md-3 lg-3 padding">
            <input type="text" name='to1' className='input' placeholder='To' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='school2' className='input' placeholder='School' />
            </div>
            <div className="col sm-12 md-3 lg-3 padding">
            <input type="text" name='from2' className='input' placeholder='From' />
            </div>
            <div className="col sm-12 md-3 lg-3 padding">
            <input type="text" name='to2' className='input' placeholder='To' />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <input type="text" name='school3' className='input' placeholder='School' />
            </div>
            <div className="col sm-12 md-3 lg-3 padding">
            <input type="text" name='from3' className='input' placeholder='From' />
            </div>
            <div className="col sm-12 md-3 lg-3 padding">
            <input type="text" name='to3' className='input' placeholder='To' />
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
