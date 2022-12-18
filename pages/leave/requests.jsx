import Link from 'next/link'
import Nav from './../../components/Nav';
import { useState , useEffect} from 'react';
import regions from '../../data/regions';
import Loader from '../../components/loader';
import Axios from 'axios';
import endPoint from '../../components/endPoint';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
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
export default function Profiling() {
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
            window.print()
            setprint(false)
        })
   
    }


useEffect(() => {
if(!docs){
Axios.get(endPoint  + "/annualleave/showall" , {
    headers:{
        authorization:`Bearer ${token}`
    }
}).then(dataDocs=>{
   const getDocs = dataDocs.data.annualleave
   setdocs(getDocs)
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
  if(user){
    return (
      <div className={print ? "" : "content"}>
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
           <MenuItem value="leave">On Leave</MenuItem>
                      <MenuItem value="field">On Field</MenuItem>
                      <MenuItem value="post">On Post</MenuItem>
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
          }        {
              !print ?
          <div className="row">
              <div className="col sm-12 md-6 lg-6 padding">
              <div className="h1">Leave Requests</div>
            <div className='text-bold section'>
            Check all leave request and approvals
           </div>
     
              </div>
  
          </div>
          :""
          }
  
          <div className="padding-top-20">
          {
              !print ?
              <div>
  
                  {
              !print ?
          <div className="section row-flex fit space-between">
              <div className="">
         
              </div>
              <div className="padding-5 ">
                  <button className="button success text-white width-100-min" onClick={handlePrint}>
              <i className="icon-printer"></i>    Print
              </button>
                  </div>
  
          </div>
          :""
                  }
                  
              </div>
              :""}
              <div className="padding-top-20">
             {
              print ?
              <div className="h4 section text-center text-bold">Ghana Statistical Service Leave Requests</div> 
              :""
             }
           
             <div className={!print ? "horizontal-scroll" : ""} style={{padding:"0px"}}>
  
        <table className="table stripped" >
          <thead>
            <tr>
              {/* <td style={{fontWeight:"bold"}} align="left">Full Name</td> */}
              <td style={{fontWeight:"bold"}} align="left">Date</td>
              <td style={{fontWeight:"bold"}} align="left">Deffered days</td>
              <td style={{fontWeight:"bold"}} align="left">Number of days</td>
              <td style={{fontWeight:"bold"}} align="left">Number of days remaining</td>
              <td style={{fontWeight:"bold"}} align="left">officer taking over</td>
              <td style={{fontWeight:"bold"}} align="left">Ressumption date</td>
              <td style={{fontWeight:"bold"}} align="left"> Div head approval</td>
              {
                user.position === "Sectional Head" ?
              <td style={{fontWeight:"bold"}} align="left"> Sec head approval</td>
              :""
              }
              {
                user.department === "Human resource" ?
                <td style={{fontWeight:"bold"}} align="left"> HR Approval</td>
                :""
              }
            </tr>
          </thead>
          <tbody>
            {docs ? docs
          //   .filter(filt=>{
          //      if(user.position === "Government Statistician (CEO)" || user.position === "Deputy Gov Statistician (DGS)"){
          //         setdocs(getDocs)
          //     }else if(user.position === "Director" || user.position === "Deputy Director" ){
          //         if(filt.department === user.department){
          //             return filt
          //         }
          //     }else if(user.position === "Sectional Head"){
          //             if(filt.section === user.section){
          //               return filt
          //             }
          //     }else if(user.position === "Unit Head"){
          //         if(filt.section === user.unit){
          //           return filt
          //         }
          //     }else{
          //         getDocs.filter(filt =>{
          //             if(filt.staffId === user.staffId){
          //                 setdocs(filt)
          //             }
          //         }) 
          //     }
          //   })
            .map((row) => (
              <tr
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {/* <td component="th" scope="row">
                  {row.staffId}
                </td> */}
                <td align="left">{row.date_of_leave}</td>
                <td align="left">{row.deferredDays}</td>
                <td align="left">{row.number_of_days}</td>
                <td align="left">{row.number_of_days_on_leave}</td>
                <td align="left">{row.officerTakingover}</td>
                <td align="left">{row.resumptionDate}</td>
                <td align="left">{row.divisionalheadApproval ? <i className="lni lni-checkmark text-success" /> : <i className="lni lni-close text-red" />}</td>
                { user.position === "Sectional Head" ? <td align="left"> {row.sectionheadApproval ? <i className="lni lni-checkmark text-success" /> : <i className="lni lni-close text-red" />} </td> : ""}
               {user.department === "Human resource" ? <td align="left">{row.hrdApproval ? <i className="lni lni-checkmark text-success" /> : <i className="lni lni-close text-red" />}</td> :""}
      
              </tr>
            ))
          :""
          }
          </tbody>
        </table>
             </div>
              </div>
          </div>
      </div>
    )
  }else{

    return ""
  }
}
