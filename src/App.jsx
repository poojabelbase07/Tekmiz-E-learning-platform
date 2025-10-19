/*
import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SidebarContext from "./context/SidebarContext";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {

  return(
    <>
    
    <Navbar />
    <Sidebar />
    <SidebarContext />
    <Home />
    <Footer />
    </>
  );
}

export default App;
*/
// App.jsx - WITH CONTEXT (Even Cleaner!)
import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { SidebarProvider } from './context/SidebarContext';
import './App.css';

function App() {
  return (
    <SidebarProvider>
      <div className="app">
        <Navbar />
        <Sidebar />
        
        <main className="main-content">
          <div className="content-wrapper">
            <h1>Welcome to Tekmiz!</h1>
            <p>Your e-learning platform</p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;