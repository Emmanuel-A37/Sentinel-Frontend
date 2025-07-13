import ApiPage from '@/components/ApiPage'
import TopBar from '@/components/TopBar'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen max-w-screen overflow-x-hidden bg-gradient-to-br from-blue-100 to-white  ">
        <TopBar/>
        <ApiPage/>
    </div>
  )
}

export default page