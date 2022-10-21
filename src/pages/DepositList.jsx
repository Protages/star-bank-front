import React, { useEffect, useState, useRef, useContext } from 'react';
import { AuthContext } from '../context/index'
import DepositItem from '../components/DepositItem'
import MyButton from '../components/UI/MyButton'
import Loader from '../components/UI/Loader/Loader'
import DepositService from '../API/DepositService'
import UserService from '../API/UserService'
import { useFetch } from "../hooks/useFetch";


const CardList = () => {
    const { user } = useContext(AuthContext)
    const [userDeposits, setUserDeposits] = useState([])
    const [deposits, setDeposits] = useState([])
    const [users, setUsers] = useState([])

    const [fetchUserDeposits, isUserDepLoading, userDepErrors] = useFetch(async () => {
        const response = await DepositService.getMyDeposits()
        setUserDeposits(response.data)
    })

    const [fetchDeposits, isDepositsLoading, dopositsErrors] = useFetch(async () => {
        const response = await DepositService.getAllDeposits()
        response.data = response.data.filter(depositsFilter)
        setDeposits(response.data)
    })

    const [fetchUsers, isUsersLoading, usersErrors] = useFetch(async () => {
        const response = await UserService.getAllUsers()
        setUsers(response.data)
    })

    useEffect(() => {
        fetchUserDeposits()
        fetchDeposits()
        fetchUsers()
    }, [])

    const depositsFilter = (value) => {
        return value.bank_account.user !== user.id 
    }

    const usersFilter = (value, card) => {
        return value.id === card.bank_account.user
    }

    return (
        <div className='center deposit_list'>
            <div className='container'>

                <div className='center_header'>
                    <h1 className='title'>Список ваших депозитов</h1>
                    <MyButton>Завести депозит</MyButton>
                </div>

                <div className='center_content'>
                    <div className='list'>
                        {isUserDepLoading
                            ? <Loader />
                            : <>{userDeposits.map(deposit => 
                                <DepositItem deposit={deposit} key={deposit.id}/>
                            )}</>
                        }
                    </div>

                    <div className='sub_items'>
                        <hr />
                        <h3 className='sub_title'>Депозиты других пользователей</h3>
                        <div className='list'>
                            {isDepositsLoading || isUsersLoading
                                ? <Loader />
                                : <>{deposits.map(deposit => 
                                    <DepositItem 
                                        deposit={deposit} 
                                        isSubItem={true} 
                                        user={users.filter(value => usersFilter(value, deposit))[0]} 
                                        key={deposit.id}
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