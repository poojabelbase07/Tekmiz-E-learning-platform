
/*
import React from "react";
import "./Home.css";

function Home() {

    return(
        <div className="home">   
        <h1> Welcome to Tekmiz</h1>
        </div>
    );
}

export default Home;

*/

// pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlaylistsContext } from '../context/PlaylistContext';
import TeacherModal from '../components/TeacherModal';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const { playlists } = usePlaylistsContext();
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
    navigate(`/playlist/${id}`);
  };

 /* writing this lead me directly to teacher section and not to register section
 const handleBecomeTeacher = () => {
    navigate('/teacher');
  };
  */

  const handleBecomeTeacher = () => {
  setShowTeacherModal(true);
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
            <h3 className={styles.teacherTitle}>Become Teacher</h3>
            <p className={styles.teacherDescription}>
              Share your knowledge and inspire learners worldwide.
            </p>
            <button className={styles.teacherButton} onClick={handleBecomeTeacher}>
              Get Started
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
       {/* ✅ Include Modal */}
      <TeacherModal
        isOpen={showTeacherModal}
        onClose={() => setShowTeacherModal(false)}
      />
      
    </div>
  );
};

export default Home;