import Link from 'next/link'
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Nav from './../components/Nav';
import { useState } from 'react';

export default function Dashboard() {
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
  return (
    <div className='content'>
        <Nav />
        <div className="">
            <div className="h1 p-text">Dashboard And Analytics</div>
            <div className='section text-bold'>Check daily analytics and graphs</div>
            {/* <div className="m-section row">
                <div className="col sm-6 md-3 lg-3 padding">
                    <Link href="/staff/profiling">
                    <button className="outlineBtn full-width">
                        Staff Profiling
                    </button>
                    </Link>
                </div>
                <div className="col sm-6 md-3 lg-3 padding">
                    <Link href="/staff/leave">
                    <button className="outlineBtn full-width">
                        Leave Mgt
                    </button>
                    </Link>
                </div>
                <div className="col sm-6 md-3 lg-3 padding">
                    <Link href="/staff/promotion">
                    <button className="outlineBtn full-width">
                        Promotion Mgt
                    </button>
                    </Link>
                </div>
                <div className="col sm-6 md-3 lg-3 padding">
                    <Link href="/staff/retirement">
                    <button className="outlineBtn full-width">
                     Retirement Mgt
                    </button>
                    </Link>
                </div>
            </div> */}
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
    </div>
  )
}
