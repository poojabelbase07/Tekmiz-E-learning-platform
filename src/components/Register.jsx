// pages/Register.jsx - WITH FIREBASE
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    // Attempt registration
    const result = await register(formData.name, formData.email, formData.password);

    if (result.success) {
      // Registration successful, redirect to dashboard
      navigate('/dashboard');
    } else {
      // Registration failed, show error
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        {/* Logo/Branding */}
        <div className={styles.registerHeader}>
          <h1 className={styles.registerTitle}>Join Tekmiz</h1>
          <p className={styles.registerSubtitle}>Start your learning journey today</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>⚠️</span>
            {error}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Your full name"
              disabled={loading}
              autoComplete="name"
            />
          </div>

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
              placeholder="At least 6 characters"
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.input}
              placeholder="Re-enter your password"
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <button 
            type="submit" 
            className={styles.registerButton}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Links */}
        <div className={styles.registerFooter}>
          <p className={styles.footerText}>
            Already have an account?{' '}
            <Link to="/login" className={styles.footerLink}>
              Login here
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

export default Register;