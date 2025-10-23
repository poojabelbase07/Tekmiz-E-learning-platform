// pages/PlaylistDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlaylistsContext } from '../context/PlaylistContext';
import styles from './PlaylistDetail.module.css';

const PlaylistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPlaylistById } = usePlaylistsContext();

  // Get playlist from context
  const playlist = getPlaylistById(id) || {
    id: id,
    title: 'Playlist Not Found',
    author: 'Unknown',
    authorAvatar: '❓',
    description: 'This playlist does not exist.',
    category: 'Unknown',
    thumbnail: '❓',
    totalResources: 0,
    likes: 0,
    views: 0
  };

  // Mock resources - Later replace with API call
  const resources = [
    {
      id: 1,
      title: 'Introduction to JavaScript',
      type: 'video',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Demo YouTube embed
      duration: '12:30',
      description: 'Learn the basics of JavaScript and setup your development environment'
    },
    {
      id: 2,
      title: 'Variables and Data Types',
      type: 'video',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '18:45',
      description: 'Understanding var, let, const and different data types in JavaScript'
    },
    {
      id: 3,
      title: 'JavaScript Cheat Sheet',
      type: 'pdf',
      url: '/path/to/cheatsheet.pdf',
      size: '2.5 MB',
      description: 'Quick reference guide for JavaScript syntax and methods'
    },
    {
      id: 4,
      title: 'Functions and Arrow Functions',
      type: 'video',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '25:20',
      description: 'Deep dive into functions, arrow functions, and closures'
    },
    {
      id: 5,
      title: 'ES6 Features Notes',
      type: 'pdf',
      url: '/path/to/es6-notes.pdf',
      size: '1.8 MB',
      description: 'Comprehensive notes on modern JavaScript ES6+ features'
    },
    {
      id: 6,
      title: 'Async JavaScript - Promises & Async/Await',
      type: 'video',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '32:15',
      description: 'Master asynchronous programming in JavaScript'
    }
  ];

  const [currentResource, setCurrentResource] = useState(resources[0]);
  const [liked, setLiked] = useState(false);

  const handleResourceClick = (resource) => {
    if (resource.type === 'video') {
      setCurrentResource(resource);
    } else if (resource.type === 'pdf') {
      // Open PDF in new tab
      window.open(resource.url, '_blank');
    }
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = () => {
    // TODO: Implement comment functionality
    alert('Comment feature coming soon!');
  };

  return (
    <div className={styles.playlistDetailContainer}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        <div className={styles.headerInfo}>
          <h1 className={styles.playlistTitle}>{playlist.title}</h1>
          <div className={styles.playlistMeta}>
            <div className={styles.authorInfo}>
              <span className={styles.authorAvatar}>{playlist.authorAvatar}</span>
              <span className={styles.authorName}>{playlist.author}</span>
            </div>
            <div className={styles.stats}>
              <span>👁️ {playlist.views} views</span>
              <span>❤️ {playlist.likes} likes</span>
              <span>📚 {playlist.totalResources} resources</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        {/* Left Side - Video Player */}
        <div className={styles.videoSection}>
          {currentResource.type === 'video' ? (
            <div className={styles.videoPlayer}>
              <iframe
                src={currentResource.url}
                title={currentResource.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.iframe}
              ></iframe>
            </div>
          ) : (
            <div className={styles.noVideo}>
              <span className={styles.noVideoIcon}>📄</span>
              <p>Select a video from the resource list</p>
            </div>
          )}

          {/* Video Info */}
          <div className={styles.videoInfo}>
            <h2 className={styles.videoTitle}>{currentResource.title}</h2>
            <p className={styles.videoDescription}>{currentResource.description}</p>
            
            {/* Actions */}
            <div className={styles.videoActions}>
              <button 
                className={`${styles.actionButton} ${liked ? styles.liked : ''}`}
                onClick={handleLike}
              >
                {liked ? '❤️' : '🤍'} Like
              </button>
              <button className={styles.actionButton} onClick={handleComment}>
                💬 Comment
              </button>
            </div>
          </div>

          {/* About Section */}
          <div className={styles.aboutSection}>
            <h3 className={styles.aboutTitle}>About this playlist</h3>
            <p className={styles.aboutDescription}>{playlist.description}</p>
            <div className={styles.aboutTags}>
              <span className={styles.tag}>{playlist.category}</span>
            </div>
          </div>
        </div>

        {/* Right Side - Resources List */}
        <div className={styles.resourcesSection}>
          <div className={styles.resourcesHeader}>
            <h3 className={styles.resourcesTitle}>Course Content</h3>
            <p className={styles.resourcesCount}>{resources.length} resources</p>
          </div>

          <div className={styles.resourcesList}>
            {resources.map((resource, index) => (
              <div
                key={resource.id}
                className={`${styles.resourceItem} ${
                  currentResource.id === resource.id ? styles.activeResource : ''
                }`}
                onClick={() => handleResourceClick(resource)}
              >
                <div className={styles.resourceNumber}>{index + 1}</div>
                <div className={styles.resourceContent}>
                  <div className={styles.resourceHeader}>
                    <h4 className={styles.resourceTitle}>{resource.title}</h4>
                    <span className={styles.resourceType}>
                      {resource.type === 'video' ? '🎥' : '📄'}
                    </span>
                  </div>
                  <p className={styles.resourceMeta}>
                    {resource.type === 'video' 
                      ? `⏱️ ${resource.duration}` 
                      : `📦 ${resource.size}`
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;