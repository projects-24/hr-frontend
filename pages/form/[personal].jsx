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
import positions from '../../data/positions';
import Typography from './../../Funcss/Components/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

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
    const [childNumber, setchildNumber] = useState(0)
    const [childrens, setchildrens] = useState([])    
    const [childrenDocs, setchildrenDocs] = useState(null)
    const [getChildrens, setgetChildrens] = useState(true)
    const [Department, setDepartment] = useState("")
    const [schools, setschools] = useState([])
    const [getSchools, setgetSchools] = useState(true)
    const [schoolDocs, setschoolDocs] = useState([])
    const [myschools, setmyschools] = useState([])
    const [message, setmessage] = useState("")
    const [fatherContact, setfatherContact] = useState("")
    const [motherContact, setmotherContact] = useState("")
    const [father, setfather] = useState(false)
    const [mother, setmother] = useState(false)
    const [open, setOpen] = useState(false);
    const [preview, setpreview] = useState([])
    const [selectedSalary, setselectedSalary] = useState("")
    const [no_of_leave_days, setno_of_leave_days] = useState(0)
    const handleClose = () => {
        setOpen(false);
        setloader(false)
      };
    useEffect(()=>{
        setTimeout(()=>{
            setmessage(null)
        }, 4000)
    },[message])
    useEffect(() => {
        if(getChildrens){
            setchildrenDocs(
              childrens
            )
            setgetChildrens(false)
        }
    })
    useEffect(() => {
        if(getSchools){
            setschoolDocs(
             schools
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
        if(parseInt(selectedSalary) >= 23){
            setno_of_leave_days(36)
        }else if(parseInt(selectedSalary) >= 15 && parseInt(selectedSalary) <= 22){
            setno_of_leave_days(28)
        }else if(parseInt(selectedSalary) < 15){
            setno_of_leave_days(21)
        }
        setloader(true)
        e.preventDefault()
        const current = form.current
        const id = current["id"].value

        const email = current["email"].value

        const ghanaCard = current["ghanaCard"].value
        const firstName = current["firstName"].value
        const lastName = current["lastName"].value
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
        const position = current["position"].value


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
        // const particulars = current["particulars"].value

        setmarital(maritalStatus)
        setchildrens(availableChildren)

        const getYearOfBirth = dob.slice(0,4)

        const data  = {
        staffId:id,
        title:title,
        email:email,
        firstname:firstName,
        middleName:middleName,
        lastName:lastName,
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
        children:childrenDocs,
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
        position:position,
        appointDate:appointDate,
        salaryLevel: salary,
        status:"post",
        passportNumber:"",
        passportIssueDate:"",
        placeIssue:"",
       crimeConvict: crime ? crime : false,
       detailReason: crimereason,
       dismissedPublicService:service ? service : false,
       publicServiceReason: servicereason ,
       father_fullName:father,
       father_occupation: fatheroccupation,
       father_contact:fatherContact,
       father_nationality:fathernationality,
       father_placeofBirth:fatherdob,
       father_alive_or_dead:fatherLife,
       mother_fullName:mother,
       mother_occupation:motheroccupation,
       mother_contact:motherContact,
       mother_nationality:mothernationality,
       mother_placeofBirth: motherdob,
       mother_alive_or_dead: motherLife,
       school: schoolDocs,
       retirementAge:parseInt(getYearOfBirth) + 60,
       no_of_leave_days:no_of_leave_days,
       editfield:true
    
        }
        if( email &&
            id &&
            firstName &&
            lastName &&
            address &&
            nationality &&
            tel &&
            department &&
            jobTitle &&
            maritalStatus &&
            department &&
            ghanaCard &&
            ssnitNumber &&
            gender &&
            dob &&
            department &&
            region &&
            jobTitle &&
            grade &&
            position &&
            availableChildren &&
            nextKin &&
            nextKin_Relation &&
            nextKin_Address &&
            nextKin_Tel &&
            fatherLife &&
            father &&
            fatheroccupation &&
            fathernationality &&
            mother &&
            mother &&
            motherLife &&
            motheroccupation &&
            mothernationality


            ){
                setpreview(data)
                setOpen(true)
            }else{
                setloader(false)
                setmessage("Make sure to enter all compulsory fields before you can submit data")
            }
 
    }

    const postData = ()=>{
        setOpen(false)
            Axios.post(endPoint + "/staff/register/",
            preview,
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
            setmessage("Email or staffId Exist")
            setloader(false)
           }else{
            setmessage(err.message)
            setloader(false)
           }
   
           })
        
    }

    const handleChild = (e)=>{
        e.preventDefault()
        const current = form.current
        const child = current["child"].value
        const childDate = current["childDate"].value
        if( childrens.length < childNumber){
            if(child && childDate){
                new Promise((resolve , reject)=>{
                    childrens.push({id:childrens.length + 1,child:child, dob:childDate})
                    resolve()
                }).then(()=>{
                    // sessionStorage.setItem("childrens" , JSON.stringify(childrens))
                    document.querySelector("#child").value = ""
                    document.querySelector("#childDob").value = ""
                    setgetChildrens(true)
                })
        
               }else{
                setmessage("Make sure to enter child name and date of birth")
               }
        }else{
            setmessage("You can not add more than your children number")
        }
 
    }
    const handleSchool = (e)=>{
        e.preventDefault()
        const current = form.current
        const school = current["school"].value
        const from = current["from"].value
        const to = current["to"].value
        const program = current["program"].value
        const certificate = current["certificate"].value
        if(school && from && to && certificate && program){
            new Promise((resolve , reject)=>{
                schools.push({id:schools.length + 1,school:school, from:from,to:to , certificate:certificate , program:program})
                resolve()
            }).then(()=>{
             document.querySelector("#school").value = ""
             document.querySelector("#to").value = ""
             document.querySelector("#from").value = ""
             document.querySelector("#certificate").value = ""
             document.querySelector("#program").value = ""
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
           <div className="row-flex"  style={{padding:"1rem"}}>
            <div>
                <img src="/avatar.svg" className='width-100-max fit' alt="" />
            </div>
            <div className="h1">
                Add a new staff
                <div className="section row-flex">
                    <Link href="/dashboard">Dashboard</Link>
                    /
                    <Link href="/staff/profiling">Staff profiling</Link>
                    /
                    <Link href="#">New Staff</Link>
                </div>
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
                <TextField variant="outlined" type="text" required  name='id' fullWidth label='Staff ID' />
                </div>
                <div className="col sm-6 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" required  name='email' fullWidth label='Email' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined"  type="text" required name='firstName' fullWidth label='First Name' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined"  type="text"  name='middlename' fullWidth label='Middle Name' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" required name='lastName' fullWidth label='Last Name' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField select required fullWidth type="text" name='title' label="Title">
                    <MenuItem value="Prof">Prof</MenuItem>
                    <MenuItem value="Dr.">Dr.</MenuItem>
                    <MenuItem value="Mr">Mr</MenuItem>
                    <MenuItem value="Mrs">Mrs</MenuItem>
                    <MenuItem value="Ms">Ms</MenuItem>
                    <MenuItem value="Miss">Miss</MenuItem>
                    <MenuItem value="Rev(Mrs)">Rev(Mrs)</MenuItem>
                    <MenuItem value="Rev(Mr)">Rev(Mr)</MenuItem>
                </TextField>
                </div>       
                <div className="col sm-12 md-12 lg-12 padding">
                <TextField multiline required rows={4} name='address' fullWidth label='Address' />
                </div>
                    </div>
                    </div>
       
                    <div className="col sm-12 md-6 lg-6 div">

                    <div className="row card formSection">
                <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h4 "><img src="/hand/underline.svg" className="width-50"/> Marital Details</div>
                </div>
                    <div className="col sm-12 md-6 lg-6 padding">
                <TextField select fullWidth name="maritalStatus" id="" required label="Marital Status" onChange={(e)=>setmarital(e.target.value)}>
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
                <TextField variant="outlined" required type="text" name='nationality' fullWidth label='Nationality' select>
                    <MenuItem value="Ghanaian">Ghanaian</MenuItem> 
                    <MenuItem value="Non-Ghanaian">Non-Ghanaian</MenuItem> 
                </TextField>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" required type="text" name='ghanaCard' fullWidth label='Ghana Card Number' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" required type="text" name='ssnitNumber' fullWidth label='SSNIT Number' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" required type="text" name='tel' fullWidth label='Telephone Number' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField select fullWidth required name="gender" label="Gender" id="" >
                    <MenuItem value="">Gender</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </TextField>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                    <div className="text-bold">Date of birth</div>
                <TextField variant="outlined" required fullWidth type="date" name='dob'  />
                </div>
                    </div>
                    </div>
       
                    <div className="col sm-12 md-6 lg-6 div">
                    <div className="card row formSection">
                        
                        <div className="col sm-12 md-12 lg-12 padding">
                            <div className="h4 "><img src="/hand/undraw_check.svg" className="height-50"/> Directorate Details</div>
                        </div>
                        <div className="col sm-12 md-6 lg-6 padding">
                        <TextField required fullWidth type="text" select name='department' label="Department" variant="outlined" onChange={(e)=>setDepartment(e.target.value)}>
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
                        <div className="col sm-12 md-12 lg-12 padding">
                        <TextField required select fullWidth name="region" id="region" label="Region">
                                    {
                                        regions.map(docs=>(
                                            <MenuItem value={docs.name} key={docs._id}> {docs.name} </MenuItem>
                                        ))
                                    }
                                </TextField>
                        </div>
                        <div className="col sm-12 md-12 lg-12 padding">
                        <TextField disabled fullWidth name="unit" label="Unit" />
                        </div>
                            </div>
                    </div>
       
                    <div className="col sm-12 md-6 lg-6 div">
                        <div className="row card formSection">
                            
                <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h4 "><img src="/hand/undraw_note.svg" className="height-50"/> Job Infomation</div>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField fullWidth required type="text" onChange={(e)=>{
                  jobTitles.filter(filt=>{
                        if(e.target.value === filt.title){
                            return filt
                        }
                    }).map(doc=>{
                        setselectedSalary(doc.salary)
                    })
                    }} select label="Job Title" name='jobTitle' variant="outlined">
                        
                    {
                        jobTitles.map(docs=>(
                            <MenuItem value={`${docs.title}`} key={docs.title}> {docs.title}</MenuItem>
                        ))
                    }
                    </TextField>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField fullWidth required type="text" select label="Grade" name='grade' variant="outlined" >
                    {
                        grades.map(docs=>(
                            <MenuItem value={`${docs.grade}`} key={docs.grade}>{docs.grade}</MenuItem>
                        ))
                    }
                    </TextField>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
            <TextField fullWidth required type="text" select label="Position" name='position' variant="outlined">
                    {
                        positions.map(docs=>(
                            <MenuItem value={`${docs.position}`} key={docs.position}> {docs.position}</MenuItem>
                        ))
                    }
                    </TextField>
            </div>
     
                <div className="col sm-12 md-6 lg-6 padding">
                <div className="text-bold">Salary Level</div>
                <TextField variant="outlined" type="text" value={selectedSalary} name='salary' fullWidth disabled />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                    <div className="text-bold">Date of appointment</div>
                <TextField variant="outlined" required type="date" name='appointDate' fullWidth />
                </div>
                <div className="col sm-6 md-6 lg-6 padding">
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
                <TextField select fullWidth required type="number" name='availableChildren' label="Available Children"  onChange={(e)=>setavailableChildren(e.target.value)}>
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
                    <TextField id='child' name='child' variant="outlined" type="text"  fullWidth label='Name Of Child'  />
                    </div>
                    :""
                }
                {
                    childNumber > 0 ?
                    <div className="col sm-12 md-6 lg-6 padding">
                    <div className="text-bold">Date Of Birth</div>
                    <TextField id='childDob' name='childDate' variant="standard" type="date"  fullWidth />
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
               
                    <div className="col sm-12  md-6 lg-6 padding">
                   <table className="table text-left">
                    <thead>
                        <td>Child</td>
                        <td>Date of birth</td>
                        <td>Remove</td>
                    </thead>
                    <tbody>
                    {
                        childrenDocs ?
                        childrenDocs.map(docs=>(
                            <tr className="row-flex" key={docs.id}>
                                <td className="padding">{docs.child}</td>
                                <td className="padding">{docs.dob}</td>
                                <td className="padding pointer hover-text-red" onClick={()=>{
                                new Promise((resolve , reject)=>{
                                    setchildrens(
                                        childrens.filter(filt=>{
                                            if(filt.id != docs.id){
                                                return filt
                                            }
                                        })
                                    )
                                    resolve()
                                        
                                    }).then(()=>setgetChildrens(true))
                                }}><i className="lni lni-trash-can"></i> Delete</td>
                            </tr>
                        ))
                        :""
                    }
                    </tbody>
                   </table>
                </div>
                    :""
                }
                    <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" required type="text" name='nextKin' fullWidth label='Next of kin' />
                </div>
            
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" required type="text" name='nextKinRelation' fullWidth label='Relation with next of kin' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" required type="text" name='nextKinTel' fullWidth label='Next of kin contact' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" required type="text" name='nextKinAddress' fullWidth label='Next of kin address' />
                </div>
        
                        </div>
                    </div>
       
                    <div className="col sm-12 md-6 lg-6 div">
                    <div className="row card formSection">
                    <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h4 "><img src="/hand/person.svg" className="height-50"/> Father</div>
                </div>
                <div className="col sm-12 md-12 lg-12 padding">
                <TextField select required fullWidth name='fatherLife' label="Deceased or alive" onChange={(e)=>{
                    if(e.target.value === "Alive"){
                        setfather(true)
                    }else{
                        setfather(false)

                    }
                }}> 
                    <MenuItem value="Alive">Alive</MenuItem>
                    <MenuItem value="Deceased">Deceased</MenuItem>
                </TextField>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField required variant="outlined" type="text" name='father' fullWidth label='Full Name' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField required variant="outlined" type="text" name='fatheroccupation' fullWidth label='Occupation' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField required variant="outlined" type="text" name='fathernationality' fullWidth label='Nationality' select>
                <MenuItem value="Ghanaian">Ghanaian</MenuItem> 
                <MenuItem value="Non-Ghanaian">Non-Ghanaian</MenuItem> 
                </TextField>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                    <div className="text-bold">Date of birth</div>
                <TextField required variant="standard" type="date" name='fatherdob' fullWidth />
                </div>
                {
                    father ?
                    <div className="col sm-12 md-12 lg-12 padding">
                <TextField  variant="outlined" type="tel" fullWidth label='Contact' onChange={(e)=>setfatherContact(e.target.value)} />
                </div>
                :""
                }
                    </div>
                    </div>
       
                    <div className="col sm-12 md-6 lg-6 div">
                        <div className="card row formSection">
                            
                    <div className="col sm-12 md-12 lg-12 ">
                    <div className="h4 padding"><img src="/hand/person.svg" className="height-50"/> Mother</div>
                </div>
                <div className="col sm-12 md-12 lg-12 padding">
                <TextField select required fullWidth name='motherLife' label="Deceased or alive"  onChange={(e)=>{
                    if(e.target.value === "Alive"){
                        setmother(true)
                    }else{
                        setmother(false)

                    }
                }}>
                    <MenuItem value="Alive">Alive</MenuItem>
                    <MenuItem value="Deceased">Deceased</MenuItem>
                </TextField>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField required variant="outlined" type="text" name='mother' fullWidth label='Full Name' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField required variant="outlined" type="text" name='motheroccupation' fullWidth label='Occupation' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField required variant="outlined" type="text" name='mothernationality' fullWidth label='Nationality' select>
                <MenuItem value="Ghanaian">Ghanaian</MenuItem> 
                    <MenuItem value="Non-Ghanaian">Non-Ghanaian</MenuItem> 
                </TextField>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <div className="text-bold">Date of birth</div>
                <TextField required variant="standard" type="date" name='motherdob' fullWidth />
                </div>
                {
                    mother ?
                    <div className="col sm-12 md-12 lg-12 padding">
                <TextField variant="outlined" type="tel" fullWidth label='Contact' onChange={(e)=>setmotherContact(e.target.value)} />
                </div>
                :""
                }
                        </div>
                    </div>
                    <div className="col sm-12 md-12 lg-12 div">
                        <div className="formSection row card" style={{justifyContent:"normal"}}>
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
                {
                    crime ?
                    <div className="section">
                <TextField variant="outlined" type="text" name='crimereason' fullWidth label='Enter details' onChange={(e)=>setcrimereason(e.target.value)} />
                </div>
                :""
                }
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
       
                    <div className="col sm-12 md-12 lg-12 div">
                        <div className="formSection card row">
                        <div className="row">
                    <div className="col sm-12 md-12 lg-12 padding">
                    <div className="h4 "><img src="/hand/undraw_check.svg" className="height-50"/>Education</div>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='school'  id='school' fullWidth label='School' />
                </div>

                <div className="col sm-12 md-6 lg-6 padding">
                <TextField select fullWidth type="text" name='certificate' id='certificate' label="Type of certificate" >
                    <MenuItem value="PhD"> PhD </MenuItem>
                    <MenuItem value="Mphil"> Mphil </MenuItem>
                    <MenuItem value="MA/Msc"> MA/Msc </MenuItem>
                    <MenuItem value="Bsc/BA/BCOM"> Bsc/BA/BCOM </MenuItem>
                    <MenuItem value="HND"> HND </MenuItem>
                    <MenuItem value="WASSCE"> WASSCE </MenuItem>
                    <MenuItem value="Other"> Other </MenuItem>
                    </TextField> 
                </div>
 
                <div className="col sm-12 md-3 lg-3 padding">
                <TextField variant="outlined" type="text" name='from' id='from' fullWidth label='From' />
                </div>
                <div className="col sm-12 md-3 lg-3 padding">
                <TextField variant="outlined" type="text" name='to'  id='to' fullWidth label='To' />
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <TextField variant="outlined" type="text" name='program' id='program' fullWidth label='program of study' />
                </div>
                <div className="col sm-12 md-12 lg-12 padding">
                    <button onClick={handleSchool} className="button indigo text-white"><i className="lni lni-plus"></i> Add school</button>
                  <table className='table section'>
                    <thead>
                        <th>School</th>
                        <th>program</th>
                        <th>certificate Type</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Delete</th>
                    </thead>
                    <tbody>
                    {
                        schoolDocs ?
                        schoolDocs.map(docs=>(
                            <tr className="" key={docs.id}>
                                <td className="padding">{docs.school}</td>
                                <td className="padding">{docs.program}</td>
                                <td className="padding">{docs.certificate}</td>
                                <td className="padding">{docs.from}</td>
                                <td className="padding">{docs.to}</td>
                                <td className="padding pointer hover-text-red" onClick={()=>{
                                new Promise((resolve , reject)=>{
                                   setschools( schools.filter(filt=>{
                                    if(filt.id != docs.id){
                                        return filt
                                    }
                                }))
                                    resolve()
                                        
                                    }).then(()=>setgetSchools(true))
                                }}><i className="lni lni-trash-can"></i> Delete</td>
                            </tr>
                        ))
                        :""
                    }
                    </tbody>
                  </table>
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









                {/* Preview */}
                <div id="preview">
                <Dialog open={open} onClose={handleClose} style={{width:"90vw"}}>
        <DialogTitle>Do you want to submit this data </DialogTitle>
        <DialogContent >
       

<div className='row'>
<div className="col sm-12 h4 lg-12 md-12 padding">
    Personal Details
</div>
<div className="col sm-12 lg-12 md-12 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Email:</div> <div className='text-small'>{preview.email}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>staffId:</div> <div className='text-small'>{preview.staffId}</div>
</div>
    </div>
</div>

<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>First Name:</div> <div className='text-small'>{preview.firstname}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Middle Name:</div> <div className='text-small'>{preview.middleName}</div>
</div>
    </div>
</div>
  
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>last Name:</div> <div className='text-small'>{preview.lastName}</div>
</div>
    </div>
</div>
  
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Title:</div> <div className='text-small'>{preview.title}</div>
</div>
    </div>
</div>
  
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Address:</div> <div className='text-small'>{preview.address}</div>
</div>
    </div>
</div>
  
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Marital status:</div> <div className='text-small'>{preview.maritalStatus}</div>
</div>
    </div>
</div>
  
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Spouse:</div> <div className='text-small'>{preview.spouse}</div>
</div>
    </div>
</div>
  
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>staffId:</div> <div className='text-small'>{preview.nationality}</div>
</div>
    </div>
</div>
  
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Ghana Card:</div> <div className='text-small'>{preview.ghanaCard}</div>
</div>
    </div>
</div>
  
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Snnit Number:</div> <div className='text-small'>{preview.snnitNumber}</div>
</div>
    </div>
</div>
  
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Contact:</div> <div className='text-small'>{preview.contact}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Gender:</div> <div className='text-small'>{preview.gender}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Date of birth:</div> <div className='text-small'>{preview.dob}</div>
</div>
    </div>
</div>
<div className="col sm-12 h4 lg-12 md-12 padding section">
Directorate
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Department:</div> <div className='text-small'>{preview.department}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Section:</div> <div className='text-small'>{preview.section}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Region:</div> <div className='text-small'>{preview.region}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Unit:</div> <div className='text-small'>{preview.Unit}</div>
</div>
    </div>
</div>
<div className="col sm-12 h4 lg-12 md-12 padding section">
Job Information
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Job Title:</div> <div className='text-small'>{preview.jobTitle}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Grade:</div> <div className='text-small'>{preview.grade}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Position:</div> <div className='text-small'>{preview.position}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Salary Level:</div> <div className='text-small'>{preview.salaryLevel}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Date of appointment:</div> <div className='text-small'>{preview.dateAppoint}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Employment Status:</div> <div className='text-small'>{preview.employmentStatus}</div>
</div>
    </div>
</div>
<div className="col sm-12 h4 lg-12 md-12 padding section">
Dependancy
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Available Children:</div> <div className='text-small'>{preview.availableChildren ? "Yes" : ""}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Number of Children:</div> <div className='text-small'>{preview.childNumber}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Next of kin:</div> <div className='text-small'>{preview.nextKin}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Relation with next of kin:</div> <div className='text-small'>{preview.nextKin_Relation}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Next of kin contact:</div> <div className='text-small'>{preview.nextKin_Tel}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Next of kin address:</div> <div className='text-small'>{preview.nextKin_Address}</div>
</div>
    </div>
</div>
<div className="col sm-12 h4 lg-12 md-12 padding">
<table className='table'>
<thead>
    <th>Child Name</th>
    <th>Date of birth</th>
</thead>
<tbody>
{
preview.children ?
preview.children.map(docs=>(
<tr key={docs.id}>
<td className="padding">{docs.child}</td>
<td className="padding">{docs.dob}</td>
</tr>
))
:""
}
</tbody>
</table>
</div>

<div className="col sm-12 h4 lg-12 md-12 padding section">
Father
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Full Name:</div> <div className='text-small'>{preview.father_fullName}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Dead/Alive:</div> <div className='text-small'>{preview.father_alive_or_dead}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Occupation:</div> <div className='text-small'>{preview.father_occupation}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Date of Birth:</div> <div className='text-small'>{preview.fatherdob}</div>
</div>
    </div>
</div>
<div className="col sm-12 h4 lg-12 md-12 padding section">
Mother
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Full Name:</div> <div className='text-small'>{preview.mother_fullName}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Dead/Alive:</div> <div className='text-small'>{preview.mother_alive_or_dead}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Occupation:</div> <div className='text-small'>{preview.mother_occupation}</div>
</div>
    </div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Date of Birth:</div> <div className='text-small'>{preview.motherdob}</div>
</div>
    </div>
</div>

<div className="col sm-12 h4 lg-12 md-12 padding section">
Criminal Details
</div>

<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Convicted of a crime:</div> <div className='text-small'>{preview.crimeConvict ? "Yes" : "No"}</div>
</div>
    </div>
<div className="minSection padding light round-edge">
<div className='text-bold text-small'>Reason:</div> <div className='text-small'>{preview.crimereason}</div>
</div>
</div>
<div className="col sm-6 lg-6 md-6 padding">
    <div className="padding light round-edge">
    <div className="row-flex">
    <div className='text-bold text-small'>Ever dismissed from public service:</div> <div className='text-small'>{preview.dismissedPublicService ? "Yes" : "No"}</div>
</div>
    </div>
<div className="minSection padding light round-edge">
<div className='text-bold text-small'>Reason:</div> <div className='text-small'>{preview.servicereason}</div>
</div>
</div>
<div className="col sm-12 h4 lg-12 md-12 padding section">
Education
</div>
<div className="col sm-12 h4 lg-12 md-12 padding">
<table className='table'>
        <thead>
            <th>School</th>
            <th>program</th>
            <th>certificate Type</th>
            <th>From</th>
            <th>To</th>
        </thead>
        <tbody>
        {
            preview.school ?
            preview.school.map(docs=>(
                <tr className="" key={docs.id}>
                    <td className="pading">{docs.school}</td>
                    <td className="padding">{docs.program}</td>
                    <td className="padding">{docs.certificate}</td>
                    <td className="padding">{docs.from}</td>
                    <td className="padding">{docs.to}</td>
                </tr>
            ))
            :""
        }
        </tbody>
      </table>
</div>

    </div>

    <div>

    </div>

    <div>

    </div>

    </DialogContent>
        <DialogActions>
          <Button  color="error" onClick={handleClose}>Cancel</Button> 
          <Button  color="success" onClick={postData}>Yes, I want to submit</Button>
        </DialogActions>
      </Dialog>   
                </div>

        </div>
        
        </div>
      )
 }else{
    return ""
 }
}
