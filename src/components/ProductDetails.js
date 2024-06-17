import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useCart } from './CartContext'; 
import { useUser } from './UserContext'; 
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart(); // Отримуємо функцію addToCart з контексту
  const { user } = useUser(); // Отримуємо інформацію про користувача

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Товар не знайдено');
        }
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching product details: ${err.message}`);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (event) => {
    event.preventDefault();
    if (!user) {
      toast.error('Ви повинні увійти в систему, щоб додати товар до кошика', {
        position: "top-center",
      });
      return;
    }

    addToCart({ ...product, quantity: parseInt(quantity) });
    toast.success(`Додано послугу ${product.name} до кошика`, {
      position: "top-center",
    });
  };

  if (loading) {
    return <p>Завантаження...</p>;
  }

  if (error) {
    return <p>Помилка: {error}</p>;
  }

  return (
    <section className="quick-view">
      <h1 className="title">Деталі послуги</h1>
      {product ? (
        <form onSubmit={handleAddToCart}>
          <img src={product.imageUrl} alt={product.name} className="image" />
          <div className="name">{product.name}</div>
          <div className="price">{product.price} грн</div>
          <div className="details">{product.details}</div>
          <input
            type="number"
            name="product_quantity"
            value={quantity}
            min="1"
            className="qty"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <input type="hidden" name="product_id" value={product.id} />
          <input type="hidden" name="product_name" value={product.name} />
          <input type="hidden" name="product_price" value={product.price} />
          <input type="hidden" name="product_image" value={product.imageUrl} />
          <input type="submit" value="Додати в кошик" name="add_to_cart" className="btn" />
        </form>
      ) : (
        <p className="empty">Немає жодної інформації про послуги!</p>
      )}
      <div className="more-btn">
        <Link to="/products" className="option-btn">Повернутись до послуг</Link>
      </div>
    </section>
  );
};

export default ProductDetails;
