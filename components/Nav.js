import Link from "next/link";
import { useEffect ,useState} from "react";
import Loader from './loader';
import endPoint from "./endPoint";
import  Axios  from 'axios';
import Navbar from 'funuicss/component/Navbar'
import Typography from 'funuicss/component/Typography'
import SidebarTrigger from 'funuicss/component/SidebarTrigger'
import LinkWrapper from 'funuicss/component/LinkWrapper'
import NavLink from 'funuicss/component/NavLink'
import Icon from 'funuicss/component/Icon'
import Button from 'funuicss/component/Button'
import NavLogo from 'funuicss/component/NavLogo'
import Div from 'funuicss/component/Div'
import DropDown from 'funuicss/component/DropDown'
import DropMenu from 'funuicss/component/DropMenu'
import DropItem from 'funuicss/component/DropItem'
const Nav = ({noSideBar}) => {
  const [mode, setmode] = useState("")
  const [dropdown, setdropdown] = useState(0)
  const [dropdown2, setdropdown2] = useState(0)
  const [user, setuser] = useState([])  
  const [dropTrigger, setdropTrigger] = useState(false)
  const [open, setOpen] = useState(false)
  const [scrolledState, setscrolledState] = useState(0)
  const [navDrop, setnavDrop] = useState(false)
  const [getNotification, setgetNotification] = useState(true)
  const [dropDown, setdropDown] = useState(false)
  const [docs, setdocs] = useState(null)
  const [token, settoken] = useState("")
  const [notNumber, setnotNumber] = useState(0)
  const [myNots, setmyNots] = useState("")
  const [isAdmin, setisAdmin] = useState(false)
  const [checkAnnual, setcheckAnnual] = useState(true)
  const [canUserApproveRequest, setcanUserApproveRequest] = useState(null)
  const [notDocs, setnotDocs] = useState(null)
const [userNot, setuserNot] = useState("")
const [leavePlaningNot, setleavePlaningNot] = useState("")
const [showNots, setshowNots] = useState(true)

const [drop1, setdrop1] = useState(false);

            useEffect(() => {
             const drop = document.querySelector(".myBtn")
             window.addEventListener("click" ,(e)=>{
                if(e.target != drop){
                  setdrop1(false)
                }else{
                   setdrop1(!drop1)
                }
             })
            },[])
  useEffect(() => {
  if(user && canUserApproveRequest === null){
    if(user.position === "Deputy Director" ||
      user.position === "Government Statistician (CEO)"
      || user.position === "Deputy Gov Statistician (DGS)" ||
      user.position === "Director" ||
      user.position === "Deputy Director" ||
      user.position === "Sectional Head"
      ){
              setcanUserApproveRequest(true)
      setisAdmin(true)
      //   if(sessionStorage.getItem("userMode")){
      //     if(JSON.parse(sessionStorage.getItem("userMode")) === "admin"){
      // setcanUserApproveRequest(true)
      // setisAdmin(true)
      //     }else{
      //       setcanUserApproveRequest(false)
      //       setisAdmin(false)
      //     }
      //   }
        
    }else{
    // user do not have previlage
    }
  }
  })

  // useEffect(() => {
  //   if(user && !isAdmin){
  //     if(
  //     user.position === "Director" 
  //     || user.position === "Government Statistician (CEO)" 
  //     || user.position === "Deputy Gov Statistician (DGS)"
  //     || user.position === "Deputy Director"
  //     || user.position === "Sectional Head"
  //     || user.position === "Unit Head"
  //     ){
  //     setisAdmin(true)
  //     }
  //     }
  // })
  
  
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
        }else{
  
        }

  })

  // update annual leave
  useEffect(() => {
  if(checkAnnual){
    if(user && token){
      const currentYear  = parseInt(user.current_year) 
      if(parseInt(currentYear) === parseInt(user.next_year)){
        Axios.patch(endPoint + "/staff/updatestaff/" + user._id ,{
          annual_year_accum: parseInt(user.annual_year_accum) < 2 ? parseInt(user.annual_year_accum) + 1 : 1,
          current_year:parseInt(currentYear),
          next_year:parseInt(currentYear) + 1,
          annual_leave_days: parseInt(user.annual_year_accum) < 2 ? parseInt(user.annual_leave_days) + 36 : 36
        }, {
          headers:{
            authorization:`Bearer ${token}`
          }
        }
         ).then(()=>{
          setcheckAnnual(false)
         }).catch(err=>console.log(err.message))
      }else{
        setcheckAnnual(false)
      }
  }
  }
  })
  
  const [showLeaveplaningMessages, setshowLeaveplaningMessages] = useState(false)
        
    useEffect(() => {
    if(user && !showLeaveplaningMessages){
      if(user.position === "Deputy Director" ||
        user.position === "Government Statistician (CEO)"
        || user.position === "Deputy Gov Statistician (DGS)" ||
        user.position === "Director" ||
        user.position === "Deputy Director" ||
        user.position === "Sectional Head"
        ){
        setshowLeaveplaningMessages(true)
      }
    }
    })


  useEffect(()=>{
    // When the user scrolls the page, execute myFunction 
    try {
    
    window.onscroll = function() {myFunction()};
    function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    setscrolledState(scrolled)
    if(scrolled > 5){
       setnavDrop(true)
    }else{
       setnavDrop(false)
    }
    } 
    
    } catch (error) {
    console.log(error)
    }
    
    })
  const handleClose = () => {
    setOpen(false);
  };

  const TriggerDrop = ()=>{
    if(dropdown === 0){
      setdropdown(300)
    }else{
      setdropdown(0)
    }
  }
  const TriggerDrop2 = ()=>{
    if(dropdown2 === 0){
      setdropdown2(500)
    }else{
      setdropdown2(0)
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

// useEffect(() => {
//   if(!localStorage.getItem("token")){
//      window.location.assign("/")
//   }
// })


const LogOut = ()=>{
  Axios.patch(endPoint + "/logout" , {
    headers:{
      authorization:`Bearer ${token}`
    }
  }
   ).then(()=>{
    new Promise((resolve, reject) => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      resolve()
    }).then(()=>{
      window.location.assign("/")
  
      // Axios.post(endPoint + "/logout",   {
      //   headers: {
      //        authorization: `Bearer ${token}`,
           
      //     }
           
      //  }).then(()=>{
      //  }).catch(err=>alert(err.message))
    })
   }).catch(err=>console.log(err.message))
  
}

const handleDrop = (e)=>{
setdropDown(!dropDown)  
}
const handleDrop2 = ()=>{
setdropDown2(!dropDown2)  
}



  const callNotification = ()=>{
  if(showNots){
      if(leavePlaningNot){
      leavePlaningNot.map(doc=>{
        window.Notification.requestPermission().then(perm =>{
          if(perm === "granted"){
             new Notification("Notification",{body:doc.message , icon:"https://raw.githubusercontent.com/projects-24/hr-frontend/main/public/favicon.png"})
          }else{
              alert("Gss wants to send you a notification, make sure to grant permission")
          }
      })
      })
    }
    if(userNot){
      userNot.slice(0,1).map(doc=>{
        window.Notification.requestPermission().then(perm =>{
          if(perm === "granted"){
             new Notification("Notification",{
              body:doc.message ,
               icon:"https://raw.githubusercontent.com/projects-24/hr-frontend/main/public/favicon.png",
              })
              // Axios.delete(endPoint + "/notification/delete/" + doc._id, {
              //   headers:{
              //   authorization:`Bearer ${token}`
              //   }
              //   } 
              //   )
          }else{
              alert("Gss wants to send you a notification, make sure to grant permission")
          }
          setshowNots(false)
      })
      })
    }
  }
   }

   callNotification()

const Switch = ()=>{
  if(sessionStorage.getItem("userMode")){
    if(JSON.parse(sessionStorage.getItem("userMode")) === "normal"){
      new Promise((resolve, reject) => {
        resolve()
        sessionStorage.setItem("userMode" , JSON.stringify(
          "admin"
        ))
      }).then(()=>{
        window.location.assign("/dashboard")
      })
    }else{
      new Promise((resolve, reject) => {
        sessionStorage.setItem("userMode" , JSON.stringify(
          "normal"
        ))
        resolve()
      }).then(()=>{
        window.location.assign("/dashboard")
      })
    }
  }
}



if(user){
  return ( 
    <div>
   <Navbar fixedTop>
<NavLogo>
<img src="/logo.png" className="height-40-max" />
</NavLogo>

<LinkWrapper visibleLinks>
<div>
        <Link href="/messages">
        <i className="icon-bell" Not={notNumber} id="notification" />
        </Link>
      </div>
      <DropDown >
            <Button funcss={"myBtn"}  text={"Ahmed Salim"} color="primary" endIcon={<Icon icon={"bx bx-user"} />} />
          <DropMenu 
          state={drop1}
          animation="ScaleUp" 
          hoverable="hoverable" 
         funcss="navDropMenu"
          duration={0.5}>
              <DropItem>
          <i className="icon-user"></i> My Account
</DropItem>
              <DropItem><i className="icon-shield"></i> Change password</DropItem>
              <DropItem funcss="bt"> <div onClick={LogOut}>
            <i className="icon-logout"></i> Logout
            </div></DropItem>
          </DropMenu>
         </DropDown>

</LinkWrapper>
<SidebarTrigger
  onClick={()=>setopen(true)}
content={<Icon icon="fas fa-bars" />}
/>

</Navbar>
 
 {
  !noSideBar ?
  <div className="leaveSidebar">

  <div className="">
  <Link href="/dashboard">
      <div className='lighter padding pointer hover-up' style={{margin:'1.5rem 0' , borderRadius:"5rem"}}>
      <i className="icon-graph"></i> Dashboard
      </div>
    </Link>

{
// isAdmin ?
<>
  <Link href="/staff/profiling">
      <div className='lighter padding pointer hover-up' style={{margin:'1.5rem 0' , borderRadius:"5rem"}}>
      <i className="lni lni-users"></i> Staff Profiling
      </div>
    </Link>
  
          <div className="dropDown">
    <div className='lighter padding pointer hover-up  trigger' style={{margin:'1.5rem 0' , borderRadius:"5rem"}} onClick={TriggerDrop}>
      <i className="icon-action-undo"></i> Leave Mgt {dropdown === 0 ? <i className="icon-arrow-down"></i> : <i className="icon-arrow-up"></i>}
      </div>
      <div className="dropContent" style={{maxHeight:`${dropdown}px`,overflow:"auto"}}>
   <Link href="/leave/planing">
   <div className='lighter padding pointer hover-up' style={{margin:'1.5rem 0' , borderRadius:"5rem"}}>
      <i className="icon-check"></i> Leave Planner
      </div>
   </Link>
    <Link href="/leave/requests">
      <div className='lighter padding pointer hover-up' style={{margin:'1.5rem 0' , borderRadius:"5rem"}}>
      <i className="lni lni-bolt"></i>  Leave Requests
      </div>
    </Link>
      </div>
    </div>
    <Link href="/field/request">
    <div className='lighter padding pointer hover-up' style={{margin:'1.5rem 0' , borderRadius:"5rem"}}>
    <i className="lni lni-infinite"></i> Field Request
    </div>
  </Link>
  <Link href="/retirement/management">
      <div className='lighter padding pointer hover-up' style={{margin:'1.5rem 0' , borderRadius:"5rem"}}>
      <i className="icon-clock"></i> Retirement Mgt
      </div>
    </Link>
    <Link href="/staff/promotion">
      <div className='lighter padding pointer hover-up' style={{margin:'1.5rem 0' , borderRadius:"5rem"}}>
      <i className="lni lni-plus"></i> Promotion
      </div>
    </Link>
    <Link href="/staff/reports">
      <div className='lighter padding pointer hover-up' style={{margin:'1.5rem 0' , borderRadius:"5rem"}}>
      <i className="lni lni-notepad"></i> Reports
      </div>
    </Link>

    <div className="dropDown">
    <div className='lighter padding pointer hover-up trigger' style={{margin:'1.5rem 0' , borderRadius:"5rem"}} onClick={TriggerDrop}>
      <i className="icon-action-undo"></i> Leave Mgt {dropdown === 0 ? <i className="icon-arrow-down"></i> : <i className="icon-arrow-up"></i>}
      </div>
      <div className="dropContent" style={{maxHeight:`${dropdown}px`,overflow:"auto"}}>
   <Link href="/leave/planing">
   <div className='lighter padding pointer hover-up' style={{margin:'1.5rem 0' , borderRadius:"5rem"}}>
      <i className="icon-check"></i> Leave Planner
      </div>
   </Link>
    <Link href="/leave/requests">
      <div className='lighter padding pointer hover-up' style={{margin:'1.5rem 0' , borderRadius:"5rem"}}>
      <i className="lni lni-bolt"></i>  Leave Requests
      </div>
    </Link>
      </div>
    </div>
    <Link href="/field/request">
    <div className='lighter padding pointer hover-up' style={{margin:'1.5rem 0' , borderRadius:"5rem"}}>
    <i className="lni lni-infinite"></i> Field Activity
    </div>
  </Link>
</>
}


  </div>
</div>
:""
 }
  
    </div>
 );
}else{
  return <Loader />
}
}
 
export default Nav;