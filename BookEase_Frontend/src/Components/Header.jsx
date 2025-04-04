import React, { useState } from 'react';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserLogout } from '../Redux/UserSlice';
import ModalManager from '../Modals/ModalManager';
import Dashboard from './Dashboard';
const Header = () => {

    const token = Cookies.get('userToken')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isModal, setisModal] = useState(false)
    const handleLogout = () =>{
        if (token){
            Cookies.remove('userToken')
            dispatch(UserLogout())
        }
        navigate('/')

    }

    const handleAccount = () =>{
        setisModal(!isModal)
    }

  return (
    <>
   
    <header className="bg-orange-300 py-4 px-4 md:px-12 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold text-white">
        BookEase
      </div>
      <nav className="flex space-x-6">
        <a href="#" className="text-white hover:text-orange-500 font-medium">About</a>
        <a href="#" className="text-white hover:text-orange-500 font-medium">Books</a>
        <a href="#" onClick={handleAccount} className="text-white hover:text-orange-500 font-medium">Account</a>
        <a href="#" onClick={handleLogout} className="text-white hover:text-orange-500 font-medium">{ token ? 'Logout' : 'Login'}</a>
      </nav>
       
    </header>
    <Dashboard 
          isModal={isModal}
          onClose={handleAccount}/>
    </>
  );
}

export default Header;