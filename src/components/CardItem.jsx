import React, { useState } from "react";
import CardTypeService from '../API/CardTypeService'
import ChangeCardType from './ChangeCardType'
import ChangeCardDesign from "./ChangeCardDesign"
import MakeTransaction from './MakeTransaction'
import CardService from "../API/CardService"
import MyButton from './UI/MyButton'
import { useFetch } from "../hooks/useFetch";


const CardItem = ({card, isSubItem, user}) => {
    const [updateCardType, setUpdateCardType] = useState(false)
    const [updateCardDesign, setUpdateCardDesign] = useState(false)
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
            {updateCardDesign && 
                <ChangeCardDesign 
                    card={currentCard}
                    setCard={setCurrentCard}
                    isModalVisible={updateCardDesign} 
                    setIsModalVisible={setUpdateCardDesign}
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
                <p>ID ??????????: {card.id}</p>
                <p>ID ??????????: {card.bank_account.id}</p>
                <p>{currentCard.money} {currentCard.currency}</p>
                <p className='cashback'>???????????? ???? ??????????: {currentCard.cashback_money} {currentCard.currency}</p>
                {isSubItem && 
                    <p>????????????????????????: {user.username}</p>
                }
                <p>??????????: {currentCard.bank_account.number}</p>
                <p>????????: {currentCard.bank_account.bank_name}</p>
                <p>??????: {currentCard.card_type.title}</p>
                <p>????????????: {currentCard.design.title}</p>
                <p className='date'>????: {currentCard.completion_date}</p>
                {currentCard.is_blocked 
                    ? <p className='item_blocked'>?????????? ??????????????????????????</p>
                    : <></>
                }
            </div>
            {!isSubItem &&
                <div className='item_btns'>
                    {currentCard.is_blocked 
                        ? <>
                            <MyButton isBlocked={true}>?????????????? ??????</MyButton>
                            <MyButton isBlocked={true}>?????????????? ????????????</MyButton>
                            <MyButton isBlocked={true}>?????????????? ??????????????</MyButton>
                            <MyButton onClick={unBlockedCard}>????????????????????????????</MyButton>
                        </>
                        : <>
                            <MyButton onClick={e => setUpdateCardType(true)}>?????????????? ??????</MyButton>
                            <MyButton onClick={e => setUpdateCardDesign(true)}>?????????????? ????????????</MyButton>
                            <MyButton onClick={e => setMakeTransaction(true)}>?????????????? ??????????????</MyButton>
                            <MyButton onClick={blockedCard}>??????????????????????????</MyButton>
                        </>
                    }
                </div>
            }
            
        </div>
    )
}


export default CardItem