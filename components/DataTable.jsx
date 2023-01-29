import React from 'react'
import { useState } from 'react'
import Departments from '../data/departments'
import Sections from '../data/sections'
import dynamic from "next/dynamic"
const Excel = dynamic(()=>import("./Excel") ,{ssr:false})
export default function DataTable({Docs, Columns}) {
    const [columsHide, setcolumsHide] = useState([])
    const [columsRender, setcolumsRender] = useState(true)
    const [openHideModal, setopenHideModal] = useState(false)
    const [department, setdepartment] = useState('')   
    const [section, setsection] = useState('')
const handleSelectedhide = (e)=>{
const val = JSON.parse(e.target.value)
// if(columsHide.find(doc=> doc.id === val.id)){

// }
new Promise((resolve, reject) => {
    setcolumsRender(false)
    columsHide.push(val)
    resolve()
    }).then(()=>{
    setcolumsRender(true)
    
    })
}

    const handleCloseHide = (doc)=>{
       new Promise((resolve, reject) => {
        setcolumsRender(false)
        resolve()
        setcolumsHide(
            columsHide.filter(filt=> filt.id != doc.id)
        )
       }).then(()=>{
        setcolumsRender(true)
       })
    }
    const [exportTrigger, setexportTrigger] = useState(false)
    const exportExcel = ()=>{
      new Promise((resolve, reject) => {
        setexportTrigger(true)
        resolve()
      }).then(()=>{
        setexportTrigger(false)
      })
      }
  return (
    <div>
      <Excel Trigger = {exportTrigger} />
      <div className="exportBtnContainer"> 
      <button className='btn p-text minSection full-width' onClick={exportExcel}>Export Excel</button>
            </div>
        <div className="tableFilter padding">
            <button className="filterBtn button" onClick={()=>setopenHideModal(true)}>
                hide or show columns
            </button>
            <div className="">
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
                <div className="">
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
        </div>
        {
            openHideModal ?
            <div className="filterModal">
            <span className="closeForm" onClick={()=>setopenHideModal(false)}>
          <i className="lni lni-close" ></i>
        </span>
                <div className="h3 padding hr">Hide and show columns</div>
                <div className="padding section">
                    <div>
                        {/* <div className='section h4'>Hide Column</div> */}
                        <div className="section">
                            <select name="" className='input' id="" onChange={handleSelectedhide}>
                                <option value="">Select columns to hide</option>
                                {
                                Columns ?
                                Columns.map(doc=>(
                                    <option key={doc.id} value={JSON.stringify(doc)}>
                                        {doc.name}
                                    </option>
                                )):""
                            }
                            </select>
                        </div>
                        <div className="row">
                            {
                                columsHide && columsRender ?
                                columsHide.map(doc=>(
                                    <div key={doc.id} style={{padding:"0.2rem"}} className=" col sm-6 md-3 lg-4" onClick={()=>handleCloseHide(doc)}>
                                    <div className='filterTab'>
                                    {doc.name} <i className="icon-close"></i>
                                      </div>    
                                    </div>
                                )):""
                            }
                        </div>
                    </div>
                </div>
            </div>
            :""
        }
        <div className="dTableContainer">
        <table className='dTable ' id='records'>
            <thead>
            <tr>
            <td  style={{fontWeight:"bold", width:"200px"}}>Staff ID</td>
            <td  style={{fontWeight:"bold", width:"200px"}}>Email</td>
            <td   style={{fontWeight:"bold", width:"200px"}} align="left">Full Name</td>
            {
                      !columsHide.find(doc=>doc.id === "d1") ?  
            <td id="d1" style={{fontWeight:"bold", width:"200px"}} align="left">Directorate</td>
            :  ""}
            {  !columsHide.find(doc=>doc.id === "d2") ?
            <td id="d2" style={{fontWeight:"bold", width:"200px"}} align="left">Section</td> 
            :  ""}
            {  !columsHide.find(doc=>doc.id === "d4") ?
            <td id="d3" style={{fontWeight:"bold", width:"200px"}} align="left">Grade</td> 
            :  ""}
            {  !columsHide.find(doc=>doc.id === "d3") ?
            <td id="d4" style={{fontWeight:"bold", width:"200px"}} align="left">Position</td>
            :  ""}
            {  !columsHide.find(doc=>doc.id === "d5") ?
            <td id="d5" style={{fontWeight:"bold", width:"200px"}} align="left">Employment Status</td>
            :  ""}
            {  !columsHide.find(doc=>doc.id === "d6") ?
            <td id="d6" style={{fontWeight:"bold", width:"200px"}} align="left">Appointment Date</td>
            :  ""}
            {  !columsHide.find(doc=>doc.id === "d7") ?
            <td id="d7" style={{fontWeight:"bold", width:"200px"}} align="left">Salary Level</td>
            :  ""}
            {  !columsHide.find(doc=>doc.id === "d8") ?
            <td id="d8" style={{fontWeight:"bold", width:"200px"}} align="left">Education</td>
            :  ""}
            {  !columsHide.find(doc=>doc.id === "d2") ?
            <td id="d9" style={{fontWeight:"bold", width:"200px"}} align="left">Retirement</td>
            :  ""}
            {  !columsHide.find(doc=>doc.id === "d9") ?
            <td id="d10" style={{fontWeight:"bold", width:"200px"}} align="left">Contact</td>
            :  ""}
            {  !columsHide.find(doc=>doc.id === "d10") ?
            <td id="d11" style={{fontWeight:"bold", width:"200px"}} align="left">Marital Status</td>
            :  ""}
            {  !columsHide.find(doc=>doc.id === "d11") ?
            <td id="d12" style={{fontWeight:"bold", width:"200px"}} align="left">Status</td>
            :""}
          </tr>
            </thead>
            <tbody>
              {
                Docs ?
                Docs  .filter(filtdoc=>{
                  if(
                  department  === "" && 
                  section  === ""
                  ){
                      return filtdoc
                  }else if (section || department)
                {
                 if( department.toString().trim().toLowerCase() === filtdoc.department.toString().trim().toLowerCase() &&
                 section.toString().trim().toLowerCase() === filtdoc.section.toString().trim().toLowerCase() )
                    {
                      return filtdoc
                    }else if(department && !section){
                      if(department.toString().trim().toLowerCase() === filtdoc.department.toString().trim().toLowerCase()){
                        return filtdoc
                      }
                    }else if(department && section){
                      if(
                        department.toString().trim().toLowerCase() === filtdoc.department.toString().trim().toLowerCase() &&
                        section.toString().trim().toLowerCase() === filtdoc.department.toString().trim().toLowerCase()
                        ){
                        return filtdoc
                      }
                    }
                  }
                }).map((row) => (
                    <tr
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <td component="th" scope="row">
                        {row.staffId}
                      </td>
                      <td align="left">{row.email}</td>
                      <td className='trOccupy' align="left">{row.surname} {row.middleName} {row.lastName}</td>
              
                      {
                      !columsHide.find(doc=>doc.id === "d1") ?  
                      <td  style={{width:"200px"}} align="left">{row.department}</td>
                      :  ""}
                      {  !columsHide.find(doc=>doc.id === "d2") ?  
                      <td style={{ width:"200px"}} align="left">{row.section}</td> : ""
                      }
                      {  !columsHide.find(doc=>doc.id === "d4") ?  
                      <td style={{ width:"200px"}} align="left">{row.grade}</td> : ""
                      }
                      {
                      !columsHide.find(doc=>doc.id === "d3") ?  
                      <td  style={{width:"200px"}} align="left">{row.position}</td>
                      :  ""}
                      {
                      !columsHide.find(doc=>doc.id === "d5") ?  
                      <td style={{ width:"200px"}} align="left">{row.employmentStatus}</td>
                      :  ""}
                      {
                      !columsHide.find(doc=>doc.id === "d6") ?  
                      <td style={{ width:"200px"}} align="left">{row.appointDate}</td>
                      :  ""}{
                        !columsHide.find(doc=>doc.id === "d7") ?  
                      <td  style={{width:"200px"}} align="left">{row.salaryLevel}</td>
                      :  ""}{
                        !columsHide.find(doc=>doc.id === "d8") ?  
                      <td className='trOccupy' style={{ width:"300px"}} align="left">
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
                        !columsHide.find(doc=>doc.id === "d9") ?  
                      <td  style={{width:"200px"}} align="left">
                        {row.retirementAge}
                      </td>
                      :  ""}{
                        !columsHide.find(doc=>doc.id === "d10") ?  
                      <td style={{ width:"200px"}} align="left">
                        {row.contact.toString()}
                      </td>
                      :  ""}{
                        !columsHide.find(doc=>doc.id === "d11") ?  
                      <td  style={{width:"200px"}} align="left">
                        {row.maritalStatus}
                      </td>
                      :  ""}{
                        !columsHide.find(doc=>doc.id === "d12") ?  
                      <td  style={{width:"200px"}} align="left">
                        {row.status}
                      </td>
                      :  ""}
                    </tr>
                  ))
                  :""
              }
            </tbody>
        </table>
        </div>
    </div>
  )
}
