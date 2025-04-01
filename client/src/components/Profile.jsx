import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, setToken } from '../utils/Token';
import { refreshToken } from '../utils/authCode.js';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let token = getToken();
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        const res = await axios.get('http://localhost:5000/api/profile', config);
        setProfileData(res.data);
        setFormData({ name: res.data.name, email: res.data.email });
      } catch (err) {
        if (err.response.status === 401) {
          token = await refreshToken();
          if (token) {
            const config = {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            };
            const res = await axios.get('http://localhost:5000/api/profile', config);
            setProfileData(res.data);
            setFormData({ name: res.data.name, email: res.data.email });
          } else {
            navigate('/login');
          }
        } else {
          console.error(err.response.data);
          setError('Failed to fetch profile data');
        }
      }
    };

    fetchProfile();
  }, []);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      let token = getToken();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      const body = JSON.stringify(formData);
      await axios.put('http://localhost:5000/api/profile', body, config);
      setError(null);
      alert('Profile updated successfully');
    } catch (err) {
      if (err.response.status === 401) {
        token = await refreshToken();
        if (token) {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          };
          const body = JSON.stringify(formData);
          await axios.put('http://localhost:5000/api/profile', body, config);
          setError(null);
          alert('Profile updated successfully');
        } else {
          navigate('/login');
        }
      } else {
        console.error(err.response.data);
        setError('Failed to update profile');
      }
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Name:</label>
          <br />
          <input type="text" name="name" value={formData.name} onChange={onChange} required />
        </div>
        <div>
          <label>Email:</label>
          <br />
          <input type="email" name="email" value={formData.email} onChange={onChange} required />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;