import React, { useEffect, useState, useRef, useContext } from 'react';
import { AuthContext } from '../context/index'
import CardItem from '../components/CardItem'
import MyButton from '../components/UI/MyButton'
import Loader from '../components/UI/Loader/Loader'
import CreateCard from '../components/CreateCard'
import CardService from '../API/CardService'
import UserService from '../API/UserService'
import { useFetch } from "../hooks/useFetch";


const CardList = () => {
    const { user } = useContext(AuthContext)
    const [userCards, setUserCards] = useState([])
    const [cards, setCards] = useState([])
    const [users, setUsers] = useState([])
    const [createCard, setCreateCard] = useState(false)

    const [fetchUserCards, isUserCardsLoading, userCardsErrors] = useFetch(async () => {
        const response = await CardService.getMyCards()
        setUserCards(response.data)
    })

    const [fetchCards, isCardsLoading, cardsErrors] = useFetch(async () => {
        const response = await CardService.getAllCards()
        response.data = response.data.filter(cardFilter)
        setCards(response.data)
    })

    const [fetchUsers, isUsersLoading, usersErorrs] = useFetch(async () => {
        const response = await UserService.getAllUsers()
        setUsers(response.data)
    })

    useEffect(() => {
        fetchUserCards()
        fetchCards()
        fetchUsers()
    }, [])

    const cardFilter = (value) => {
        return value.bank_account.user !== user.id 
    }

    const usersFilter = (value, card) => {
        return value.id === card.bank_account.user
    }

    return (
        <div className='center card_list'>
            <div className='container'>
                {createCard &&
                    <CreateCard 
                        userCards={userCards}
                        setUserCards={setUserCards}
                        isModalVisible={createCard}
                        setIsModalVisible={setCreateCard}
                    />
                }

                <div className='center_header'>
                    <h1 className='title'>Список ваших карт</h1>
                    <MyButton onClick={e => setCreateCard(true)}>Создать карту</MyButton>
                </div>

                <div className='center_content'>
                    <div className='list'>
                        {isUserCardsLoading
                            ? <Loader />
                            : <>{userCards.map(card => 
                                <CardItem card={card} key={card.id}/>
                            )}</>
                        }
                    </div>

                    <div className='sub_items'>
                        <hr />
                        <h3 className='sub_title'>Карты других пользователей</h3>
                        <div className='list'>
                            {isCardsLoading || isUsersLoading
                                ? <Loader />
                                : <>{cards.map(card => 
                                    <CardItem 
                                        card={card} 
                                        isSubItem={true} 
                                        user={users.filter(value => usersFilter(value, card))[0]} 
                                        key={card.id}
                                    />
                                )}</>
                            }
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default CardList