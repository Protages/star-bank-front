import CardList from '../pages/CardList'
import DepositList from '../pages/DepositList'
import User from '../pages/User'
import Transactions from '../pages/Transactions'
import Login from '../pages/Login'
import Logout from '../pages/Logout'


export const loginRouts = [
    {path: '/cards', element: <CardList />},
    {path: '/deposits', element: <DepositList />},
    {path: '/user', element: <User />},
    {path: '/transactions', element: <Transactions />},
    {path: '/logout', element: <Logout />},
]

export const unLoginRouts = [
    {path: '/login', element: <Login />},
]
