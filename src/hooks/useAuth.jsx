import { useContext, useEffect } from 'react'
import UserContext from '../utils/UserContext'
import { useNavigate } from 'react-router-dom';
import { checkUserValid } from '../api';

const useAuth = () => {
   const {setUser, setLoading, setUserVerified} = useContext(UserContext);
   const navigate = useNavigate();

   useEffect(()=> {
       validateUser();
   }, []);

   const validateUser = async () => {
        try {
            const response = await checkUserValid();
            const data = response?.data;

        if (data?.success) {
            const user = {
            id: data.user?._id,
            email: data.user?.email,
            name: `${data.user?.firstName} ${data.user?.lastName}`,
            };
            setUser(user);
            setUserVerified(data?.user?.verified)
            // navigate("/home");
        } else {
            setUser({ id: null, email: null, name: null });
            setUserVerified(false);
            navigate('/login');
        }
        } catch (err) {
            console.error('Error in ValidateUser :: ', err);            
            setUser({ id: null, email: null, name: null });
            setUserVerified(false);
            navigate('/login');
        } finally {
            setLoading(false);
        }
  };
}

export default useAuth