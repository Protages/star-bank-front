import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Navigate } from 'react-router-dom'
import Modal from './components/UI/Modal'
import Router from './routers/Router'
import Header from './components/Header'
import LoginForm from './components/UI/LoginForm'
import { AuthContext } from './context/index'

import './styles/App.css';


function App() {
    // loading вместо true/false - чтобы при перезагрузке страницы мы ждали 
    // пока isAuth не будет ЯВНО установлена как true или false, 
    // и оставались на текущей странице, а не переходили на страницу по умолчанию
    const [isAuth, setIsAuth] = useState('loading')
    const [user, setUser] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user_storage = JSON.parse(localStorage.getItem('user'))
        if (token) {
            setIsAuth('true')
            setUser(user_storage)
            axios.defaults.headers.common = {
                'Authorization': `Token ${token}`
            }
        }
        else {
            setIsAuth('false')
            delete axios.defaults.headers['Authorization']
        }
    }, [isAuth])


    return (
        <div className="App">
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            user,
            setUser,
        }}>
            <BrowserRouter>
                <>
                {isAuth === 'loading'
                    ? <></>
                    : <>
                        {isAuth==='true' && <Header />}
                        <Router />
                    </>
                }
                </>
            </BrowserRouter>
        </AuthContext.Provider>
        </div>
    );
}


export default App;
