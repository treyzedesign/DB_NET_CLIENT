import { AbsoluteCenter, Box, Button, Center, Divider, FormControl, FormLabel, Heading , Input, Link, Text} from '@chakra-ui/react'
import React from 'react'
import { useContext , useRef} from 'react'
import AuthContext from '../store/AuthContext'
import "./reg.css"
const Register = ({}) => {
    const ctx = useContext(AuthContext)
    const fullnameRef = useRef(null)
    const emailRef = useRef(null)
    const studentRef = useRef(null)
    const passwordRef = useRef(null)
  return (
    <div className='login'>
        <Box height='100vh' width={'100vw'} bgGradient='linear(to-b, green.100, white)' >
            <AbsoluteCenter>
                <Heading pb={6}>
                  <Center className='logo' fontSize={'4xl'}>dbnet</Center>
                </Heading>
                {!ctx.authPage ? <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input bgColor={'whiteAlpha.700'} placeholder='enter email' ref={emailRef} type='email'/>
                    <FormLabel>Password</FormLabel>
                    <Input bgColor={'whiteAlpha.700'} placeholder='enter Password' ref={passwordRef} type='Password'/><br/>
                    <Divider my='3'/>
                    <Button bgColor={'green.800'} onClick={()=> ctx.signin(emailRef, passwordRef)} color={'white'} width={'100%'} cursor={'pointer'} >
                        sign in
                    </Button>
                    <Text fontSize='xs' pt='1'>
                        Don't have an Account? <Link color={'blue'} onClick={()=> ctx.signupPage()}>sign up</Link>
                    </Text>
                </FormControl> :

                <FormControl>
                    <FormLabel>Fullname</FormLabel>
                    <Input bgColor={'whiteAlpha.700'} placeholder='enter Name' ref={fullnameRef} type='text'/>
                    <FormLabel>Email</FormLabel>
                    <Input bgColor={'whiteAlpha.700'} placeholder='enter email' ref={emailRef} type='email'/>
                    <FormLabel>Student No.</FormLabel>
                    <Input bgColor={'whiteAlpha.700'} placeholder='enter Number' ref={studentRef} type='text'/>
                    <FormLabel>Password</FormLabel>
                    <Input bgColor={'whiteAlpha.700'} placeholder='enter Password' ref={passwordRef} type='Password'/><br/>
                    <Divider my='3'/>
                    <Button bgColor={'green.800'} color={'white'} width={'100%'} cursor={'pointer'} onClick={()=>ctx.signup(fullnameRef, emailRef,studentRef,passwordRef)}>
                        sign up
                    </Button>
                    <Text fontSize='xs' pt='1'>
                        Already have an Account? <Link color={'blue'} onClick={()=>ctx.loginPage()}>sign in</Link>
                    </Text>
                </FormControl> 
            }
            </AbsoluteCenter>
            {/* <AbsoluteCenter>
                <Heading pb={6}>
                  <Center className='logo' fontSize={'4xl'}>dbnet</Center>
                </Heading>
               
            </AbsoluteCenter> */}

            
           
        </Box>
    </div>
  )
}

export default Register