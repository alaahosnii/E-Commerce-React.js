import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import NavComponent from '../NavComponent/NavComponent'
import Spacer from '../Spacer/Spacer'

function Layout() {
  return (
    <div className='main-layout'>
      <Header />
      <div className='container'>
        <NavComponent />
      </div>  
      <Spacer direaction={"horizontal"} />
      <div className='min-vh-100'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout