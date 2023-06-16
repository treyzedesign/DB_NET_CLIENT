import { Box, Flex, Heading, Spacer, Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Text} from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'
  import React from 'react'
  import "./Nav.css"
  import { FiMenu } from 'react-icons/fi'
  import { BiFolderOpen, BiLogOut} from 'react-icons/bi'
  import { useNavigate } from 'react-router-dom'
  import Cookies from 'js-cookie'
  const Nav = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const navigate = useNavigate()
    return (
      <div style={{position:"sticky", top: 0, zIndex:111}}>
          <Box p="2" boxShadow='md' bgColor='green.100' >
          <Flex minWidth='max-content' alignItems='center' gap='2'>
              <Box p='2'>
                  <Heading size='md' cursor={'pointer'} onClick={()=> navigate('/')}>
                    <Text className='logo' fontSize={'3xl'}>dbnet</Text>
                  </Heading>
              </Box>
              <Spacer />
                <FiMenu color="black" style={{fontSize:"30px", cursor:'pointer', marginRight:"30px"}} onClick={onOpen}/>
          </Flex>
          </Box>
          <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={()=>{
              onClose()
             }}
  
            finalFocusRef={btnRef}
          >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader></DrawerHeader>
            <DrawerBody>
              <Box>
                <Flex onClick={()=> {
                  navigate('/files/myFiles')
                  onClose()
                }} cursor={'pointer'}><BiFolderOpen style={{fontSize:"25px", margin:"20px 5px "}}/><Text fontSize={'xl'} fontWeight={'600'} py={3.5}>my files</Text></Flex>
                <Flex onClick={()=> {
                  Cookies.remove("refresh_token")
                  window.location.reload()
                }} cursor={'pointer'}><BiLogOut style={{fontSize:"20px", margin:"20px 5px "}}/><Text fontSize={'xl'}  fontWeight={'600'} py={3.5}>Log out</Text></Flex>
              </Box>
                    
                 
            </DrawerBody>
          </DrawerContent>
        </Drawer>
          
      </div>
    )
  }
  
  export default Nav