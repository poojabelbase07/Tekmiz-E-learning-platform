// pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Register.module.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }

    if (formData.name.length < 2) {
      setError('Name must be at least 2 characters');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    // Mock registration (replace with Firebase later)
    setTimeout(() => {
      console.log('Registration attempt:', formData);
      
      // Mock success - store user data
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', formData.name);
      localStorage.setItem('userRole', 'student'); // Default role
      
      setLoading(false);
      
      // Show success and redirect
      alert(`🎉 Welcome to Tekmiz, ${formData.name}!`);
      navigate('/');
      window.location.reload(); // Refresh to update auth state
    }, 1000);
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>T</div>
          </div>
          <h1 className={styles.title}>Join Tekmiz</h1>
          <p className={styles.subtitle}>Create your account and start learning</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.errorBox}>
              <span className={styles.errorIcon}>⚠️</span>
              {error}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Pooja Kumar"
              className={styles.input}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={styles.input}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              className={styles.input}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className={styles.input}
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className={styles.registerButton}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.loader}></span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Footer Section */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              className={styles.link}
            >
              Login here
            </button>
          </p>
        </div>

        {/* Demo Note */}
        <div className={styles.demoNote}>
          <p>🔧 Demo Mode: Registration creates a mock account</p>
        </div>
      </div>
    </div>
  );
};

export default Register;