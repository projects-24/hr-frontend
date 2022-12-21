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
if(!docs){
Axios.get(endPoint  + "/staff/showall" , {
    headers:{
        authorization:`Bearer ${token}`
    }
}).then(dataDocs=>{
   const getDocs = dataDocs.data.staff
   setdocs(getDocs)
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
        //     !print ?
        // <div className="row">
        //     <div className="col sm-12 md-6 lg-6 padding">
        //     <div className="h1">Staff Profiling</div>
        //   <div className='text-bold section'>
        //   Check all staffs, add and edit staff details and profile
        //  </div>
        //  <div className="section">
        //     <Link href="/dashboard">
        //        <div class="padding-top-10 text-bold p-text">
        //         <i className="icon-grid"></i> BACK TO DASHBOARD
        //        </div>
        //     </Link>
        //  </div>
        //     </div>
        //     <div className="col sm-12 md-6 lg-6 padding hide-small">
        //         <img src="/collaborate.svg" className='fit' alt="" />
        //     </div>
        // </div>
        // :""
        }

        <div className="padding-top-20">
        {
            !print ?
            <div>
                <div className= 'section'>
            <div className="h1">Staff Profiling</div>
          <div className='text-bold section'>
          Check all staffs, add and edit staff details and profile
         </div>
        </div>

                <div className="row padding border section fit">
                    <div className="padding-5 col sm-12 md-12 lg-12 text-bold"> FILTER DATA</div>
                <div className="padding-5 col sm-12 md-4 lg-4">
                    <TextField fullWidth label="Department" select name="" id=""  onChange={(e)=>setdepartment(e.target.value)}>
                        <MenuItem value="">All Departments</MenuItem>
                        {
                            Departments &&
                            Departments.map(docs=>(
                                <MenuItem value={docs.department} key={docs.department}> {docs.department} </MenuItem>
                            ))
                        }
                    </TextField>
                </div>
                <div className="padding-5 col sm-12 md-4 lg-4">
                    <TextField fullWidth label="Section" select name="" id=""  onChange={(e)=>setsection(e.target.value)}>
                        <MenuItem value="">All Sections</MenuItem>
                        {
                            Sections &&
                            Sections.map(docs=>(
                                <MenuItem value={docs.section} key={docs.section}> {docs.section} </MenuItem>
                            ))
                        }
                    </TextField>
                </div>
                <div className="padding-5 col sm-12 md-4 lg-4">
                    <TextField fullWidth defaultValue={""} label="Employment Status" select name="" id=""  onChange={(e)=>setemployment(e.target.value)}>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="permanent">Permanent</MenuItem>
                        <MenuItem value="contract">Contract</MenuItem>
                    </TextField>
                </div>
              
                </div>

                {
            !print ?
        <div className="section row-flex fit space-between">
            <div className="">
            <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Enter staff Id"
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
            <div className="padding-5 ">
            <button className="button info text-white width-100-min" onClick={handlePrint}>
            <i className="icon-printer"></i>    Print
            </button>
           <Link href="/register">
           <button className="button success text-white width-100-min">
            <i className="icon-user"></i> New Account
            </button>
            </Link>
           <Link href="/form/personal">
           <button className="button indigo text-white width-100-min">
           <i className="lni lni-user"></i> New Staff
            </button>
            </Link>
                </div>

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
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bold"}}>Staff ID</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="left">Full Name</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="left">Department</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="left">Grade</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="left">Section</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="left">Employment Status</TableCell>
            {/* <TableCell style={{fontWeight:"bold"}} align="left"> Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
            {
                // .filter(doc=>{
                //     if(search === "" && 
                //     department  === "" && 
                //     section  === "" && 
                //     employment  === ""
                //     ){
                //         return docs
                //     }else if(
                //         search.toString().trim().toLowerCase().includes(doc.staffId.toString().trim().toLowerCase()) ||
                //         department.toString().trim().toLowerCase() === doc.department.toString().trim().toLowerCase() ||
                //         section.toString().trim().toLowerCase() === doc.section.toString().trim().toLowerCase() ||
                //         employment.toString().trim().toLowerCase() === doc.employmentStatus.toString().trim().toLowerCase() 
                //     ){
                //         return doc
                //     }
                //   }).filter
            }
          {docs ? docs.filter(filt=>{
             if(user.position === "Government Statistician (CEO)"
              || user.position === "Deputy Gov Statistician (DGS)"
               || user.department === "Human resource"
               ){
                return docs
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
          })
                .filter(doc=>{
                    if(search === "" && 
                    department  === "" && 
                    section  === "" && 
                    employment  === ""
                    ){
                        return docs
                    }else if(
                        search.toString().trim().toLowerCase().includes(doc.staffId.toString().trim().toLowerCase()) ||
                        department.toString().trim().toLowerCase() === doc.department.toString().trim().toLowerCase() ||
                        section.toString().trim().toLowerCase() === doc.section.toString().trim().toLowerCase() ||
                        employment.toString().trim().toLowerCase() === doc.employmentStatus.toString().trim().toLowerCase() 
                    ){
                        return doc
                    }
                  })
          .map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.staffId}
              </TableCell>
              <TableCell align="left">{row.surname} {row.middleName} {row.lastName}</TableCell>
              <TableCell align="left">{row.department}</TableCell>
              <TableCell align="left">{row.grade}</TableCell>
              <TableCell align="left">{row.section}</TableCell>
              <TableCell align="left">{row.employmentStatus}</TableCell>
              {/* <TableCell align="left">
             <div className="avatar" onClick={()=>handleStatus(row)}>
              {row.status  === "post" ? <i className="lni lni-checkmark text-success"></i> : row.status  === "leave" ? <i className="lni lni-close text-danger"></i> : row.status  === "field" ? <i className="lni lni-checkmark text-info"></i> : ""}
             </div>
              </TableCell> */}
            </TableRow>
          ))
        :""
        }
        </TableBody>
      </Table>
    </TableContainer>
           </div>
            </div>
        </div>
    </div>
  )
}
