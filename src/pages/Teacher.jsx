// pages/Teacher.jsx - WITH BACKEND API
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlaylistsContext } from '../context/PlaylistContext';
import { useAuth } from '../context/AuthContext';
import styles from './Teacher.module.css';

const Teacher = () => {
  const navigate = useNavigate();
  const { playlists, addPlaylist, deletePlaylist } = usePlaylistsContext();
  const { currentUser } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filter to show only THIS teacher's playlists
  const teacherPlaylists = useMemo(() => {
    if (!currentUser) return [];
    return playlists.filter(p => p.authorId === currentUser.uid);
  }, [playlists, currentUser]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    thumbnailFile: null,
    thumbnailPreview: null
  });

  const [uploading, setUploading] = useState(false);

  const categories = [
    'Web Development',
    'AI/ML',
    'Full Stack',
    'Android',
    'Data Science',
    'Cybersecurity',
    'Backend',
    'Frontend',
    'DevOps'
  ];

  // Analytics for THIS teacher's playlists only
  const analytics = useMemo(() => ({
    totalViews: teacherPlaylists.reduce((sum, p) => sum + (p.views || 0), 0),
    totalLikes: teacherPlaylists.reduce((sum, p) => sum + (p.likes || 0), 0),
    totalPlaylists: teacherPlaylists.length,
    trendingCount: teacherPlaylists.filter(p => p.trending).length
  }), [teacherPlaylists]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setFormData(prev => ({ 
        ...prev, 
        thumbnailFile: file,
        thumbnailPreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleCreatePlaylist = async (e) => {
  e.preventDefault();
  
  if (!currentUser) {
    alert('Please login to create playlists');
    return;
  }

  if (!formData.thumbnailFile) {
    alert('Please select a thumbnail image');
    return;
  }

  setUploading(true);

  try {
    const newPlaylist = await addPlaylist({
      title: formData.title,
      description: formData.description,
      thumbnailFile: formData.thumbnailFile,
      category: formData.category,
      author: currentUser.name,
      authorId: currentUser.uid,
    });

    console.log('✅ Playlist created:', newPlaylist);

    // Reset form and close modal
    setFormData({
      title: '',
      description: '',
      category: 'Web Development',
      thumbnailFile: null,
      thumbnailPreview: null
    });
    setShowCreateModal(false);

    //  Show success message (playlist already visible due to optimistic update!)
    alert('🎉 Playlist created and uploading in background!');
    
  } catch (error) {
    console.error('❌ Error creating playlist:', error);
    alert('❌ Error creating playlist. Please check your connection and try again.');
  } finally {
    setUploading(false);
  }
};

  const handleDeletePlaylist = async (id) => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      try {
        await deletePlaylist(id);
        alert('✅ Playlist deleted successfully!');
      } catch (error) {
        alert('❌ Error deleting playlist');
      }
    }
  };

  const handleEditPlaylist = (id) => {
    console.log('Edit playlist:', id);
    alert('Edit feature coming soon!');
  };

  const handleViewPlaylist = (id) => {
    navigate(`/playlist/${id}`);
  };

  const getFirstName = (fullName) => {
    if (!fullName) return 'Teacher';
    return fullName.split(' ')[0];
  };

  if (!currentUser) {
    return (
      <div className={styles.teacherContainer}>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Loading teacher dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.teacherContainer}>
      {/* Welcome Section */}
      <section className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <h1 className={styles.welcomeTitle}>
            Welcome back, {getFirstName(currentUser.name)}! 👋
          </h1>
          <p className={styles.welcomeSubtitle}>
            Ready to inspire more learners today?
          </p>
        </div>
        <button 
          className={styles.createButton}
          onClick={() => setShowCreateModal(true)}
        >
          + Create Playlist
        </button>
      </section>

      {/* Analytics Cards */}
      <section className={styles.analyticsSection}>
        <div className={styles.analyticsGrid}>
          <div className={styles.analyticsCard}>
            <div className={styles.analyticsIcon}>👁️</div>
            <div className={styles.analyticsContent}>
              <h3 className={styles.analyticsLabel}>Total Views</h3>
              <p className={styles.analyticsNumber}>{analytics.totalViews}</p>
            </div>
          </div>

          <div className={styles.analyticsCard}>
            <div className={styles.analyticsIcon}>❤️</div>
            <div className={styles.analyticsContent}>
              <h3 className={styles.analyticsLabel}>Total Likes</h3>
              <p className={styles.analyticsNumber}>{analytics.totalLikes}</p>
            </div>
          </div>

          <div className={styles.analyticsCard}>
            <div className={styles.analyticsIcon}>📚</div>
            <div className={styles.analyticsContent}>
              <h3 className={styles.analyticsLabel}>My Playlists</h3>
              <p className={styles.analyticsNumber}>{analytics.totalPlaylists}</p>
            </div>
          </div>

          <div className={styles.analyticsCard}>
            <div className={styles.analyticsIcon}>🔥</div>
            <div className={styles.analyticsContent}>
              <h3 className={styles.analyticsLabel}>Trending</h3>
              <p className={styles.analyticsNumber}>{analytics.trendingCount}</p>
            </div>
          </div>
        </div>
      </section>

      {/* My Playlists Section */}
      <section className={styles.playlistsSection}>
        <h2 className={styles.sectionTitle}>My Playlists</h2>
        
        {teacherPlaylists.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📚</div>
            <h3 className={styles.emptyTitle}>No playlists yet</h3>
            <p className={styles.emptyText}>
              Create your first playlist and start sharing your knowledge!
            </p>
            <button 
              className={styles.createButton}
              onClick={() => setShowCreateModal(true)}
            >
              + Create Your First Playlist
            </button>
          </div>
        ) : (
          <div className={styles.playlistsGrid}>
            {teacherPlaylists.map((playlist) => (
              <div key={playlist._id} className={styles.playlistCard}>
                {playlist.trending && (
                  <div className={styles.trendingBadge}>🔥 Trending</div>
                )}
                <div className={styles.playlistThumbnail}>
                  {playlist.thumbnail ? (
                    <img 
                      src={playlist.thumbnail} 
                      alt={playlist.title}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        borderRadius: '12px' 
                      }}
                    />
                  ) : (
                    <span className={styles.thumbnailIcon}>📚</span>
                  )}
                </div>
                <div className={styles.playlistContent}>
                  <h3 className={styles.playlistTitle}>{playlist.title}</h3>
                  <p className={styles.playlistCategory}>{playlist.category}</p>
                  <div className={styles.playlistStats}>
                    <span>📝 {playlist.resourcesCount || 0} resources</span>
                    <span>👁️ {playlist.views || 0}</span>
                    <span>❤️ {playlist.likes || 0}</span>
                  </div>
                </div>
                <div className={styles.playlistActions}>
                  <button 
                    className={styles.viewButton}
                    onClick={() => handleViewPlaylist(playlist._id)}
                  >
                    View
                  </button>
                  <button 
                    className={styles.editButton}
                    onClick={() => handleEditPlaylist(playlist._id)}
                  >
                    Edit
                  </button>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => handleDeletePlaylist(playlist._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className={styles.modalOverlay} onClick={() => !uploading && setShowCreateModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Create New Playlist</h2>
              <button 
                className={styles.closeButton}
                onClick={() => !uploading && setShowCreateModal(false)}
                disabled={uploading}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePlaylist} className={styles.createForm}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Playlist Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., JavaScript Mastery"
                  className={styles.input}
                  disabled={uploading}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Brief description of your playlist..."
                  rows="4"
                  className={styles.textarea}
                  disabled={uploading}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className={styles.select}
                  disabled={uploading}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Thumbnail Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  required
                  className={styles.fileInput}
                  disabled={uploading}
                />
                {formData.thumbnailPreview && (
                  <div className={styles.imagePreview}>
                    <img 
                      src={formData.thumbnailPreview} 
                      alt="Thumbnail preview" 
                      className={styles.previewImage}
                    />
                    <button
                      type="button"
                      className={styles.removeImageBtn}
                      onClick={() => setFormData(prev => ({ 
                        ...prev, 
                        thumbnailFile: null, 
                        thumbnailPreview: null 
                      }))}
                      disabled={uploading}
                    >
                      ✕ Remove
                    </button>
                  </div>
                )}
                <p className={styles.fileHint}>Max size: 5MB. Recommended: 1200x630px</p>
              </div>

              <div className={styles.modalActions}>
                <button 
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowCreateModal(false)}
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={uploading}
                >
                  {uploading ? 'Creating...' : 'Create Playlist'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacher;