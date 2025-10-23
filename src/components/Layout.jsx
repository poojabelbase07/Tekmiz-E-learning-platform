// components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <Sidebar />
      
      <main className={styles.layoutMain}>
        <Outlet /> {/* This renders the current page (Home, Dashboard, etc.) */}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;