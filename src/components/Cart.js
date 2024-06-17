import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import './style.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const handleQuantityChange = (id, event) => {
    const quantity = parseInt(event.target.value);
    updateQuantity(id, quantity);
  };


  return (
    <div className="shopping-cart">
        {cart.length === 0 ? (
        <p className="emptycart">Ваш кошик порожній.</p>
      ) : (
        <>
                  <h1 className="title">Послуг додано:</h1>
          <div className="box-container">
            {cart.map((item) => (
              <div className="box" key={item.id}>
                <div className="name">{item.name}</div>
                <div className="price">{item.price} грн</div>
                <img src={item.imageUrl} alt={item.name} className="image" /> {}
                <div className="action">
                  <input
                  className="qty"
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(event) => handleQuantityChange(item.id, event)}
                  />
      
                  <button className="btn" onClick={() => removeFromCart(item.id)}>Видалити</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <p>Загальна сума: {cartTotal} грн</p>
            <Link to="/checkout" className={`btn ${cartTotal > 0 ? '' : 'disabled'}`}>
              Оформити замовлення
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
