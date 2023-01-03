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
                <div>
                <div className="h1 p-text">Dashboard And Analytics</div>
                <div className="section">
                  Welcome  <span className="text-bold p-text">{user.title} {user.firstname}   {user.middleName} {user.lastName} </span>
              </div>
              <div className="row-flex section space-between">
                <div>
                <span className="text-bold"> Position:</span> {user.position}
                </div>
                <div>
                <span className="text-bold"> Department:</span> {user.department}
                </div>
              </div>
             {
              !user.auth_level ?
              <div>
              <span className="text-bold"> Active service until:</span> {user.retirementAge}
              </div>
              :""
             }
         
                </div>
              </div>
              </div>

              {
  
                <div>
                    <div className="row m-section central">
            {
              user.position != "Officer" ?
              <div className="col sm-12 md-2 lg-2 padding">
              <div className="card padding text-center">
                  <img src="/select-users.png" className='fit' style={{maxWidth:"30px"}} alt="" />
                  <div className="section text-bold">
                      All staffs
                  </div>
                  <div className="h4 text-success">
                    {docs.length}
                  </div>
              </div>
          </div>
          :""
            }
                  <div className="col sm-12 md-2 lg-2 padding">
                      <div className="card padding text-center">
                          <img src="/select-users.png" className='fit' style={{maxWidth:"30px"}} alt="" />
                          <div className="section text-bold">
                              On post
                          </div>
                          <div className="h4 text-success">
                          {docs.filter(doc=>{
                            if(doc.status.toString().trim() === "post"){
                              return doc
                            }
                          }).length}
                          </div>
                      </div>
                  </div>
                  <div className="col sm-12 md-2 lg-2 padding">
                      <div className="card padding text-center">
                          <img src="/leaveImg.png" className='fit' style={{maxWidth:"30px"}} alt="" />
                          <div className="section text-bold">
                              On leave
                          </div>
                          <div className="h4 text-success">
                          {docs.filter(doc=>{
                            if(doc.status.toString().trim() === "leave"){
                              return doc
                            }
                          }).length}
                          </div>
                      </div>
                  </div>
         
                  <div className="col sm-12 md-2 lg-2 padding">
                      <div className="card padding text-center">
                          <img src="/post.png" className='fit' style={{maxWidth:"30px"}} alt="" />
                          <div className="section text-bold">
                               On Field
                          </div>
                          <div className="h4 text-success"> 
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
              
              }
          </div>
      </div>
      </div>
    )
 }else{
    return <Loader />
 }
}
