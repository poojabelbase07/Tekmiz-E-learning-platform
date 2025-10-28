// context/AuthContext.jsx - WITH FIREBASE
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

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

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is logged in, fetch their data from Firestore
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setCurrentUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: userData.name,
              roles: userData.roles || ['student'],
              teacherProfile: userData.teacherProfile || null,
              createdAt: userData.createdAt
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // User is logged out
        setCurrentUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  // Register new user
  const register = async (name, email, password) => {
    try {
      // Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      const userData = {
        uid: user.uid,
        name: name,
        email: email,
        roles: ['student'], // Default role
        teacherProfile: null,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', user.uid), userData);

      // Update local state
      setCurrentUser({
        uid: user.uid,
        email: email,
        name: name,
        roles: ['student'],
        teacherProfile: null,
        createdAt: userData.createdAt
      });

      return { success: true, user: userData };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: getErrorMessage(error.code) 
      };
    }
  };

  // Login existing user
  const login = async (email, password) => {
    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Update last login
        await updateDoc(userDocRef, {
          lastLogin: new Date().toISOString()
        });

        // Update local state
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          name: userData.name,
          roles: userData.roles || ['student'],
          teacherProfile: userData.teacherProfile || null,
          createdAt: userData.createdAt
        });

        return { success: true, user: userData };
      } else {
        throw new Error('User data not found');
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: getErrorMessage(error.code) 
      };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  // Upgrade user to teacher
  const upgradeToTeacher = async (interests, bio) => {
    try {
      if (!currentUser) {
        throw new Error('User not logged in');
      }

      // Check if already a teacher
      if (currentUser.roles.includes('teacher')) {
        return { 
          success: false, 
          error: 'You are already a teacher' 
        };
      }

      // Add teacher role
      const updatedRoles = [...currentUser.roles, 'teacher'];
      const teacherProfile = {
        interests: interests,
        bio: bio,
        activatedAt: new Date().toISOString()
      };

      // Update Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        roles: updatedRoles,
        teacherProfile: teacherProfile
      });

      // Update local state
      const updatedUser = {
        ...currentUser,
        roles: updatedRoles,
        teacherProfile: teacherProfile
      };

      setCurrentUser(updatedUser);

      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Upgrade to teacher error:', error);
      return { 
        success: false, 
        error: error.message 
      };
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

  // Helper function to get user-friendly error messages
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please login.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';
      default:
        return 'An error occurred. Please try again.';
    }
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