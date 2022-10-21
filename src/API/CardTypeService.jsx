import axios from 'axios';


export default class CardTypeService {
    static async getAllCardTypes() {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/card_type/')
        return response
    }

    static async putUpdateCardType(card_id, card_type_id) {
        const data = {card_type: card_type_id}
        const response = await axios.put(`http://127.0.0.1:8000/api/v1/card/${card_id}/`, data)
        return response
    }
}