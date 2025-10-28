// pages/Home.jsx - WITH AUTH CONTEXT
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlaylistsContext } from '../context/PlaylistContext';
import { useAuth } from '../context/AuthContext';
import TeacherModal from '../components/TeacherModal';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const { playlists } = usePlaylistsContext();
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
      // Not logged in, redirect to login
      navigate('/login');
      return;
    }
    // Logged in, navigate to playlist
    navigate(`/playlist/${id}`);
  };

  const handleBecomeTeacher = () => {
    // Check if user is logged in
    if (!currentUser) {
      // Not logged in, show modal that will redirect to login/register
      setShowTeacherModal(true);
      return;
    }

    // User is logged in
    if (isTeacher()) {
      // Already a teacher, go to teacher dashboard
      navigate('/teacher');
    } else {
      // Not a teacher yet, show upgrade modal
      setShowTeacherModal(true);
    }
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
                <button key={index} className={styles.categoryChip}>
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
                <p className={styles.authorName}>{playlist.author}</p>
                <div className={styles.playlistMeta}>
                  <span className={styles.metaItem}>🎥 {playlist.videosCount} videos</span>
                  <span className={styles.metaItem}>⭐ {playlist.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
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