import { Box, Flex, Heading, Spacer, ButtonGroup, Button, Image, Link , Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    FormControl,
    FormLabel,
    Input,
    Text,
    Center} from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'
  import React from 'react'
//   import logo from "../Assets/VYBE.png"
  const Nav = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [forms, setForms]= React.useState(true)
    return (
      <div style={{position:"sticky", top: 0, zIndex:111}}>
          <Box p="2" borderBottom="1px" boxShadow='2xl' bgColor='white' >
          <Flex minWidth='max-content' alignItems='center' gap='2'>
              <Box p='2'>
                  <Heading size='md'>
                  {/* <Image width="150px" src=/>  */}
                  </Heading>
              </Box>
              <Spacer />
              {/* <Flex gap="3" alignItems="center">
              <Link pr="3">About</Link>
              <Link pr="3">Write</Link>
              <Link pr="3">Faq</Link>
              </Flex> */}
              <ButtonGroup gap='5'>
                  <Button color="white" bgColor='blackAlpha.800' onClick={onOpen}>Log in</Button>
              </ButtonGroup>
          </Flex>
          </Box>
          <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={()=>{
              onClose()
              setForms(true)
            }}
  
            finalFocusRef={btnRef}
          >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            {forms ? <>
            <DrawerHeader>Log into your Account</DrawerHeader><hr/>
            <DrawerBody>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type='email' placeholder='enter your email'/>
                <FormLabel pt={5} >Password</FormLabel>
                <Input type='password' placeholder='enter your password'/>
                <Button bgColor={'black'} color={'white'} mt={10} width='40%'>Sign in</Button>
              </FormControl>
            </DrawerBody>
              <Center pb={15}>
              <Text fontWeight={'bold'}>No Account? <Link color={'blue.500'} onClick={()=> setForms(false)}>sign up</Link></Text>
              </Center>
              </>
              :
              <>
              <DrawerHeader>Create Account</DrawerHeader><hr/>
            <DrawerBody>
              <FormControl>
                <FormLabel>Firstname</FormLabel>
                <Input type='text' placeholder='enter your firstname'/>
                <FormLabel pt={2}>Lastname</FormLabel>
                <Input type='text' placeholder='enter your lastname'/>
                <FormLabel pt={2}>Email</FormLabel>
                <Input type='email' placeholder='enter your email'/>
                <FormLabel pt={2} >Password</FormLabel>
                <Input type='password' placeholder='enter your password'/>
                <Button bgColor={'black'} color={'white'} mt={5} width='40%'>Sign up</Button>
              </FormControl>
            </DrawerBody>
              <Center pb={15}>
              <Text fontWeight={'bold'}>Already have Account? <Link color={'blue.500'} onClick={()=> setForms(true)}>sign in</Link></Text>
              </Center>
              </>
              }
          </DrawerContent>
        </Drawer>
          
      </div>
    )
  }
  
  export default Nav