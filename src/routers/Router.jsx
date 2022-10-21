import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { loginRouts, unLoginRouts } from './routs'
import { AuthContext } from '../context/index'


const Router = () => {
    const {isAuth, isPreStartLoading} = useContext(AuthContext)
    

    return (
        <Routes>
            {isAuth === 'true'
                ?<>
                {loginRouts.map(rout => 
                    <Route 
                        path={rout.path} 
                        element={rout.element}
                        key={rout.path}
                    />    
                )}
                <Route path="/*" element={<Navigate to="/cards" replace />} />
                </>
                :<>
                {unLoginRouts.map(rout => 
                    <Route 
                        path={rout.path} 
                        element={rout.element}
                        key={rout.path}
                    />    
                )}
                <Route path="/*" element={<Navigate to="/login" replace />} />
                </>
            }
        </Routes>
    )
}


export default Router