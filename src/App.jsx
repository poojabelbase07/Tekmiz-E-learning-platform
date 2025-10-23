// App.jsx - Updated with PlaylistsContext
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from './context/SidebarContext';
import { PlaylistsProvider } from './context/PlaylistContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Teacher from './pages/Teacher';
import Contact from './pages/Contact';
import PlaylistDetail from './pages/PlaylistDetail';

function App() {
  return (
    <SidebarProvider>
      <PlaylistsProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="about" element={<About />} />
            <Route path="teacher" element={<Teacher />} />
            <Route path="contact" element={<Contact />} />
            <Route path="playlist/:id" element={<PlaylistDetail />} />
          </Route>
        </Routes>
      </PlaylistsProvider>
    </SidebarProvider>
  );
}

export default App;