import React from "react";
import MyButton from './UI/MyButton'


const DepositItem = ({deposit, isSubItem, user}) => {
    // console.log(card)

    return (
        <div className='item'>
            <div className='item_content'>
                <p>ID: {deposit.id}</p>
                <p>{deposit.money} {deposit.currency}</p>
                {isSubItem && 
                    <p>Пользователь: {user.username}</p>
                }
                <p>Номер: {deposit.bank_account.number}</p>
                <p>Банк: {deposit.bank_account.bank_name}</p>
                <p>Ставка: {deposit.interest_rate}%</p>
                <p className='date'>До: {deposit.completion_date}</p>
            </div>
            {!isSubItem &&
                <div className='item_btns'>
                    <MyButton>Сделать перевод</MyButton>
                    <MyButton>Удалить</MyButton>
                </div>
            }
        </div>
    )
}


export default DepositItem