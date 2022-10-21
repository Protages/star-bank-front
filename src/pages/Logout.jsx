import React, { useContext } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from "../context/index";


const Logout = () => {
    const {setIsAuth} = useContext(AuthContext)

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuth('false');

    // return <Navigate to="/login" replace />
}


export default Logout