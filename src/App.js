import react from 'react'
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import SharedLayout from './component/SharedLayout';
import Register from './component/pages/Register';
import MainPage from './component/pages/MainPage';

import AuthContext from './component/store/AuthContext';
function App() {
  return (
    <div className="App">
     <ChakraProvider>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/account' element={<SharedLayout></SharedLayout>}>
          <Route index element={<MainPage/>}/>
        </Route>
        </Routes>
     </ChakraProvider>
    </div>
  );
}

export default App;
