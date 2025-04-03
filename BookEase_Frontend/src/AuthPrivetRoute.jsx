import React from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

const AuthPrivetRoute = ({children}) => {
 
    const token = Cookies.get('userToken')
    
    return !token ? children : <Navigate to='/dashboard' />
}

export default AuthPrivetRoute