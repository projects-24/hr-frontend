import Link from 'next/link'
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Nav from './../components/Nav';
const data = [
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
    
  ];
export default function Dashboard() {

  return (
    <div className='content'>
        <Nav />
        <div className="">
            <div className="h1 p-text">Dashboard And Analytics</div>
            <div>Check daily analytics and graphs</div>
            <div className="m-section row">
                <div className="col sm-6 md-3 lg-3 padding">
                    <Link href="/staff/profiling">
                    <button className="outlineBtn full-width">
                        Staff Profiling
                    </button>
                    </Link>
                </div>
                <div className="col sm-6 md-3 lg-3 padding">
                    <Link href="/">
                    <button className="outlineBtn full-width">
                        Leave
                    </button>
                    </Link>
                </div>
                <div className="col sm-6 md-3 lg-3 padding">
                    <Link href="/">
                    <button className="outlineBtn full-width">
                        Promotion
                    </button>
                    </Link>
                </div>
                <div className="col sm-6 md-3 lg-3 padding">
                    <Link href="/">
                    <button className="outlineBtn full-width">
                     Retirement
                    </button>
                    </Link>
                </div>
            </div>
            <div className="row m-section">
                <div className="col sm-12 md-3 lg-3 padding">
                    <div className="card padding text-center">
                        <img src="/select-users.png" className='fit width-50-max' alt="" />
                        <div className="section text-bold">
                            All staffs
                        </div>
                        <div className="h2 p-text">200</div>
                    </div>
                </div>
                <div className="col sm-12 md-3 lg-3 padding">
                    <div className="card padding text-center">
                        <img src="/select-users.png" className='fit width-50-max' alt="" />
                        <div className="section text-bold">
                            At post
                        </div>
                        <div className="h2 p-text">200</div>
                    </div>
                </div>
                <div className="col sm-12 md-3 lg-3 padding">
                    <div className="card padding text-center">
                        <img src="/LEAVE.png" className='fit width-50-max' alt="" />
                        <div className="section text-bold">
                            On leave
                        </div>
                        <div className="h2 p-text">200</div>
                    </div>
                </div>
                <div className="col sm-12 md-3 lg-3 padding">
                    <div className="card padding text-center">
                        <img src="/promotion.png" className='fit width-50-max' alt="" />
                        <div className="section text-bold">
                             Due promotion
                        </div>
                        <div className="h2 p-text">200</div>
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
            right: 30,
            left: 20,
            bottom: 5,
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
