// context/PlaylistsContext.jsx
import React, { createContext, useContext, useState } from 'react';

const PlaylistsContext = createContext();

export const usePlaylistsContext = () => {
  const context = useContext(PlaylistsContext);
  if (!context) {
    throw new Error('usePlaylistsContext must be used within PlaylistsProvider');
  }
  return context;
};

export const PlaylistsProvider = ({ children }) => {
  // Initial playlists (mock data)
  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      title: 'JavaScript Mastery',
      author: 'Hitesh Choudhary',
      thumbnail: '📚',
      videosCount: 24,
      rating: 4.8,
      category: 'Web Development'
    },
    {
      id: 2,
      title: 'React Complete Guide',
      author: 'Akshay Saini',
      thumbnail: '⚛️',
      videosCount: 18,
      rating: 4.9,
      category: 'Frontend'
    },
    {
      id: 3,
      title: 'Python for Beginners',
      author: 'Telusko',
      thumbnail: '🐍',
      videosCount: 32,
      rating: 4.7,
      category: 'Programming'
    },
    {
      id: 4,
      title: 'Node.js Backend',
      author: 'Traversy Media',
      thumbnail: '🚀',
      videosCount: 15,
      rating: 4.8,
      category: 'Backend'
    },
    {
      id: 5,
      title: 'CSS Animations Pro',
      author: 'Kevin Powell',
      thumbnail: '🎨',
      videosCount: 20,
      rating: 4.9,
      category: 'Frontend'
    },
    {
      id: 6,
      title: 'Data Structures & Algorithms',
      author: 'Abdul Bari',
      thumbnail: '💻',
      videosCount: 45,
      rating: 4.9,
      category: 'Computer Science'
    }
  ]);

  // Add new playlist (used by Teacher when creating)
  const addPlaylist = (playlist) => {
    const newPlaylist = {
      ...playlist,
      id: playlists.length + 1,
      videosCount: 0,
      rating: 0,
      author: 'Pooja' // Later replace with actual logged-in user
    };
    setPlaylists([newPlaylist, ...playlists]);
    return newPlaylist;
  };

  // Update playlist
  const updatePlaylist = (id, updatedData) => {
    setPlaylists(playlists.map(p => 
      p.id === id ? { ...p, ...updatedData } : p
    ));
  };

  // Delete playlist
  const deletePlaylist = (id) => {
    setPlaylists(playlists.filter(p => p.id !== id));
  };

  // Get single playlist by ID
  const getPlaylistById = (id) => {
    return playlists.find(p => p.id === parseInt(id));
  };

  return (
    <PlaylistsContext.Provider 
      value={{ 
        playlists,
        addPlaylist,
        updatePlaylist,
        deletePlaylist,
        getPlaylistById
      }}
    >
      {children}
    </PlaylistsContext.Provider>
  );
};