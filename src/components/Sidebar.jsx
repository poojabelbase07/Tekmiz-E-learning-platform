/*
import React from "react";
//import "./Sidebar.css";
// Sidebar section list
function Sidebar() {

    return(
    // Home Dashboard About Teacher Contact us
        <div className="sidebar">
         <ul>
        <li>Home</li>
        <li>Dashboard</li>
        <li>About</li>
        <li>Teacher</li>
        <li>Contact us</li>
        </ul>
        </div>

    );
}

export default Sidebar;

*/

// Sidebar.jsx
// Sidebar.jsx - WITH CSS MODULES + REACT ROUTER
// Sidebar.jsx - WITH CSS MODULES + REACT ROUTER (FIXED TOGGLE)
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, Info, GraduationCap, Mail, LogOut, User } from 'lucide-react';
import { useSidebarContext } from '../context/SidebarContext';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSidebarOpen, closeSidebar } = useSidebarContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
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
    setIsAuthenticated(false);
    console.log('User logged out');
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  const handleModeToggle = () => {
    // If on teacher page, go to home (student mode)
    // If on any other page, go to teacher page (teacher mode)
    if (isTeacherMode) {
      navigate('/');
    } else {
      navigate('/teacher');
    }
    
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'about', label: 'About', icon: Info, path: '/about' },
    { 
      id: 'mode', 
      label: isTeacherMode ? 'Student' : 'Teacher', 
      icon: isTeacherMode ? User : GraduationCap,
      action: handleModeToggle
    },
    { id: 'contact', label: 'Contact Us', icon: Mail, path: '/contact' },
  ];

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
          {isAuthenticated && (
            <div className={styles.sidebarFooter}>
              <button onClick={handleLogout} className={styles.sidebarLogout}>
                <LogOut className={styles.sidebarIcon} />
                <span className={styles.sidebarLabel}>Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;