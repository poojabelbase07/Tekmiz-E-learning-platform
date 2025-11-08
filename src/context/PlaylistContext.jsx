// context/PlaylistContext.jsx - WITH BACKEND API
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

const PlaylistsContext = createContext();

export const usePlaylistsContext = () => {
  const context = useContext(PlaylistsContext);
  if (!context) {
    throw new Error('usePlaylistsContext must be used within PlaylistsProvider');
  }
  return context;
};

export const PlaylistsProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all playlists on mount
  useEffect(() => {
    fetchPlaylists();
  }, []);

  // Fetch all playlists from backend
  const fetchPlaylists = async () => {
    try {
      console.log('📚 Fetching playlists from backend...');
      const response = await api.getAllPlaylists();
      setPlaylists(response.playlists);
      console.log(`✅ Loaded ${response.playlists.length} playlists`);
    } catch (error) {
      console.error('❌ Error fetching playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add new playlist
  const addPlaylist = async (playlistData) => {
    try {
      console.log('➕ Adding new playlist:', playlistData.title);
      const response = await api.createPlaylist(playlistData);
      
      setPlaylists(prev => [response.playlist, ...prev]);
      console.log('✅ Playlist added successfully!');
      
      return response.playlist;
    } catch (error) {
      console.error('❌ Error adding playlist:', error);
      throw error;
    }
  };

  // Delete playlist
  const deletePlaylist = async (playlistId) => {
    try {
      console.log('🗑️ Deleting playlist:', playlistId);
      await api.deletePlaylist(playlistId);
      setPlaylists(prev => prev.filter(p => p._id !== playlistId));
      console.log('✅ Playlist deleted successfully!');
    } catch (error) {
      console.error('❌ Error deleting playlist:', error);
      throw error;
    }
  };

  // Update playlist
  const updatePlaylist = async (playlistId, updates) => {
    try {
      console.log('✏️ Updating playlist:', playlistId);
      const response = await api.updatePlaylist(playlistId, updates);
      
      setPlaylists(prev => prev.map(p => 
        p._id === playlistId ? response.playlist : p
      ));
      
      console.log('✅ Playlist updated successfully!');
    } catch (error) {
      console.error('❌ Error updating playlist:', error);
      throw error;
    }
  };

  // Search playlists
  const searchPlaylists = (searchQuery) => {
    if (!searchQuery.trim()) {
      return playlists;
    }

    const query = searchQuery.toLowerCase();
    return playlists.filter(playlist => 
      playlist.title.toLowerCase().includes(query) ||
      playlist.category.toLowerCase().includes(query) ||
      playlist.author.toLowerCase().includes(query)
    );
  };

  // Get playlists by author
  const getPlaylistsByAuthor = (authorId) => {
    return playlists.filter(p => p.authorId === authorId);
  };

  // Get playlists by category
  const getPlaylistsByCategory = (category) => {
    return playlists.filter(p => p.category === category);
  };

  // Get single playlist by ID
  const getPlaylistById = (playlistId) => {
    return playlists.find(p => p._id === playlistId);
  };

  const value = {
    playlists,
    loading,
    addPlaylist,
    deletePlaylist,
    updatePlaylist,
    searchPlaylists,
    getPlaylistsByAuthor,
    getPlaylistsByCategory,
    getPlaylistById,
    fetchPlaylists
  };

  return (
    <PlaylistsContext.Provider value={value}>
      {children}
    </PlaylistsContext.Provider>
  );
};