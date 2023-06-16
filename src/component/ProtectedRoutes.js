import { Navigate } from 'react-router-dom';
import Cookie from 'js-cookie'
import jwtDecode from 'jwt-decode';

const ProtectedRoutes = ({children}) => {
    let user = Cookie.get('refresh_token')
    // console.log(user);
    
    if(!user){
      return <Navigate to="/account/auth" />;
    }else{
        return children;
    
      
    }
}

export default ProtectedRoutes



