import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const handleLogin = ()=>{
    window.location.assign("/dashboard")
  }
  return (
    <div>
      <Head>
        <title>Hr Management</title>
        <meta name="description" content="Generated by create next app" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className="">
        <div className="central loginLeft gradient">
          <img src="/connect.svg" className='fit' alt="" />
        </div>
        <div className="loginRight central">
        <div className="form">
          <div className="h1 p-text">
            GSS HR MANAGEMENT SYSTEM 
          </div>
        <div className='m-section'>
          <div className="h1">Login Account</div>
          <div className='text-bold'>
          Enter a valid email and password to login your account
         </div>
         </div>
         <p>
          <input type="email" name="" className='input' id="" placeholder='EMAIL'/>
         </p>
         <p>
          <input type="password" name="" className='input' id="" placeholder='PASSWORD'/>
         </p>
         <p>
         <button className="primaryBtn btn full-width" onClick={handleLogin}>LOGIN ACCOUNT</button>
         </p>
        </div>
        </div>
      </div>

    </div>
  )
}
