import Link from "next/link";
import { useEffect ,useState} from "react";
import Loader from './loader';

const Nav = () => {
  const [mode, setmode] = useState("")
  const [dropdown, setdropdown] = useState(0)
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
  const TriggerDrop = ()=>{
    if(dropdown === 0){
      setdropdown(300)
    }else{
      setdropdown(0)
    }
  }
 const getMode = ()=>{
  const lMode  = JSON.parse(localStorage.getItem("mode"))
    if(lMode === "black"){
      setmode("dark")
      document.documentElement.style.setProperty('--backgroundColor', 'black');
      document.documentElement.style.setProperty('--light', '#212223');
      document.documentElement.style.setProperty('--color', '#f1f1f1');
    }else{
      setmode("light")
      document.documentElement.style.setProperty('--backgroundColor', 'white');
      document.documentElement.style.setProperty('--light', '#f1f1f1');
      document.documentElement.style.setProperty('--color', '#black');
    }
  }


useEffect(()=>{
  getMode()
},[])

const handleMode = ()=>{
if(localStorage.getItem("mode")){
  const lMode  = JSON.parse(localStorage.getItem("mode"))
if(lMode === "black"){
  localStorage.setItem("mode" , 
  JSON.stringify("white")
  )
  getMode()
}else{
  localStorage.setItem("mode" , 
  JSON.stringify("black")
  )
  getMode()
}
}
}

useEffect(() => {
  if(!localStorage.getItem("token")){
     window.location.assign("/")
  }
})

const removeAct = ()=>{
  localStorage.removeItem("token")
}
const LogOut = ()=>{
removeAct(()=>window.location.assign("/"))
}
if(user){
  return ( 
    <div>
            <div className="navigationBar">
    <div>
      <Link href="/" >
     <span className="logo">
     HR Management
    </span>
      </Link>
    </div>
    <div>

    </div>
    <div>
      <div className="Avatar" onClick={handleMode}>
        {
          mode === "dark" ?
          <i className="lni lni-sun mode"></i>
          :
          <i className="lni lni-night mode"></i>
        }
    
      </div>
    </div>
  </div>
  <div className="leaveSidebar">

    <div className="">
    <Link href="/account">
        <div className='sideLink'>
        <i className="icon-user"></i> My Account
        </div>
    </Link>
    <Link href="/user/password">
        <div className='sideLink'>
        <i className="icon-shield"></i> Change password
        </div>
    </Link>
        <div className='sideLink' onClick={LogOut}>
        <i className="icon-logout"></i> Logout
        </div>
  <div className="section hr"></div>
    <Link href="/dashboard">
        <div className='sideLink'>
        <i className="icon-graph"></i> Dashboard
        </div>
      </Link>
    <Link href="/register">
        <div className='sideLink'>
        <i className="icon-user"></i> New Account
        </div>
      </Link>
      <div className="section hr"></div>

    <Link href="/staff/profiling">
        <div className='sideLink'>
        <i className="lni lni-users"></i> Staff Profiling
        </div>
      </Link>
    <Link href="/form/personal">
        <div className='sideLink'>
        <i className="lni lni-user"></i> New Staff
        </div>
      </Link>
      <div className="section hr"></div>
      <div className="dropDown">
      <div className='sideLink trigger' onClick={TriggerDrop}>
        <i className="icon-action-undo"></i> Leave Mgt {dropdown === 0 ? <i className="icon-arrow-down"></i> : <i className="icon-arrow-up"></i>}
        </div>
        <div className="dropContent" style={{maxHeight:`${dropdown}px`,overflow:"auto"}}>
        <Link href="/leave/annual">
        <div className='sideLink'>
        <i className="icon-user"></i> Annual Leave
        </div>
      </Link>
      <Link href="/leave/maternity">
        <div className='sideLink'>
        <i className="icon-login"></i> Maternity Leave
        </div>
      </Link>
      <Link href="/leave/casual">
        <div className='sideLink'>
        <i className="icon-grid"></i> Casual Leave
        </div>
      </Link>
      <Link href="/leave/study">
        <div className='sideLink'>
        <i className="icon-check"></i> Study Leave
        </div>
      </Link>
        </div>
      </div>
      <div className="section hr"></div>
      <Link href="/register">
        <div className='sideLink'>
        <i className="icon-direction"></i> Promotion Mgt
        </div>
      </Link>
      <div className="section hr"></div>

      <Link href="/register">
        <div className='sideLink'>
        <i className="icon-clock"></i> Retirement Mgt
        </div>
      </Link>

    </div>
  </div>
  
    </div>
 );
}else{
  return <Loader />
}
}
 
export default Nav;