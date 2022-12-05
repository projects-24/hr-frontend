import Link from 'next/link'
import React from 'react'
import Nav from './../../components/Nav';
import { useState } from 'react';
import regions from '../../data/regions';
import Loader from '../../components/loader';
export default function Profiling() {
    const [search, setsearch] = useState("")
    const [print, setprint] = useState(false)
    const [leave, setleave] = useState(false)
    const [loading, setloading] = useState(false)
    const [directorate, setdirectorate] = useState("")
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
  return (
    <div className='content'>
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
                {
            !print ?
        <div className="section row">
            <div className="col sm-12 lg-8 md-8 padding">
             <div className="row-flex">
             <input type="text" className='input' style={{maxWidth:"300px"}} placeholder='Search for staff' onChange={(e)=>setsearch(e.target.value)} />
             <button className="info text-white button">
            <i className="icon-magnifier" />  Search
             </button>
             </div>
            </div>
            <div className="col sm-12 lg-4 md-4 padding">
                <button className="btn primaryBtn full-width" onClick={()=>window.location.assign("/form/personal")}>
                <i class="lni lni-plus"></i>  NEW STAFF
                </button>
            </div>
        </div>
        :""
                }
        <div className="padding-top-20">
        {
            !print ?
            <div className="section row">
                <div className="padding-5 col sm-12 md-12 lg-12">
                <button className="button success text-white width-100-min" onClick={handlePrint}>
            <i className="icon-printer"></i>    Print
            </button>
                </div>
                <div className="row padding border section fit shadow">
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
                </div>
                
            </div>
            :""}
            <div className="padding-top-20">
           {
            print ?
            <div className="h4 section text-center text-bold">Ghana Statistical Service</div> 
            :""
           }
           <div className="horizontal-scroll shadow" style={{padding:"0px"}}>
           <table className='table border text-center  text-small'>
                <thead>
                    <th>Full Name</th>
                    <th>Post</th>
                    <th>Directorate</th>
                    <th>Contact</th>
                    <th>At Post</th>
                    <th>on Leave</th>
                    <th>on Field</th>
                {
                    !print ?
                    <th>Edit</th>
                    :""
                }
                </thead>
                <tbody>
                    <tr>
                        <td>Iddris Abdul Wahab</td>
                        <td>GSS</td>
                        <td>Wa</td>
                        <td>0552500930</td>
                        <td><i className="lni lni-checkmark text-success"></i></td>
                        <td><i className="lni lni-close text-red"></i></td>
                        <td><i className="lni lni-checkmark text-success"></i></td>
                        <td>
                        {
                    !print ?
                            <button className='button text-info'>
                            <i className="lni lni-pencil"></i> Edit
                            </button>
                            :""
                        }
                        </td>
                    </tr>
                    <tr>
                        <td>Iddris Abdul Wahab</td>
                        <td>GSS</td>
                        <td>Wa</td>
                        <td>0552500930</td>
                        <td><i className="lni lni-checkmark text-success"></i></td>
                        <td><i className="lni lni-close text-red"></i></td>
                        <td><i className="lni lni-checkmark text-success"></i></td>
                        <td>
                        {
                    !print ?
                            <button className='button text-info'>
                            <i className="lni lni-pencil"></i> Edit
                            </button>
                            :""
                        }
                        </td>
                    </tr>
                    <tr>
                        <td>Iddris Abdul Wahab</td>
                        <td>GSS</td>
                        <td>Wa</td>
                        <td>0552500930</td>
                        <td><i className="lni lni-checkmark text-success"></i></td>
                        <td><i className="lni lni-close text-red"></i></td>
                        <td><i className="lni lni-checkmark text-success"></i></td>
                        <td>
                        {
                    !print ?
                          <Link href="/edit/account">
                              <button className='button text-info'>
                            <i className="lni lni-pencil"></i> Edit
                            </button>
                          </Link>
                            :""
                        }
                        </td>
                    </tr>
    

                </tbody>
            </table>
           </div>
            </div>
        </div>
    </div>
  )
}
