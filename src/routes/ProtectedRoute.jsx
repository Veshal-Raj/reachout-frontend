import { Navigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth"
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state)=>state.user);
 
  useAuth();

  if (loading) return <div>Loading...</div>;

  return user?.id ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
