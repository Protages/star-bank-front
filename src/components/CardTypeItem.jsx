import React from 'react'


const CardTypeItem = ({cardType}) => {
    return (
        <div className='modal_sub_item'>
            <p>ID: {cardType.id}</p>
            <p>Название: {cardType.title}</p>
            <p>Цена увед.: {cardType.push_price} RUB</p>
            <p>Цена обсл.: {cardType.service_price} RUB</p>
            <div className='card_cashbacks'><p>Кэшбэки: </p>
                {cardType.cashbacks.map((cashb, index) => 
                    <div className='card_cashback' key={index}>
                        <p>Название: {cashb.title}</p>
                        <p>Процент: {cashb.percent}%</p>
                    </div>
                )}
            </div>
        </div>
    )
}


export default CardTypeItem