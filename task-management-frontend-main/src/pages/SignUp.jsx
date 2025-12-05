import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'


const SignUp = () => {
  const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const API = import.meta.env.VITE_API_URL;
    const handleSubmit =async(e)=>{
      e.preventDefault()
      console.log(name,email,password)
      
      try{
        const{data}= await axios.post(`${API}/api/auth/signup`,{name,email,password})
        
        if(data.success){
          toast.success(data.message)
          navigate("/")
        }else{
          toast.error(data.message)
        }
      }catch(error){
        console.log(error)
  
        toast.error("Something went wrong")
      }
  
  
    }
  return (
    <div className='
    flex place-content-center place-items-center
    h-auto md:h-screen px-8 py-4 md:px-0
    '>
      <div className='
      flex justify-center items-center px-12 py-6 md:px-0 
      h-auto w-full md:w-[710px] md:h-[470px]
      rounded-2xl shadow-md bg-neutral-100 
      '>
        <div className='w-full flex flex-col justify-center items-center'>
          <div className='w-full md:w-2/6 flex flex-col items-center justify-center '>
            <h1 className='text-xl text-blue-600 font-bold py-2'>Register</h1>
            <div className='text-sm font-light text-center'>Welcome ! sign in using your social account or email to continue us</div>
          </div>
          <div className='w-full md:w-2/6 flex gap-5 items-center justify-center py-5'>
              <div className='rounded-full bg-white p-2 '>
                <img className='h-6' src="/public/images/facebook-logo.png" alt="" />
              </div>
              <div className='rounded-full bg-white p-2 '>
                <img className='h-6' src="/public/images/google-logo.png" alt="" />
              </div>
              <div className='rounded-full bg-white p-2 '>
                <img className='h-6' src="/public/images/apple-logo.png" alt="" />
              </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='w-full flex flex-col justify-center items-center gap-6'>
          <div className='bg-white w-full md:w-3/6 p-3 rounded-xl'>
              <input
              className=' outline-none border-b border-gray-400 w-full'
              type="text" placeholder='name' required
              value={name} onChange={(e) => {setName(e.target.value)}}
              />
            </div>

            <div className='bg-white w-full md:w-3/6 p-3 rounded-xl'>
              <input
              className=' outline-none border-b border-gray-400 w-full'
              type="email" placeholder='email' required
              value={email} onChange={(e) => {setEmail(e.target.value)}}
              />
            </div>

            <div  className='bg-white w-full md:w-3/6 p-3 rounded-xl'>
              <input
              className=' outline-none border-b border-gray-400 w-full'
              type="password" placeholder='password' required
              value={password} onChange={(e) => {setPassword(e.target.value)}}
              />
            </div>

            <button type='submit' className=' font-semibold text-xl shadow-md w-4/6 md:w-1/6 bg-white rounded-xl p-3'>Sign Up</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp