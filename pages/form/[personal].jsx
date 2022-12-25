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
import jobTitles from "../../data/jobTitles"
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import grades from "../../data/grades"
import Alert from '../../Funcss/Components/Alert';
export default function Personal() {
    const [crime, setcrime] = useState(false)
    const [dismissed, setdismissed] = useState(false)
    const [loader, setloader] = useState(false)
    const [token, settoken] = useState("")
    const [marital, setmarital] = useState("")
    const [availableChildren, setavailableChildren] = useState(null)
    const [crimereason, setcrimereason] = useState("")
    const [servicereason, setservicereason] = useState("")
    const [user, setuser] = useState(null)
    const [selectedGrade, setselectedGrade] = useState("")
    const [child, setchild] = useState("")
    const [childNumber, setchildNumber] = useState(0)
    const [childDate, setchildDate] = useState("")
    const [childrens, setchildrens] = useState([])    
    const [getChildrens, setgetChildrens] = useState(true)
    const [Department, setDepartment] = useState("")
    const [schools, setschools] = useState("")
    const [getSchools, setgetSchools] = useState(true)
    const [myschools, setmyschools] = useState([])
    const [message, setmessage] = useState("")
    useEffect(()=>{
        setTimeout(()=>{
            setmessage(null)
        }, 4000)
    },[message])
    useEffect(() => {
        if(sessionStorage.getItem("childrens") && getChildrens){
            setchildrens(
                JSON.parse(
                    sessionStorage.getItem("childrens")
                )
            )
            setgetChildrens(false)
        }
    })
    useEffect(() => {
        if(sessionStorage.getItem("schools") && getSchools){
            setschools(
                JSON.parse(
                    sessionStorage.getItem("schools")
                )
            )
            setgetSchools(false)
        }
    })
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
    

    const submitData = (e)=>{
        setloader(true)
        e.preventDefault()
        const current = form.current
        const id = current["id"].value

        const email = current["email"].value

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
        const unit = current["unit"].value


        //job Info
        const jobTitle = current["jobTitle"].value
        const grade = current["grade"].value
        const employmentStatus = current["grade"].value
        const appointDate = current["grade"].value
        const salary = current["salary"].value


        //passport
        // const passport = current["passport"].value
        // const passportIssueDate = current["passportdate"].value
        // const passportplace = current["passportplace"].value

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
        // const school = current["school"].value
        // const from = current["from"].value
        // const to = current["to"].value
        const type_of_certificate = current["certificate"].value
        const particulars = current["particulars"].value

        setmarital(maritalStatus)
        setchildrens(availableChildren)

        const data  = {
        staffId:id,
        title:title,
        email:email,
        firstname:firstName,
        middleName:middleName,
        lastName:surName,
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
        children:childrens,
        nextKin:nextKin,
        nextKin_Relation:nextKin_Relation,
        nextKin_Tel: nextKin_Tel,
        nextKin_Address:nextKin_Address,
        department:department,
        section:section,
        region:region,
        unit:unit,
        jobTitle:jobTitle,
        grade:grade,
        employmentStatus:employmentStatus,
        appointDate:appointDate,
        salaryLevel: salary,
        status:"",
        passportNumber:"",
        passportIssueDate:"",
        placeIssue:"",
       crimeConvict: crime ? crime : false,
       detailReason: crimereason,
       dismissedPublicService:service ? service : false,
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
        school: schools,
        yearFrom: "",
        yearTo: "",
        type_of_certificate:type_of_certificate,
        particulars: particulars,
        editfield:true
    
        }
        const proceed = prompt("Make sure all details are correct. Type Yes to proceed and No to quite");
        if(proceed){
            if(proceed.toString().trim().toLowerCase() === "yes"){
                Axios.post(endPoint + "/staff/register/",
                data,
                {
                 headers: {
                      authorization: `Bearer ${token}`,
                    
                   }
                    
                }
                ).then(()=>{
                   setmessage("new staff added successfully")
               setloader(false)
       
               }).catch(err=>{
         
               if(err.message === "Request failed with status code 422"){
                setmessage("email exist")
                setloader(false)
               }else{
                setmessage(err.message)
                setloader(false)
               }
       
               })
       
            }else{
                setloader(false)
            }
        }else{
            setloader(false)
        }
    }

    const handleChild = (e)=>{
        e.preventDefault()
       if(child && childDate){
        new Promise((resolve , reject)=>{
            childrens.push({id:childrens.length + 1,child:child, dob:childDate})
            resolve()
        }).then(()=>{
            sessionStorage.setItem("childrens" , JSON.stringify(childrens))
            setchild("")
            setchildDate("")
            setgetChildrens(true)
        })

       }else{
        setmessage("Make sure to enter child name and date of birth")
       }
    }
    const handleSchool = (e)=>{
        e.preventDefault()
        const current = form.current
        const school = current["school"].value
        const from = current["from"].value
        const to = current["to"].value
        if(school && from && to){
            new Promise((resolve , reject)=>{
                myschools.push({id:schools.length + 1,school:school, from:from,to:to})
                resolve()
            }).then(()=>{
             sessionStorage.setItem("schools" , JSON.stringify(myschools))
             document.querySelector("#school").value = ""
             document.querySelector("#to").value = ""
             document.querySelector("#from").value = ""
                setgetSchools(true)
            })
        }else{
            setmessage("Make sure to enter all your school details")
        }
    }
 if(user){
    return (
        <div className="padding">
              <div className="message">
         {
            message ?
            <Alert type="info" message={message}/>
            :""
         }
         </div>
            <div className="padding-top-80"></div>
            <div className="h1" style={{padding:"1rem"}}>
                Add a new staff
                <div className="section row-flex">
                    <Link href="/dashboard">Dashboard</Link>
                    /
                    <Link href="/staff/profiling">Staff profiling</Link>
                    /
                    <Link href="#">New Staff</Link>
                </div>
            </div>
            <div className=''>
            <Nav noSideBar={true}/>
            {
                loader ?
                <Loader />
                :""
            }
    
            <form ref={form}>
                <div>
                 
            <div className="">
                <div className="row" style={{alignItems:"flex-start"}}>
                    <div className="col sm-12 md-6 lg-6 div">
                    <div className="row card form-section">
                    <div className="col sm-12 md-12 lg-12 section padding">
                    <div className="h4"><img src="/hand/person.svg" className="height-50"/> Personal Details</div>
                </div>
                <div className="col sm-6 md-6 lg-6 padding">
                <TextField variant="outlined" type="text"  name='id' fullWidth label='Staff ID' />
                </div>
                <div className="col sm-6 md-6 lg-6 padding">
                <TextField variant="outlined" type="text"  name='email' fullWidth label='Email' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined"  type="text" name='firstName' fullWidth label='First Name' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined"  type="text" name='middlename' fullWidth label='Middle Name' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='surname' fullWidth label='Last Name' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField select fullWidth type="text" name='title' label="Title">
                    <MenuItem value="Prof">Prof</MenuItem>
                    <MenuItem value="Dr.">Dr.</MenuItem>
                    <MenuItem value="Mr">Mr</MenuItem>
                    <MenuItem value="Mrs">Mrs</MenuItem>
                    <MenuItem value="Ms">Ms</MenuItem>
                    <MenuItem value="Miss">Miss</MenuItem>
                </TextField>
                </div>       
                <div className="col sm-12 md-12 lg-12 padding">
                <TextField multiline rows={4} name='address' fullWidth label='Address' />
                </div>
                    </div>
                    </div>
       
                    <div className="col sm-12 md-6 lg-6 div">

                    <div className="row card formSection">
                <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h4 "><img src="/hand/underline.svg" className="width-50"/> Marital Details</div>
                </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                <TextField select fullWidth name="maritalStatus" id="" label="Marital Status" onChange={(e)=>setmarital(e.target.value)}>
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
              <div style={{opacity:0}}>
                  <TextField variant="outlined" disabled type="text" name='spouse' fullWidth label='Name Of Spouse' />
                  </div>
               }
                {/* disable is divoced or single */}
                </div>
                    </div>
                    <div className="row card formSection">
                    <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='nationality' fullWidth label='Nationality' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='ghanaCard' fullWidth label='Ghana Card Number' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='ssnitNumber' fullWidth label='SSNIT Number' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='tel' fullWidth label='Tel Number' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField select fullWidth name="gender" label="Gender" id="" >
                    <MenuItem value="">Gender</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </TextField>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                    <div className="text-bold">Date of birth</div>
                <TextField variant="outlined" fullWidth type="date" name='dob'  />
                </div>
                    </div>
                    </div>
       
                    <div className="col sm-12 md-6 lg-6 div">
                    <div className="card row formSection">
                        
                        <div className="col sm-12 md-12 lg-12 padding">
                            <div className="h4 "><img src="/hand/undraw_check.svg" className="height-50"/> Department Details</div>
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                        <TextField fullWidth type="text" select name='department' label="Department" variant="outlined" onChange={(e)=>setDepartment(e.target.value)}>
                            {
                                departments.map(docs=>( 
                                    <MenuItem value={docs.department} key={docs.department}>{docs.department}</MenuItem>
                                ))
                            }
                    </TextField>
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                        <TextField fullWidth type="text" select label="Section" name='section' variant="outlined">
                            {
                                sections.filter(docs=>{
                                    if(Department.toString().trim().toLowerCase() === docs.department.toString().trim().toLowerCase()){
                                        return docs
                                    }
                                }).map(docs=>(
                                    <MenuItem value={`${docs.section}`} key={docs.section}> {docs.section}</MenuItem>
                                ))
                            }
                            </TextField>
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                        <TextField select fullWidth name="region" id="region" label="Region">
                                    {
                                        regions.map(docs=>(
                                            <MenuItem value={docs.name} key={docs._id}> {docs.name} </MenuItem>
                                        ))
                                    }
                                </TextField>
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                        <TextField disabled name="unit" label="Unit" />
                        </div>
                            </div>
                    </div>
       
                    <div className="col sm-12 md-6 lg-6 div">
                        <div className="row card formSection">
                            
                <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h4 "><img src="/hand/undraw_note.svg" className="height-50"/> Job Infomation</div>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField fullWidth type="text" select label="Job Title" name='jobTitle' variant="outlined">
                    {
                        jobTitles.map(docs=>(
                            <MenuItem value={`${docs.title}`} key={docs.title}> {docs.title}</MenuItem>
                        ))
                    }
                    </TextField>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField fullWidth type="text" select label="Grade" name='grade' variant="outlined" onChange={(e)=>setselectedGrade(e.target.value)}>
                    {
                        grades.map(docs=>(
                            <MenuItem value={`${docs.grade}`} key={docs.grade}>{docs.grade}</MenuItem>
                        ))
                    }
                    </TextField>
                </div>
     
                <div className="col sm-12 md-6 lg-6 padding">
                <div className="text-bold">Salary Level</div>
                <TextField variant="outlined" type="text" value={
                    selectedGrade === "Assistant" ? "16H" :
                    selectedGrade === "Officer" ? "18L" :
                    selectedGrade === "Senior" ? "19" :
                    selectedGrade === "Principal" ? "20" :
                    selectedGrade === "Assistant Chief" ? "21" :
                    selectedGrade === "Chief" ? "22" : ""

                } name='salary' fullWidth disabled />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                    <div className="text-bold">Date of appointment</div>
                <TextField variant="outlined" type="date" name='appointDate' fullWidth />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField select variant="outlined" type="text" name='employmentStatus' fullWidth label='Employment Status'>
                <MenuItem value="permanent">Permanent</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
                </TextField>
                </div>
                        </div>
                    </div>
       
                    <div className="col sm-12 md-12 lg-12 div">
                        <div className="card formSection row">
                        <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h4 "><img src="/hand/underline.svg" className="width-50"/> Dependancy</div>
                </div>
                        
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField select fullWidth type="number" name='availableChildren' label="Available Children"  onChange={(e)=>setavailableChildren(e.target.value)}>
                <MenuItem value={true}> Yes </MenuItem>
                <MenuItem value={false}> No </MenuItem>
                </TextField>
    
                </div>
        
                <div className="col sm-6 md-6 lg-6 padding">
                    {
                        availableChildren ?
                <TextField variant="outlined" type="number" name="numberChildren"  fullWidth label='Number Of Children'  onChange={(e)=>setchildNumber(parseInt(e.target.value))}/>
                : <TextField variant="outlined" disabled type="number" name="numberChildren"  fullWidth label='Number Of Children'  onChange={(e)=>setchildNumber(parseInt(e.target.value))}/>
                    }
                </div>
                {
                    childNumber > 0 ?
                    <div className="col sm-12 md-6 lg-6 padding">
                    <TextField variant="outlined" type="text"  fullWidth label='Name Of Child' onChange={(e)=>setchild(e.target.value)} />
                    </div>
                    :""
                }
                {
                    childNumber > 0 ?
                    <div className="col sm-12 md-6 lg-6 padding">
                    <div className="text-bold">Date Of Birth</div>
                    <TextField variant="standard" type="date"  fullWidth onChange={(e)=>setchildDate(e.target.value)}/>
                    </div>
                    :""
                }
                {
                    childNumber > 0 ?
                    <div className="col sm-12 md-6 lg-6 padding">
                    <button onClick={handleChild} className="button indigo text-white"><i className="lni lni-plus"></i> Add</button>
                    </div>
                    :""
                }
                {
                    childNumber > 0 ?
               
                    <div className="col sm-12 md-12 lg-12 padding">
                    {
                        childrens ?
                        childrens.map(docs=>(
                            <div className="row-flex" key={docs.id}>
                                <div className="padding">{docs.child}</div>
                                <div className="padding">{docs.dob}</div>
                                <div className="padding pointer hover-text-red" onClick={()=>{
                                new Promise((resolve , reject)=>{
                                    sessionStorage.setItem("childrens" , JSON.stringify(
                                        childrens.filter(filt=>{
                                            if(filt.id != docs.id){
                                                return filt
                                            }
                                        })
                                    ))
                                    resolve()
                                        
                                    }).then(()=>setgetChildrens(true))
                                }}><i className="lni lni-trash-can"></i> Delete</div>
                            </div>
                        ))
                        :""
                    }
                </div>
                    :""
                }
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
        
                        </div>
                    </div>
       
                    <div className="col sm-12 md-6 lg-6 div">
                    <div className="row card formSection">
                    <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h4 "><img src="/hand/person.svg" className="height-50"/> Father</div>
                </div>
                <div className="col sm-12 md-12 lg-12 padding">
                <TextField select fullWidth name='fatherLife' label="Decease or alive">
                    <MenuItem value="Alive">Alive</MenuItem>
                    <MenuItem value="Dead">Decease</MenuItem>
                </TextField>
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
                <TextField variant="standard" type="date" name='fatherdob' fullWidth />
                </div>
                    </div>
                    </div>
       
                    <div className="col sm-12 md-6 lg-6 div">
                        <div className="card row formSection">
                            
                    <div className="col sm-12 md-12 lg-12 ">
                    <div className="h4 padding"><img src="/hand/person.svg" className="height-50"/> Mother</div>
                </div>
                <div className="col sm-12 md-12 lg-12 padding">
                <TextField select fullWidth name='motherLife' label="Decease or alive" >
                    <MenuItem value="Alive">Alive</MenuItem>
                    <MenuItem value="Dead">Dead</MenuItem>
                </TextField>
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
                <div className="text-bold">Date of birth</div>
                <TextField variant="standard" type="date" name='motherdob' fullWidth />
                </div>
                        </div>
                    </div>
                    <div className="col sm-12 md-6 lg-6 div">
                        <div className="formSection row card">
                        <div className="col sm-12 md-12 lg-12 ">
                    <div className="h4 padding">
                        <img src="/hand/undraw_exclamation-point.svg" className="height-50"/> Criminal Details
                        </div>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField select fullWidth name="crime" id="" label="Convicted Of A Crime" onChange={(e)=>{
                    if(e.target.value){
                        setcrime(true)
                    }else if (!e.target.value){
                        setcrime(false)
                    }
                }}>
                    <MenuItem value={false}>No</MenuItem>
                    <MenuItem value={true}>Yes</MenuItem>
                </TextField>
        
                </div>
                {
                    crime ?
                    <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='crimereason' fullWidth label='Enter details' onChange={(e)=>setcrimereason(e.target.value)} />
                </div>
                :""
                }
               
                        </div>
                    </div>
       
                    <div className="col sm-12 md-6 lg-6 div">
                        <div className="card row formSection">
                        <div className="col sm-12 md-12 lg-12 ">
                    <div className="h4 padding">
                        <img src="/hand/undraw_exclamation-point.svg" className="height-50"/> Criminal Details
                        </div>
                </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                <TextField select fullWidth name="service" id="" label="Ever dismissed from a public service" onChange={(e)=>{
                    if(e.target.value){
                        setdismissed(true)
                    }else if (!e.target.value){
                        setdismissed(false)
                    }
                }}>
                    <MenuItem value={false}>No</MenuItem>
                    <MenuItem value={true}>Yes</MenuItem>
                </TextField>
            
                </div>
                {
                    dismissed ?
                    <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='servicereason' fullWidth label='Enter details'  onChange={(e)=>setservicereason(e.target.value)} />
                </div>
                :""
                }
                        </div>
                    </div>
                    <div className="col sm-12 md-12 lg-12 div">
                        <div className="formSection card row">
                        <div className="row">
                    <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h4 "><img src="/hand/undraw_check.svg" className="height-50"/>School</div>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='particulars' fullWidth label='Particulars' />
                </div>
      
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField select fullWidth type="text" name='certificate' label="Type of certificate" >
                    <MenuItem value="professional"> profesional </MenuItem>
                    <MenuItem value="academic"> Academic </MenuItem>
                    </TextField> 
                </div>
 
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='school'  id='school' fullWidth label='School' />
                </div>
                <div className="col sm-12 md-3 lg-3 padding">
                <TextField variant="outlined" type="text" name='from' id='from' fullWidth label='From' />
                </div>
                <div className="col sm-12 md-3 lg-3 padding">
                <TextField variant="outlined" type="text" name='to'  id='to' fullWidth label='To' />
                </div>
                <div className="col sm-12 md-12 lg-12 padding">
                    <button onClick={handleSchool} className="button indigo text-white"><i className="lni lni-plus"></i> Add school</button>
                    {
                        schools ?
                        schools.map(docs=>(
                            <div className="row-flex" key={docs.id}>
                                <div className="padding">{docs.school}</div>
                                <div className="padding">{docs.from}</div>
                                <div className="padding">{docs.to}</div>
                                <div className="padding pointer hover-text-red" onClick={()=>{
                                new Promise((resolve , reject)=>{
                                    sessionStorage.setItem("schools" , JSON.stringify(
                                        schools.filter(filt=>{
                                            if(filt.id != docs.id){
                                                return filt
                                            }
                                        })
                                    ))
                                    resolve()
                                        
                                    }).then(()=>setgetSchools(true))
                                }}><i className="lni lni-trash-can"></i> Delete</div>
                            </div>
                        ))
                        :""
                    }
                    </div>
  
      
                <div className="col sm-12 md-6 lg-6 padding">
                  <button className="btn submitNewstaff" onClick={submitData}>
                    Submit  <i className="icon-paper-plane"></i>
                    </button>
                </div>
                    </div>
                        </div>
                    </div>
       
                   
                
            
                
           
                {/* <div className="col sm-12 md-12 lg-12  ">
                    <div className="h4 padding"><img src="/hand/undraw_camera.svg" className="height-50"/> Passport Details</div>
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
                </div> */}
    
               
          
    
                </div>
            </div>
                </div>
    
                <div>

                </div>
    
                <div>

                </div>
    
    
                </form>
        </div>
        </div>
      )
 }else{
    return ""
 }
}
