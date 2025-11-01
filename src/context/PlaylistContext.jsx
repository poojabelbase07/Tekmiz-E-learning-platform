// context/PlaylistContext.jsx - WITH FIRESTORE
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  deleteDoc, 
  updateDoc,
  query,
  where,
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase/config';

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

  // Fetch all playlists from Firestore on mount
  useEffect(() => {
    fetchPlaylists();
  }, []);

  // Fetch all playlists
  const fetchPlaylists = async () => {
    try {
      console.log('📚 Fetching playlists from Firestore...');
      const playlistsCollection = collection(db, 'playlists');
      const playlistsQuery = query(playlistsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(playlistsQuery);
      
      const playlistsData = [];
      querySnapshot.forEach((doc) => {
        playlistsData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setPlaylists(playlistsData);
      console.log(`✅ Loaded ${playlistsData.length} playlists`);
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
      
      const newPlaylist = {
        ...playlistData,
        views: 0,
        likes: 0,
        resourcesCount: 0,
        trending: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'playlists'), newPlaylist);
      
      const playlistWithId = {
        id: docRef.id,
        ...newPlaylist
      };

      setPlaylists(prev => [playlistWithId, ...prev]);
      console.log('✅ Playlist added successfully!');
      
      return playlistWithId;
    } catch (error) {
      console.error('❌ Error adding playlist:', error);
      throw error;
    }
  };

  // Delete playlist
  const deletePlaylist = async (playlistId) => {
    try {
      console.log('🗑️ Deleting playlist:', playlistId);
      await deleteDoc(doc(db, 'playlists', playlistId));
      setPlaylists(prev => prev.filter(p => p.id !== playlistId));
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
      const playlistRef = doc(db, 'playlists', playlistId);
      
      const updatedData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };

      await updateDoc(playlistRef, updatedData);
      
      setPlaylists(prev => prev.map(p => 
        p.id === playlistId ? { ...p, ...updatedData } : p
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

  const value = {
    playlists,
    loading,
    addPlaylist,
    deletePlaylist,
    updatePlaylist,
    searchPlaylists,
    getPlaylistsByAuthor,
    getPlaylistsByCategory,
    fetchPlaylists
  };

  return (
    <PlaylistsContext.Provider value={value}>
      {children}
    </PlaylistsContext.Provider>
  );
};