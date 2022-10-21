import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/index'
import Loader from './UI/Loader/Loader'
import MyInput from './UI/MyInput'
import MyButton from './UI/MyButton'
import Modal from './UI/Modal'
import UserService from '../API/UserService'
import { useFetch } from '../hooks/useFetch'
import RenderErrors from './RenderErrors'


const UpdateUserData = ({isModalVisible, setIsModalVisible}) => {
    const { user, setUser } = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState(user)
    const [fetchUpdateUser, isUpdateUserLoading, updateUserErrors] = useFetch(async () => {
        const response = await UserService.putUpdateUserData(user.id, user, currentUser)

        localStorage.setItem('user', JSON.stringify(response.data))
        setUser(response.data)
        setIsModalVisible(false)
    })

    const updateUserData = (e) => {
        e.preventDefault()
        fetchUpdateUser()
    }

    return (
        <div>
            <Modal 
                isModalVisible={isModalVisible} 
                setIsModalVisible={setIsModalVisible}
                title={'Изменение данных'}    
            >
                {isUpdateUserLoading
                    ? <Loader />
                    : <form className='form'>
                        {updateUserErrors &&
                        <div className='errors'>
                            <RenderErrors errors={updateUserErrors}/>
                        </div>}

                        <p>Логин: <MyInput 
                            value={currentUser.username}
                            onChange={(e) => {setCurrentUser({...currentUser, username: e.target.value})}}
                        /></p>
                        <p>Почта: <MyInput 
                            value={currentUser.email}
                            onChange={(e) => {setCurrentUser({...currentUser, email: e.target.value})}}
                        /></p>
                        <p>Телефон: <MyInput 
                            value={currentUser.phone}
                            onChange={(e) => {setCurrentUser({...currentUser, phone: e.target.value})}}
                        /></p>
                        <p>ФИО: <MyInput 
                            value={currentUser.fio}
                            onChange={(e) => {setCurrentUser({...currentUser, fio: e.target.value})}}
                        /></p>
                        <p>Страна: <MyInput 
                            value={currentUser.country}
                            onChange={(e) => {setCurrentUser({...currentUser, country: e.target.value})}}
                        /></p>

                        <MyButton onClick={updateUserData}>Подтвердить</MyButton>
                    </form>
                }
                
            </Modal>
        </div>
    )
}


export default UpdateUserData