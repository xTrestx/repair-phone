import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import { useUser } from './UserContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser({
        name: userCredential.user.displayName || userCredential.user.email,
        email: userCredential.user.email,
      });
      toast.success("Вхід успішно виконано!", {
        position: "top-center",
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <section className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Вхід</h3>
        <div className="mb-3">
          <label>Пошта</label>
          <input
            type="email"
            className="box"
            placeholder="Ввідіть пошту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Пароль</label>
          <input
            type="password"
            className="box"
            placeholder="Введіть пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn">Ввійти</button>
        </div>
        <p className="forgot-password text-right">
          Новий користувач? <Link to="/register">Реєструйся тут</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
