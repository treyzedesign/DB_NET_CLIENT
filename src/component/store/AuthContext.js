import React from "react";
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useDisclosure } from '@chakra-ui/react';
import config from "../../config";
const AuthContext = React.createContext({
    authPage : false,
    signupPage: ()=>{},
    loginPage: ()=>{},
    signup : ()=>{},
    signin : ()=>{},
    getCookie: ()=>{},
    postfile : ()=>{},
    Modal: [],
    getuserfile: ()=>{},
    myFiles : [],
    loader: false,
    deleteFile : ()=>{},
    getfile : ()=>{},
    AFile: [],
    logout : ()=>{}
})

export const AuthContextProvider = (props)=>{
    // page toggle
    const [authPage, setAuthPage] = React.useState(false)
    const [ myFiles, setMyFiles] = React.useState([]) 
    const [AFile, setAFile] = React.useState([])
    const [loader, setLoader] = React.useState(false)
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const BASE_URL = config.BASE_URL

    const signupPage = ()=>{
        setAuthPage(true)
    }
    const loginPage = ()=>{
        setAuthPage(false)
    }
    
    // user signup
    const toast = useToast()
    const signup = async (name, email, studentNumber, password)=>{
        if(name.current.value.length === 0 || email.current.value.length === 0 || studentNumber.current.value.length === 0 || password.current.value.length === 0){
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
        await axios.post(`${BASE_URL}/api/createUser`, data).then((feedback)=>{
            toast({
                title: 'Successful',
                description: feedback.data.message,
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: "top"
              })
            // console.log(feedback.data.message);
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
            // console.log(error);
        })
    }
    const signin = async(email, password)=>{
        if(email.current.value.length === 0 || password.current.value.length === 0){
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
        const config = {
            headers:{
                'Content-Type': "application/json"
            }, 
            withCredentials : true,
        }
        await axios.post(`${BASE_URL}/api/login`, data ,config).then((feedback)=>{
            // console.log(feedback);
            Cookies.set('refresh_token', feedback.data.refresh_token, {expires: 365, sameSite:"None", secure: true})
            Cookies.set('access_token', feedback.data.token, {expires: 1, sameSite:"None", secure: true})
            
            navigate('/')
        }).catch((error)=>{
            toast({
                title: 'Client error',
                description: error.response.data.message + ", Create an Account",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "top"
              })
            // console.log(error);
        })
    }
    const logout = async ()=>{
        await axios.post(`${BASE_URL}/api/logout`).then((feedback)=>{
            console.log(feedback)
        })
    }
    const postfile = async(title, File)=>{
        if(title.current.value.length === 0 || File === null){
            toast({
                title: 'Client error',
                description: "Please fill all input fields",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            })
        }else{
            onOpen()
            const data ={
                title: title.current.value,
                files: File
            }
            console.log(data);
            const token = Cookies.get("access_token")
            await axios.post(`${BASE_URL}/api/postFile`, data, {
                headers:{
                    authorization: "bearer"+ " " + token,
                    "Content-Type": "multipart/form-data"
                }
            }).then((feedback)=>{
                console.log(feedback);
                onClose()
                if(feedback){
                    toast({
                    title: 'success',
                    description: "uploaded file(s)s successfully",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: "top",
                    variant: "top-accent",
                })
                }
               
            }).catch((err)=>{
                console.log(err);
                toast({
                    title: 'error',
                    description: "An error occurred",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: "top",
                    variant: "top-accent"
                })
                onClose()
            })
        }
        
    }

    const getuserfile = async()=>{
        const cookie = Cookies.get('access_token')
        const decode = jwtDecode(cookie)
        setLoader(true)
        await axios.get(`${BASE_URL}/api/getUserFile/${decode.id}`).then((feedback)=>{
            setLoader(false)
            setMyFiles(feedback.data.message)
        }).catch((err)=>{
            console.log(err)
            setLoader(false)
        })
    }
    
    const getfile = async(id)=>{
        await axios.get(`${BASE_URL}/api/getAFile/${id}`).then((feedback)=>{
            console.log(feedback);
            setAFile(feedback.data.message)
        }).catch((error)=>{
            console.log(error);
        })
    }

    const deleteFile = async(id)=>{
        setLoader(true)
        console.log(id);
        const fileid = id
        const token = Cookies.get("access_token")
        await axios.delete(`${BASE_URL}/api/deleteFile/${fileid}`,{
            headers:{
                authorization: "bearer"+ " " + token
            }
        }).then((feedback)=>{
            console.log(feedback)
            setLoader(false)
            window.location.reload()
        }).catch((err)=>{
            console.log(err)
            setLoader(false)
            toast({
                title: 'error',
                description: "An error occurred",
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            })
        })
    }
    const api = axios.create({
        baseURL: BASE_URL
    });
    React.useEffect(() => {
        axios.interceptors.response.use((response)=>{
            return response
        }, (err)=>{
            const Token = Cookies.get("refresh_token")
            const originalRequest = err.config;

            if(err.response.status === 401 && Token){
                const data = {
                    refresh_token: Token
                }
                axios.post(`${BASE_URL}/api/refresh`, data).then((feedback)=>{
                    console.log(feedback);
                    Cookies.set('access_token', feedback.data.message, {expires: 1, sameSite:true, secure: false})
                    originalRequest.headers.authorization = `Bearer ${feedback.data.message}`
                    api(originalRequest).then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }).catch((err)=>{
                    console.log(err);
                })
            }
        })
    }, []);
    return <AuthContext.Provider value={{
        authPage: authPage,
        signupPage: signupPage,
        loginPage: loginPage,
        signup: signup,
        signin: signin,
        postfile: postfile,
        Modal: [isOpen, onOpen, onClose],
        getuserfile: getuserfile,
        myFiles: myFiles,
        loader: loader,
        deleteFile: deleteFile,
        getfile : getfile,
        AFile: AFile,
        logout: logout
    }}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext;