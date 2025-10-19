/* 
import React from "react";

function Navbar() {
  return (
    <nav>

        <div>
            <button>=</button>
            <h2>Tekmiz</h2> 
        </div>
        
        <div>
            <input type="text" placeholder="Search here" />
        </div>

        <div>
            <button>Login</button>
            <button>Register</button>
        </div>
    </nav>
  );
}

export default Navbar;
*/

// Navbar.jsx
// Navbar.jsx - WITH CSS MODULES
import React, { useState } from 'react';
import { Search, Menu, User } from 'lucide-react';
import { useSidebarContext } from '../context/SidebarContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { toggleSidebar } = useSidebarContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => console.log('Login clicked')}
                className={styles.loginBtn}
              >
                Login
              </button>
              <button
                onClick={() => console.log('Register clicked')}
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
                  <button className={styles.profileMenuItem}>Edit Profile</button>
                  <button className={styles.profileMenuItem}>Dashboard</button>
                  <hr className={styles.profileMenuDivider} />
                  <button 
                    onClick={() => setIsAuthenticated(false)}
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