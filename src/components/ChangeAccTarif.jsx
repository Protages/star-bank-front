import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/index'
import Loader from './UI/Loader/Loader'
import MyInput from './UI/MyInput'
import MyButton from './UI/MyButton'
import Modal from './UI/Modal'
import AccountTarifService from '../API/AccountTarifService'
import { useFetch } from '../hooks/useFetch'


const ChangeAccTarif = ({isModalVisible, setIsModalVisible}) => {
    const { user, setUser } = useContext(AuthContext)
    const [tarifID, setTarifID] = useState('')
    const [fetchUpdateTarif, isupdateLoading, updateErrors] = useFetch(async () => {
        const response = await AccountTarifService.putUpdateUserTarif(user.id, tarifID)

        localStorage.setItem('user', JSON.stringify(response.data))
        setUser(response.data)
        setIsModalVisible(false)
    })

    const changeTarif = () => {
        fetchUpdateTarif()
    }

    return (
        <div>
            <Modal 
                isModalVisible={isModalVisible} 
                setIsModalVisible={setIsModalVisible}
                title={'Смена тарифа'}    
            >
                {isupdateLoading
                    ? <Loader />
                    : <>
                        {updateErrors &&
                        <div className='errors'>
                            {updateErrors.response.data.tarif}
                        </div>}

                        <MyInput 
                            placeholder={'Введите ID тарифа...'}
                            value={tarifID}
                            onChange={(e) => {setTarifID(e.target.value)}}
                        />
                        <MyButton onClick={changeTarif}>Подтвердить</MyButton>
                    </>
                }
                
            </Modal>
        </div>
    )
}


export default ChangeAccTarif