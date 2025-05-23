import React, { useEffect } from 'react'
import {Button,Form,Input, message} from "antd"
import { Link, useNavigate } from 'react-router-dom'
import Divider from '../../Components/divider'
import { LoginUser } from '../../apicalls/users'
import { useDispatch } from 'react-redux'
import { SetLoader } from '../../redux/loadersSlice'

const rules=[
  {
    required:true,
    message:'required'                // rules for the email , password etc. can and regex expression
  }
]

function Login() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const onFinish =async(values)=>{
    //console.log("success",values)

    try{
      dispatch(SetLoader(true))
      const response=await LoginUser(values)
      dispatch(SetLoader(false))
      if(response.success){
        message.success(response.message);
        localStorage.setItem("token",response.data)
        window.location.href="/"; 
      }
      else{
        throw new Error(response.message)
      }

    }
    catch(error){
      dispatch(SetLoader(false))
      message.error(error.message)
    }

  };

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/")
    }

  },[]);


  return (
    <div className='h-screen bg-primary flex justify-center items-center'>

    <div className='bg-white p-5 rounded w-[450px]'>
      <h1 className='text-primary text-2xl'> Login -    <span className='text-gray-800'>Auction website</span> </h1>
      <Divider></Divider>

      <Form  layout='vertical' onFinish={onFinish}>
        {/* <Form.Item  label="Name" name="name" rules={rules}>
          <Input placeholder='Name'></Input>
        </Form.Item> */}

        <Form.Item  label="Email" name="email"  rules={rules}>
          <Input placeholder='Email'></Input>
        </Form.Item>

        <Form.Item  label="Password" name="password" rules={rules}>
          <Input  type="password" placeholder='password'></Input>
        </Form.Item>

        <Button type="primary" htmlType="submit"  block  className='mt-2'> Login </Button>

           <div className="mt-5 text-center">
           <span className='text-gray-500'>
          Don't  have an account? <Link to="/register" className='text-blue'>Register</Link>
        </span>

           </div>
        

      </Form>
    </div>
    
    
    </div>
  )
}

export default Login