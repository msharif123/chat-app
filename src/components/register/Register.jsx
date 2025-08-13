import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: 'https://i.pravatar.cc/100'
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      
      const csrfRes = await fetch('https://chatify-api.up.railway.app/csrf', {
        method: 'PATCH',
        credentials: 'include'
      });

      const csrf = await csrfRes.json();
      const csrfToken = csrf.csrfToken;

      if (!csrfToken) {
        throw new Error("Kunde inte hämta CSRF-token");
      }

      const registerRes = await fetch('https://chatify-api.up.railway.app/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          csrfToken
        })
      });

      const regData = await registerRes.json();

      if (!registerRes.ok) {
        throw new Error(regData.message || 'Registrering misslyckades');
      }

     
      const loginRes = await fetch('https://chatify-api.up.railway.app/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          csrfToken
        })
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        throw new Error(loginData.message || 'Inloggning efter registrering misslyckades');
      }

     
      localStorage.setItem('token', loginData.token);
      alert("Registrering lyckades. Du kan logga in nu");
      navigate('/login');

    } catch (err) {
      console.error('Registreringsfel:', err);
      setError(err.message || 'Något gick fel');
    }
  };

  return (
    <div className={styles.register}>
      <h2>Register</h2>
      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleRegister}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        /><br />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        /><br />

        <button type="submit">Register</button>

        <p className={styles.loginLink}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
