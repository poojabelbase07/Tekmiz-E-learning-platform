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

import React, { useState } from 'react';
import { Search, Menu, User } from 'lucide-react';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleMenuClick = () => {
    console.log('Hamburger clicked - toggle sidebar');
  };

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
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        
        {/* Left Section: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent hidden sm:block">
              Tekmiz
            </span>
          </div>
        </div>

        {/* Center Section: Search Bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search playlists, topics, teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              className="w-full px-4 py-2 pl-10 pr-4 border-2 border-gray-200 rounded-full focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button
              onClick={handleSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            >
              <Search className="w-5 h-5 text-gray-400 hover:text-purple-600 transition-colors" />
            </button>
          </div>
        </div>

        {/* Right Section: Auth Buttons or Profile */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => console.log('Login clicked')}
                className="px-4 py-2 text-purple-600 font-medium hover:bg-purple-50 rounded-lg transition-colors hidden sm:block"
              >
                Login
              </button>
              <button
                onClick={() => console.log('Register clicked')}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg transition-all"
              >
                Register
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all"
              >
                <User className="w-5 h-5 text-white" />
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    Edit Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    Dashboard
                  </button>
                  <hr className="my-2" />
                  <button 
                    onClick={() => setIsAuthenticated(false)}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
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