// pages/Home.jsx - DYNAMIC (NO DUMMY DATA)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlaylistsContext } from '../context/PlaylistContext';
import { useAuth } from '../context/AuthContext';
import TeacherModal from '../components/TeacherModal';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const { playlists, loading } = usePlaylistsContext();
  const { currentUser, isTeacher } = useAuth();
  const [showTeacherModal, setShowTeacherModal] = useState(false);

  const topCategories = [
    { name: 'Web Development', icon: '💻' },
    { name: 'AI/ML', icon: '🤖' },
    { name: 'Full Stack', icon: '🚀' },
    { name: 'Android', icon: '📱' },
    { name: 'Data Science', icon: '📊' },
    { name: 'Cybersecurity', icon: '🔒' }
  ];

  const handlePlaylistClick = (id) => {
    // Check if user is logged in before accessing playlist
    if (!currentUser) {
      navigate('/login');
      return;
    }
    navigate(`/playlist/${id}`);
  };

  const handleBecomeTeacher = () => {
    if (!currentUser) {
      setShowTeacherModal(true);
      return;
    }

    if (isTeacher()) {
      navigate('/teacher');
    } else {
      setShowTeacherModal(true);
    }
  };

  const handleCategoryClick = (categoryName) => {
    // TODO: Implement category filtering
    console.log('Category clicked:', categoryName);
  };

  return (
    <div className={styles.homeContainer}>
      {/* Quick Options Section */}
      <section className={styles.quickOptions}>
        <h2 className={styles.sectionHeading}>Quick Options</h2>
        
        <div className={styles.optionsGrid}>
          {/* Left Side - Top Categories */}
          <div className={styles.categoryCard}>
            <h3 className={styles.categoryTitle}>Top Categories</h3>
            <div className={styles.categoryChips}>
              {topCategories.map((cat, index) => (
                <button 
                  key={index} 
                  className={styles.categoryChip}
                  onClick={() => handleCategoryClick(cat.name)}
                >
                  <span className={styles.chipIcon}>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Become Teacher */}
          <div className={styles.teacherCard}>
            <h3 className={styles.teacherTitle}>
              {currentUser && isTeacher() ? 'Go to Teacher Dashboard' : 'Become Teacher'}
            </h3>
            <p className={styles.teacherDescription}>
              {currentUser && isTeacher() 
                ? 'Manage your playlists and inspire learners.' 
                : 'Share your knowledge and inspire learners worldwide.'}
            </p>
            <button className={styles.teacherButton} onClick={handleBecomeTeacher}>
              {currentUser && isTeacher() ? '🎓 Go to Dashboard' : '🚀 Get Started'}
            </button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className={styles.divider}></div>

      {/* Explore Section */}
      <section className={styles.exploreSection}>
        <h2 className={styles.exploreHeading}>Explore</h2>
        
        {loading ? (
          <div className={styles.loadingState}>
            <p>Loading playlists...</p>
          </div>
        ) : playlists.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📚</div>
            <h3 className={styles.emptyTitle}>No playlists yet</h3>
            <p className={styles.emptyText}>
              Be the first to create a playlist and share your knowledge!
            </p>
            {currentUser && (
              <button 
                className={styles.teacherButton}
                onClick={handleBecomeTeacher}
              >
                Create Your First Playlist
              </button>
            )}
          </div>
        ) : (
          <div className={styles.playlistGrid}>
            {playlists.map((playlist) => (
              <div 
                key={playlist.id} 
                className={styles.playlistCard}
                onClick={() => handlePlaylistClick(playlist.id)}
              >
                <div className={styles.thumbnail}>
                  <span className={styles.thumbnailIcon}>{playlist.thumbnail}</span>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.playlistTitle}>{playlist.title}</h3>
                  <p className={styles.authorName}>by {playlist.author}</p>
                  <div className={styles.playlistMeta}>
                    <span className={styles.metaItem}>
                      📝 {playlist.resourcesCount || 0} resources
                    </span>
                    <span className={styles.metaItem}>
                      👁️ {playlist.views || 0}
                    </span>
                    <span className={styles.metaItem}>
                      ❤️ {playlist.likes || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Teacher Modal */}
      <TeacherModal
        isOpen={showTeacherModal}
        onClose={() => setShowTeacherModal(false)}
      />
    </div>
  );
};

export default Home;