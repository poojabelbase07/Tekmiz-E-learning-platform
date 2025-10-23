// pages/Teacher.jsx - Teacher Dashboard
import React, { useState, useMemo } from 'react';
import { usePlaylistsContext } from '../context/PlaylistContext';
import styles from './Teacher.module.css';

const Teacher = () => {
  const { playlists, addPlaylist, deletePlaylist } = usePlaylistsContext();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filter to show only teacher's playlists (for demo, showing playlists by "Pooja")
  const teacherPlaylists = useMemo(() => {
    return playlists.filter(p => p.author === 'Pooja');
  }, [playlists]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    thumbnail: null
  });

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

  const analytics = {
    totalViews: playlists.reduce((sum, p) => sum + (p.views || 0), 0),
    totalLikes: playlists.reduce((sum, p) => sum + (p.likes || 0), 0),
    totalPlaylists: playlists.length,
    trendingCount: playlists.filter(p => p.trending).length
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For demo, just store the file name
      setFormData(prev => ({ ...prev, thumbnail: file.name }));
    }
  };

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    
    // Add playlist using context
    const newPlaylist = addPlaylist({
      title: formData.title,
      thumbnail: '📚', // Default emoji for demo
      category: formData.category,
    });
    
    // Reset form and close modal
    setFormData({
      title: '',
      description: '',
      category: 'Web Development',
      thumbnail: null
    });
    setShowCreateModal(false);
    
    alert('🎉 Playlist created successfully! Check the home page.');
  };

  const handleDeletePlaylist = (id) => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      deletePlaylist(id);
    }
  };

  const handleEditPlaylist = (id) => {
    console.log('Edit playlist:', id);
    // TODO: Open edit modal
    alert('Edit feature coming soon!');
  };

  return (
    <div className={styles.teacherContainer}>
      {/* Welcome Section */}
      <section className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <h1 className={styles.welcomeTitle}>Welcome back, Pooja! 👋</h1>
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
              <h3 className={styles.analyticsLabel}>Playlists</h3>
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
        <div className={styles.playlistsGrid}>
          {playlists.map((playlist) => (
            <div key={playlist.id} className={styles.playlistCard}>
              {playlist.trending && (
                <div className={styles.trendingBadge}>🔥 Trending</div>
              )}
              <div className={styles.playlistThumbnail}>
                <span className={styles.thumbnailIcon}>{playlist.thumbnail}</span>
              </div>
              <div className={styles.playlistContent}>
                <h3 className={styles.playlistTitle}>{playlist.title}</h3>
                <p className={styles.playlistCategory}>{playlist.category}</p>
                <div className={styles.playlistStats}>
                  <span>📝 {playlist.resourcesCount} resources</span>
                  <span>👁️ {playlist.views}</span>
                  <span>❤️ {playlist.likes}</span>
                </div>
              </div>
              <div className={styles.playlistActions}>
                <button 
                  className={styles.editButton}
                  onClick={() => handleEditPlaylist(playlist.id)}
                >
                  Edit
                </button>
                <button 
                  className={styles.deleteButton}
                  onClick={() => handleDeletePlaylist(playlist.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Create New Playlist</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setShowCreateModal(false)}
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
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className={styles.fileInput}
                />
                {formData.thumbnail && (
                  <p className={styles.fileName}>Selected: {formData.thumbnail}</p>
                )}
              </div>

              <div className={styles.modalActions}>
                <button 
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitButton}>
                  Create Playlist
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