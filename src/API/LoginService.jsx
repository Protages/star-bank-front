import React from "react";
import axios from "axios";


export default class LoginService {
    static async postLoginUser(userLogin, userPassword) {
        const data = {username: userLogin, password: userPassword}
        const response = await axios.post(
            'http://127.0.0.1:8000/api/v1/auth/login/', 
            data
        )
        return response
    }
}