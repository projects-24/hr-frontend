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
import DirectionsIcon from '@mui/icons-material/Directions';

export default function Profiling() {
    const [search, setsearch] = useState("")
    const [inputData, setinputData] = useState("")
    const [print, setprint] = useState(false)
    const [leave, setleave] = useState(false)
    const [loading, setloading] = useState(false)
    const [directorate, setdirectorate] = useState("")
    const [token, settoken] = useState("")
    const [user, setuser] = useState("")  
    const [docs, setdocs] = useState(null)
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
    setdocs(dataDocs.data.staff)
}).catch(err=>console.log(err.message))
}
})
    
const handleSearch = ()=>{
    setsearch(inputData)
 
}
  return (
    <div className={print ? "" : "content"}>
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
            <div className="h1">Staff Profiling</div>
          <div className='text-bold section'>
          Check all staffs, add and edit staff details and profile
         </div>
         <div className="section">
            <Link href="/dashboard">
               <div class="padding-top-10 text-bold p-text">
                <i className="icon-grid"></i> BACK TO DASHBOARD
               </div>
            </Link>
         </div>
            </div>
            <div className="col sm-12 md-6 lg-6 padding hide-small">
                <img src="/collaborate.svg" className='fit' alt="" />
            </div>
        </div>
        :""
        }

        <div className="padding-top-20">
        {
            !print ?
            <div>

                {/* <div className="row padding border section fit shadow">
                    <div className="padding-5 col sm-12 md-12 lg-12 text-bold"> FILTER </div>
                <div className="padding-5 col sm-12 md-2 lg-2">
                    <select name="" id="" className="input">
                        <option value="">Post</option>
                        {
                            regions.map(docs=>(
                                <option value={docs.name} key={docs._id}> {docs.name} </option>
                            ))
                        }
                    </select>
                </div>
                <div className="padding-5 col sm-12 md-2 lg-2">
                    <select name="" id="" className="input" onChange={(e)=>setdirectorate(e.target.value)}>
                        <option value="">Directorate</option>
                        <option value="it">IT</option>
                        <option value="soc">SOC</option>
                        <option value="datascience">Data Science</option>
                    </select>
                </div>
                <div className="padding-5 col sm-12 md-2 lg-2">
                    <select name="" id="" className="input">
                        <option value="">Section</option>
                    {
                        directorate === "it" ?
                        <>
                        <option value="infrustructure">Infrastructure</option>
                        <option value="itsupport">IT Support</option>
                        <option value="database">Database / Application</option>
                        </>
                        : directorate === "soc" ?
                        <>
                        <option value="infrustructure">Soc 1</option>
                        <option value="itsupport">Soc 2</option>
                        <option value="database">Soc 3</option>
                        </>
                        : directorate === "datascience" ?
                        <>
                        <option value="infrustructure">Data Science 1</option>
                        <option value="itsupport">Data Science 2</option>
                        <option value="database">Data Science 3</option>
                        </>
                        :
                        ""
                    }
                    </select>
                </div>
                <div className="padding-5 col sm-12 md-2 lg-2">
                    <select name="" id="" className="input" onChange={(e)=>setleave(e.target.value)}>
                        <option value="">Leave</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                {
                    leave != "yes" ? 
                    <div className="padding-5 col sm-12 md-2 lg-2">
                    <select name="" id="" className="input">
                        <option value="">On Field</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                :""

                }
                            {
                    leave != "yes" ? 
                <div className="padding-5 col sm-12 md-2 lg-2">
                    <select name="" id="" className="input">
                        <option value="">On Post</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                :""
                }
                </div> */}

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
            <div className="h4 section text-center text-bold">Ghana Statistical Service</div> 
            :""
           }
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
          </TableRow>
        </TableHead>
        <TableBody>
          {docs ? docs.filter(doc=>{
            if(search === ""){
                return docs
            }else if(
                search.toString().trim().toLowerCase().includes(doc.staffId.toString().trim().toLowerCase())
            ){
                return doc
            }
          }).map((row) => (
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
