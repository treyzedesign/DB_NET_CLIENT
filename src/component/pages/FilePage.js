import { Box, Heading ,  Table,
  Tbody,
  Tr,
  Td,
  Text,
  TableContainer, Flex,
  Center, Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'
import React, {useEffect, useContext} from 'react'
import AuthContext from '../store/AuthContext'
import { useNavigate } from 'react-router-dom'
import Spinners from '../Spinner'; 
import {BiTrash} from 'react-icons/bi'
import { useDisclosure } from '@chakra-ui/react';
const FilePage = () => {
  const ctx = useContext(AuthContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [fileID, setfileID] = React.useState('')
  
  const navigate = useNavigate()
  const gotoFile = (title,id)=>{
    navigate(`/${id}?title=${title}`)
  }
  const files = ctx.myFiles.map((item, index)=>{
      return <Box key={index}>
        <TableContainer>
          <Table  size='sm' variant='simple'>
            <Tbody>
              <Tr>
                <Td>
                  <Text fontWeight={'bold'} >{item.title}</Text>
                  {/* <Divider/> */}
                  <Text color='GrayText' pt={0.5}>{new Date(item.date).toLocaleString()}</Text>
                </Td>
                <Td >
                  <Flex textAlign={'right'} alignContent={'flex-end'} justify={'right'}>
                  <Text fontWeight={'bold'} mr={'10px'} cursor={'pointer'} onClick={()=> gotoFile(item.title, item.file_Id)} >View</Text>
                  <Text textAlign={'right'} fontSize={'20px'} cursor={'pointer'} ><BiTrash onClick={()=>{
                    setfileID(item.file_Id)
                    onOpen()
                  }}/></Text>
                  </Flex>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
  })
  useEffect(() => {
    ctx.getuserfile()
    console.log(ctx.myFiles);
    return () => {
      console.log('cleaned')
    };
  }, [])
  return (
    <div>
        <Box minHeight={'62vh'}>
            <Heading mt="3vh" px={3} fontSize={'xl'}>My files</Heading>
            
            <Box mt={4}>
              <hr/>
              { files}
            </Box>
            
            {ctx.loader && <><Spinners/></>}
            {/* {ctx.myFiles.length == 0 && <Center>You have no files</Center>} */}
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent top={'20vh'}>
              <ModalBody>
              </ModalBody>
                  <Heading>
                    <Center>Are you sure?</Center>
                  </Heading>
              <ModalFooter justifyContent={'center'}>
                <Center>
                <Button colorScheme='whatsapp' mr={3} onClick={()=> ctx.deleteFile(fileID)} >
                  {!ctx.loader ? <>yes</> : <Spinner size={'sm'} color='white'/>}
                </Button>
                <Button variant='outline' onClick={onClose}>cancel</Button>

                </Center>
                
              </ModalFooter>
            </ModalContent>
      </Modal>
        </Box>
    </div>
  )
}

export default FilePage