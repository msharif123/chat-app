import React, { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: 'https://i.pravatar.cc/100',
    csrfToken :  '02628e62-a2a7-4984-828b-1b024f5c0104' 
    
  });


  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [csrfToken, setCsrfTokn]=useState ("")

  
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
      const response = await fetch('https://chatify-api.up.railway.app/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          avatar: 'https://i.pravatar.cc/100'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setError('');
      alert(data.message || 'Registration successful');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Something went wrong');
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