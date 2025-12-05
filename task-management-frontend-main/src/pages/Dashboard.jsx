
import React from 'react'
import { Outlet } from 'react-router-dom'
import { useState ,useEffect } from 'react'
import axios from 'axios'
import { toast } from 'sonner'


const Dashboard = () => {
  const [tasks,setTasks] = useState([])
  const API = import.meta.env.VITE_API_URL;
  const getAllTasks = async () => {
    try{
      const {data} = await axios.get(`${API}/api/tasks/all-tasks`)
      if(data && data.success){
          setTasks(data.tasks)
          console.log(tasks)
      }

      }catch(error){
          console.log(error)
          toast.error(`Error in fetching all tasks ${error}`)
      }
  }
    useEffect(() =>{
        getAllTasks()
    },[])
  return (
    <div className='flex flex-row p-2 '>
        {/* Left Side of dashboard */}
        <div className='hidden md:flex p-10 min-h-screen w-1/4  flex-col gap-3 border-r-2 border-gray-300'>
          <div className=''>
            <h1 className='font-bold'>Tasks</h1>
            <div className=' flex h-8 bg-gray-50 rounded-md px-4 items-center justify-between py-2'>
              <h1>Today</h1>  
              <h1>{tasks.length}</h1>
            </div>
          </div>

          <div className=''>
            <h1 className='font-bold'>Lists</h1>
            <div className=' flex h-8 bg-gray-50 rounded-md px-4 items-center justify-between py-2'>
              <h1>Daily Routine</h1>  
              <h1>1</h1>
            </div>

            <div className=' flex h-8 bg-gray-50 rounded-md px-4 items-center justify-between py-2'>
              <h1>Study</h1>  
              <h1>0</h1>
            </div>
          </div>
        </div>

        {/* Right side of Dashboard */}
        <div className=' p-10 min-h-screen w-3/4 '>
            <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard