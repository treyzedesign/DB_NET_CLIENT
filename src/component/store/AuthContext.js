import React from "react";
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import Cookies from "js-cookie";
const AuthContext = React.createContext({
    authPage : false,
    signupPage: ()=>{},
    loginPage: ()=>{},
    signup : ()=>{},
    signin : ()=>{}
})

export const AuthContextProvider = (props)=>{
    // page toggle
    const [authPage, setAuthPage] = React.useState(false)
    const signupPage = ()=>{
        setAuthPage(true)
    }
    const loginPage = ()=>{
        setAuthPage(false)
    }
    
    // user signup
    const toast = useToast()
    const signup = async (name, email, studentNumber, password)=>{
        if(name.current.value.length == 0 || email.current.value.length == 0 || studentNumber.current.value.length == 0 || password.current.value.length == 0){
            toast({
                title: 'Client error',
                description: "Please fill all input fields",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "top"
              })
        }
        const data = {
            name: name.current.value,
            email: email.current.value,
            studentNumber: studentNumber.current.value, 
            password: password.current.value
        }
        await axios.post('http://localhost:4444/api/createUser', data).then((feedback)=>{
            toast({
                title: 'Successful',
                description: feedback.data.message,
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: "top"
              })
            console.log(feedback.data.message);
            setAuthPage(false)
        }).catch((error)=>{
            toast({
                title: 'Error message',
                description: error.response.data.message,
                status: 'error',
                duration: 90000,
                isClosable: true,
                position: "top"
              })
            console.log(error);
        })
    }
    const signin = async(email, password)=>{
        if(email.current.value.length == 0 || password.current.value.length == 0){
            toast({
                title: 'Client error',
                description: "Please fill all input fields",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "top"
              })
        }
        const data = {
            email: email.current.value,
            password: password.current.value
        }
        await axios.post('http://localhost:4444/api/login', data,{
            headers:{
                credentials: "include"
            }
        }).then((feedback)=>{
            console.log(feedback);
            Cookies.set('access_token', feedback.data.token, {expires: 7, sameSite:"None"})
        }).catch((error)=>{
            console.log(error);
        })
    }
    return <AuthContext.Provider value={{
        authPage: authPage,
        signupPage: signupPage,
        loginPage: loginPage,
        signup: signup,
        signin: signin
    }}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext;