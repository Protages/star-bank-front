import React from "react";
import axios from "axios";


export default class UserService {
    static async getAllUsers() {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/user/')
        return response
    }

    static async putUpdateUserData(user_id, old_data, new_data) {
        let data = {}
        for (let key in old_data) {
            if (old_data[key] !== new_data[key]) {
                data[key] = new_data[key]
            }
        }
        const response = await axios.put(`http://127.0.0.1:8000/api/v1/user/${user_id}/`, data)
        return response
    }
}