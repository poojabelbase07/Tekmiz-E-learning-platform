// pages/Login.jsx - WITH FIREBASE
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Attempt login
    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Login successful, redirect to dashboard
      navigate('/home');
    } else {
      // Login failed, show error
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        {/* Logo/Branding */}
        <div className={styles.loginHeader}>
          <h1 className={styles.loginTitle}>Welcome Back</h1>
          <p className={styles.loginSubtitle}>Login to continue learning</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>⚠️</span>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="your.email@example.com"
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your password"
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Links */}
        <div className={styles.loginFooter}>
          <p className={styles.footerText}>
            Don't have an account?{' '}
            <Link to="/register" className={styles.footerLink}>
              Register here
            </Link>
          </p>
          <Link to="/" className={styles.backLink}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;