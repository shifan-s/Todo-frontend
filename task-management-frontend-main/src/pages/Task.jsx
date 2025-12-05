import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { useParams,useNavigate } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons';

const Task = () => {
  const [task,setTask] = useState()
  const params = useParams()
  console.log(params)
  const navigate = useNavigate()
  const API = import.meta.env.VITE_API_URL;

  useEffect(() =>{
    getTask()
  },[])
  
  const deleteTask = async (id) =>{
        try{
            const {data} = await axios.delete(`${API}/api/tasks/delete-task/${id}`)

            if(data && data.success){
                toast.success(data.message)
                navigate("/dashboard/tasks/")
            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(`Error in delete task ${error}`)
        }
    }

  const getTask = async () => {
    try{
      const {data} = await axios.get(`${API}/api/tasks/single-task/${params.slug}`)
      if(data && data.success){
          setTask(data.task)
          
      }
      }catch(error){
          console.log(error)
          toast.error(`Error in fetching all tasks ${error}`)
      }
  }
  

  return (
    <>
    {task ? (
      <div className={`max-w-lg w-full p-4 shadow-md rounded-lg ${task.cardColor} text-gray-800`}>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-3xl text-center font-semibold text-black">{task.name}</h3>
            <p className="text-xl text-black">{task.description}</p>
            <h1 className='text-lg font-thin font-mono'>Status: <span className='text-lg font-semibold'>{task.status}</span></h1>
            <h1 className='text-lg font-thin font-mono'>Frequency: <span className='text-lg font-semibold'>{task.frequency}</span></h1>
            <h1 className='text-lg font-thin font-mono'>Days: <span className='text-lg font-semibold'>{task.days}</span></h1>
            <h1 className='text-lg font-thin font-mono'>Repeat: <span className='text-lg font-semibold'>{task.repeat}</span></h1>
            <h1 className='text-lg font-thin font-mono'>Tags: <span className='text-lg font-semibold'>{task.tag}</span></h1>
            <h1 className='font-thin font-mono'>Created At: <span className='text-lg font-semibold'>{new Date(task.createdAt).toLocaleString()}</span></h1>

            <div className='w-full bg-black p-2 px-4 rounded-lg'>
                <button className={`p-3 bg-red-500 rounded-lg`} onClick={()=> { deleteTask(task._id)}}><DeleteOutlined /></button>
            </div>
          </div>
        </div>
      </div>

      
    ) : (
      <div className="text-center text-gray-500">Loading task...</div>
    )}
    </>
  )
}

export default Task