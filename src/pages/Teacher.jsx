// pages/Teacher.jsx - Teacher Dashboard WITH REAL USER DATA
import React, { useState, useMemo } from 'react';
import { usePlaylistsContext } from '../context/PlaylistContext';
import { useAuth } from '../context/AuthContext';
import styles from './Teacher.module.css';

const Teacher = () => {
  const { playlists, addPlaylist, deletePlaylist } = usePlaylistsContext();
  const { currentUser } = useAuth(); // Get real user from AuthContext
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filter to show only THIS teacher's playlists
  const teacherPlaylists = useMemo(() => {
    if (!currentUser) return [];
    // Filter playlists by current user's UID
    return playlists.filter(p => p.authorId === currentUser.uid);
  }, [playlists, currentUser]);

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
      // For demo, just store the file name
      setFormData(prev => ({ ...prev, thumbnail: file.name }));
    }
  };

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      alert('Please login to create playlists');
      return;
    }
    
    // Add playlist using context with author info
    const newPlaylist = addPlaylist({
      title: formData.title,
      description: formData.description,
      thumbnail: '📚', // Default emoji for demo
      category: formData.category,
      author: currentUser.name, // Real user name
      authorId: currentUser.uid, // Real user ID
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

  // Get first name from full name
  const getFirstName = (fullName) => {
    if (!fullName) return 'Teacher';
    return fullName.split(' ')[0];
  };

  // Show loading if no user data yet
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
        )}
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