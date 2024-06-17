import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
        photo: ""
      });
      toast.success("Реєстрація пройшла успішно!", {
        position: "top-center",
      });

      auth.signOut();

      navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <section className="form-container">
      <form onSubmit={handleRegister}>
        <h3>Реєстрація</h3>

        <div className="mb-3">
          <label>Ім'я</label>
          <input
            type="text"
            className="box"
            placeholder="Введіть ім'я"
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Прізвище</label>
          <input
            type="text"
            className="box"
            placeholder="Введіть прізвище"
            onChange={(e) => setLname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Пошта</label>
          <input
            type="email"
            className="box"
            placeholder="Введіть пошту"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Пароль</label>
          <input
            type="password"
            className="box"
            placeholder="Введіть пароль"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn">Зареєструватися</button>
        </div>
        <p className="forgot-password text-right">
          Вже зареєстровані? <Link to="/login">Ввійти</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
