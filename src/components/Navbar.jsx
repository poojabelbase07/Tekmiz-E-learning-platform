// Navbar.jsx - WITH AUTH CONTEXT (COMPLETE FIX)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, User } from 'lucide-react';
import { useSidebarContext } from '../context/SidebarContext';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebarContext();
  const { currentUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        
        {/* Left Section: Hamburger + Logo */}
        <div className={styles.navbarLeft}>
          <button
            onClick={toggleSidebar}
            className={styles.hamburgerBtn}
            aria-label="Toggle menu"
          >
            <Menu className={styles.hamburgerIcon} />
          </button>
          
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>
              <span className={styles.logoTextIcon}>T</span>
            </div>
            <span className={styles.logoText}>Tekmiz</span>
          </div>
        </div>

        {/* Center Section: Search Bar */}
        <div className={styles.navbarCenter}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search playlists, topics, teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              className={styles.searchInput}
            />
            <button onClick={handleSearch} className={styles.searchIconBtn}>
              <Search className={styles.searchIcon} />
            </button>
          </div>
        </div>

        {/* Right Section: Auth Buttons or Profile */}
        <div className={styles.navbarRight}>
          {!currentUser ? (
            <>
              <button
                onClick={() => navigate('/login')}
                className={styles.loginBtn}
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className={styles.registerBtn}
              >
                Register
              </button>
            </>
          ) : (
            <div className={styles.profileContainer}>
              <button
                onClick={handleProfileClick}
                className={styles.profileBtn}
              >
                <User className={styles.profileIcon} />
              </button>
              
              {showProfileMenu && (
                <div className={styles.profileMenu}>
                  <div className={styles.profileMenuHeader}>
                    <p className={styles.profileMenuName}>{currentUser.name}</p>
                  </div>
                  <button 
                    className={styles.profileMenuItem}
                    onClick={() => { navigate('/dashboard'); setShowProfileMenu(false); }}
                  >
                    Dashboard
                  </button>
                  <button className={styles.profileMenuItem}>Edit Profile</button>
                  <hr className={styles.profileMenuDivider} />
                  <button 
                    onClick={handleLogout}
                    className={`${styles.profileMenuItem} ${styles.logout}`}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;