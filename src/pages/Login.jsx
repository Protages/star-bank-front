import React, { useContext, useState } from "react";
import LoginForm from '../components/UI/LoginForm'
import Modal from '../components/UI/Modal'
import { AuthContext } from '../context/index'
 

const Login = () => {
    const { isAuth } = useContext(AuthContext)
    const [isModalVisible, setIsModalVisible] = useState(!(isAuth === 'true'))

    return (
        <div>
            <Modal 
                isModalVisible={isModalVisible} 
                setIsModalVisible={() => {}}
                title='Форма входа'
            >
                <LoginForm />
            </Modal>
        </div>
    )
}


export default Login