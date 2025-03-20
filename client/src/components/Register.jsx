import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const body = JSON.stringify({ name, email, password });
      const res = await axios.post('http://localhost:5000/api/auth/register', body, config);
      console.log('Registration successful, token:', res.data.token);
      navigate('/login');
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data.errors ? err.response.data.errors[0].msg : 'Server Error');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Name:</label>
          <br />
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div>
          <label>Email:</label>
          <br />
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;