import axios from 'axios';
import React, { useState, useContext, createContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const isMe = ({ username = '', user_id = '' }) => {
        if(user?.username == username) {
            return true 
        }

        else if(user?.user_id == user_id) {
            return true 
        }

        return false 
    }

    const login = async ({ username, password }) => {

        console.log({ username, password });

        const res = await axios.post('http://localhost:3000/api/auth/login', { username, password });

        if (res.status == 200) setUser(res.data);
    }

    const register = async ({ username, password }) => {

        const res = await axios.post('http://localhost:3000/api/auth/register', { username, password });

        if (res.status !== 200) {
            console.log(res);
            throw new Error(res.statusText);
        } else {
            setUser(res.data)
        }
    }

    const logout = async () => {
        setUser(null)
    }

    useEffect(() => {
        console.log(user)
    }, [user])


    return (
        <AuthContext.Provider value={{ user, login, register, logout, isMe }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);