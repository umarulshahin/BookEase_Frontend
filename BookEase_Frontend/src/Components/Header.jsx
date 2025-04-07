import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserLogout } from '../Redux/UserSlice';
import { RemoveBooks } from '../Redux/BooksSlice';

const Header = ({ handleAccount }) => {
  const token = Cookies.get('userToken');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    if (token) {
      Cookies.remove('userToken');
      dispatch(UserLogout());
      dispatch(RemoveBooks())
    }
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-orange-400 py-4 px-4 md:px-12 flex flex-wrap justify-between items-center shadow-md">
      <div className="text-2xl font-bold text-white">
        <Link to="/dashboard">BookEase</Link>
      </div>
      
      {/* Hamburger menu button for mobile */}
      <button 
        className="md:hidden text-white focus:outline-none"
        onClick={toggleMobileMenu}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      {/* Navigation links - hidden on mobile unless menu is open */}
      <nav className={`${
        mobileMenuOpen ? 'flex' : 'hidden'
      } md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0 md:space-x-6 space-y-4 md:space-y-0`}>
        <a href="#"  className="text-white hover:text-orange-500 font-medium">About</a>
        <a href="#" onClick={()=> navigate('/dashboard/mybooks')} className="text-white hover:text-orange-500 font-medium">MyBooks</a>
        <a href="#" onClick={handleAccount} className="text-white hover:text-orange-500 font-medium">Account</a>
        <a href="#" onClick={handleLogout} className="text-white hover:text-orange-500 font-medium">
          {token ? 'Logout' : 'Login'}
        </a>
      </nav>
    </header>
  );
};

export default Header;