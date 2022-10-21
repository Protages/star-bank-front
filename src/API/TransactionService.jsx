import React from "react";
import axios from "axios";


export default class TransactionService {
    static async getMyTransactions() {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/user_transaction/`)
        return response
    }

    static async postMakeTransaction(from_id, to_id, money, currency, transaction_type_id) {
        const data = {
            from_number: from_id, 
            to_number: to_id, 
            money: money, 
            currency: currency, 
            transaction_type: transaction_type_id
        }
        const response = await axios.post(`http://127.0.0.1:8000/api/v1/transaction/`, data)
        return response
    }
}