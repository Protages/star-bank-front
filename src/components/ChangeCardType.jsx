import React, { useEffect, useState } from "react";
import CardTypeService from '../API/CardTypeService'
import { useFetch } from "../hooks/useFetch";
import CardTypeItem from './CardTypeItem'
import Loader from "./UI/Loader/Loader"
import Modal from "./UI/Modal";
import MyInput from "./UI/MyInput";
import MyButton from "./UI/MyButton";


const ChangeCardType = ({card, setCard, isModalVisible, setIsModalVisible}) => {
    const [cardTypeID, setCardTypeID] = useState('')
    const [currentCardType, setCurrentCardType] = useState(card.card_type)
    const [cardTypes, setCardTypes] = useState([])

    const [fetchCardTypes, isCardTypesLoading, cardTypesErrors] = useFetch(async () => { 
        const response = await CardTypeService.getAllCardTypes()

        setCurrentCardType(response.data.filter(
            (value) => {return value.id === currentCardType.id})[0]
        )
        setCardTypes(response.data)
    })

    const [fetchUpdateType, isUpdateTypeLoading, updateTypeErrors] = useFetch(async () => { 
        const response = await CardTypeService.putUpdateCardType(card.id, cardTypeID)

        setCard(response.data)
        setIsModalVisible(false)
    })

    useEffect(() => {
        fetchCardTypes()
    }, [])

    const changeCardType = (e) => { 
        e.preventDefault()
        fetchUpdateType()
    }

    const filterCardTypes = (value) => {
        return value.id !== currentCardType.id
    }

    return (
        <>
        <Modal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            title='Сменить тип карты'
        >
            {isUpdateTypeLoading
                ? <Loader />
                : <>
                    {updateTypeErrors &&
                        <div className='errors'>
                            {updateTypeErrors.response.data.card_type}
                        </div>
                    } 
                    <form >
                        <MyInput
                            value={cardTypeID}
                            onChange={e => setCardTypeID(e.target.value)}
                            placeholder='Введите ID тарифа...'
                        />
                        <MyButton onClick={changeCardType}>Подтвердить</MyButton>
                    </form>
                </>
            }

            <div className="modal_sub_list">

                <h3 className='modal_sub_title'>Текущий тип карты</h3>
                {isCardTypesLoading
                    ? <Loader />
                    : <><CardTypeItem cardType={currentCardType}/></>
                }

                <h3 className='modal_sub_title'>Другие типы карт</h3>
                {isCardTypesLoading
                    ? <Loader />
                    : <>{cardTypes.filter(filterCardTypes).map(type => 
                        <CardTypeItem cardType={type} key={type.id}/>
                    )}</>
                }
            </div>
            
        </Modal>
        </>
    )
}


export default ChangeCardType