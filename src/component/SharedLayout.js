import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import { Box } from '@chakra-ui/react'
import Footer from './Footer'
const SharedLayout = () => {
  return (
    <>
      <Box >
        <Nav/>
        <Outlet/>
        <Footer/>
      </Box>
        
    </>
  )
}

export default SharedLayout