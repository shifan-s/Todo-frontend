import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import { DeleteOutlined , PlusOutlined } from '@ant-design/icons';

const Tasks = () => {
  const [tasks,setTasks] = useState([])
  const API = import.meta.env.VITE_API_URL;

  const deleteTask = async (id) =>{
        try{
            const {data} = await axios.delete(`${API}/api/tasks/delete-task/${id}`)

            if(data && data.success){
                toast.success(data.message)
                getAllTasks()
            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(`Error in delete Task ${error}`)
        }
    }

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

  console.log(tasks)
  useEffect(() =>{
    getAllTasks()
},[])
  return (
    // <div>
    //   {
    //     !tasks ?
    //     <div>
    //       <h1>Add your Task </h1>
    //       <button
    //         className=" h-12 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition duration-300"
    //         aria-label="Add"
    //         >Add Your Task
    //         <PlusOutlined />
    //       </button>
    //     </div>
    //     : 
    //     <div>
    //       <div>
    //         <h1 className='text-xl font-bold'>Tasks</h1>
    //       </div>
    //       <div className='flex flex-col gap-2 p-2'>
    //         {
    //           tasks.map((item) => {
    //             return(
    //               <div className='flex '>
    //                 <Link to={`/dashboard/task/${item.slug}`} key={item._id} className={`flex items-center px-7 ${item.cardColor} h-14 w-full rounded-l-lg justify-between`}>
    //                 <h1 className=' text-lg'>{item.name}</h1> 
    //               </Link>
    //                 <button className={`p-4 ${item.cardColor} rounded-r-lg`} onClick={()=> { deleteTask(item._id)}}><DeleteOutlined /></button>
    //               </div>
                  
    //             )
    //           })
    //         }
    //       </div>
    //       <Link to={"/dashboard/create-task"}>
    //         <button
    //         className="fixed bottom-12 right-12 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
    //         aria-label="Add"
    //         >
    //         <PlusOutlined />
    //       </button>
    //       </Link>
    //     </div>
    //   }
    // </div>

    <div>
  {!tasks || tasks.length === 0 ? (
    <div>
      <h1>Add your Task</h1>
      <Link to="/dashboard/create-task">
        <button
        className="px-4 h-12 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition duration-300"
        aria-label="Add"
        >
        Add Your Task
        <PlusOutlined />
        </button>
      </Link>
      
    </div>
  ) : (
    <div>
      <div>
        <h1 className="text-xl font-bold">Tasks</h1>
      </div>
      <div className="flex flex-col gap-2 p-2">
        {tasks.map((item) => (
          <div key={item._id} className="flex">
            <Link
              to={`/dashboard/task/${item.slug}`}
              className={`flex items-center px-7 ${item.cardColor} h-14 w-full rounded-l-lg justify-between`}
            >
              <h1 className="text-lg">{item.name}</h1>
            </Link>
            <button
              className={`p-4 ${item.cardColor} rounded-r-lg`}
              onClick={() => deleteTask(item._id)}
            >
              <DeleteOutlined />
            </button>
          </div>
        ))}
      </div>
      <Link to="/dashboard/create-task">
        <button
          className="fixed bottom-12 right-12 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
          aria-label="Add"
        >
          <PlusOutlined />
        </button>
      </Link>
    </div>
  )}
</div>

  )
}

export default Tasks