import React, { useEffect, useState, useRef, useContext } from 'react';
import { AuthContext } from '../context/index'
import TransactionItem from '../components/TransactionItem'
import MyButton from '../components/UI/MyButton'
import Loader from '../components/UI/Loader/Loader'
import TransactionService from '../API/TransactionService'
import UserService from '../API/UserService'
import { useFetch } from "../hooks/useFetch";


const Transactions = () => {
    const { user } = useContext(AuthContext)
    const [userTransactions, setUserTransactions] = useState([])

    const [fetchUserTrans, isUserTransLoading, userTransErrors] = useFetch(async () => {
        const response = await TransactionService.getMyTransactions()

        const transactionOutgoing = response.data.transaction_outgoing.map(
            trans => ({...trans, incoming: false})
        )
        const transactionIncoming = response.data.transaction_incoming.map(
            trans => ({...trans, incoming: true})
        )

        setUserTransactions([...transactionOutgoing, ...transactionIncoming].reverse())
    })

    useEffect(() => {
        fetchUserTrans()
    }, [])

    return (
        <div className='center transaction_list'>
            <div className='container'>

                <div className='center_header'>
                    <h1 className='title'>Список ваших транзакций</h1>
                    <MyButton>Создать траназкцию</MyButton>
                </div>

                <div className='center_content'>
                    <div className='list'>
                        {isUserTransLoading
                            ? <Loader />
                            : <>{userTransactions.map(transaction =>  
                                <TransactionItem transaction={transaction} key={transaction.id}/>
                            )}</>
                        }
                    </div>
                </div>
                
            </div>
        </div>
    )
}


export default Transactions