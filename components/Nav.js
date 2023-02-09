import Link from "next/link";
import { useEffect ,useState} from "react";
import Loader from './loader';
import endPoint from "./endPoint";
import  Axios  from 'axios';
const Nav = ({noSideBar}) => {
  const [mode, setmode] = useState("")
  const [dropdown, setdropdown] = useState(0)
  const [dropdown2, setdropdown2] = useState(0)
  const [user, setuser] = useState("")  
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
    useEffect(() => {
        if(localStorage.getItem("token")  && !token ){
            settoken(
                JSON.parse(
                    localStorage.getItem("token")
                )
            )
            setuser(
                JSON.parse(
                    localStorage.getItem("user")
                )
            )
        }
    })
    // useEffect(() => {
    //     if(notDocs === null){
    //     Axios.get(endPoint  + "/notification/showall" , {
    //         headers:{
    //             authorization:`Bearer ${token}`
    //         }
    //     }).then(dataDocs=>{
    //        const nots = dataDocs.data.notification
    //        setnotDocs(nots)
    //       if(nots.length > 0){
    //         setuserNot(
    //             nots.filter((filt)=>{
    //                 if(filt.receiver === user._id ){
    //                 return filt
    //                 }
    //             })
    //         )
    //         if(showLeaveplaningMessages){
    //         setleavePlaningNot(
    //           nots.filter(filt=>{
    //             if(filt.receiver === "leaveplaning" ){
    //               window.Notification.requestPermission().then(perm =>{
    //                 if(perm === "granted"){
    //                 new Notification("Notification",{
    //                   body:filt.message ,
    //                    icon:"https://raw.githubusercontent.com/projects-24/hr-frontend/main/public/favicon.png"})
    //               }else{
    //                 alert("Gss wants to send you a notification, make sure to grant permission")
    //                 }
    //                 })
    //               }
    //           })
    //           )
    //         }
    //       }
    //     }).catch(err=>{

    //     })
    //     }
    //     })

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

useEffect(() => {
  if(!localStorage.getItem("token")){
     window.location.assign("/")
  }
})


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
   
            <div className={`navigationBar ${navDrop ? "navCard" : ""} `}>
    <div>
     <span className="logo">
      <img src="/logo.png" className="height-40-max" />
    </span>
    </div>
    <div>

    </div>
    <div className="row-flex">
      <div>
        <Link href="/messages">
        <i className="icon-bell" Not={notNumber} id="notification" />
        </Link>
      </div>
    <div className="context " id="dropContext">
    <a className="dropdown text-bold" onClick={handleDrop}>
   <div className="row-flex gap">
  <img src="/avatar.svg" className="width-40 height-40 circle" />
  <div>
  <div className="text-small">{user.firstname} {user.lastName}</div>
   <div style={{marginTop:"2px"}}><span className='text-bold secondary-text text-small'> {user.position} </span> </div>
  </div>
   </div>
      </a>
      {
        dropDown ?
        <ul className=" card">
            {/* <div className='sideLink' onClick={Switch}>
            <i className="lni lni-users"></i> Switch Account
            </div> */}
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
        <li className="divisor"></li>
            <div className='sideLink' onClick={LogOut}>
            <i className="icon-logout"></i> Logout
            </div>
        </ul>:""
      }
</div>

    </div>
  </div>
 {
  !noSideBar ?
  <div className="leaveSidebar card">

  <div className="">
  <Link href="/dashboard">
      <div className='sideLink'>
      <i className="icon-graph"></i> Dashboard
      </div>
    </Link>

{
isAdmin ?
<>
<div className="section hr"></div>
  <Link href="/staff/profiling">
      <div className='sideLink'>
      <i className="lni lni-users"></i> Staff Profiling
      </div>
    </Link>
  
    <div className="section hr"></div>
          <div className="dropDown">
    <div className='sideLink trigger' onClick={TriggerDrop}>
      <i className="icon-action-undo"></i> Leave Mgt {dropdown === 0 ? <i className="icon-arrow-down"></i> : <i className="icon-arrow-up"></i>}
      </div>
      <div className="dropContent" style={{maxHeight:`${dropdown}px`,overflow:"auto"}}>
   <Link href="/leave/planing">
   <div className='sideLink'>
      <i className="icon-check"></i> Leave Planner
      </div>
   </Link>
    <Link href="/leave/requests">
      <div className='sideLink'>
      <i className="lni lni-bolt"></i>  Leave Requests
      </div>
    </Link>
      </div>
    </div>
    <div className="section hr"></div>
    <Link href="/field/request">
    <div className='sideLink'>
    <i className="lni lni-infinite"></i> Field Request
    </div>
  </Link>
  <div className="section hr"></div>
  <Link href="/retirement/management">
      <div className='sideLink'>
      <i className="icon-clock"></i> Retirement Mgt
      </div>
    </Link>
    <div className="section hr"></div>
    <Link href="/staff/promotion">
      <div className='sideLink'>
      <i className="lni lni-plus"></i> Promotion
      </div>
    </Link>
    <div className="section hr"></div>
    <Link href="/staff/reports">
      <div className='sideLink'>
      <i className="lni lni-notepad"></i> Reports
      </div>
    </Link>
</>

:
<>
    <div className="section hr"></div>
    <div className="dropDown">
    <div className='sideLink trigger' onClick={TriggerDrop}>
      <i className="icon-action-undo"></i> Leave Mgt {dropdown === 0 ? <i className="icon-arrow-down"></i> : <i className="icon-arrow-up"></i>}
      </div>
      <div className="dropContent" style={{maxHeight:`${dropdown}px`,overflow:"auto"}}>
   <Link href="/leave/planing">
   <div className='sideLink'>
      <i className="icon-check"></i> Leave Planner
      </div>
   </Link>
    <Link href="/leave/requests">
      <div className='sideLink'>
      <i className="lni lni-bolt"></i>  Leave Requests
      </div>
    </Link>
      </div>
    </div>
    <div className="section hr"></div>
    <Link href="/field/request">
    <div className='sideLink'>
    <i className="lni lni-infinite"></i> Field Activity
    </div>
  </Link>
</>
}

{
//   isAdmin ?
//   <div className="dropDown">
//     <div className='sideLink trigger' onClick={TriggerDrop2}>
//       <i className="icon-action-undo"></i> Reports {dropdown2 === 0 ? <i className="icon-arrow-down"></i> : <i className="icon-arrow-up"></i>}
//       </div>
//       <div className="dropContent" style={{maxHeight:`${dropdown2}px`,overflow:"auto"}}>
//    <div className="section hr"></div>
//    <Link href="/staff/reports">
//       <div className='sideLink'>
//       <i className="lni lni-notepad"></i> Reports
//       </div>
//     </Link>
//       <Link href="/leave/planing">
//    <div className='sideLink'>
//       <i className="icon-check"></i> Leave Planner
//       </div>
//    </Link>
//     <Link href="/leave/requests">
//       <div className='sideLink'>
//       <i className="lni lni-bolt"></i>  Leave Requests
//       </div>
//     </Link>
//     <Link href="/field/request">
//     <div className='sideLink'>
//     <i className="lni lni-infinite"></i> Field Status
//     </div>
//   </Link>
//   <Link href="/retirement/management">
//       <div className='sideLink'>
//       <i className="icon-clock"></i> Retirement Mgt
//       </div>
//     </Link>
//     <Link href="/staff/promotion">
//       <div className='sideLink'>
//       <i className="lni lni-plus"></i> Promotion
//       </div>
//     </Link>
//       </div>
//     </div>
//     :
//     <>
//           <div className="dropDown">
//     <div className='sideLink trigger' onClick={TriggerDrop}>
//       <i className="icon-action-undo"></i> Leave Mgt {dropdown === 0 ? <i className="icon-arrow-down"></i> : <i className="icon-arrow-up"></i>}
//       </div>
//       <div className="dropContent" style={{maxHeight:`${dropdown}px`,overflow:"auto"}}>
//    <Link href="/leave/planing">
//    <div className='sideLink'>
//       <i className="icon-check"></i> Leave Planner
//       </div>
//    </Link>
//     <Link href="/leave/requests">
//       <div className='sideLink'>
//       <i className="lni lni-bolt"></i>  Leave Requests
//       </div>
//     </Link>
//       </div>
//     </div>
//     <div className="section hr"></div>
//   <Link href="/field/request">
//   <div className='sideLink'>
//   <i className="lni lni-infinite"></i> Field Activity
//   </div>
// </Link>
//     </>
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