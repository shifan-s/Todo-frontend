import React from 'react'
import ColorSelector from '../components/ColorSelector'
import { useState } from 'react';
import {  Flex, Radio ,Select } from 'antd';
import { Checkbox, Col, Row } from 'antd';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

//for Radio
const options = [
  { label: 'Daily', value: 'Daily' },
  { label: 'Weekly', value: 'Weekly' },
  { label: 'Monthly', value: 'Monthly' },
];

const options1 = [
  { label: 'Completed', value: 'Completed' },
  { label: 'Not Completed', value: 'Not-Completed' },
];

//for dropdown
const {Option} = Select

const CreateTask = () => {
  const [color, setColor] = useState("teal");
  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [status,setStatus] = useState("Not-Completed")
  const [frequency,setFrequency] = useState("Daily")
  const [days,setDays] = useState([])
  const [repeat,setRepeat] = useState("Every Week")
  const [tag,setTag] = useState("")
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()
  const handleCreate = async(e) =>{
    e.preventDefault()
    try {
    const { data } = await axios.post(`${API}/api/tasks/create-task`, {
    name,
    description,
    status,
    cardColor: color,
    frequency,
    days,      // send array directly
    repeat,
    tag,
    });

    if (data && data.success) {
      toast.success(data.message);
      // Reset form states
      setName("");
      setDescription("");
      setStatus("");
      setColor("");
      setFrequency("");
      setDays([]);   // clear array properly
      setRepeat("");
      setTag("");
      navigate("/dashboard/tasks/")
    } else {
      toast.error(data.message);
    }
    } catch (error) {
      console.log(error);
      toast.error(`Error while creating task: ${error.message || error}`);
    }
  } 
  //this for multi-checkbox value update
  const handleCheckboxChange = (checkedValues) => {
    setDays(checkedValues); // updated setter
  };
  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold'>New Task</h1>

      <form onSubmit={handleCreate}>
        <div className='bg-white w-full p-3 rounded-xl'>
          <input
          className=' outline-none border-b border-gray-400 w-full'
          type="text" placeholder='Name Your New Task' required
          value={name} onChange={(e) => {setName(e.target.value)}}
        />
        </div>
        <div className='bg-white w-full p-3 rounded-xl'>
          <input
          className=' outline-none border-b border-gray-400 w-full'
          type="text" placeholder='Describe Your New Task' required
          value={description} onChange={(e) => {setDescription(e.target.value)}}
        />
        </div>
        <div className='bg-white w-full p-3 rounded-xl'>
          <div className='border-b-1 p-2 border-gray-400'>
          <h1>Status</h1>
              <Flex vertical gap="middle">
                <Radio.Group
                  block
                  options={options1}
                  defaultValue="Not-Completed"
                  optionType="button"
                  buttonStyle="solid"
                  value={status}
                  onChange={(e) => {setStatus(e.target.value)}}
              />
              </Flex>
              </div>
        </div>
        <div>
          <h1 className=' font-bold'>Card Color</h1>
          <ColorSelector selectedColor={color} onChange={setColor}/>
        </div>
        <div className='p-4 md:h-75 my-4 rounded-xl shadow-md bg-gray-100'>
        <h1 className='font-semibold'>Repeat</h1>
          <div className=''>
              <div className='bg-white w-full p-3 rounded-xl'>
              <input
              className=' outline-none border-b border-gray-400 w-full'
              type="text" placeholder='Set a Cycle for your task'  readOnly
              />
              </div>

              {/* Radio Button using antd */}
              <div className='border-b-1 p-2 border-gray-400'>
              <Flex vertical gap="middle">
                <Radio.Group
                  block
                  options={options}
                  defaultValue="Daily"
                  optionType="button"
                  buttonStyle="solid"
                  value={frequency}
                  onChange={(e) => {setFrequency(e.target.value)}}
              />
              </Flex>
              </div>

              {/* Checkbox */}
              <div className='border-b-1 p-2 border-gray-400'>
              <Checkbox.Group
                style={{ width: '100%' }}
                value={days}
                onChange={handleCheckboxChange}
              >
                <Row>
                  <Col span={8}>
                    <Checkbox value="Monday">Mon</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Tuesday">Tue</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Wednesday">Wed</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Thursday">Thu</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Friday">Fri</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Saturday">Sat</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Sunday">Sun</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
              </div>

              <div className='flex border-b-1 p-2 border-gray-400 justify-between'>
                <div className=''>Repeat</div>
                <div>
                <Select placeholder='Select' size='small' 
                  value={repeat}
                  onChange={(value)=>{
                    setRepeat(value)
                  }}
              className='w-96 '>
                
                <Option value="Every Day">Every Day</Option>
                <Option value="Every Week">Every Week</Option>
                <Option value="Every Month">Every Month</Option>
              </Select>
                </div>
              </div>

              
                <div className='bg-white w-full p-3 rounded-xl'>
                  <input
                  className=' outline-none border-b border-gray-400 w-full'
                  type="text" placeholder='Enter a Tag'  required
                  value={tag} onChange={(e) => {setTag(e.target.value)}}
                  />
                </div>
              

          </div>

          <div>
            <button type='submit' className=' font-semibold text-xl shadow-md w-4/6 md:w-1/6 bg-blue-500 rounded-xl p-3'> Create</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateTask