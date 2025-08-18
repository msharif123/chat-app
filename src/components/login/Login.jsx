import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCsrf = async () => {
      try {
        const res = await fetch('https://chatify-api.up.railway.app/csrf', {
          method: 'PATCH',
          credentials: 'include'
        });
        const data = await res.json();
        setCsrfToken(data.csrfToken);
      } catch (err) {
        console.error('CSRF fetch error:', err);
        setError('Kunde inte hämta CSRF-token');
      }
    };
    fetchCsrf();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    if (!csrfToken) {
      setError('CSRF-token saknas');
      return;
    }

    try {
      const res = await fetch('https://chatify-api.up.railway.app/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json"

        },
        credentials: 'include',
        body: JSON.stringify({ username, password, csrfToken })
      });

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || `Login failed (${res.status})`);

      if (data.token) {
        localStorage.setItem('token', data.token)
        window.dispatchEvent(new Event("storage"));

      }

      navigate('/chat');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit" disabled={!csrfToken}>Login</button>
      </form>
      <p className={styles.registerLink}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
