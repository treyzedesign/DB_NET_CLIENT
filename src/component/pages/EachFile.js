import React , {useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { Box, Flex, Heading, Image, Text, Center, ButtonGroup, Button ,CircularProgress, CircularProgressLabel, AbsoluteCenter} from '@chakra-ui/react'
import AuthContext from '../store/AuthContext'
import axios from 'axios'
import def from "../assets/default.jpg";
import { useToast } from '@chakra-ui/react'
import JsFileDownloader from 'js-file-downloader';
import { progress } from 'framer-motion'
const EachFile = () => {
    const ctx = useContext(AuthContext)
    const [AFile, setAFile] = React.useState([])
    const [fetched, setfetched] = React.useState()
    const [urls, setUrls] = React.useState([])
    const [progress, setprogress ] =React.useState(false)
    const [percent, setpercent ] =React.useState()
    const toast = useToast()
    
    const {Id} = useParams()
    const getfile = async(id)=>{
      await axios.get(`http://localhost:4444/api/getAFile/${id}`).then((feedback)=>{
          // console.log(feedback);
          setfetched(feedback.data.message.title)
          setAFile(feedback.data.message.file)
          const url = feedback.data.message.file.map(item => {return item.url})
          setUrls(url)
          // console.log(urls);
      }).catch((error)=>{
          // console.log(error);
      })
  }
    useEffect(() => {
      getfile(Id)
      // console.log(window.location.href);
    }, []);
    // console.log(urls);
    const allfiles = AFile.map((item)=>{
      return <Box>
          <Box p={10}>
          <Box position={'relative'}>
          <Image w="150px" src={item.url} loading='lazy'/>
         {progress && <Box ><AbsoluteCenter  bgColor={'gray.300'} p={'50px'} opacity={0.9}>
          <CircularProgress value={percent} color='green.400' opacity={1}>
            <CircularProgressLabel>{percent ? percent : "0"}%</CircularProgressLabel>
          </CircularProgress>
          </AbsoluteCenter></Box>}
          </Box>
          <Center fontSize='xs' fontWeight='20px' pt='1'>{item.filename}</Center>
          <Center fontSize='xs' fontWeight='20px' pt='1'>{Math.abs(item.size / 1000).toString().slice(0,4) + " " + "KB"}</Center>
          </Box>
      </Box>
    }) 
    const process = (event)=> {
      // console.log(event);
      if (!event.lengthComputable) return; // guard
      var downloadingPercentage = Math.floor(event.loaded / event.total * 100);
      // what to do ...
      setpercent(downloadingPercentage);
    }
    const Download = ()=>{
      // console.log(urls);
      setprogress(true)

      urls.forEach(item =>{
        new JsFileDownloader({ 
          url: item,
          process: process
         })
        .then(function (feed) {
          // Called when download ended

          // console.log('okay', feed)

        })
        .catch(function (error) {
          // Called when an error occurred
          // console.log(error.message);
        });
      })
    }
    const copyLink = ()=>{
      const URL = window.location.href
      const copy = navigator.clipboard.writeText(URL)
      if (copy){
        toast({
          title: '',
          description: 'copied Link',
          status: 'info',
          duration: 4000,
          isClosable: true,
          position: "top"
        })
      }
    }
  return (
    <div>
      <Box minHeightheight='100vh' width={'100vw'} bgGradient='linear(to-b, green.100, white)'>
        <Heading px={7} pt={'15vh'}>{fetched}</Heading>
        <Flex wrap={'wrap'}>
          {allfiles}
        </Flex>
        <ButtonGroup position={'relative'} left={'35%'} mb={'10vh'}>
          <Button colorScheme={'green'} onClick={()=> Download()}>Download </Button>
          <Button onClick={()=> copyLink()}>Share</Button>
        </ButtonGroup>
        
      </Box>
    </div>
  )
}

export default EachFile