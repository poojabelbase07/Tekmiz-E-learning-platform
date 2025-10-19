// context/SidebarContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create Context
const SidebarContext = createContext();

// Custom Hook to use Sidebar Context
export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within SidebarProvider');
  }
  return context;
};

// Provider Component
export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  return (
    <SidebarContext.Provider 
      value={{ 
        isSidebarOpen, 
        toggleSidebar, 
        closeSidebar, 
        openSidebar 
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;