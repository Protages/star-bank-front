import axios from 'axios';


export default class CardTypeService {
    static async getAllCardDesigns() {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/card_design/')
        return response
    }

    static async putChangeCardDesign(card_id, design_id) {
        const data = {design: design_id}
        const response = await axios.put(`http://127.0.0.1:8000/api/v1/card/${card_id}/`, data)
        return response
    }
}