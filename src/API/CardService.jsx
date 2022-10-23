import axios from 'axios';


export default class CardService {
    static async getMyCards() {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/user_card/`)
        return response
    }

    static async getAllCards() {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/card/')
        return response
    }

    static async getCard(card_id) {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/card/${card_id}/`)
        return response
    }

    static async putBlockedCard(card_id) {
        const data = {is_blocked: 'true'}
        const response = await axios.put(`http://127.0.0.1:8000/api/v1/card/${card_id}/`, data)
        return response
    }

    static async putUnBlockedCard(card_id) {
        const data = {is_blocked: 'false'}
        const response = await axios.put(`http://127.0.0.1:8000/api/v1/card/${card_id}/`, data)
        return response
    }

    static async postCreateCard(user_id, number, bank_name, currency, money, is_push, card_type_id, card_design_id) {
        const data = {
            user: user_id, 
            number: number, 
            bank_name: bank_name, 
            currency: currency, 
            money: money, 
            is_push: is_push, 
            card_type: card_type_id, 
            design: card_design_id
        }
        const response = await axios.post('http://127.0.0.1:8000/api/v1/card/', data)
        return response
    }
}