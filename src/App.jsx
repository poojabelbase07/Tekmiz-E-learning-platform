// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from './context/SidebarContext';
import { AuthProvider } from './context/AuthContext'; // Add this
import { PlaylistsProvider } from './context/PlaylistContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Teacher from './pages/Teacher';
import Contact from './pages/Contact';
import PlaylistDetail from './pages/PlaylistDetail';
import AddResources from './pages/AddResources';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <AuthProvider> {/* Wrap everything in AuthProvider */}
      <SidebarProvider>
        <PlaylistsProvider>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Main Routes */}
            <Route path="/" element={<Layout />}>
              {/* Public Routes */}
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />

              {/* Protected Routes - Need Login */}
              <Route 
                path="dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Teacher Route - Need Login + Teacher Role */}
              <Route 
                path="teacher" 
                element={
                  <ProtectedRoute requireTeacher={true}>
                    <Teacher />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="playlist/:id" 
                element={
                  <ProtectedRoute>
                    <PlaylistDetail />
                  </ProtectedRoute>
                } 
              />

              <Route path="/teacher/playlist/:playlistId/add-resources" element={
               <ProtectedRoute requireTeacher={true}>
              <AddResources />
              </ProtectedRoute>
              } 
              />

            </Route>
          </Routes>
        </PlaylistsProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;