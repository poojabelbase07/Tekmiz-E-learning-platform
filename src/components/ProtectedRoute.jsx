// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireTeacher = false }) => {
  const { currentUser, isTeacher, loading } = useAuth();
  
  // Show nothing while checking auth state
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.5rem'
      }}>
        Loading... ⏳
      </div>
    );
  }
  
  // Check if user is authenticated
  if (!currentUser) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If route requires teacher role, check that too
  if (requireTeacher && !isTeacher()) {
    // User is logged in but not a teacher
    // Redirect to home or dashboard
    return <Navigate to="/" replace />;
  }

  // User is authenticated (and is teacher if required)
  return children;
};

export default ProtectedRoute;