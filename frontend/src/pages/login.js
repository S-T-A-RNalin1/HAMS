// frontend/src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setAuth }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await axios.post('http://localhost:5000/api/auth/register', formData);
        alert('Registration successful! Please login.');
        setIsRegistering(false);
      } else {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email: formData.email, password: formData.password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setAuth(res.data.user); // Update global app state
      }
    } catch (error) {
      alert(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '100px' }}>
      <div className="card">
        <h3 className="page-title">{isRegistering ? 'Create Account' : 'Welcome Back'}</h3>
        <form onSubmit={handleSubmit}>
          
          {isRegistering && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" required className="form-control" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Register As</label>
                <select className="form-control" onChange={(e) => setFormData({...formData, role: e.target.value})}>
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" required className="form-control" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" required className="form-control" onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>

          <button type="submit" className="btn-primary">
            {isRegistering ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '15px', color: '#64748b', cursor: 'pointer', fontSize: '0.9rem' }} onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
};

export default Login;