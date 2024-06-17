import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, where, getDocs, writeBatch } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const q = query(collection(db, 'cart'), where('userId', '==', currentUser.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setCart(items);
        });
        return () => unsubscribe();
      } else {
        setCart([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const addToCart = async (product) => {
    if (user) {
      const cartItem = cart.find((item) => item.productId === product.id);
      if (cartItem) {
        const cartItemRef = doc(db, 'cart', cartItem.id);
        await updateDoc(cartItemRef, { quantity: cartItem.quantity + product.quantity });
      } else {
        await addDoc(collection(db, 'cart'), {
          userId: user.uid,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          imageUrl: product.imageUrl,
        });
      }
    }
  };

  const removeFromCart = async (id) => {
    const cartItemRef = doc(db, 'cart', id);
    await deleteDoc(cartItemRef);

    toast.success(`Товар видалено з кошика`, {
      position: "top-center",
    });
  };

  const updateQuantity = async (id, quantity) => {
    const cartItemRef = doc(db, 'cart', id);
    await updateDoc(cartItemRef, { quantity });
  };

  const clearCart = async () => {
    if (user) {
      const q = query(collection(db, 'cart'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      setCart([]);
    }
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
