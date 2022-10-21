import React, { useEffect, useState, useContext, useReducer } from 'react';
import AccountTarifItem from '../components/AccountTarifItem'
import UpdateUserData from '../components/UpdateUserData';
import ChangeAccTarif from '../components/ChangeAccTarif';
import MyButton from '../components/UI/MyButton'
import Loader from '../components/UI/Loader/Loader'
import AccountTarifService from '../API/AccountTarifService'
import { useFetch } from "../hooks/useFetch";
import { AuthContext } from '../context/index';


const User = () => {
    const { user } = useContext(AuthContext)
    const [updateUserData, setUpdateUserData] = useState(false)
    const [changeAccTarif, setChangeAccTarif] = useState(false)
    const [tarifs, setTarifs] = useState([])
    const currentTarif = user.tarif

    const [fetchAccTarif, isAccTarifLoading, accTarifErrors] = useFetch(async () => {
        const response = await AccountTarifService.getAll()

        response.data = response.data.filter(filterTarifs)
        setTarifs(response.data)
    })

    useEffect(() => {
        fetchAccTarif()
    }, [user])

    const filterTarifs = (value) => {
        return value.id !== currentTarif.id
    }

    return (
        <div className='center account_tarif'>
            <div className='container'>
                {changeAccTarif &&
                    <ChangeAccTarif 
                        isModalVisible={changeAccTarif} 
                        setIsModalVisible={setChangeAccTarif}
                    />
                }
                {updateUserData &&
                    <UpdateUserData 
                        isModalVisible={updateUserData} 
                        setIsModalVisible={setUpdateUserData}
                    />
                }

                <div className='center_header'>
                    <h1 className='title'>Ваши данные</h1>
                    <MyButton onClick={e => setUpdateUserData(true)}>Изменить данные</MyButton>
                </div>

                <div className='center_content'>
                    <div className='about'>
                        <p>ID: {user.id}</p>
                        <p>Логин: {user.username}</p>
                        <p>Почта: {user.email}</p>
                        <p>Телефон: {user.phone}</p>
                        <p>ФИО: {user.fio 
                            ? <span>{user.fio}</span>
                            : <span>(не указано)</span>
                        }</p>
                        <p>Страна: {user.country 
                            ? <span>{user.country}</span>
                            : <span>(не указано)</span>
                        }</p>
                        <p>Дата создания: {user.date_joined}</p>
                    </div>
                </div>

                <div className='center_header'>
                    <h1 className='title'>Ваш тариф</h1>
                    <MyButton onClick={e => setChangeAccTarif(true)}>Сменить тариф</MyButton>
                </div>

                <div className='center_content'>
                    <AccountTarifItem tarif={currentTarif}/>

                    <div className='sub_items'>
                        <hr />
                        <h3 className='sub_title'>Другие тарифы</h3>
                        {isAccTarifLoading
                            ? <Loader />
                            : <>{tarifs.map(tarif => 
                                <AccountTarifItem tarif={tarif} key={tarif.id}/>
                            )}</>
                        }
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default User