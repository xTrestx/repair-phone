// src/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserCircle, faShoppingCart, faTools, faThList } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import { useUser } from './UserContext';
import { useCart } from './CartContext';
import { auth } from './firebase';


import { FaTools } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const [accountBoxActive, setAccountBoxActive] = useState(false);
  const { user, setUser } = useUser();
  const { cartCount } = useCart();
  const location = useLocation();

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
  };


  useEffect(() => {
    setAccountBoxActive(false);
  }, [location]);


  return (
    <header className="header">
      <div className="flex">
        <Link to="/" className="logo">
        <FaTools /> Ремонт смартфонів
        </Link>

        <nav className="navbar">
          <ul>
            <li><Link to="/">Головна</Link></li>
            <li><Link to="/about">Про нас</Link></li>
            <li><Link to="/products">Послуги</Link></li>
            <li><Link to="/prices">Ціни</Link></li>
            <li><Link to="/contacts">Контакти</Link></li>
          </ul>
        </nav>

        <div className="icons">
          <Link to="/search" className="icon"><FaSearch /></Link>
          <Link to="/orders" className="icon"><FaListAlt /></Link>
          <div className="icon" id="user-btn" onClick={() => setAccountBoxActive(!accountBoxActive)}>
          <FaUserCircle />
          </div>
          <Link to="/cart" className="icon">
          <FaShoppingCart /><span>({cartCount})</span>
          </Link> 
        </div>

        {accountBoxActive && (
          <div className="account-box active">
            {user ? (
              <>
                <p>Пошта: <span>{user.email}</span></p>
                <button onClick={handleLogout} className="delete-btn">Вийти</button>
              </>
            ) : (
              <>
                <p>Спочатку треба увійти</p>
                <div className="flex-btn">
                  <Link to="/register" className="option-btn">Зареєструватися</Link>
                  <Link to="/login" className="option-btn">Ввійти</Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
