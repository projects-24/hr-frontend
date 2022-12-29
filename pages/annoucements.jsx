import Link from 'next/link';
import React from 'react'
import Nav from './../components/Nav';

export default function Annoucement() {
  return (
    <div>
        <Nav />
        <div className="content">
        <div className="row-flex fit white round-edge padding section">
            <img src="/annoucement.svg" className='width-200-max fit' alt="" />
            <div>
            <div className="h1">
                Annoucements
        </div>
        <div className="section row-flex text-bold">
                    <Link href="/dashboard">Dashboard</Link>
                    /
                    <Link href="#">Annoucements</Link>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}
