import Link from "next/link";
import { useEffect ,useState} from "react";
const Nav = () => {
  const [mode, setmode] = useState("")
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

    return ( 
        <div>
                <div className="navigationBar">
        <div>
          <Link href="/" >
         <span className="logo">
         Hr Management
        </span>
          </Link>
        </div>
        <div>
        <Link href="/" className='navLink'>
       <i className="icon-home"></i> Home
        </Link>
        <Link href="/staff/profiling" className='navLink'>
        <i className="icon-bag"></i> Staff Profiling
        </Link>
        <Link href="/register" className='navLink'>
        <i className="icon-user"></i> Create Account
        </Link>
        {/* <Link href="/stockin" className='navLink'>
        <i className="icon-grid"></i> Add Stock
        </Link>
        <Link href="/product/sell" className='navLink'>
        <i className="icon-bag"></i> Sell Product
        </Link> */}
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

      
        </div>
     );
}
 
export default Nav;