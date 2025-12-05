import React from 'react'
import { useState , useContext } from 'react'
import { CloseOutlined , MenuOutlined , MoonOutlined ,BellOutlined} from "@ant-design/icons"
import { Link,useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import { toast } from 'sonner'

const Navbar = () => {
    const [extendNavbar,setExtendNavbar] = useState(false)
    const {auth,setAuth} = useContext(AuthContext)
    const navigate = useNavigate()
    const API = import.meta.env.VITE_API_URL;

    const handleLogout = async (e) =>{
        e.preventDefault()
        try{
            const {data} = await axios.post(`${API}/api/auth/logout`)
            if(data.success){
                setAuth({...auth,user:null,token:""})
                localStorage.removeItem("auth")
                toast.success(data.message)
                navigate("/")
            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error("Something wemt wrong in logout")
        }

    }
  return (
    
    <div className={`px-10 bg-white md:px-8 shadow-md  w-full h-16  fixed top-0 left-0 right-0 flex justify-between md:items-center transition-all duration-800 ${extendNavbar ? "h-[260px]" : "h-16 "} `}>
        <div className={`flex h-16 items-center gap-4  text-4xl text-black cursor-pointer`}>
            <h1 className=' font-sans font-bold'>Listify</h1>
        </div>
        <div className={` absolute md:static flex flex-col md:flex-row gap-6  text-black transition-all duration-500 ${extendNavbar ? "top-18 left-[82vw]" : "top-18 left-[900px] "}`}>
        {
          !auth.user ? 
          <ul className={`items-stretch  space-x-6  md:flex ${extendNavbar ? "flex flex-col gap-10 " : ""}`}>
            <li>About us</li>
            <li>Contacts</li>
            <li><Link to={"/"}>Log in</Link></li>
            <li><Link to={"signup"}>Sign up</Link></li>
          </ul> 
          : 
          <ul className={`items-stretch  space-x-6  md:flex ${extendNavbar ? "flex flex-col gap-10 " : ""}`}>
            <li><MoonOutlined /></li>
            <li><BellOutlined /></li>
            <li><button onClick={handleLogout}> Log Out</button></li> 
          </ul>
        }
        
        
        </div>
        <div className='md:hidden h-16 items-center flex'>
          {/* menu icon */}
          <div className='' onClick={()=>{setExtendNavbar(open=>!open)}}>
            { extendNavbar ? <CloseOutlined /> : <MenuOutlined /> } 
          </div>
        </div>
    </div>
  )
}

export default Navbar