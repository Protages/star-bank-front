import React from "react";
import MyButton from './UI/MyButton'


const TransactionItem = ({transaction, isSubItem, user}) => {
    // console.log(transaction)

    return (
        <div className='item transaction'>
            <div className='item_content'>
                <p>ID: {transaction.id}</p>
                <p>Сумма:
                    {transaction.incoming
                        ? <span className='incoming_money'>
                            +{transaction.money} {transaction.currency}
                        </span>
                        : <span className='outgoing_money'>
                            -{transaction.money} {transaction.currency}
                        </span>
                    }
                </p>
                <p>Со счета: 
                    {transaction.from_number
                        ? <> {transaction.from_number.number}</>
                        : <span> (счет был удален)</span>
                    }
                </p>
                <p>На счет: 
                    {transaction.to_number
                        ? <> {transaction.to_number.number}</>
                        : <span> (счет был удален)</span>
                    }
                </p>
                <p>Кэшбэк: {transaction.cashback_money} {transaction.currency}</p>
                {/* <p> 
                    {transaction.incoming
                        ? <span className=''> 
                            На счет: {transaction.to_number.number}
                        </span>
                        : <span className=''> 
                            Со счета: {transaction.from_number.number}
                        </span>
                    }
                </p> */}
                <p>Тип: {transaction.transaction_type.title}</p>
                <p>Дата: {transaction.date}</p>
            </div>
        </div>
    )
}


export default TransactionItem