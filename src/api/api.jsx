/* eslint-disable no-useless-catch */
import axios from 'axios';
import { createContext } from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext({
  userId: null,
  setUserId: () => {},
});

export default function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}

const api = 'https://passenger-reward.onrender.com';
export const registerUser = async (formData) => {
    try {
        const response = await axios.post(`${api}/api/users/signup`, formData,
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
        const response = await axios.post(`${api}/api/users/signin`, formData, { withCredentials: true });
        return response;
    } catch (error) {
        console.log(error.response.data);
        throw error;
    }
};
export const newTransaction = async (userData) => {
    const userId = userData.userId;

    try {
        const response = await axios.post('http://127.0.0.1:5000/api/transactions/new/userId', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const getTransactions = async (userId) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/api/transactions/${userId}/all`);
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