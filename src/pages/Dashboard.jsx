// pages/Dashboard.jsx - COMPLETE WORKING VERSION
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Helper Functions
  const getFirstName = (fullName) => {
    if (!fullName) return 'User';
    return fullName.split(' ')[0];
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getUserAvatar = () => {
    if (!currentUser?.name) return '👤';
    return currentUser.name.charAt(0).toUpperCase();
  };

  // Mock stats - Replace with actual data later
  const stats = {
    likedPlaylists: 12,
    comments: 45,
    savedPlaylists: 8,
    progress: 67
  };

  // Mock liked playlists
  const likedPlaylists = [
    { 
      id: 1, 
      title: 'React Hooks Deep Dive', 
      author: 'Akshay Saini', 
      thumbnail: '⚛️', 
      progress: 60 
    },
    { 
      id: 2, 
      title: 'JavaScript Advanced Concepts', 
      author: 'Hitesh Choudhary', 
      thumbnail: '📚', 
      progress: 85 
    },
    { 
      id: 3, 
      title: 'CSS Animations Masterclass', 
      author: 'Kevin Powell', 
      thumbnail: '🎨', 
      progress: 35 
    }
  ];

  // Mock recent comments
  const recentComments = [
    { 
      id: 1, 
      playlist: 'React Hooks Deep Dive', 
      comment: 'Great explanation of useEffect and custom hooks!', 
      date: '2 days ago' 
    },
    { 
      id: 2, 
      playlist: 'JavaScript Advanced Concepts', 
      comment: 'Very helpful tutorial on closures and prototypes', 
      date: '5 days ago' 
    },
    { 
      id: 3, 
      playlist: 'CSS Animations Masterclass', 
      comment: 'The keyframes section was mind-blowing 🤯', 
      date: '1 week ago' 
    }
  ];

  const handleSwitchToTeacher = () => {
    navigate('/teacher');
  };

  const handleViewPlaylist = (id) => {
    navigate(`/playlist/${id}`);
  };

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  // Loading state
  if (!currentUser) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h2>Loading your dashboard...</h2>
        <p>Please wait...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.pageTitle}>
        Welcome back, {getFirstName(currentUser.name)}! 👋
      </h1>

      {/* User Profile Card */}
      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>{getUserAvatar()}</div>
          <div className={styles.userInfo}>
            <h2 className={styles.userName}>{currentUser.name}</h2>
            <p className={styles.userEmail}>{currentUser.email}</p>
            <p className={styles.joinedDate}>
              Member since {formatDate(currentUser.createdAt)}
            </p>
          </div>
        </div>
        <button className={styles.editProfileBtn} onClick={handleEditProfile}>
          Edit Profile
        </button>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>❤️</div>
          <div className={styles.statContent}>
            <h3 className={styles.statLabel}>Liked Playlists</h3>
            <p className={styles.statNumber}>{stats.likedPlaylists}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>💬</div>
          <div className={styles.statContent}>
            <h3 className={styles.statLabel}>Comments</h3>
            <p className={styles.statNumber}>{stats.comments}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📌</div>
          <div className={styles.statContent}>
            <h3 className={styles.statLabel}>Saved Playlists</h3>
            <p className={styles.statNumber}>{stats.savedPlaylists}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statContent}>
            <h3 className={styles.statLabel}>Overall Progress</h3>
            <p className={styles.statNumber}>{stats.progress}%</p>
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Continue Learning</h2>
        <div className={styles.playlistList}>
          {likedPlaylists.map((playlist) => (
            <div 
              key={playlist.id} 
              className={styles.playlistItem}
              onClick={() => handleViewPlaylist(playlist.id)}
            >
              <div className={styles.playlistThumbnail}>
                <span className={styles.thumbnailIcon}>{playlist.thumbnail}</span>
              </div>
              <div className={styles.playlistInfo}>
                <h4 className={styles.playlistTitle}>{playlist.title}</h4>
                <p className={styles.playlistAuthor}>by {playlist.author}</p>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ width: `${playlist.progress}%` }}
                  ></div>
                </div>
                <p className={styles.progressText}>{playlist.progress}% completed</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Comments Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent Comments</h2>
        <div className={styles.commentsList}>
          {recentComments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <h4 className={styles.commentPlaylist}>{comment.playlist}</h4>
                <span className={styles.commentDate}>{comment.date}</span>
              </div>
              <p className={styles.commentText}>{comment.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Switch to Teacher Mode */}
      <div className={styles.teacherModeSection}>
        <div className={styles.teacherModeCard}>
          <h3 className={styles.teacherModeTitle}>Ready to Share Your Knowledge?</h3>
          <p className={styles.teacherModeText}>
            Switch to teacher mode and start creating playlists to inspire learners worldwide.
          </p>
          <button className={styles.switchButton} onClick={handleSwitchToTeacher}>
            🎓 Switch to Teacher Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;