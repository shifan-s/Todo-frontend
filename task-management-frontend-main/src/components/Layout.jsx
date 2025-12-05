import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

const Layout = () => {
  return (
    <>
        <Navbar/>
        <div className='mt-20  min-h-[65vh]'>
            <Outlet/>
        </div>

        <Toaster position="top-right" richColors/>
    </>
  )
}

export default Layout