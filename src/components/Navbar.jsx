// Navbar.jsx - WITH RESPONSIVE DYNAMIC SEARCH
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, User } from 'lucide-react';
import { useSidebarContext } from '../context/SidebarContext';
import { useAuth } from '../context/AuthContext';
import { usePlaylistsContext } from '../context/PlaylistContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebarContext();
  const { currentUser, logout } = useAuth();
  const { searchPlaylists } = usePlaylistsContext();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Handle search input change (real-time search)
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim().length > 0) {
      const results = searchPlaylists(value);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  };

  // Handle Enter key press
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const results = searchPlaylists(searchQuery);
      setSearchResults(results);
      setShowSearchResults(true);
    }
  };

  // Handle playlist click from search results
  const handlePlaylistClick = (playlistId) => {
    setShowSearchResults(false);
    setSearchQuery('');
    
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    navigate(`/playlist/${playlistId}`);
  };

  // Close search results when clicking outside
  const handleCloseSearch = () => {
    setShowSearchResults(false);
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
    <>
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
            
            <div 
              className={styles.logoContainer}
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.logoIcon}>
                <span className={styles.logoTextIcon}>T</span>
              </div>
              <span className={styles.logoText}>Tekmiz</span>
            </div>
          </div>

          {/* Center Section: Search Bar */}
          <div className={styles.navbarCenter}>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIconInside} />
              <input
                type="text"
                placeholder="Search playlists"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyPress={handleSearchKeyPress}
                onFocus={() => {
                  if (searchQuery.trim()) {
                    setShowSearchResults(true);
                  }
                }}
                className={styles.searchInput}
              />

              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className={styles.searchResults}>
                  {searchResults.length === 0 ? (
                    <div className={styles.noResults}>
                      <p>No playlists found for "{searchQuery}"</p>
                    </div>
                  ) : (
                    <>
                      <div className={styles.resultsHeader}>
                        {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                      </div>
                      {searchResults.map((playlist) => (
                        <div
                          key={playlist.id}
                          className={styles.searchResultItem}
                          onClick={() => handlePlaylistClick(playlist.id)}
                        >
                          <span className={styles.resultIcon}>{playlist.thumbnail}</span>
                          <div className={styles.resultInfo}>
                            <p className={styles.resultTitle}>{playlist.title}</p>
                            <p className={styles.resultMeta}>
                              by {playlist.author} • {playlist.category}
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
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

      {/* Overlay to close search results when clicking outside */}
      {showSearchResults && (
        <div className={styles.searchOverlay} onClick={handleCloseSearch} />
      )}
    </>
  );
};

export default Navbar;