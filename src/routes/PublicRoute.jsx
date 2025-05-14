import { useContext } from 'react'
import UserContext from '../utils/UserContext'
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PublicRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    
    useAuth();
    
    if (loading) return <div>Loading...</div>
    
    return !user?.id ? children: <Navigate to="/home" />
}

export default PublicRoute