import Link from "next/link";
import { useEffect ,useState} from "react";
import Loader from './loader';
import endPoint from "./endPoint";
import  Axios  from 'axios';
import Navbar from 'funuicss/component/NavBar'
import Typography from 'funuicss/component/Typography'
import SidebarTrigger from 'funuicss/component/SidebarTrigger'
import LinkWrapper from 'funuicss/component/LinkWrapper'
import NavLink from 'funuicss/component/NavLink'
import Icon from 'funuicss/component/Icon'
import NavLogo from 'funuicss/component/NavLogo'
import Div from 'funuicss/component/Div'
import DropDown from 'funuicss/component/DropDown'
import DropMenu from 'funuicss/component/DropMenu'
import DropItem from 'funuicss/component/DropItem'

import Button from 'funuicss/ui/button/Button'
import AppBar from 'funuicss/ui/appbar/AppBar'
import Text from 'funuicss/ui/text/Text'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import { PiCaretDown, PiGear, PiGraph, PiKey, PiSignOut, PiUser, PiUserCircle } from "react-icons/pi";
import { List, ListItem } from "@mui/material";
import {GetToken, SignOut} from "../components/Functions"
const Nav = ({noSideBar, active}) => {
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
    if(!user ){
      GetToken()
      .then((res) => {
        setuser(res.user)
        settoken(res.token)
      })
        }
  })

  // update annual leave
  // useEffect(() => {
  // if(checkAnnual){
  //   if(user && token){
  //     const currentYear  = parseInt(user.current_year) 
  //     if(parseInt(currentYear) === parseInt(user.next_year)){
  //       Axios.patch(endPoint + "/staff/updatestaff/" + user._id ,{
  //         annual_year_accum: parseInt(user.annual_year_accum) < 2 ? parseInt(user.annual_year_accum) + 1 : 1,
  //         current_year:parseInt(currentYear),
  //         next_year:parseInt(currentYear) + 1,
  //         annual_leave_days: parseInt(user.annual_year_accum) < 2 ? parseInt(user.annual_leave_days) + 36 : 36
  //       }, {
  //         headers:{
  //           authorization:`Bearer ${token}`
  //         }
  //       }
  //        ).then(()=>{
  //         setcheckAnnual(false)
  //        }).catch(err=>console.log(err.message))
  //     }else{
  //       setcheckAnnual(false)
  //     }
  // }
  // }
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





if(user){
  return ( 
    <div>
<AppBar
fixedTop
funcss="card raised"
left = {
<img src="/logo.png" className="height-40-max" />
}

right={
<>
<DropDown >
<Button funcss={"myBtn"}  text={`${user.first_name} ${user.last_name}`} startIcon={<PiUser />} endIcon={<PiCaretDown />} />
<DropMenu 
state={drop1}
animation="ScaleUp" 
hoverable="hoverable" 
funcss="navDropMenu "
duration={0.5}>
<Button
text="Account"
startIcon={<PiUser />}
/>
<Button
text="Change Password"
startIcon={<PiKey />}
/>
  <DropItem funcss="bt">
  <Button
  onClick={() => SignOut()}
text="Sign Out"
startIcon={<PiSignOut />}
/></DropItem>
</DropMenu>
</DropDown>
</>
}
sidebarTrigger={<Icon icon="fas fa-bars"  onClick={()=>setopen(true)}/>}
/>



 
 {
  !noSideBar ?
  <div className="leaveSidebar">

  <div className="">

  <Link href="/dashboard">
    <Button
    funcss={`text-left ${active == '1' ? 'card' : ''}`}
    text="Dashboard"
    rounded
    fullWidth
    startIcon={<PiGraph />}
    />
    </Link>

  <Link href="/configurations">
    <Button
    style={{marginTop:'1rem' , display:'block'}}
    funcss={`text-left ${active == '2' ? 'card' : ''}`}
    text="Org Settings"
    rounded
    fullWidth
    startIcon={<PiGear />}
    />
    </Link>
 
 <div className="margin-top-100 padding-top-20 bt">
 <Button
    style={{marginTop:'1rem' , display:'block'}}
    funcss={`text-left card `}
    bg="error100"
    color="error"
    text="Sign Out"
    rounded
    fullWidth
    startIcon={<PiSignOut />}
    onClick={() => SignOut()}
    />
 </div>

{
// isAdmin ?
<>

  {/* <Link href="/staff/profiling">
      <div className="button section">
      <i className="lni lni-users"></i> Staff Profiling
      </div>
    </Link>
  
          <div className="dropDown">
    <div className='lighter padding pointer hover-up  trigger' style={{margin:'1.5rem 0' , borderRadius:"5rem"}} onClick={TriggerDrop}>
      <i className="icon-action-undo"></i> Leave Mgt {dropdown === 0 ? <i className="icon-arrow-down"></i> : <i className="icon-arrow-up"></i>}
      </div>
      <div className="dropContent" style={{maxHeight:`${dropdown}px`,overflow:"auto"}}>
   <Link href="/leave/planing">
   <div className="button section">
      <i className="icon-check"></i> Leave Planner
      </div>
   </Link>
    <Link href="/leave/requests">
      <div className="button section">
      <i className="lni lni-bolt"></i>  Leave Requests
      </div>
    </Link>
      </div>
    </div>
    <Link href="/field/request">
    <div className="button section">
    <i className="lni lni-infinite"></i> Field Request
    </div>
  </Link>
  <Link href="/retirement/management">
      <div className="button section">
      <i className="icon-clock"></i> Retirement Mgt
      </div>
    </Link>
    <Link href="/staff/promotion">
      <div className="button section">
      <i className="lni lni-plus"></i> Promotion
      </div>
    </Link>
    <Link href="/staff/reports">
      <div className="button section">
      <i className="lni lni-notepad"></i> Reports
      </div>
    </Link>

   
    <Link href="/field/request">
    <div className="button section">
    <i className="lni lni-infinite"></i> Field Activity
    </div>
  </Link> */}
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