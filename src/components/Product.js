import React, { useState } from 'react';
import { useCart } from './CartContext';
import './style.css';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext';
import { toast } from 'react-toastify';
import { AiFillEye } from "react-icons/ai";

const Product = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useUser();
  const [quantity, setQuantity] = useState(1); 

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Ви повинні увійти в систему, щоб додати товар до кошика', {
        position: "top-center",
      });
      return;
    }

    addToCart({ ...product, quantity }); 
    toast.success(`Додано послугу ${product.name} до кошика`, {
      position: "top-center",
    });
  };

  // Оновлення стану кількості товару при зміні в полі введення
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    setQuantity(value); 
  };

  return (
    <form className="box">
      <Link to={`/product/${product.id}`}>
        <AiFillEye className="fa-eye" />
      </Link>
      <div className="price">{product.price} грн</div>
      <img src={product.imageUrl} alt={product.name} className="image" />
      <div className="name">{product.name}</div>
      <input
        type="number"
        name="product_quantity"
        value={quantity} 
        min="1"
        onChange={handleQuantityChange} 
        className="qty"
      />
      <input type="hidden" name="product_id" value={product.id} />
      <input type="hidden" name="product_name" value={product.name} />
      <input type="hidden" name="product_price" value={product.price} />
      <input type="hidden" name="product_image" value={product.imageUrl} />
      <input type="button" value="Додати в кошик" onClick={handleAddToCart} className="btn" />
    </form>
  );
};

export default Product;
