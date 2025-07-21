import React, { useState } from 'react';
 import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //  const navigate = useNavigate();

  const csrfToken = '9cb57219-8ae0-4513-b5aa-053736cecc21';

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      const res = await fetch('', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify({ username, password, csrfToken })
      });

      const contentType = res.headers.get('content-type');
      const text = await res.text();
      console.log('Status:', res.status);
      console.log('Raw response:', text);

      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server did not return valid JSON');
      }

      const data = JSON.parse(text);

      if (!res.ok) {
        console.log('Backend error message:', data.message);
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      navigate('/chat');
    } catch (err) {
      console.error('Login error:', err.message);
      setError(err.message);
    }
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />

        <button onClick={handleLogin}>Login</button>
      </div>

      {/* <div className={styles.linkSection}>
        Har du inget konto? <Link to="/register">Registrera dig här</Link>
      </div> */}
    </>
  );
};

export default Login;
