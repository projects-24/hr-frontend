import Head from 'next/head'
import Link from 'next/link'
import {useState, useEffect} from "react"
import  Axios  from 'axios';
import endPoint from "../components/endPoint"
import Loader from '../components/loader';
import TextField from '@mui/material/TextField';
import Alert from '../Funcss/Components/Alert';
export default function Home() {
  const [email , setemail] = useState("")
    const [password , setpassword] = useState("")
    const [loader, setloader] = useState(false)
    const [message, setmessage] = useState("")
    useEffect(()=>{
      setTimeout(()=>{
          setmessage(null)
      }, 4000)
  },[message])
  const handleLogin = ()=>{
    if(email && password){
      setloader(true)
      Axios.post(endPoint + "/login" , {email : email , password:password})
      .then(doc=>{
        new Promise((resolve, reject) => {
          resolve()
          localStorage.setItem("user" , JSON.stringify(doc.data.staff))
          localStorage.setItem("token" , JSON.stringify(doc.data.token))
        }).then(()=>window.location.assign("/dashboard"))
      }).catch(err=>{
        if(err.message === "Request failed with status code 422"){
          setmessage("Wrong credentials")
          setloader(false)
        }else{
        setmessage(err.message)
        setloader(false)
        }
      
      })
    }else{
      setmessage("Make sure to enter your email and password")
      setloader(false)
     }
  }
  return (
    <div>
      <Head>
        <title>Hr Management</title>
        <meta name="description" content="Generated by create next app" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      {
        loader ?
        <Loader />
        :""
      }
            {
            message ?
           <div className="message">
             <Alert type="danger"  message={message}/>
           </div>
            :""
         }

      <div className="">
        <div className="central loginLeft gradient">
        <div>

        <div className="h1 text-white text-center">
            Ghana Statistical Service 
            <div className="section h2">
            Human Resource Management System 
            </div>
          </div>
        </div>
        </div>
        <div className="loginRight central">
        <div className="form">
      

        <div className='m-section'>
          <div className="h1">Login Account</div>
          <div className='text-bold'>
          Enter a valid email and password to login your account
         </div>
         </div>
         <div className="section card">
         <p>
          <TextField fullWidth label="Enter your email" variant="outlined" type="email" name=""  id="" placeholder='EMAIL' onChange={(e)=>setemail(e.target.value)}/>
         </p>
         <p>
          <TextField fullWidth label="Enter your password" variant="outlined" type="password" name=""  id="" placeholder='PASSWORD' onChange={(e)=>setpassword(e.target.value)}/>
         </p>
         <p>
         <button className="primaryBtn btn full-width" onClick={handleLogin}>LOGIN ACCOUNT</button>
         </p>
         </div>
        </div>
        </div>
      </div>

    </div>
  )
}
