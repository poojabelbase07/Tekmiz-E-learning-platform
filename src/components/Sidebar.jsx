// Sidebar.jsx - WITH AUTH CONTEXT
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, Info, GraduationCap, Mail, LogOut, User } from 'lucide-react';
import { useSidebarContext } from '../context/SidebarContext';
import { useAuth } from '../context/AuthContext';
import TeacherModal from './TeacherModal';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSidebarOpen, closeSidebar } = useSidebarContext();
  const { currentUser, logout, isTeacher } = useAuth();
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  
  // Check if current page is teacher page
  const isTeacherMode = location.pathname === '/teacher';

  const handleNavigation = (path) => {
    navigate(path);
    // Close sidebar on mobile after clicking
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  const handleTeacherClick = () => {
    // If not logged in, show teacher modal (which will ask to login)
    if (!currentUser) {
      setShowTeacherModal(true);
      return;
    }

    // If logged in and already a teacher
    if (isTeacher()) {
      // Toggle between student and teacher mode
      if (isTeacherMode) {
        navigate('/'); // Go to home (student mode)
      } else {
        navigate('/teacher'); // Go to teacher dashboard
      }
    } else {
      // Logged in but not a teacher, show upgrade modal
      setShowTeacherModal(true);
    }

    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  // Define menu items
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
  ];

  // Add Dashboard only if logged in
  if (currentUser) {
    menuItems.push({ 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/dashboard' 
    });
  }

  menuItems.push({ id: 'about', label: 'About', icon: Info, path: '/about' });

  // Teacher/Student mode toggle
  if (currentUser && isTeacher()) {
    // User is logged in AND is a teacher - show toggle
    menuItems.push({ 
      id: 'mode', 
      label: isTeacherMode ? 'Student Mode' : 'Teacher Mode', 
      icon: isTeacherMode ? User : GraduationCap,
      action: handleTeacherClick
    });
  } else {
    // User is not logged in OR not a teacher - show "Teacher"
    menuItems.push({ 
      id: 'teacher', 
      label: 'Teacher', 
      icon: GraduationCap,
      action: handleTeacherClick
    });
  }

  menuItems.push({ id: 'contact', label: 'Contact Us', icon: Mail, path: '/contact' });

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className={styles.sidebarOverlay} onClick={closeSidebar} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarContent}>
          {/* Menu Items */}
          <nav className={styles.sidebarNav}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.id}
                  onClick={() => item.action ? item.action() : handleNavigation(item.path)}
                  className={`${styles.sidebarItem} ${isActive ? styles.sidebarItemActive : ''}`}
                >
                  <Icon className={styles.sidebarIcon} />
                  <span className={styles.sidebarLabel}>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout Button (only when authenticated) */}
          {currentUser && (
            <div className={styles.sidebarFooter}>
              <button onClick={handleLogout} className={styles.sidebarLogout}>
                <LogOut className={styles.sidebarIcon} />
                <span className={styles.sidebarLabel}>Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Teacher Modal */}
      <TeacherModal
        isOpen={showTeacherModal}
        onClose={() => setShowTeacherModal(false)}
      />
    </>
  );
};

export default Sidebar;