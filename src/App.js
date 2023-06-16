import react from 'react'
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import SharedLayout from './component/SharedLayout';
import Register from './component/pages/Register';
import MainPage from './component/pages/MainPage';
import ProtectedRoutes from './component/ProtectedRoutes';
import FilePage from './component/pages/FilePage';
import EachFile from './component/pages/EachFile';
function App() {
  return (
    <div className="App">
        <ChakraProvider>
        <Routes>
          <Route path='/account/auth' element={<Register/>}/>
          <Route path='/:Id/title?' element={<EachFile/>}/>
          <Route path='/' element={<ProtectedRoutes><SharedLayout/></ProtectedRoutes>}>
            <Route index element={<MainPage/>}/>
            <Route path='files/myFiles' element={<FilePage/>}/>
        </Route>
        </Routes>
        </ChakraProvider>
    </div>
  );
}

export default App;
