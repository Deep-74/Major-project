import React from 'react'
import {Tabs }from 'antd'
import Products from './Products'
import UserBids from './UserBids.js'

function Profile() {
  return (
    <div>

<Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="Products" key="1">
    <Products/>
    </Tabs.TabPane>

    <Tabs.TabPane tab="MY Bids" key="2">
    <UserBids></UserBids>
    </Tabs.TabPane>

</Tabs>

    </div>
  )
}

export default Profile