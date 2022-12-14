import React, { useRef } from 'react'
import Nav from '../../components/Nav';
import { useState } from 'react';
import Link from 'next/link';
import Axios  from 'axios';
import endPoint from '../../components/endPoint';
import Loader from '../../components/loader';
import { useEffect } from 'react';
import departments from '../../data/departments';
import sections from "../../data/sections"
import regions from '../../data/regions';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
export default function Personal() {
    const [crime, setcrime] = useState(false)
    const [dismissed, setdismissed] = useState(false)
    const [loader, setloader] = useState(false)
    const [token, settoken] = useState("")
    const [marital, setmarital] = useState("")
    const [childrens, setchildrens] = useState("")
    const [crimereason, setcrimereason] = useState("")
    const [servicereason, setservicereason] = useState("")
    const [user, setuser] = useState(null)
    const [selectedDepartment, setselectedDepartment] = useState("")

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

    const router = useRouter()
    const {personal } = router.query
    const form = useRef(null)

    useEffect(() => {
        if(localStorage.getItem("token")  && !token ){
            settoken(
                JSON.parse(
                    localStorage.getItem("token")
                )
            )
        }
    })
    
    // handle section
    useEffect(()=>{
        const current = form.current
    })

    const submitData = (e)=>{
        setloader(true)
        e.preventDefault()
        const current = form.current
        const id = current["id"].value

        const ghanaCard = current["ghanaCard"].value
        const firstName = current["firstName"].value
        const surName = current["surname"].value
        const middleName = current["middlename"].value
  
        const gender = current["gender"].value
        const address = current["address"].value
        const nationality = current["nationality"].value
        const tel = current["tel"].value
        const dob = current["dob"].value

        const title = current["title"].value
        const ssnitNumber = current["ssnitNumber"].value
        

        // marital status
        const maritalStatus = current["maritalStatus"].value
        const spouse = current["spouse"].value
        const availableChildren = current["availableChildren"].value
        const nextKin = current["nextKin"].value
        const nextKin_Relation = current["nextKinRelation"].value
        const nextKin_Tel = current["nextKinTel"].value
        const nextKin_Address = current["nextKinAddress"].value
        const numberChildren = current["numberChildren"].value
        //department
        const department = current["department"].value
        const section = current["section"].value
        const region = current["region"].value

        //job Info
        const jobTitle = current["jobTitle"].value
        const grade = current["grade"].value
        const employmentStatus = current["grade"].value
        const appointDate = current["grade"].value
        const salary = current["salary"].value
        const status = current["status"].value


        //passport
        const passport = current["passport"].value
        const passportIssueDate = current["passportdate"].value
        const passportplace = current["passportplace"].value

        //other
        const crime = current["crime"].value
        // const crimereason = current["crimereason"].value
        const service = current["service"].value
        // const servicereason = current["servicereason"].value

        //father
        const father = current["father"].value
        const fatheroccupation = current["fatheroccupation"].value
        const fathernationality = current["fathernationality"].value
        const fatherdob = current["fatherdob"].value
        const fatherLife = current["fatherLife"].value

        //mother
        const mother = current["mother"].value
        const motheroccupation = current["motheroccupation"].value
        const mothernationality = current["mothernationality"].value
        const motherdob = current["motherdob"].value
        const motherLife = current["motherLife"].value

        //school
        const school = current["school"].value
        const from = current["from"].value
        const to = current["to"].value
        const type_of_certificate = current["certificate"].value
        const particulars = current["particulars"].value

        setmarital(maritalStatus)
        setchildrens(availableChildren)

        const data  = {
        staffId:id,
        title:title,
        surname:surName,
        middleName:middleName,
        firstName:firstName,
        gender:gender,
        address: address,
        nationality:nationality,
        ghanaCard:ghanaCard,
        ssnitNumber:ssnitNumber,
        contact: tel,
        dob: dob,
        maritalStatus:maritalStatus,
        spouse:spouse,
        availableChildren:availableChildren,
        numberChildren:numberChildren,
        nextKin:nextKin,
        nextKin_Relation:nextKin_Relation,
        nextKin_Tel: nextKin_Tel,
        nextKin_Address:nextKin_Address,
        department:department,
        section:section,
        region:region,
        jobTitle:jobTitle,
        grade:grade,
        employmentStatus:employmentStatus,
        appointDate:appointDate,
        salaryLevel: salary,
        status:status,
        passportNumber:passport,
        passportIssueDate:passportIssueDate,
        placeIssue:passportplace,
       crimeConvict: crime,
       detailReason: crimereason,
       dismissedPublicService:service,
       publicServiceReason: servicereason ,
       father_fullName:father,
       father_occupation: fatheroccupation,
       father_nationality:fathernationality,
       father_placeofBirth:fatherdob,
       father_alive_or_dead:fatherLife,
       mother_fullName:mother,
       mother_occupation:motheroccupation,
       mother_nationality:mothernationality,
       mother_placeofBirth: motherdob,
       mother_alive_or_dead: motherLife,
        schoolname: school,
        yearFrom: from,
        yearTo: to,
        type_of_certificate:type_of_certificate,
        particulars: particulars,
        editfield:true
    
        }
        const proceed = prompt("Make sure all details are correct. Type Yes to proceed and No to quite");
        if(proceed){
            if(proceed.toString().trim().toLowerCase() === "yes"){
                Axios.patch(endPoint + "/staff/updatestaff/" + personal,
                data,
                {
                 headers: {
                      authorization: `Bearer ${token}`,
                    
                   }
                    
                }
                ).then(()=>{
                   alert("successfully updated")
               setloader(false)
       
               }).catch(err=>{
                   alert(err.message)
               setloader(false)
       
               })
       
            }else{
                setloader(false)
            }
        }else{
            setloader(false)
        }
    }
 if(user){
    return (
        <div className='content'>
            <Nav />
            {
                loader ?
                <Loader />
                :""
            }
                       <div className="row">
                <div className="col sm-12 md-8 lg-8 padding">
                <div className="h1 p-text">Personal Records Form</div>
                <div className='section'>Make sure to enter all details before submitting</div>
                </div>
                <div className="col sm-12 md-4 lg-4 padding">
                    <img src="/profiling.svg"  className='fit' alt="" />
                </div>
            </div>
    
            <form ref={form}>
                <div>
                 
            <div className="padding-top-20">
                <div className="row">
                <div className="col sm-12 md-12 lg-12 section padding">
                    <div className="h4">Personal Details</div>
                </div>
                <div className="col sm-12 md-12 lg-12 padding">
                <TextField variant="outlined" type="text" defaultValue={user.staffId} name='id' fullWidth label='Staff ID' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" defaultValue={user.surname}  type="text" name='surname' fullWidth label='Surname' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" defaultValue={user.firstName} type="text" name='firstName' fullWidth label='First Name' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" defaultValue={user.middleName} type="text" name='middlename' fullWidth label='Middle Name' />
                </div>
    
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField select fullWidth type="text" defaultValue={user.title} name='title'  >
                    <MenuItem value="">Title</MenuItem>
                    <MenuItem value="Prof">Prof</MenuItem>
                    <MenuItem value="Dr.">Dr.</MenuItem>
                    <MenuItem value="Mr">Mr</MenuItem>
                    <MenuItem value="Mrs">Mrs</MenuItem>
                    <MenuItem value="Miss">Miss</MenuItem>
                </TextField>
                </div>       
    
                <div className="col sm-12 md-12 lg-12 padding">
                <TextField multiline rows={5} name='address' fullWidth label='Address' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='nationality' fullWidth label='Nationality' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='ghanaCard' fullWidth label='Ghana Card' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='ssnitNumber' fullWidth label='SSNIT' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='tel' fullWidth label='Tel Number' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <div className="text-bold">Gender</div>
                <TextField select fullWidth name="gender" id="" >
                    <MenuItem value="">Gender</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </TextField>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                    <div className="text-bold">Date of birth</div>
                <TextField variant="outlined" fullWidth type="date" name='dob'  />
                </div>
                <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h4 padding-top-20">Marital Details</div>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <div className="text-bold">Marital Status</div>
                <TextField select fullWidth name="maritalStatus" id=""  onChange={(e)=>setmarital(e.target.value)}>
                    <MenuItem value="married">Married</MenuItem>
                    <MenuItem value="single">Single</MenuItem>
                    <MenuItem value="divorced">Divorced</MenuItem>
                    <MenuItem value="widow">Widow</MenuItem>
                    <MenuItem value="Co-Habition">Co-Habition</MenuItem>
                </TextField>
                </div>
            
                <div className="col sm-12 md-6 lg-6 padding">
               {
                marital === "married" || marital === "widow" || marital === "Co-Habition" ?
                <TextField variant="outlined" type="text" name='spouse' fullWidth label='Name Of Spouse' />
                :
                <TextField variant="outlined" disabled type="text" name='spouse' fullWidth label='Name Of Spouse' />
               }
                {/* disable is divoced or single */}
                </div>
            
                <div className="col sm-12 md-6 lg-6 padding">
                <div className="text-bold">Available Children</div>
                <TextField select fullWidth type="number" name='availableChildren'   onChange={(e)=>setchildrens(e.target.value)}>
                <MenuItem value="yes"> Yes </MenuItem>
                <MenuItem value="no"> No </MenuItem>
                </TextField>
    
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                    {/* if available children */}
                {
                    childrens === "yes" ?
                    <TextField variant="outlined" type="number" name='numberChildren' fullWidth label='Number of children' />
                    :
                    <TextField variant="outlined" disabled type="number" name='numberChildren' fullWidth label='Number of children' />
    
                }
                </div>
            
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='nextKin' fullWidth label='Next of kin' />
                </div>
            
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='nextKinRelation' fullWidth label='Relation with next of kin' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='nextKinTel' fullWidth label='Next of kin contact' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='nextKinAddress' fullWidth label='Next of kin address' />
                </div>
    
                <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h4">Department Details</div>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField select fullWidth type="text" defaultValue={user.department} name='department' >
                    <MenuItem value="">Department</MenuItem>
                {
                    departments.map(docs=>(
                        <MenuItem value={docs.department} key={docs.department}>{docs.department}</MenuItem>
                    ))
                }
                </TextField>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <div className="text-bold">Section</div>
                <TextField select fullWidth type="text" name='section'  defaultValue={user.section} >
                    {
                        sections.map(docs=>(
                            <MenuItem value={`${docs.section}`} key={docs.section}> {docs.section}</MenuItem>
                        ))
                    }
                    </TextField>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <div className="text-bold">Region</div>
                <TextField select fullWidth name="region" id="region" >
                            {
                                regions.map(docs=>(
                                    <MenuItem value={docs.name} key={docs._id}> {docs.name} </MenuItem>
                                ))
                            }
                        </TextField>
                </div>
                
           
                <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h4">Job Infomation</div>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='jobTitle' fullWidth label='Job Title' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='grade' fullWidth label='Grade' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='employmentStatus' fullWidth label='Employment Status' />
                </div>
                
                <div className="col sm-12 md-6 lg-6 padding">
                    <div className="text-bold">Date of appointment</div>
                <TextField variant="outlined" type="date" name='appointDate' fullWidth label='Date of appointment' />
                </div>
                
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='salary' fullWidth label='Salary Level' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <div className="text-bold">Status</div>
                <TextField select fullWidth name="status" id="" >
                    <MenuItem value="leave">On Leave</MenuItem>
                    <MenuItem value="field">On Field</MenuItem>
                    <MenuItem value="post">On Post</MenuItem>
                </TextField>
                </div>
                
                
           
                <div className="col sm-12 md-12 lg-12  padding-top-20">
                    <div className="h4 padding">Passport Details</div>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='passport' fullWidth label='Name' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                    <div className="text-bold">Passport Date</div>
                <TextField variant="outlined" type="date" name='passportdate' fullWidth label='Date' />
                </div>
                <div className="col sm-12 md-12 lg-12  padding">
                <TextField variant="outlined" type="text" name='passportplace' fullWidth label='Place Of Issue' />
                </div>
    
               
                <div className="col sm-12 md-12 lg-12 padding-top-20">
                    <div className="h4 padding">Other Details</div>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                    <div className="text-bold">Convicted Of A Crime</div>
                <TextField select fullWidth name="crime" id=""  onChange={(e)=>{
                    if(e.target.value === "yes"){
                        setcrime(true)
                    }else if (e.target.value === "no"){
                        setcrime(false)
                    }
                }}>
                    <MenuItem value="no">No</MenuItem>
                    <MenuItem value="yes">Yes</MenuItem>
                </TextField>
                {
                    crime ?
                    <div className="section">
                <TextField variant="outlined" type="text" name='crimereason' fullWidth label='Enter details' onChange={(e)=>setcrimereason(e.target.value)} />
                </div>
                :""
                }
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                    <div className="text-bold">Ever dismissed from a public service</div>
                <TextField select fullWidth name="service" id=""  onChange={(e)=>{
                    if(e.target.value === "yes"){
                        setdismissed(true)
                    }else if (e.target.value === "no"){
                        setdismissed(false)
                    }
                }}>
                    <MenuItem value="no">No</MenuItem>
                    <MenuItem value="yes">Yes</MenuItem>
                </TextField>
                {
                    dismissed ?
                    <div className="section">
                <TextField variant="outlined" type="text" name='servicereason' fullWidth label='Enter details'  onChange={(e)=>setservicereason(e.target.value)} />
                </div>
                :""
                }
                </div>
    
                </div>
            </div>
                </div>
    
                <div>
      <div className='edgeDesign'>
            <div className="">
          
                <div>
                    <div className="row">
                    <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h4">Father</div>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='father' fullWidth label='Fullname' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='fatheroccupation' fullWidth label='Occupation' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='fathernationality' fullWidth label='Nationality' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                    <div className="text-bold">Date of birth</div>
                <TextField variant="outlined" type="date" name='fatherdob' fullWidth label='Date Of Birth' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <div className="text-bold">Decease Or Alive</div>
                <TextField select fullWidth name='fatherLife'  >
                    <MenuItem value="Alive">Alive</MenuItem>
                    <MenuItem value="Dead">Decease</MenuItem>
                </TextField>
                </div>
    
                    <div className="col sm-12 md-12 lg-12 padding-top-20">
                    <div className="h4 padding">Mother</div>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='mother' fullWidth label='Fullname' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='motheroccupation' fullWidth label='Occupation' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='mothernationality' fullWidth label='Nationality' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="date" name='motherdob' fullWidth label='Date Of Birth' />
                </div>
                      <div className="col sm-12 md-6 lg-6 padding">
                      <div className="text-bold">Decease Or Alive</div>
                <TextField select fullWidth name='motherLife'  >
                    <MenuItem value="Alive">Alive</MenuItem>
                    <MenuItem value="Dead">Dead</MenuItem>
                </TextField>
                </div>
                
                    </div>
                </div>
            </div>
        </div>
                </div>
    
                <div>
        <div className='edgeDesign'>
            <div >
           
                <div>
                    <div className="row">
                    <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h4">School</div>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='school' fullWidth label='School' />
                </div>
                <div className="col sm-12 md-3 lg-3 padding">
                <TextField variant="outlined" type="text" name='from' fullWidth label='From' />
                </div>
                <div className="col sm-12 md-3 lg-3 padding">
                <TextField variant="outlined" type="text" name='to' fullWidth label='To' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='particulars' fullWidth label='Particulars' />
                </div>
      
                <div className="col sm-12 md-6 lg-6 padding">
                <div className="text-bold">Type of certificate </div>
                <TextField select fullWidth type="text" name='certificate'  >
                    <MenuItem value="professional"> profesional </MenuItem>
                    <MenuItem value="academic"> Academic </MenuItem>
                    </TextField> 
                {/* 
                 
                
                 */}
                </div>
      
                <div className="col sm-12 md-6 lg-6 padding">
                  <button className="btn primaryBtn full-width" onClick={submitData}>Submit</button>
                </div>
                    </div>
                </div>
            </div>
        </div>
                </div>
    
    
                </form>
        </div>
      )
 }else{
    return ""
 }
}
