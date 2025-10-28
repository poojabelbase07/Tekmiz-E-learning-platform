// context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
      const userData = {
        uid: localStorage.getItem('userId') || 'mock-uid',
        email: localStorage.getItem('userEmail'),
        name: localStorage.getItem('userName'),
        roles: (localStorage.getItem('userRole') || 'student').split(','),
        teacherProfile: localStorage.getItem('teacherInterests') ? {
          interests: JSON.parse(localStorage.getItem('teacherInterests')),
          bio: localStorage.getItem('teacherBio') || ''
        } : null
      };
      setCurrentUser(userData);
    } else {
      setCurrentUser(null);
    }
    
    setLoading(false);
  };

  // Mock Register (will replace with Firebase)
  const register = async (name, email, password) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData = {
        uid: 'user_' + Date.now(),
        email,
        name,
        roles: ['student'],
        teacherProfile: null
      };

      // Store in localStorage (temporary - will use Firebase)
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', userData.uid);
      localStorage.setItem('userEmail', userData.email);
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userRole', 'student');

      setCurrentUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Mock Login (will replace with Firebase)
  const login = async (email, password) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user exists (mock)
      const existingEmail = localStorage.getItem('userEmail');
      const existingName = localStorage.getItem('userName');

      const userData = {
        uid: localStorage.getItem('userId') || 'user_' + Date.now(),
        email: existingEmail || email,
        name: existingName || 'User',
        roles: (localStorage.getItem('userRole') || 'student').split(','),
        teacherProfile: localStorage.getItem('teacherInterests') ? {
          interests: JSON.parse(localStorage.getItem('teacherInterests')),
          bio: localStorage.getItem('teacherBio') || ''
        } : null
      };

      localStorage.setItem('isLoggedIn', 'true');
      setCurrentUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('teacherInterests');
    localStorage.removeItem('teacherBio');
    setCurrentUser(null);
  };

  // Upgrade to Teacher
  const upgradeToTeacher = async (interests, bio) => {
    try {
      if (!currentUser) {
        throw new Error('User not logged in');
      }

      // Add teacher role
      const updatedRoles = currentUser.roles.includes('teacher') 
        ? currentUser.roles 
        : [...currentUser.roles, 'teacher'];

      const updatedUser = {
        ...currentUser,
        roles: updatedRoles,
        teacherProfile: {
          interests,
          bio,
          activatedAt: new Date().toISOString()
        }
      };

      // Update localStorage
      localStorage.setItem('userRole', updatedRoles.join(','));
      localStorage.setItem('teacherInterests', JSON.stringify(interests));
      localStorage.setItem('teacherBio', bio);

      setCurrentUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Check if user has a specific role
  const hasRole = (role) => {
    return currentUser?.roles?.includes(role) || false;
  };

  // Check if user is teacher
  const isTeacher = () => {
    return hasRole('teacher');
  };

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout,
    upgradeToTeacher,
    hasRole,
    isTeacher,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};