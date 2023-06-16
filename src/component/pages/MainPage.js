import { Box, Button, Heading , Divider, Flex, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,Image,Center,AbsoluteCenter,Input,Spinner,ButtonGroup} from '@chakra-ui/react'
import React from 'react'
import { useContext } from 'react'
import AuthContext from '../store/AuthContext'
import { AiFillFileAdd } from 'react-icons/ai';
import def from "../assets/default.jpg";
import { useDisclosure } from '@chakra-ui/react';

const MainPage = () => {
  const ctx = useContext(AuthContext)
   const [dragActive, setDragActive] = React.useState(false);
   const [File, setFile] = React.useState()
   const [fileUrl, setfileUrl] = React.useState([])
   const inputRef = React.useRef(null);
   const titleRef = React.useRef(null)
    const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);
      setFile(e.target.files)

    }
  };

  React.useEffect(()=>{
     if(File){
        // console.log(File)

        const newfile = Array(...File).map((item)=>{
          // console.log(item.name.split('.')[1]);
          return {
                name: item.name,
                url : URL.createObjectURL(item),
                size: Math.floor(item.size / 1000) + "kb"
              }    
        })
        console.log(newfile)
        setfileUrl(newfile)
     }
  },[File])

  const onButtonClick = () => {
    inputRef.current.click();
  };
  const viewImage = (url)=>{
    window.location.href = url
  }
  return (
    <div>
      <Box position={'relative'} pt={10}>
        <Box px='15px'>
            <Heading as={'h6'} mt='2vh' fontSize={'2xl'}>Upload file</Heading>
            <form>
              <Input type="text" 
              focusBorderColor='teal' 
              variant='flushed' 
              placeholder='enter file description' 
              mt={4} size='md'
              ref={titleRef}
            />
              <Input
                // accept="image/*"
                type="file"
                style={{ display: "none" }}
                multiple
                ref={inputRef}
                onChange={handleChange}
              />
               {/* onChange={(e) => setSelectedImage(e.target.files[0])} */}
              <Box position="relative" borderRadius="xl" onDragEnter={handleDrag} borderWidth="5px" mt="5vh" borderColor='green' bgColor='gray.50' h="40vh" >
              <AbsoluteCenter>
                 <AiFillFileAdd onClick={onButtonClick} style={{fontSize:"150px", fontWeight:'20px',color:"grey",height:"20vh", cursor:"pointer"}} />
                  <Center fontSize='xs' fontWeight='20px' pt='1'>click here to upload</Center>
              </AbsoluteCenter>
              </Box>
              <Center fontSize='xs' fontWeight='20px' pt='1'>supported formats: .jpg, .png, .jpeg, .pdf</Center>

            </form>
           {File && <Box>
               <Heading as={'h6'} mt='2vh' pb='2' fontSize={'2xl'}>Preview</Heading>
               <Divider/>
               <Flex wrap={'wrap'}>
               {fileUrl.map((item)=>{
                return (
                     <Box onClick={()=> viewImage(item.url)}>
                         {item.name.split('.')[1] == "jpg" || "jpeg" || "png" ? <Image w="150px" src={def}/>: <Image w="150px" src={item.url}/>}
                          <Center fontSize='xs' fontWeight='20px' pt='1'>{item.name}</Center>
                          <Center fontSize='xs' fontWeight='20px' pt='1'>{item.size}</Center>

                     </Box>
                  )
               })}
               </Flex>
            </Box>}
            <ButtonGroup w="100%">
              <Button boxShadow={'xl'} bgColor={'green'} color={'white'} width='100%' mt='5vh'  onClick={()=> ctx.postfile(titleRef, File)}>Upload</Button>
            </ButtonGroup>
        </Box>
          <Modal h='20vh' isOpen={ctx.Modal[0]}  isCentered>
          <ModalOverlay />
          <ModalContent py={'20px'}>
            <ModalBody>
            <Center>
            <Spinner
                thickness='10px'
                speed='0.65s'
                emptyColor='gray.200'
                color='green.500'
                size='xl'
                h={'70px'}
                w={'70px'}
              />
            </Center>
            <Center pt={5}>hold on...</Center>

            </ModalBody>
          </ModalContent>
          </Modal>
      </Box>
    </div>
  )
}

 
export default MainPage