import React, { useState } from "react"
import styles from "./Register.module.css"


const Register =()=>{

    const [username, setUsername]= useState ("")
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const [error, setError]=useState("")



    const handleRegister = async (e)=>{
        e.preventDefault()

        if (!usernme || !email || !password){
            setError ("All fields are required")
            return
        }

        try {
      const response = await fetch('https://chatify-api.up.railway.app/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': application/json
        },
        body: JSON.stringify({
          username,
          email ,
          password , 
          avatar: 'https://i.pravatar.cc/100',
          csrfToken 
        })
      });

      const data = await response.json()
       console.log('Status:', response.status);
      console.log('Response body:', data);

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
  <>
    <div className={styles.register}>
      <h2>Register</h2>
      {error && <p>{error}</p>}

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />

      <button onClick={handleRegister}>Register</button>
    </div>


  </>
);

};

export default Register;



            






    