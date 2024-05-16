/* eslint-disable no-useless-catch */
import { useState, createContext, useEffect } from 'react';
// import Cookies from 'js-cookie';
import axios from 'axios';

export const UserContext = createContext({
  userId: null,
  setUserId: () => {},
});

export default function UserProvider({ children }) {
    const [userId, setUserId] = useState(null);
    

  // Get userId from local storage when component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Store userId in local storage whenever it changes
  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}

export const registerUser = async (formData) => {
    try {
        const response = await axios.post(`/api/users/signup`, formData,
            { headers: { 'Content-Type': 'application/json' } },
        );
        return response;
    } catch (error) {
        console.log(error.response.data);
        throw error;
    }
};
export const loginUser = async (formData) => {
    try {
        const response = await axios.post(`/api/users/signin`, formData, { withCredentials: true });
        return response;
    } catch (error) {
        console.log(error.response.data);
        throw error;
    }
};
export const newTransaction = async (userData) => {
    // const userId = userData.userId;

    const { userId, ...transactionData } = userData;

    try {
        const response = await axios.post(`/api/transactions/new/${userId}`,  transactionData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getTransactions = async (userId) => {
    try {
        const response = await axios.get(`/api/transactions/${userId}/all`);
        return response;
    } catch (error) {
        console.log(error.response.data);
        throw error;
    }
};
export const getOneTransaction = async (userId) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/api/transactions/one/${userId}`);
        return response;
    } catch (error) {
        throw error;
    }
};