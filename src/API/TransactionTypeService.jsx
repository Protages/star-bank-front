import React from "react";
import axios from "axios";


export default class TransactionTypeService {
    static async getAllTransactionType() {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/transaction_type/`)
        return response
    }
}