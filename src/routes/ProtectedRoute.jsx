import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import useAuth from "../hooks/useAuth"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
 
  useAuth();

  if (loading) return <div>Loading...</div>;

  return user?.id ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
