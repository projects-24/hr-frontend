import Link from 'next/link'
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Nav from './../components/Nav';
import { useState,useEffect } from 'react';
import Loader from '../components/loader';
import Super from '../data/super';
import Account from "./account"
export default function Dashboard() {
    const [user, setuser] = useState("")  
    useEffect(() => {
      if(localStorage.getItem("token") && !user ){
        setuser(
          JSON.parse(
              localStorage.getItem("user")
          )
      )
          }
  
    })
const [data, setdata] = useState([
    {
      name: 'All Staffs',
      number: 4000,
    },
    {
      name: 'At Post',
      number: 2000,
    },
    {
      name: 'On Leave',
      number: 4000,
    },
    {
      name: 'Due Promotion',
      number: 1000,
    }
    ,
    {
      name: 'On Field',
      number: 500,
    }
    
  ])

 if(user){
  if(user.grade === Super){
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
                  user.grade === Super ?
                <div>
                    <div className="row m-section central">
                  <div className="col sm-12 md-2 lg-2 padding">
                      <div className="card padding text-center">
                          <img src="/select-users.png" className='fit' style={{maxWidth:"30px"}} alt="" />
                          <div className="section text-bold">
                              All staffs
                          </div>
                          <div className="h4 text-success">200</div>
                      </div>
                  </div>
                  <div className="col sm-12 md-2 lg-2 padding">
                      <div className="card padding text-center">
                          <img src="/select-users.png" className='fit' style={{maxWidth:"30px"}} alt="" />
                          <div className="section text-bold">
                              At post
                          </div>
                          <div className="h4 text-success">200</div>
                      </div>
                  </div>
                  <div className="col sm-12 md-2 lg-2 padding">
                      <div className="card padding text-center">
                          <img src="/leaveImg.png" className='fit' style={{maxWidth:"30px"}} alt="" />
                          <div className="section text-bold">
                              On leave
                          </div>
                          <div className="h4 text-success">200</div>
                      </div>
                  </div>
                  <div className="col sm-12 md-2 lg-2 padding">
                      <div className="card padding text-center">
                          <img src="/promotion.png" className='fit' style={{maxWidth:"30px"}} alt="" />
                          <div className="section text-bold">
                                promotion
                          </div>
                          <div className="h4 text-success">200</div>
                      </div>
                  </div>
                  <div className="col sm-12 md-2 lg-2 padding">
                      <div className="card padding text-center">
                          <img src="/post.png" className='fit' style={{maxWidth:"30px"}} alt="" />
                          <div className="section text-bold">
                               On Field
                          </div>
                          <div className="h4 text-success">200</div>
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
              :""
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
