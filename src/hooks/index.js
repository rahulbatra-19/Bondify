import { useContext, useEffect, useState } from 'react';
import { userLogin } from '../api';
import jwt from 'jwt-decode';
import { AuthContext } from '../providers/AuthProvider';
import { setItemInLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage, getItemfromLocalStorage } from '../utils';
export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const userToken = getItemfromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
        if (userToken) {
            const user = jwt(userToken);
            setUser(user);
        }
        setLoading(false);
    }, []);


  const login = async (email, password) => {
    const response = await userLogin(email, password);

    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  const logout = (email, password) => {
      setUser(null);
      removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  return {
    user,
    login,
    logout,
    loading,
  };
};
