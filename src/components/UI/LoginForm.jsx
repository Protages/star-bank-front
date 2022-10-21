import React, { useContext, useState, useEffect } from "react";
import MyButton from "./MyButton";
import MyInput from './MyInput'
import Loader from "./Loader/Loader";
import { AuthContext } from '../../context/index';
import LoginService from "../../API/LoginService";
import { useFetch } from '../../hooks/useFetch'


const LoginForm = () => {
    const { setIsAuth } = useContext(AuthContext)

    const [userLogin, setUserLogin] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const [fetchUserLogin, isUserLoginLoading, userLoginErrors] = useFetch(async () => {
        const response = await LoginService.postLoginUser(userLogin, userPassword)
        
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        // console.log(localStorage.getItem('token'))
        // setUser({...response.data.user})
        setIsAuth('true')
    })

    const login = (e) => {
        e.preventDefault()
        // console.log(userLogin, userPassword)

        fetchUserLogin()
    }

    return (
        <div className="login_form">
            {isUserLoginLoading
                ? <Loader />
                : <form>
                {userLoginErrors &&
                    <div className='errors'>
                        {userLoginErrors.response.data.non_field_errors}
                    </div>
                }
                <MyInput 
                    type="text" placeholder="Логин..." 
                    value={userLogin} 
                    onChange={(e) => {setUserLogin(e.target.value)}}
                />
                <MyInput 
                    type="password" placeholder="Пароль..." 
                    value={userPassword} 
                    onChange={(e) => {setUserPassword(e.target.value)}}
                />
                <MyButton type="submit" onClick={login}>Войти</MyButton>
            </form>
            }
        </div>
    )
}


export default LoginForm