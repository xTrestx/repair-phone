import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useUser } from './UserContext';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    method: 'Готівкою',
    flat: '',
    street: '',
    city: '',
    country: '',
    pin_code: '',
    transportation_checkbox: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Ви повинні увійти в систему, щоб оформити замовлення');
      return;
    }

    const address = `flat no. ${formData.flat}, ${formData.street}, ${formData.city}, ${formData.country} - ${formData.pin_code}`;
    const totalProducts = cart.map(item => `${item.name} (${item.quantity})`).join(', ');
    const transportationFee = formData.transportation_checkbox ? 10 : 0;
    const totalPrice = cartTotal + transportationFee;

    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        name: formData.name,
        number: formData.number,
        email: formData.email,
        method: formData.method,
        address,
        totalProducts,
        totalPrice,
        placedOn: serverTimestamp(),
        productStatus: 'В очікуванні',
        transportationFee
      });
      clearCart();
      toast.success(
        <div>
          Замовлення успішно розміщено!
          <Link to="/orders">Перейти до замовлень</Link>
        </div>, {
        position: "top-center",
        autoClose: false,
      });
    } catch (error) {
      console.error("Помилка при оформленні замовлення: ", error);
      toast.error('Помилка при оформленні замовлення');
    }
  };

  return (
    <div className="checkout">
      <form onSubmit={handleSubmit}>
        <h3>Підтвердження замовлення</h3>
        <div className="flex">
          <div className="inputBox">
            <span>Ім'я:</span>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Введіть своє ім'я" required />
          </div>
          <div className="inputBox">
            <span>Номер телефону:</span>
            <input type="number" name="number" value={formData.number} onChange={handleChange} placeholder="Введіть свій номер телефону" required />
          </div>
          <div className="inputBox">
            <span>Пошта:</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Введіть свою пошту" required />
          </div>
          <div className="inputBox">
            <span>Метод оплати:</span>
            <select name="method" value={formData.method} onChange={handleChange}>
              <option value="Готівкою">Готівкою</option>
              <option value="Кредитна карта">Кредитна карта</option>
              <option value="Кредит по частинам">Кредит по частинам</option>
            </select>
          </div>
          <div className="inputBox">
            <span>Адрес 1:</span>
            <input type="text" name="flat" value={formData.flat} onChange={handleChange} placeholder="Введіть адресу" required />
          </div>
          <div className="inputBox">
            <span>Адрес 2:</span>
            <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Введіть адресу 2" required />
          </div>
          <div className="inputBox">
            <span>Місто:</span>
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Введіть місто" required />
          </div>
          <div className="inputBox">
            <span>Країна:</span>
            <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Введіть країну" required />
          </div>
          <div className="inputBox">
            <span>Індекс:</span>
            <input type="number" name="pin_code" value={formData.pin_code} onChange={handleChange} placeholder="Введіть індекс" required />
          </div>
        </div>
        <div className="inputBox1">
  <span>Потрібні транспортні послуги?</span>
  <input
    type="checkbox"
    id="transportation_checkbox" 
    name="transportation_checkbox"
    checked={formData.transportation_checkbox}
    onChange={handleChange}
  />
  <label htmlFor="transportation_checkbox">Так, потрібні</label>
</div>
        <div className="display-order">
          <h3>Ви замовили:</h3>
          {cart.map(item => (
            <p key={item.id}>{item.name} <span>({item.price} грн / {item.quantity} шт)</span></p>
          ))}
          <div className="grand-total">Загальна сума: <span>{cartTotal} грн</span></div>
        </div>
        <input type="submit" value="Підтвердити" className="btn" />
      </form>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
