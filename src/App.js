import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import Home from './components/Home';
import ProductList from './components/ProductList';


import Login from "./components/login";
import SignUp from "./components/register";
import Cart from './components/Cart';
import Checkout from './components/checkout';
import Orders from './components/Orders';


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from './components/UserContext';
import { CartProvider } from './components/CartContext';

import ProductDetails from './components/ProductDetails'; 

function App() {
  return (
    <UserProvider>
      <CartProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} /> {}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
    </CartProvider>
    </UserProvider>
  );
}

export default App;