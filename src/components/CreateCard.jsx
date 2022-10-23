import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../context/index'
import CardService from '../API/CardService'
import CardTypeService from "../API/CardTypeService";
import CardDesignService from "../API/CardDesignService"
import { useFetch } from '../hooks/useFetch'
import Loader from './UI/Loader/Loader'
import Modal from "./UI/Modal"
import MyButton from './UI/MyButton'
import MyInput from "./UI/MyInput";
import RenderErrors from "./RenderErrors";



const CreateCard = ({userCards, setUserCards, isModalVisible, setIsModalVisible}) => {
    const { user } = useContext(AuthContext)
    const [cardTypes, setCardTypes] = useState([])
    const [cardDesigns, setCardDesigns] = useState([])
    const [newCard, setNewCard] = useState({
        user_id: user.id, number: '', 
        bank_name: 'Star-Bank', currency: 'RUB', 
        money: 0, is_push: false, 
        card_type_id: '', card_design_id: ''})

    const [fetchCardTypes, isCardTypesLoading, cardTypesErrors] = useFetch(async () => {
        const response = await CardTypeService.getAllCardTypes()
        // setNewCard({...newCard, card_type_id: response.data[0].id})
        setCardTypes(response.data)
    })
    const [fetchCardDesigns, isCardDesignsLoading, cardDesignsErrors] = useFetch(async () => {
        const response = await CardDesignService.getAllCardDesigns()
        // setNewCard({...newCard, card_design_id: response.data[0].id})
        setCardDesigns(response.data)
    })
    const [fetchCreateCard, isCreateCardLoading, createCardErrors] = useFetch(async () => {
        const response = await CardService.postCreateCard(
            newCard.user_id, newCard.number, newCard.bank_name, 
            newCard.currency, newCard.money, newCard.is_push,
            newCard.card_type_id, newCard.card_design_id
        )
        setUserCards([...userCards, response.data])
        setIsModalVisible(false)
    })

    useEffect(() => {
        fetchCardTypes()
        fetchCardDesigns()
    }, [])

    const createCard = (e) => {
        e.preventDefault()
        fetchCreateCard()
    }

    return (
        <><Modal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            title='Создание карты'
        >
        {isCreateCardLoading
            ? <Loader />
            :<form className="form">
                {createCardErrors &&
                    <div className='errors'>
                        <RenderErrors errors={createCardErrors}/>
                    </div>
                }
                
                <p>Номер счета: <MyInput 
                    placeholder='Введите номер счета...'
                    value={newCard.number}
                    onChange={e => setNewCard({...newCard, number: e.target.value})}
                /></p>
                <p>Название банка: <MyInput 
                    placeholder='Введите название банка...'
                    value={newCard.bank_name}
                    onChange={e => setNewCard({...newCard, bank_name: e.target.value})}
                /></p>
                <p>Валюта: 
                    <select 
                        onChange={e => setNewCard({...newCard, currency: e.target.value})} 
                        value={newCard.currency} className='my_select'
                    >
                        <option value='RUB'>Рубли</option>
                        <option value='USD'>Доллары</option>
                        <option value='EUR'>Евро</option>
                    </select></p>
                <p>Сумма на счету: <MyInput 
                    placeholder='Введите сумму...'
                    value={newCard.money}
                    onChange={e => setNewCard({...newCard, money: e.target.value})}
                /></p>
                <p>Включить уведомления: 
                    <select 
                        onChange={e => setNewCard({...newCard, is_push: e.target.value})} 
                        value={newCard.is_push} className='my_select'
                    >
                        <option value={true}>Да</option>
                        <option value={false}>Нет</option>
                    </select>
                </p>
                <p>Тип карты: 
                    <select 
                        onChange={e => setNewCard({...newCard, card_type_id: e.target.value})} 
                        value={newCard.card_type_id} className='my_select'
                    >
                        {isCardTypesLoading
                            ? <><option value="">Закгрузка...</option></>
                            : <><option value='none'>(Не выбрано)</option>
                            {cardTypes.map(type => 
                                <option value={type.id} key={type.id}>{type.title}</option>
                            )}</>
                        }
                    </select>
                </p>
                <p>Дизайн карты: 
                    <select 
                        onChange={e => setNewCard({...newCard, card_design_id: e.target.value})} 
                        value={newCard.card_design_id} className='my_select'
                    >
                        {isCardDesignsLoading
                            ? <><option value="">Закгрузка...</option></>
                            : <><option value='none'>(Не выбрано)</option>
                            {cardDesigns.map(design => 
                                <option value={design.id} key={design.id}>{design.title}</option>
                            )}</>
                        }
                    </select>
                </p>

                <MyButton onClick={createCard}>Создать карту</MyButton>
            </form>
        }
        </Modal></>
    )
}


export default CreateCard