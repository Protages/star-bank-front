import axios from 'axios';


export default class DepositService {
    static async getMyDeposits() {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/user_deposit/`)
        return response
    }

    static async getAllDeposits() {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/deposit/`)
        return response
    }
}