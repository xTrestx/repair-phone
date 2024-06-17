import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import Product from './Product';
import './style.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => {
          const data = doc.data();
          console.log(`Отримано дані про продукт: ${JSON.stringify(data)}`); 
          return {
            id: doc.id,
            ...data
          };
        });
        setProducts(productsList);
        setLoading(false);
      } catch (err) {
        console.error(`Помилка отримання даних: ${err.message}`); // Логування помилок
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Завантаження...</p>;
  }

  if (error) {
    return <p>Помилка: {error}</p>;
  }

  return (
    <section className="products">
      <h2 className="title">Наші послуги</h2>
      <div className="box-container">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;