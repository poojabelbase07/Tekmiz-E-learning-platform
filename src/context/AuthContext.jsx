// context/AuthContext.jsx - WITH DEBUG LOGGING
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
      console.log('🔐 Auth state changed:', firebaseUser?.email || 'No user');
      
      if (firebaseUser) {
        try {
          console.log('📝 Fetching user data from Firestore...');
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('✅ User data fetched:', userData);
            
            setCurrentUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: userData.name,
              roles: userData.roles || ['student'],
              teacherProfile: userData.teacherProfile || null,
              createdAt: userData.createdAt
            });
          } else {
            console.warn('⚠️ User document does not exist in Firestore');
          }
        } catch (error) {
          console.error('❌ Error fetching user data:', error);
        }
      } else {
        console.log('👋 User logged out');
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Register new user
  const register = async (name, email, password) => {
    console.log('📝 Starting registration for:', email);
    
    try {
      // Step 1: Create Firebase auth user
      console.log('Step 1: Creating Firebase auth user...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('✅ Auth user created:', user.uid);

      // Step 2: Create user document in Firestore
      console.log('Step 2: Creating Firestore document...');
      const userData = {
        uid: user.uid,
        name: name,
        email: email,
        roles: ['student'],
        teacherProfile: null,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, userData);
      console.log('✅ Firestore document created');

      // Step 3: Update local state
      setCurrentUser({
        uid: user.uid,
        email: email,
        name: name,
        roles: ['student'],
        teacherProfile: null,
        createdAt: userData.createdAt
      });

      console.log('✅ Registration completed successfully!');
      return { success: true, user: userData };
      
    } catch (error) {
      console.error('❌ Registration error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      return { 
        success: false, 
        error: getErrorMessage(error.code) 
      };
    }
  };

  // Login existing user
  const login = async (email, password) => {
    console.log('🔐 Starting login for:', email);
    
    try {
      // Step 1: Sign in with Firebase
      console.log('Step 1: Authenticating with Firebase...');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('✅ Authentication successful:', user.uid);

      // Step 2: Fetch user data from Firestore
      console.log('Step 2: Fetching user data from Firestore...');
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('✅ User data fetched:', userData);

        // Step 3: Update last login
        console.log('Step 3: Updating last login...');
        await updateDoc(userDocRef, {
          lastLogin: new Date().toISOString()
        });

        // Step 4: Update local state
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          name: userData.name,
          roles: userData.roles || ['student'],
          teacherProfile: userData.teacherProfile || null,
          createdAt: userData.createdAt
        });

        console.log('✅ Login completed successfully!');
        return { success: true, user: userData };
      } else {
        console.error('❌ User document not found in Firestore');
        throw new Error('User data not found. Please contact support.');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      return { 
        success: false, 
        error: getErrorMessage(error.code) 
      };
    }
  };

  // Logout user
  const logout = async () => {
    console.log('👋 Logging out...');
    try {
      await signOut(auth);
      setCurrentUser(null);
      console.log('✅ Logout successful');
      return { success: true };
    } catch (error) {
      console.error('❌ Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  // Upgrade user to teacher
  const upgradeToTeacher = async (interests, bio) => {
    console.log('🎓 Upgrading to teacher...');
    
    try {
      if (!currentUser) {
        throw new Error('User not logged in');
      }

      if (currentUser.roles.includes('teacher')) {
        console.log('⚠️ User is already a teacher');
        return { 
          success: false, 
          error: 'You are already a teacher' 
        };
      }

      const updatedRoles = [...currentUser.roles, 'teacher'];
      const teacherProfile = {
        interests: interests,
        bio: bio,
        activatedAt: new Date().toISOString()
      };

      console.log('Updating Firestore document...');
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        roles: updatedRoles,
        teacherProfile: teacherProfile
      });

      const updatedUser = {
        ...currentUser,
        roles: updatedRoles,
        teacherProfile: teacherProfile
      };

      setCurrentUser(updatedUser);
      console.log('✅ Teacher upgrade successful!');

      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('❌ Upgrade to teacher error:', error);
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
    console.log('🔍 Error code:', errorCode);
    
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please login instead.';
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      case 'permission-denied':
        return 'Permission denied. Please check Firestore security rules.';
      default:
        return `Error: ${errorCode || 'Unknown error occurred'}`;
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