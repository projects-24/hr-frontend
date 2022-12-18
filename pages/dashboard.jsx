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
          setdocs(dataDocs.data.staff)
      }).catch(err=>console.log(err.message))
      }
      })
          
const [data, setdata] = useState(null)

  useEffect(()=>{
    if(docs){
      setpost(
        docs.filter(doc=>{
          if(doc.status.toString().trim() === "post"){
         return doc
          }
        }).length
      )


   
      setleave(
        docs.filter(doc=>{
          if(doc.status.toString().trim() === "leave"){
         return doc
          }
        }).length
      )


   
      setfield(
        docs.filter(doc=>{
          if(doc.status.toString().trim() === "field"){
         return doc
          }
        }).length
      )


   

      setdata([
        {
          name: 'All Staffs',
          number: docs ? docs.length : "",
        },
        {
          name: 'At Post',
          number: post,
        },
        {
          name: 'On Leave',
          number: leave,
        },
        {
          name: 'On Field',
          number: field,
        }
        
      ])

    }
  })
 if(user && docs){
  if(user.position === "Director" 
  || user.position === "Government Statistician (CEO)" 
  || user.position === "Deputy Gov Statistician (DGS)"
  || user.position === "Deputy Director"
  || user.position === "Sectional Head"
  || user.position === "Unit Head"){
    return (
      <div className='content'>
          <Nav />
    
          <div className="">
              <div className="h1 p-text">Dashboard And Analytics</div>
              <p>
              <div className="h4">
                  Welcome  <span className="text-bold  h4">{user.title} {user.firstName}  {user.surname} </span>
              </div>
              </p>

              {
  
                <div>
                    <div className="row m-section central">
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
            width={600}
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
    )
  }else{
    return <Account />
  }
 }else{
    return <Loader />
 }
}
