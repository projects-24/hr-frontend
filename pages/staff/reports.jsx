import Link from 'next/link'
import Nav from './../../components/Nav';
import { useState , useEffect} from 'react';
import regions from '../../data/regions';
import Loader from '../../components/loader';
import Axios from 'axios';
import endPoint from '../../components/endPoint';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
import Departments from "../../data/departments"
import Sections from "../../data/sections"
import TextField  from '@mui/material/TextField';
import  MenuItem  from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dynamic from "next/dynamic"
const Excel = dynamic(()=>import("./../../components/Excel") ,{ssr:false})

export default function Reports() {
    const [search, setsearch] = useState("")
    const [inputData, setinputData] = useState("")
    const [print, setprint] = useState(false)
    const [leave, setleave] = useState(false)
    const [loading, setloading] = useState(false)
    const [directorate, setdirectorate] = useState("")
    const [token, settoken] = useState("")
    const [user, setuser] = useState("")  
    const [department, setdepartment] = useState("")
    const [section, setsection] = useState("")
    const [status, setstatus] = useState("")
    const [employment, setemployment] = useState("")
    const [open, setOpen] = React.useState(false);
    const [current, setcurrent] = useState(null)
    const [currentId, setcurrentId] = useState("")
    const [userStatus, setuserStatus] = useState("")
    const [docs, setdocs] = useState(null)
const [dropdown, setdropdown] = useState(0)
const [exportTrigger, setexportTrigger] = useState(false)
const [report, setreport] = useState("all")
    
    const handleClose = () => {
      setOpen(false);
    };
  
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
    const handlePrint = ()=>{
        new Promise((resolve, reject) => {
            setprint(true)
            resolve()
        }).then(()=>{
            setdropdown(0)
            window.print()
            setprint(false)

        })
   
    }

    const filter = ()=>{
        data.filter(docs=>{
            if(search === ""){
                return data;
            }
            else if(
                search.toString().trim().toLowerCase().includes(docs.post.toString().trim().toLowerCase().slice(0, search.length)) ||
                search.toString().trim().toLowerCase().includes(docs.directorate.toString().trim().toLowerCase().slice(0, search.length)) ||
                search.toString().trim().toLowerCase().includes(docs.section.toString().trim().toLowerCase().slice(0, search.length)) ||
                search.toString().trim().toLowerCase().includes(docs.leave.toString().trim().toLowerCase().slice(0, search.length)) ||
                search.toString().trim().toLowerCase().includes(docs.onField.toString().trim().toLowerCase().slice(0, search.length)) ||
                search.toString().trim().toLowerCase().includes(docs.onPost.toString().trim().toLowerCase().slice(0, search.length))
                ){
                    return docs;
            }
        })
    }

useEffect(() => {
if(!docs && user){
Axios.get(endPoint  + "/staff/showall" , {
    headers:{
        authorization:`Bearer ${token}`
    }
}).then(dataDocs=>{
   const getDocs = dataDocs.data.staff
   setdocs(getDocs.filter(filt=>{
    if(user.position === "Government Statistician (CEO)"
     || user.position === "Deputy Gov Statistician (DGS)"
      || user.department === "Human resource"
      ){
       return getDocs
   }else if(user.position === "Director" || user.position === "Deputy Director" ){
       if(filt.department === user.department){
           return filt
       }
   }else if(user.position === "Sectional Head"){
           if(filt.section === user.section){
             return filt
           }
   }else if(user.position === "Unit Head"){
       if(filt.section === user.unit){
         return filt
       }
   }else{
    getDocs.filter(filt =>{
           if(filt.staffId === user.staffId){
               setdocs(filt)
           }
       }) 
   }
 }))
   console.log(getDocs)
}).catch(err=>console.log(err.message))
}
})
    
const handleSearch = ()=>{
    setsearch(inputData)
}


const handleStatus = (doc)=>{
    setcurrent(doc)
    setcurrentId(doc._id)
    setOpen(true);
}

const Edit = ()=>{
    Axios.patch(endPoint + "/staff/updatestaff/" + currentId,
    {status:userStatus},
    {
     headers: {
          authorization: `Bearer ${token}`,
        
       }
        
    }
    ).then(()=>{
       alert("successfully updated")
       setOpen(false)
       setdocs(null)
   }).catch(err=>{
       alert(err.message)
       setOpen(false)

   })
}

const exportExcel = ()=>{
new Promise((resolve, reject) => {
  setexportTrigger(true)
  resolve()
}).then(()=>{
  setexportTrigger(false)
  setdropdown(0)
})
}

const TriggerDrop = ()=>{
    if(dropdown === 0){
      setdropdown(300)
    }else{
      setdropdown(0)
    }
  }
  return (
    <div className={print ? "" : "content"}>

        <Excel Trigger = {exportTrigger} />
   

        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Status for {current ?  current.surname + " " + current.middleName + " " + current.firstName  : ""}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the users status.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            select
            id="name"
            label="Select user status"
            type="email"
            defaultValue={current ? current.status : ""}
            fullWidth
            onChange={(e)=>setuserStatus(e.target.value)}
            variant="outlined"
          >
         <option value="leave">On Leave</option>
                    <option value="field">On Field</option>
                    <option value="post">On Post</option>
            </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={Edit}>Make Changes</Button>
        </DialogActions>
      </Dialog>
        {
        loading ? 
        <Loader />
        : ""
        }
        {
            !print ?
            <Nav />
            : ""
        } 

        <div className="">
        {
            !print ?
            <div>
                <div className= 'section padding-bottom-30'>
           <div className="white padding round-edge">
         <div className="row-flex">
            <div>
                <img src="/reports.svg" className='width-100' alt="" />
            </div>
            <div>
            <div className="h1">Staff Reports</div>
         <div className="section row-flex text-bold">
                    <Link href="/dashboard">Dashboard</Link>
                    /
                    <Link href="#">Staff Reports</Link>
                </div>
            </div>
         </div>
           </div>
        </div>

                <div className="row  card section fit">
                    <div className="padding-5 col sm-12 md-12 lg-12 text-bold"> FILTER DATA</div>
                <div className="padding-5 col sm-12 md-4 lg-4">
                    <select className='input light' placeholder="Department"  onChange={(e)=>setdepartment(e.target.value)}>
                        <option value="">All Departments</option>
                        {
                            Departments &&
                            Departments.map(docs=>(
                                <option value={docs.department} key={docs.department}> {docs.department} </option>
                            ))
                        }
                    </select>
                </div>
                <div className="padding-5 col sm-12 md-4 lg-4">
                    <select className='input light' placeholder="Section"  onChange={(e)=>setsection(e.target.value)}>
                        <option value="">All Sections</option>
                        {
                                Sections.filter(docs=>{
                                    if(department.toString().trim().toLowerCase() === docs.department.toString().trim().toLowerCase()){
                                        return docs
                                    }
                                }).map(docs=>(
                                    <option value={`${docs.section}`} key={docs.section}> {docs.section}</option>
                                ))
                            }
                    </select>
                </div>
                <div className="padding-5 col sm-12 md-4 lg-4">
                    <select className='input light' placeholder="Report"  onChange={(e)=>setreport(e.target.value)}>
                        <option value="all">All Data</option>
                        <option value="Department">Directorate</option>
                        <option value="Section">Section</option>
                        <option value="Position">Position</option>
                        <option value="Grade">Grade</option>
                        <option value="Employment Status">Employment Status</option>
                        <option value="Appointment Date">Appointment Date</option>
                        <option value="Salary Level">Salary Level</option>
                        <option value="Education">Education</option>
                        <option value="Retirement">Retirement</option>
                        <option value="Contact">Contact</option>
                        <option value="Marital Status">Marital Status</option>
                        <option value="Status">Status</option>
                    </select>
                </div>
                {/* <div className="padding-5 col sm-12 md-4 lg-4">
                    <TextField fullWidth defaultValue={""} label="Employment Status"  onChange={(e)=>setemployment(e.target.value)}>
                        <option value="">All</option>
                        <option value="permanent">Permanent</option>
                        <option value="contract">Contract</option>
                    </TextField>
                </div> */}
              
                </div>

                {
            !print ?
        <div className="row-flex fit space-between m-section">
            <div className="">
            <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Enter staff ID"
        // inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(e)=>{
            setinputData(e.target.value)
            if(e.target.value === ""){
                setsearch("")
               }
        }
        }
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
        <i className="icon-magnifier"></i>
      </IconButton>
      </Paper>
   
       
            </div>
          <div className="exportBtnContainer">
            
          <div className="dropDown">
      <div className="dropContent up" style={{maxHeight:`${dropdown}px`,overflow:"auto"}}>
        <div className='card'>
            <button className='btn p-text minSection full-width' onClick={exportExcel}>Excel</button>
            <button className='btn p-text minSection full-width' onClick={handlePrint}>PDF</button>
        </div>
      </div>
      <div className=' trigger' onClick={TriggerDrop}>
    <button className='exportBtn'><i className="lni lni-add-files"></i> Export Data</button>
      </div>
    </div>
          </div>
           {
            user.department === "Human resource" ?
            <Link href="/form/personal">
            <button className="button indigo text-white width-100-min">
            <i className="lni lni-user"></i> New Staff
             </button>
             </Link>
             :""
           }
        </div>
        :""
                }
                
            </div>
            :""}
            <div className="padding-top-20">
           {
            print ?
            <div className="h4 section text-center text-bold">Ghana Statistical Service</div> 
            :""
           }
           <p> 
            {

            }
           </p>
           <div className={!print ? "horizontal-scroll" : ""} style={{padding:"0px"}}>
            <div className="section row-flex space-between padding">
                <div className='text-bold'>department:{department ? department : "All departments"}</div>
                <div className='text-bold'>Section:{section ? section : "All section"}</div>
            </div>
     <TableContainer component={Paper}>
      <table className='table stripped' id="records">
        <thead>
          {
            exportTrigger ?
            <tr>
             <td style={{fontWeight:"bold", width:"200px"}}>Department: {department ? department : "All departments"}</td>
              <td style={{fontWeight:"bold", width:"200px"}}>Section: {section ? section : "All Sections"}</td> 
            </tr>
            :""
          }
          <tr>
            <td style={{fontWeight:"bold", width:"200px"}}>Staff ID</td>
            <td style={{fontWeight:"bold", width:"200px"}}>Email</td>
            <td style={{fontWeight:"bold", width:"200px"}} align="left">Full Name</td>
             {
              report === "all" || report === "Department" ?  
              <td style={{fontWeight:"bold", width:"200px"}} align="left">Department</td>
              :  ""}
              {  report === "all" || report === "Section" ?  
              <td style={{fontWeight:"bold", width:"200px"}} align="left">Section</td> 
              :""}
              {  report === "all" || report === "Grade" ?  
              <td style={{fontWeight:"bold", width:"200px"}} align="left">Grade</td> 
              :""}
              {
              report === "all" || report === "Position" ?  
              <td style={{fontWeight:"bold", width:"200px"}} align="left">Position</td>
              :  ""}{
              report === "all" || report === "Employment Status" ?  
              <td style={{fontWeight:"bold", width:"200px"}} align="left">Employment Status</td>
              :  ""}{
              report === "all" || report === "Appointment Date" ?  
              <td style={{fontWeight:"bold", width:"200px"}} align="left">Appointment Date</td>
              :  ""}{
              report === "all" || report === "Salary Level" ?  
              <td style={{fontWeight:"bold", width:"200px"}} align="left">Salary Level</td>
              :  ""}{
              report === "all" || report === "Education" ?  
              <td style={{fontWeight:"bold", width:"200px"}} align="left">Education</td>
              :  ""}{
              report === "all" || report === "Retirement" ?  
              <td style={{fontWeight:"bold", width:"200px"}} align="left">Retirement</td>
              :  ""}{
              report === "all" || report === "Contact" ?  
              <td style={{fontWeight:"bold", width:"200px"}} align="left">Contact</td>
              :  ""}{
              report === "all" || report === "Marital Status" ?  
              <td style={{fontWeight:"bold", width:"200px"}} align="left">Marital Status</td>
              :  ""}{
              report === "all" || report === "Status" ?  
              <td style={{fontWeight:"bold", width:"200px"}} align="left">Status</td>
              :  ""}
             

          </tr>
        </thead>
        <tbody>
          {docs ? docs
                .filter(filtdoc=>{
                    if(search === "" && 
                    department  === "" && 
                    section  === ""
                    ){
                        return filtdoc
                    }else if (section && department)
                  {
                   if( department.toString().trim().toLowerCase() === filtdoc.department.toString().trim().toLowerCase() &&
                   section.toString().trim().toLowerCase() === filtdoc.section.toString().trim().toLowerCase() )
                      {
                        return filtdoc
                      }else if(department && !section){
                        if(department.toString().trim().toLowerCase() === filtdoc.department.toString().trim().toLowerCase()){
                          return filtdoc
                        }
                      }else if(!department && section){
                        if(department.toString().trim().toLowerCase() === filtdoc.department.toString().trim().toLowerCase()){
                          return filtdoc
                        }
                      }
                    }
                  })
          .map((row) => (
            <tr
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <td component="th" scope="row">
                {row.staffId}
              </td>
              <td align="left">{row.email}</td>
              <td align="left">{row.surname} {row.middleName} {row.lastName}</td>
      
              {
              report === "all" || report === "Department" ?  
              <td style={{width:"200px"}} align="left">{row.department}</td>
              :  ""}
              {  report === "all" || report === "Section" ?  
              <td style={{ width:"200px"}} align="left">{row.section}</td> : ""
              }
              {  report === "all" || report === "Grade" ?  
              <td style={{ width:"200px"}} align="left">{row.grade}</td> : ""
              }
              {
              report === "all" || report === "Position" ?  
              <td style={{width:"200px"}} align="left">{row.position}</td>
              :  ""}
              {
              report === "all" || report === "Employment Status" ?  
              <td style={{ width:"200px"}} align="left">{row.employmentStatus}</td>
              :  ""}
              {
              report === "all" || report === "Appointment Date" ?  
              <td style={{ width:"200px"}} align="left">{row.appointDate}</td>
              :  ""}{
              report === "all" || report === "Salary Level" ?  
              <td style={{width:"200px"}} align="left">{row.salaryLevel}</td>
              :  ""}{
              report === "all" || report === "Education" ?  
              <td style={{ width:"300px"}} align="left">
                {row.school.map(sDoc=>(
                  <span key={sDoc.id}>
                   <div className="">
                   {sDoc.school} 
                   </div>
                    {/* {sDoc.start_date - sDoc.endDate} */}
                  </span>
                ))
                }

              </td>
              :  ""}{
              report === "all" || report === "Retirement" ?  
              <td style={{width:"200px"}} align="left">
                {row.retirementAge}
              </td>
              :  ""}{
              report === "all" || report === "Contact" ?  
              <td style={{ width:"200px"}} align="left">
                {row.contact.toString()}
              </td>
              :  ""}{
              report === "all" || report === "Marital Status" ?  
              <td style={{width:"200px"}} align="left">
                {row.maritalStatus}
              </td>
              :  ""}{
              report === "all" || report === "Status" ?  
              <td style={{width:"200px"}} align="left">
                {row.status}
              </td>
              :  ""}
            </tr>
          ))
        :""
        }
        </tbody>
      </table>
    </TableContainer>
           </div>
            </div>
        </div>
    </div>
  )
}
