import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkUserValid } from '../api';
import { setUser, setLoading, setUserVerified } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';

const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

   useEffect(()=> {
       validateUser();
   }, []);

   const validateUser = async () => {
        try {
            const response = await checkUserValid();
            const data = response?.data;
            dispatch(setLoading(true));
            if (data?.success) {
                const user = {
                    id: data.user?._id,
                    email: data.user?.email,
                    name: `${data.user?.firstName} ${data.user?.lastName}`,
                };
                dispatch(setUser(user));
                dispatch(setUserVerified(data?.user?.verified));
            } else {
                dispatch(setUser({ id: null, email: null, name: null }));
                dispatch(setUserVerified(false));
                navigate('/');
            }
        } catch (err) {
            console.error('Error in ValidateUser :: ', err);
            dispatch(setUser({ id: null, email: null, name: null }));
            dispatch(setUserVerified(false));
            navigate('/');
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export default useAuth