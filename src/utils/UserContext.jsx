// utils/UserContext.js
import { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [ user, setUser ] = useState({ id: null, email: null, name: null });
  const [ userVerified, setUserVerified ] = useState(false);
  const [ loading, setLoading ] = useState(true);

  return (
    <UserContext.Provider value={{ user, setUser, userVerified, setUserVerified, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
