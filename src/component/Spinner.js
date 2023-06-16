import React from 'react'
import { AbsoluteCenter, Box, Spinner } from '@chakra-ui/react'
const Spinners = () => {
  return (
    <div>
        <Box position={'relative'} h='50vh'>
            <AbsoluteCenter>
            <Spinner
                thickness='5px'
                speed='1s'
                emptyColor='gray.200'
                color='green.500'
                size='md'
                h={'50px'}
                w={'50px'}
            />
            </AbsoluteCenter>
        </Box>
    </div>
  )
}

export default Spinners