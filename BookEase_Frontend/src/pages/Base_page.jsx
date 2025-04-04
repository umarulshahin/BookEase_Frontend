import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'

const Base_page = () => {
    return (
        <div className='min-h-screen min-w-screen bg-gray-300 ' >
          <Header />
        <main className=' pt-8 '>
          <Outlet />
        </main>
        </div>
      )
}

export default Base_page