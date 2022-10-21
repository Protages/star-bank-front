import React, { useState } from "react";
import CardTypeService from '../API/CardTypeService'
import ChangeCardType from './ChangeCardType'
import MakeTransaction from './MakeTransaction'
import CardService from "../API/CardService"
import MyButton from './UI/MyButton'
import { useFetch } from "../hooks/useFetch";


const CardItem = ({card, isSubItem, user}) => {
    const [updateCardType, setUpdateCardType] = useState(false)
    const [makeTransaction, setMakeTransaction] = useState(false)
    const [currentCard, setCurrentCard] = useState(card)

    const [fetchBlockCard, isBlackCardLoading, blockCardErrors] = useFetch(async () => {
        const response = await CardService.putBlockedCard(card.id)
        setCurrentCard(response.data)
    })
    const [fetchUnBlockCard, isUnBlackCardLoading, unBlockCardErrors] = useFetch(async () => {
        const response = await CardService.putUnBlockedCard(card.id)
        setCurrentCard(response.data)
    })

    const blockedCard = () => { fetchBlockCard() }
    const unBlockedCard = () => { fetchUnBlockCard() }

    return (
        <div className='item'>
            {updateCardType && 
                <ChangeCardType 
                    card={currentCard}
                    setCard={setCurrentCard}
                    isModalVisible={updateCardType} 
                    setIsModalVisible={setUpdateCardType}
                />
            }
            {makeTransaction && 
                <MakeTransaction 
                    card={currentCard}
                    setCard={setCurrentCard}
                    isModalVisible={makeTransaction} 
                    setIsModalVisible={setMakeTransaction}
                />
            }

            <div className='item_content'>
                <p>ID карты: {card.id}</p>
                <p>ID счета: {card.bank_account.id}</p>
                <p>{currentCard.money} {currentCard.currency}</p>
                <p className='cashback'>Кэшбэк за месяц: {currentCard.cashback_money} {currentCard.currency}</p>
                {isSubItem && 
                    <p>Пользователь: {user.username}</p>
                }
                <p>Номер: {currentCard.bank_account.number}</p>
                <p>Банк: {currentCard.bank_account.bank_name}</p>
                <p>Тип: {currentCard.card_type.title}</p>
                <p>Дизайн: {currentCard.design.title}</p>
                <p className='date'>До: {currentCard.completion_date}</p>
                {currentCard.is_blocked 
                    ? <p className='item_blocked'>карта заблокирована</p>
                    : <></>
                }
            </div>
            {!isSubItem &&
                <div className='item_btns'>
                    {currentCard.is_blocked 
                        ? <>
                            <MyButton isBlocked={true}>Сменить тип</MyButton>
                            <MyButton isBlocked={true}>Сделать перевод</MyButton>
                            <MyButton onClick={unBlockedCard}>Разблокировать</MyButton>
                        </>
                        : <>
                            <MyButton onClick={e => setUpdateCardType(true)}>Сменить тип</MyButton>
                            <MyButton onClick={e => setMakeTransaction(true)}>Сделать перевод</MyButton>
                            <MyButton onClick={blockedCard}>Заблокировать</MyButton>
                        </>
                    }
                </div>
            }
            
        </div>
    )
}


export default CardItem