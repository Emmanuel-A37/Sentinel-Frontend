import TopBar from '@/components/TopBar'
import HomePage from '@/components/HomePage'
import React from 'react'


const Dashboard = () => {
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-blue-100 to-white  ">
        <TopBar />
        <HomePage />
    </div>
  )
}

export default Dashboard