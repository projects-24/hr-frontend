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
import DaysLeft from './../components/daysLeft';
import Typography from 'funuicss/component/Typography'
import dynamic from 'next/dynamic'
const _Bar = dynamic(()=>import("./../components/Chart/_Bar") ,{ssr:false})
const _Liquid = dynamic(()=>import("./../components/Chart/_Liquid") ,{ssr:false})

export default function Dashboard() {
    const [user, setuser] = useState({
      title: "Mr.",
      firstname: "John",
      middleName: "Doe",
      lastName: "Smith",
      position: "Manager",
      department: "Human Resources",
      status: "Active",
      no_of_leave_days: 10,
      address: "123 Main St, City",
      section: "Admin",
      retirementAge: 2050
    })  

    const data = [
      {
        name: 'All Staffs',
        number: 100,
      },
      {
        name: 'At Post',
        number: 25, // Replace with the actual number of staff at post
      },
      {
        name: 'On Leave',
        number: 10, // Replace with the actual number of staff on leave
      },
      {
        name: 'On Field',
        number: 15, // Replace with the actual number of staff on field
      }
    ];

    const [docs, setdocs] = useState(null)
    const [token, settoken] = useState("")
    const [post, setpost] = useState(0)
    const [field, setfield] = useState(0)
    const [leave, setleave] = useState(0)
    const [isAdmin, setisAdmin] = useState(false)
    const [canUserApproveRequest, setcanUserApproveRequest] = useState(null)
  
    // useEffect(() => {
    // if(user && canUserApproveRequest === null){
    //   if(user.position === "Deputy Director" ||
    //     user.position === "Government Statistician (CEO)"
    //     || user.position === "Deputy Gov Statistician (DGS)" ||
    //     user.position === "Director" ||
    //     user.position === "Deputy Director" ||
    //     user.position === "Sectional Head"
    //     ){
    //       if(sessionStorage.getItem("userMode")){
    //         if(JSON.parse(sessionStorage.getItem("userMode")) === "admin"){
    //     setcanUserApproveRequest(true)
    //     setisAdmin(true)
    //         }else{
    //           setcanUserApproveRequest(false)
    //           setisAdmin(false)
    //         }
    //       }
    //   }else{
    //   // user do not have previlage
    //   }
    // }
    // })

    // useEffect(() => {
    //   if(!docs){
    //   Axios.get(endPoint  + "/staff/showall" , {
    //       headers:{
    //           authorization:`Bearer ${token}`
    //       }
    //   }).then(dataDocs=>{
    //     const getDocs = dataDocs.data.staff
    //       setdocs(getDocs.filter(filt=>{
    //         if(user.position === "Government Statistician (CEO)"
    //          || user.position === "Deputy Gov Statistician (DGS)"
    //           || user.department === "Human Resource"
    //           || user.department.trim() + user.position.trim() === "AdministrationDirector"
    //           ){
    //            return getDocs
    //        }else if(user.position === "Director" || user.position === "Deputy Director" ){
    //            if(filt.department === user.department){
    //                return filt
    //            }
    //        }else if(user.position === "Sectional Head"){
    //                if(filt.section === user.section){
    //                  return filt
    //                }
    //        }else if(user.position === "Unit Head"){
    //            if(filt.section === user.unit){
    //              return filt
    //            }
    //        }else{
    //         getDocs.filter(filt =>{
    //                if(filt.staffId === user.staffId){
    //                    setdocs(filt)
    //                }
    //            }) 
    //        }
    //      }))
    //   }).catch(err=>console.log(err.message))
    //   }
    //   })
          
// const [data, setdata] = useState(null)

//   useEffect(()=>{
//     if(docs && !data){
//      new Promise((resolve, reject)=>{

//       resolve()
//      }).then(()=>{

//       setdata([
//         {
//           name: 'All Staffs',
//           number: docs ? docs.length : "",
//         },
//         {
//           name: 'At Post',
//           number:docs.filter(doc=>{
//             if(doc.status.toString().trim() === "post"){
//            return doc
//             }
//           }).length,
//         },
//         {
//           name: 'On Leave',
//           number:docs.filter(doc=>{
//             if(doc.status.toString().trim() === "leave"){
//            return doc
//             }
//           }).length,
//         },
//         {
//           name: 'On Field',
//           number:docs.filter(doc=>{
//             if(doc.status.toString().trim() === "field"){
//            return doc
//             }
//           }).length,
//         }
        
//       ])
//      })
//     }
//   })
    return (
      <div className="">
        <div className='content'>
          <Nav />
    
          <div className="">
            <div className="margin-bottom-30">
              <Typography
              text="Dashboard And Analytics"
              lighter
              heading='h2'
              />
              <div />
              <Typography
              text={
                <>
                  Welcome  <span className="text-bold p-text">{user.title} {user.firstname}   {user.middleName} {user.lastName} </span>
                </>
              }
              />
            </div>
              <div className="_card relative">
              <div className="_dashboard_image_wrapper lighter border">
              <img src="/avatar.svg" className='_dashboard_image' alt="" />
              </div>
              <div className="row-flex">
                <div>
           
                </div>
                <div style={{flex:"80%"}}>
                <div className="section row-flex space-between" style={{padding:"2px 5px"}}>
                  <div>
                
                  </div>
                  <div >
                <span className="secondary-text" > Position:</span> <span className='success text-white text-small round-edge text-bold' style={{padding:"2px 5px"}}> {user.position}</span> 
                </div>
              </div>
                
              <div className="row">
                <div className="col sm-12 md-6 lg-6 " style={{padding:"2px 5px"}}>
                <span className="secondary-text" > Directorate:</span> {user.department}
                </div>
              </div>
              
                <div className="row">
                <div className="col sm-12 md-6 lg-6 " style={{padding:"2px 5px"}}>
                <span className="secondary-text"> status:</span> {user.status}
                </div>
                <div className="col sm-12 md-6 lg-6 " style={{padding:"2px 5px"}}>
                <span className="secondary-text"> Accum Leave days:</span> {user.no_of_leave_days}
                </div>
                <div className="col sm-12 md-6 lg-6 " style={{padding:"2px 5px"}}>
                <span className="secondary-text"> Address:</span> {user.address}
                </div>
                <div className="col sm-12 md-6 lg-6 " style={{padding:"2px 5px"}}>
                <span className="secondary-text"> Section:</span> {user.section}
                </div>
                <div  className="col sm-12 md-12 lg-12" style={{padding:"2px 5px"}}>
              <span className="secondary-text"> Active Years Left:</span> <span> <DaysLeft Year={user.retirementAge} funcss="text-bold"/> </span>
              </div>
  
              </div>
             
                </div>
              </div>
              </div>

                <div>
                {
              user.position != "Officer" ?
              <>
                    <div className="row m-section central">
         
              <div className="col sm-12 md-3 lg-3 padding">
              <div className="_card">
                  <div className="text-small" style={{color:"#909090"}}>
                      All staffs
                  </div>
                  <div className="h2">
                    {200}
                  </div>
              </div>
          </div>
        
                  <div className="col sm-12 md-3 lg-3 padding">
                      <div className="_card">
                          <div className="text-small" style={{color:"#909090"}}>
                              On post
                          </div>
                          <div className="h2">
               
                          {20}
                          </div>
                      </div>
                  </div>
                  <div className="col sm-12 md-3 lg-3 padding">
                      <div className="_card">
                          {/* <img src="/leaveImg.png" className='fit' style={{maxWidth:"30px"}} alt="" /> */}
                          <div className="text-small" style={{color:"#909090"}}>
                              On leave
                          </div>
                          <div className="h2">
                              {20}
                          </div>
                      </div>
                  </div>
         
                  <div className="col sm-12 md-3 lg-3 padding">
                      <div className="_card">

                          <div className="text-small" style={{color:"#909090"}}>
                               On Field
                          </div>
                          <div className="h2"> 
                          {20}
                          </div>
                      </div>
                  </div>
                  <div className="m-section">
                    <div className="row-flex">
                      <div className="">
                      <div className="_card" style={{overflowX:"auto"}}>
                   <div className="section">
                   <Typography
                    text="Staff"
                    />
                    <div />
                    <Typography
                    text="Status"
                    heading="h4"
                    />
                   </div>
                  <_Bar data={data} />
                  </div>
                      </div>
                     
                    </div>
              
              </div>
              </div>
             
              </>
              :""
            }
     
                </div>
           
          </div>
      </div>
      </div>
    )
          }
