import Link from 'next/link'
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Nav from './../components/Nav';
import { useState,useEffect } from 'react';
import Loader from '../components/loader';
import Super from '../data/super';
import Account from "./account"
import  Axios from 'axios';
import endPoint from '../components/endPoint';

export default function Dashboard() {
    const [user, setuser] = useState("")  
    const [docs, setdocs] = useState(null)
    const [token, settoken] = useState("")
    const [post, setpost] = useState(0)
    const [field, setfield] = useState(0)
    const [leave, setleave] = useState(0)
    const [isAdmin, setisAdmin] = useState(false)
    const [canUserApproveRequest, setcanUserApproveRequest] = useState(null)
  
    useEffect(() => {
    if(user && canUserApproveRequest === null){
      if(user.position === "Deputy Director" ||
        user.position === "Government Statistician (CEO)"
        || user.position === "Deputy Gov Statistician (DGS)" ||
        user.position === "Director" ||
        user.position === "Deputy Director" ||
        user.position === "Sectional Head"
        ){
          if(sessionStorage.getItem("userMode")){
            if(JSON.parse(sessionStorage.getItem("userMode")) === "admin"){
        setcanUserApproveRequest(true)
        setisAdmin(true)
            }else{
              setcanUserApproveRequest(false)
              setisAdmin(false)
            }
          }
      }else{
      // user do not have previlage
      }
    }
    })
    useEffect(() => {
      if(localStorage.getItem("token") && !user ){
        setuser(
          JSON.parse(
              localStorage.getItem("user")
          )
        )
          settoken(
            JSON.parse(
                localStorage.getItem("token")
            )
        )
      
          }
  
    })

    useEffect(() => {
      if(!docs){
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
      }).catch(err=>console.log(err.message))
      }
      })
          
const [data, setdata] = useState(null)

  useEffect(()=>{
    if(docs && !data){
     new Promise((resolve, reject)=>{

      resolve()
     }).then(()=>{

      setdata([
        {
          name: 'All Staffs',
          number: docs ? docs.length : "",
        },
        {
          name: 'At Post',
          number:docs.filter(doc=>{
            if(doc.status.toString().trim() === "post"){
           return doc
            }
          }).length,
        },
        {
          name: 'On Leave',
          number:docs.filter(doc=>{
            if(doc.status.toString().trim() === "leave"){
           return doc
            }
          }).length,
        },
        {
          name: 'On Field',
          number:docs.filter(doc=>{
            if(doc.status.toString().trim() === "field"){
           return doc
            }
          }).length,
        }
        
      ])
     })
    }
  })
 if(user && docs){
    return (
      <div className="">
        <div className='content'>
          <Nav />
    
          <div className="">
              <div className="card scaleIn">
              <div className="row-flex">
                <div>
                  <img src="/avatar.svg" className='width-100' alt="" />
                </div>
                <div style={{flex:"80%"}}>
                <div className="h1 p-text" style={{padding:"5px"}}>Dashboard And Analytics</div>
                <div className="section" style={{padding:"5px"}}>
                  Welcome  <span className="text-bold p-text">{user.title} {user.firstname}   {user.middleName} {user.lastName} </span>
              </div>
              <div className="row">
                <div className="col sm-12 md-6 lg-6 " style={{padding:"5px"}}>
                <span className="text-bold secondary-text" > Position:</span> {user.position}
                </div>
                <div className="col sm-12 md-6 lg-6 " style={{padding:"5px"}}>
                <span className="text-bold secondary-text" > Directorate:</span> {user.department}
                </div>
              </div>
              <div className="row">
                <div className="col sm-12 md-6 lg-6 " style={{padding:"5px"}}>
                <span className="text-bold secondary-text"> status:</span> {user.status}
                </div>
                <div className="col sm-12 md-6 lg-6 " style={{padding:"5px"}}>
                <span className="text-bold secondary-text"> Accum Leave days:</span> {user.no_of_leave_days}
                </div>
                <div className="col sm-12 md-6 lg-6 " style={{padding:"5px"}}>
                <span className="text-bold secondary-text"> Address:</span> {user.address}
                </div>
                <div className="col sm-12 md-6 lg-6 " style={{padding:"5px"}}>
                <span className="text-bold secondary-text"> Section:</span> {user.section}
                </div>
  
              </div>
             {/* {
              !user.auth_level ? */}
              <div style={{padding:"5px"}}>
              <span className="text-bold secondary-text"> Active service until:</span> {user.retirementAge}
              </div>
              {/* :""
             } */}
         
                </div>
              </div>
              </div>

              {
                 isAdmin ?
                <div>
                    <div className="row m-section central">
            {
              user.position != "Officer" ?
              <div className="col sm-12 md-2 lg-2 padding">
              <div className="card padding">
                  {/* <img src="/select-users.png" className='fit' style={{maxWidth:"30px"}} alt="" /> */}
                  <div className="section text-bold p-text">
                      All staffs
                  </div>
                  <div className="h2 secondary-text">
                    {docs.length}
                  </div>
              </div>
          </div>
          :""
            }
                  <div className="col sm-12 md-2 lg-2 padding">
                      <div className="card padding">
                          {/* <img src="/select-users.png" className='fit' style={{maxWidth:"30px"}} alt="" /> */}
                          <div className="section text-bold p-text">
                              On post
                          </div>
                          <div className="h2 secondary-text">
                          {docs.filter(doc=>{
                            if(doc.status.toString().trim() === "post"){
                              return doc
                            }
                          }).length}
                          </div>
                      </div>
                  </div>
                  <div className="col sm-12 md-2 lg-2 padding">
                      <div className="card padding">
                          {/* <img src="/leaveImg.png" className='fit' style={{maxWidth:"30px"}} alt="" /> */}
                          <div className="section text-bold p-text">
                              On leave
                          </div>
                          <div className="h2 secondary-text">
                          {docs.filter(doc=>{
                            if(doc.status.toString().trim() === "leave"){
                              return doc
                            }
                          }).length}
                          </div>
                      </div>
                  </div>
         
                  <div className="col sm-12 md-2 lg-2 padding">
                      <div className="card padding">
                          {/* <img src="/post.png" className='fit' style={{maxWidth:"30px"}} alt="" /> */}
                          <div className="section text-bold p-text">
                               On Field
                          </div>
                          <div className="h2 secondary-text"> 
                            {docs.filter(doc=>{
                            if(doc.status.toString().trim() === "field"){
                              return doc
                            }
                          }).length}
                          </div>
                      </div>
                  </div>
              </div>
              <div className="m-section">
                  <div className="card" style={{overflowX:"auto"}}>
                      <BarChart
            width={800}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 50,
              left: 50,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="number" fill="#8884d8" />
          </BarChart>
                  </div>
              </div>
                </div>
              :<></>
              }
          </div>
      </div>
      </div>
    )
 }else{
    return <Loader />
 }
}
