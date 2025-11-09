// context/PlaylistContext.jsx - WITH OPTIMISTIC UPDATES
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

  useEffect(() => {
    fetchPlaylists();
  }, []);

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

  // ⭐ OPTIMISTIC UPDATE - Show immediately while uploading
  const addPlaylist = async (playlistData) => {
    try {
      console.log('➕ Adding new playlist:', playlistData.title);
      
      // 1. Create temporary ID
      const tempId = `temp_${Date.now()}`;
      
      // 2. Create optimistic playlist (show immediately)
      const optimisticPlaylist = {
        _id: tempId,
        title: playlistData.title,
        description: playlistData.description,
        category: playlistData.category,
        author: playlistData.author,
        authorId: playlistData.authorId,
        thumbnail: playlistData.thumbnailFile ? URL.createObjectURL(playlistData.thumbnailFile) : null,
        views: 0,
        likes: 0,
        resourcesCount: 0,
        trending: false,
        createdAt: new Date().toISOString(),
        _isOptimistic: true // Flag to identify temp playlists
      };

      // 3. Add to state immediately (user sees it right away!)
      setPlaylists(prev => [optimisticPlaylist, ...prev]);
      
      // 4. Upload to backend in background
      const response = await api.createPlaylist(playlistData);
      
      // 5. Replace optimistic with real data
      setPlaylists(prev => prev.map(p => 
        p._id === tempId ? { ...response.playlist, _isOptimistic: false } : p
      ));
      
      console.log('✅ Playlist confirmed and replaced!');
      
      return response.playlist;
    } catch (error) {
      console.error('❌ Error adding playlist:', error);
      
      // 6. Remove optimistic playlist if upload failed
      setPlaylists(prev => prev.filter(p => !p._isOptimistic));
      
      throw error;
    }
  };

  const deletePlaylist = async (playlistId) => {
    try {
      console.log('🗑️ Deleting playlist:', playlistId);
      
      // Optimistically remove from UI
      const previousPlaylists = [...playlists];
      setPlaylists(prev => prev.filter(p => p._id !== playlistId));
      
      try {
        await api.deletePlaylist(playlistId);
        console.log('✅ Playlist deleted successfully!');
      } catch (error) {
        // Restore if delete failed
        setPlaylists(previousPlaylists);
        throw error;
      }
    } catch (error) {
      console.error('❌ Error deleting playlist:', error);
      throw error;
    }
  };

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

  const getPlaylistsByAuthor = (authorId) => {
    return playlists.filter(p => p.authorId === authorId);
  };

  const getPlaylistsByCategory = (category) => {
    return playlists.filter(p => p.category === category);
  };

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