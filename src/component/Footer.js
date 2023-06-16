import React from 'react'
import "./Nav.css"
import { Box, Center } from '@chakra-ui/react'
import { BiCopyright } from 'react-icons/bi';
const Footer = () => {
    
  return (
        <Box  >
        <Box bgColor={'green'} color={'white'} h={'20vh'} position={'relative'} bottom={'0'} left={'0'} right={'0'} px={9} py={10} mt={10}>
            <Center className='logo' fontSize={'xl'}>dbnet</Center>
            <Center fontSize={'sm'} pt={5}><BiCopyright/> Copyright Treyzedesigns</Center>
        </Box>
        </Box>
        
  )
}

export default Footer