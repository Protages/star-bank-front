import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/index'

const Header = () => {
    const {isAuth, setIsAuth, user} = useContext(AuthContext)

    return (
        <div className='header'>
            <div className='container'>
                <nav className='navbar'>
                    <ul>
                        <li><Link to='/cards'>Карты</Link></li>
                        <li><Link to='/deposits'>Депозиты</Link></li>
                        <li><Link to='/transactions'>Транзакции</Link></li>
                        <li><Link>Пользователи</Link></li>
                    </ul>
                </nav>
                
                <div className='user_header'>
                    <Link to='/user'>{ user.username }</Link>
                    <Link to='/logout' className='logout_btn'>Выйти</Link>
                    {/* <LogoutBtn>Выйти</LogoutBtn> */}
                </div>
            </div>
        </div>
    )
}

export default Header