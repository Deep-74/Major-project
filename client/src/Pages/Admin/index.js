import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import Products from './Products'
import Users from './Users'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
function Admin() {
  const navigate=useNavigate()
  const{user}=useSelector(state=> state.users);
  useEffect(()=>{
    if(user.role!=='admin'){
        navigate("/")
    }
  },[])
  return (
    <Tabs>
    <Tabs.TabPane tab="Products" key="1">
     <Products></Products>
    </Tabs.TabPane>
    <Tabs.TabPane tab="Users" key="2">
         <Users></Users>
    </Tabs.TabPane>
  </Tabs>
  )
}

export default Admin