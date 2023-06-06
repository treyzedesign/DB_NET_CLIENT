import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'
const SharedLayout = () => {
  return (
    <>
        <Nav/>
        <Outlet/>
    </>
  )
}

export default SharedLayout