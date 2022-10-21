import axios from 'axios';


export default class CardService {
    static async getAll() {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/account_tarif/')
        return response
    }

    static async putUpdateUserTarif(user_id, tarif_id) {
        const data = {tarif: tarif_id}
        const response = await axios.put(`http://127.0.0.1:8000/api/v1/user/${user_id}/`, data)
        return response
    }
}