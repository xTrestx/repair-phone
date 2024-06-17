import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './style.css';

const Orders = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user.uid) {
        try {
          const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          setOrders(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
          console.error("Error fetching orders: ", error);
        }
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return <p className="empty">Ви повинні увійти в систему, щоб переглянути свої замовлення</p>;
  }

  return (
    <div className="placed-orders">
      <h1 className="title">Ваші замовлення</h1>
      <div className="box-container">
        {orders.length > 0 ? orders.map(order => (
          <div className="box" key={order.id}>
            <p>Дата розміщення: <span>{new Date(order.placedOn.seconds * 1000).toLocaleDateString()}</span></p>
            <p>Назва: <span>{order.name}</span></p>
            <p>Номер: <span>{order.number}</span></p>
            <p>Пошта: <span>{order.email}</span></p>
            <p>Адреса: <span>{order.address}</span></p>
            <p>Метод оплати: <span>{order.method}</span></p>
            <p>Твої послуги: <span>{order.totalProducts}</span></p>
            <p>Загальна ціна: <span>{order.totalPrice} грн</span></p>
            <p>Статус замовлення послуг(и): <span style={{ color: order.productStatus === 'В очікуванні' ? 'tomato' : 'green' }}>{order.productStatus}</span></p>
          </div>
        )) : (
          <p className="empty">Немає ні одного замовлення</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
