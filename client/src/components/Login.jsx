import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { email, password } = formData;

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
      const body = JSON.stringify({ email, password });
      const res = await axios.post('http://localhost:5000/api/auth/login', body, config);
      console.log('Login successful, token:', res.data.token);
      // You can store the token in localStorage or context here
      navigate('/');
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data.errors ? err.response.data.errors[0].msg : 'Server Error');
    }
  };

  return (
    <div className='w-full max-w-xs mx-auto mt-10 p-4 border rounded shadow-lg drop-shadow-md bg-white dark:bg-gray-800 dark:text-yellow-50'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>
      <p className=' mb-4'>Please enter your credentials to login/signup.</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Email:</label>
          <br />
          <input type="email" name="email" value={email} onChange={onChange} className='border rounded p-2' required />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input type="password" name="password" value={password} onChange={onChange} className='border rounded p-2' required />
        </div>
        <button type="submit" className='bg-zinc-300 dark:bg-zinc-900 rounded py-2 px-5  mt-4'>Login</button>
      </form>
    </div>
  );
}

export default Login;