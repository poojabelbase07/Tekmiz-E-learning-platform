// src/services/api.js - API Service for Backend Calls
const API_BASE_URL = 'https://tekmiz-e-learning-platform-backend.onrender.com';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// ==================== PLAYLIST APIs ====================

// Create playlist with thumbnail
export const createPlaylist = async (playlistData) => {
  try {
    const formData = new FormData();
    formData.append('title', playlistData.title);
    formData.append('description', playlistData.description);
    formData.append('category', playlistData.category);
    formData.append('author', playlistData.author);
    formData.append('authorId', playlistData.authorId);
    formData.append('thumbnail', playlistData.thumbnailFile);

    console.log('📤 Sending playlist to backend...');
    console.log('API URL:', `${API_BASE_URL}/playlists`);

    const response = await fetch(`${API_BASE_URL}/playlists`, {
      method: 'POST',
      body: formData
    });

    console.log('📥 Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create playlist');
    }

    const data = await response.json();
    console.log('✅ Playlist created:', data);
    return data;

  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
};

// Get all playlists
export const getAllPlaylists = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.category) params.append('category', filters.category);
  if (filters.authorId) params.append('authorId', filters.authorId);
  if (filters.search) params.append('search', filters.search);

  const response = await fetch(`${API_BASE_URL}/playlists?${params}`);
  return handleResponse(response);
};

// Get single playlist
export const getPlaylistById = async (playlistId) => {
  const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}`);
  return handleResponse(response);
};

// Update playlist
export const updatePlaylist = async (playlistId, updates) => {
  const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });

  return handleResponse(response);
};

// Delete playlist
export const deletePlaylist = async (playlistId) => {
  const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}`, {
    method: 'DELETE'
  });

  return handleResponse(response);
};

// Increment view count
export const incrementPlaylistView = async (playlistId) => {
  const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}/view`, {
    method: 'POST'
  });

  return handleResponse(response);
};

// ==================== RESOURCE APIs ====================

// Add resource to playlist (video/pdf/youtube)
export const addResource = async (playlistId, resourceData) => {
  const formData = new FormData();
  formData.append('type', resourceData.type);
  formData.append('title', resourceData.title);
  formData.append('description', resourceData.description || '');
  formData.append('uploadedBy', resourceData.uploadedBy);

  if (resourceData.type === 'youtube') {
    formData.append('youtubeUrl', resourceData.youtubeUrl);
  } else {
    formData.append('file', resourceData.file); // File object
  }

  const response = await fetch(`${API_BASE_URL}/resources/playlist/${playlistId}`, {
    method: 'POST',
    body: formData
  });

  return handleResponse(response);
};

// Get all resources for a playlist
export const getPlaylistResources = async (playlistId) => {
  const response = await fetch(`${API_BASE_URL}/resources/playlist/${playlistId}`);
  return handleResponse(response);
};

// Get single resource
export const getResourceById = async (resourceId) => {
  const response = await fetch(`${API_BASE_URL}/resources/${resourceId}`);
  return handleResponse(response);
};

// Delete resource
export const deleteResource = async (resourceId) => {
  const response = await fetch(`${API_BASE_URL}/resources/${resourceId}`, {
    method: 'DELETE'
  });

  return handleResponse(response);
};