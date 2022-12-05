import React from 'react'
import Nav from '../components/Nav'
import Link from 'next/link';

export default function Account() {
  return (
    <div>
        <Nav />
   <div className="content">
   <div className="row">
            <div className="col sm-12 md-4 lg-4 padding">
                <img src="/avatar.svg" className='fit' alt="" />
            </div>
            <div className="col sm-12 md-8 lg-8 padding">
          <div className="padding">
          <div className="h1">Iddris Abdul Wahab</div>
             <div className="section positionText">User Position</div>
          </div>
             <div className="row">
                <div className="col sm-12 md-6 lg-6 padding">
                   <span className="text-bold"> Department:</span> User department
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                   <span className="text-bold"> Contact:</span> User Contact
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                   <span className="text-bold"> Post:</span> User Post
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                   <span className="text-bold"> Directorate:</span> Directorate Post
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                   <span className="text-bold"> Section:</span> Section Post
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                   <span className="text-bold"> Position:</span> Position Post
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                  <Link href="/edit/account">
                  <button className="btn primaryBtn section full-width">
                  Update Profile <i className="icon-pencil"></i>
                  </button>
                  </Link>
                </div>
             </div>
            </div>
        </div>
   </div>
    </div>
  )
}
