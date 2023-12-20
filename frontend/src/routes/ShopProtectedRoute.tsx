import { ReactNode, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';

interface ShopProtectedRouteProps {
    children: ReactNode;
}

const ShopProtectedRoute: React.FC<ShopProtectedRouteProps> = ({children}) => {
  
    const {loading, isAuthenticated,shop} = useSelector((state: RootState) => state.shop)

    console.log(loading)
    if(loading === 'pending'){
        return <Loader />
    }else{
        if(!shop || !isAuthenticated){
            return <Navigate to={'/shop/login'} replace />
        }
        return children
    }
}


export default ShopProtectedRoute