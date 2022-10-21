import React from "react";


const AccountTarifItem = ({tarif}) => {

    return (
        <div className='item'>
            <div className="tarif">
                <p>ID: { tarif.id }</p>
                <p>Название: { tarif.title }</p>
                <p>Лимит переводов: { tarif.transfer_limit } RUB</p>
                <p>Месячная стоимость: { tarif.monthly_price } RUB</p>
                <p>Бесплатное содержание карт: { 
                    tarif.free_card_maintenance
                    ? <span>Да</span>
                    : <span>Нет</span>
                }</p>
                <p>Дополнительная процентная ставка: { 
                    tarif.additional_interest_rate === 0
                    ? <span>Отсутствует</span>
                    : <span>{ tarif.additional_interest_rate }%</span>
                }</p>
            </div>
        </div>
    )
}


export default AccountTarifItem