import React, { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import TransactionService from '../API/TransactionService'
import TransactionTypeService from '../API/TransactionTypeService'
import CardService from "../API/CardService";
import Modal from './UI/Modal'
import Loader from './UI/Loader/Loader'
import MyInput from './UI/MyInput'
import MyButton from "./UI/MyButton";
import TransactionItem from "./TransactionItem";
import RenderErrors from "./RenderErrors";


const MakeTransaction = ({card, setCard, isModalVisible, setIsModalVisible}) => {
    const [title, setTitle] = useState('Сделать перевод')
    const [isTransactionCreate, setIsTransactionCreate] = useState(false)
    const [transaction, setTransaction] = useState({
        from_id: card.id, 
        to_id: '', 
        money: 0, 
        currency: card.currency, 
        transaction_type: ''
    })
    const [transactionTypes, setTransactionTypes] = useState([])

    const [fetchTransTypes, isTransTypesLoading, transTypesErrors] = useFetch(async () => {
        const response = await TransactionTypeService.getAllTransactionType()

        setTransactionTypes(response.data)
    })

    const [fetchMakeTransaction, isMakeTransLoading, makeTransErrors] = useFetch(async () => {
        const response = await TransactionService.postMakeTransaction(
            transaction.from_id, 
            transaction.to_id, 
            transaction.money, 
            transaction.currency, 
            transaction.transaction_type
        )
        fetchUpdatedCard()
        setTitle('Перевод был выполнен успешно!')
        setTransaction(response.data)
        setIsTransactionCreate(true)
    })

    const [fetchUpdatedCard, isUpdatedCardLoading, updatedCardErrors] = useFetch(async () => {
        const response = await CardService.getCard(card.id)
        setCard(response.data)
    })

    useEffect(() => {
        fetchTransTypes()
    }, [])

    const makeTransaction = (e) => {
        e.preventDefault()
        fetchMakeTransaction()
    }

    return (
        <>
        <Modal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            title={title}
        >
        {isTransactionCreate
            ? <><TransactionItem transaction={transaction} />
                <MyButton onClick={(e) => {e.preventDefault(); setIsModalVisible(false);}} >
                    Зыкрыть
                </MyButton></>
        
            :<>
            {isMakeTransLoading
                ? <Loader />
                : <>{makeTransErrors &&
                    <div className='errors'>
                        <RenderErrors errors={makeTransErrors} />
                    </div>
                    } 
                <form className='form'>
                    <p>Со счета (id): <MyInput 
                        placeholder='Введите ID счета...'
                        value={transaction.from_id}
                        onChange={e => setTransaction({...transaction, from_id: e.target.value})}
                    /></p>
                    <p>На счет (id): <MyInput 
                        placeholder='Введите ID счета...'
                        value={transaction.to_id}
                        onChange={e => setTransaction({...transaction, to_id: e.target.value})}
                    /></p>
                    <p>Сумма: <MyInput 
                        placeholder='Введите сумму перевода...'
                        value={transaction.money}
                        onChange={e => setTransaction({...transaction, money: e.target.value})}
                    /></p>
                    <p>Тип транзакции (id): <MyInput 
                        placeholder='Введите ID транзакции...'
                        value={transaction.transaction_type}
                        onChange={e => setTransaction({...transaction, transaction_type: e.target.value})}
                    /></p>
                    <MyButton onClick={makeTransaction}>Подтвердить</MyButton>
                </form></>
            }

            <div className="modal_sub_list">
                <h3 className='modal_sub_title'>Типы транзакций</h3>
                {isTransTypesLoading
                    ? <Loader />
                    : <>{transactionTypes.map(type => 
                        <div className='modal_sub_item' key={type.id}>
                            <p>ID: {type.id}</p>
                            <p>Название: {type.title}</p>
                        </div>
                    )}</>
                }
            </div></>
        }

        </Modal>
        </>
    )
}


export default MakeTransaction