// pages/PlaylistDetail.jsx - DYNAMIC (NO DUMMY DATA)
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlaylistsContext } from '../context/PlaylistContext';
import { useAuth } from '../context/AuthContext';
import styles from './PlaylistDetail.module.css';

const PlaylistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPlaylistById } = usePlaylistsContext();
  const { currentUser } = useAuth();

  const playlist = getPlaylistById(id);
  const [currentResource, setCurrentResource] = useState(null);
  const [liked, setLiked] = useState(false);

  // TODO: Later fetch resources from Firestore
  // For now, playlist has no resources until teacher adds them
  const resources = []; // Empty initially

  useEffect(() => {
    if (resources.length > 0) {
      setCurrentResource(resources[0]);
    }
  }, [resources]);

  const handleResourceClick = (resource) => {
    if (resource.type === 'video' || resource.type === 'youtube') {
      setCurrentResource(resource);
    } else if (resource.type === 'pdf' || resource.type === 'document') {
      window.open(resource.url, '_blank');
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    // TODO: Update like count in Firestore
  };

  const handleComment = () => {
    alert('Comment feature coming soon!');
    // TODO: Implement comment functionality
  };

  // If playlist not found
  if (!playlist) {
    return (
      <div className={styles.playlistDetailContainer}>
        <div className={styles.notFound}>
          <h1>404</h1>
          <p>Playlist not found</p>
          <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
      </div>
    );
  }

  // Get first letter for avatar
  const getAuthorAvatar = () => {
    if (playlist.author) {
      return playlist.author.charAt(0).toUpperCase();
    }
    return '?';
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
              <span className={styles.authorAvatar}>{getAuthorAvatar()}</span>
              <span className={styles.authorName}>{playlist.author}</span>
            </div>
            <div className={styles.stats}>
              <span>👁️ {playlist.views || 0} views</span>
              <span>❤️ {playlist.likes || 0} likes</span>
              <span>📚 {playlist.resourcesCount || 0} resources</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        {/* Left Side - Video Player */}
        <div className={styles.videoSection}>
          {currentResource && currentResource.type === 'video' ? (
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
              <span className={styles.noVideoIcon}>{playlist.thumbnail}</span>
              <h2>{playlist.title}</h2>
              <p>
                {resources.length === 0 
                  ? 'No resources have been added to this playlist yet.' 
                  : 'Select a video from the resource list'}
              </p>
            </div>
          )}

          {/* Video Info */}
          {currentResource && (
            <div className={styles.videoInfo}>
              <h2 className={styles.videoTitle}>{currentResource.title}</h2>
              <p className={styles.videoDescription}>
                {currentResource.description || 'No description available'}
              </p>
              
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
          )}

          {/* About Section */}
          <div className={styles.aboutSection}>
            <h3 className={styles.aboutTitle}>About this playlist</h3>
            <p className={styles.aboutDescription}>
              {playlist.description || 'No description provided for this playlist.'}
            </p>
            <div className={styles.aboutTags}>
              <span className={styles.tag}>{playlist.category}</span>
            </div>
          </div>
        </div>

        {/* Right Side - Resources List */}
        <div className={styles.resourcesSection}>
          <div className={styles.resourcesHeader}>
            <h3 className={styles.resourcesTitle}>Course Content</h3>
            <p className={styles.resourcesCount}>
              {resources.length} resource{resources.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className={styles.resourcesList}>
            {resources.length === 0 ? (
              <div className={styles.emptyResources}>
                <p className={styles.emptyIcon}>📭</p>
                <p className={styles.emptyText}>
                  No resources added yet
                </p>
                {currentUser && currentUser.uid === playlist.authorId && (
                  <button 
                    className={styles.addResourceBtn}
                    onClick={() => navigate(`/teacher/playlist/${id}/add-resources`)}
                  >
                    + Add Resources
                  </button>
                )}
              </div>
            ) : (
              resources.map((resource, index) => (
                <div
                  key={resource.id}
                  className={`${styles.resourceItem} ${
                    currentResource?.id === resource.id ? styles.activeResource : ''
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
                        ? `⏱️ ${resource.duration || 'N/A'}` 
                        : `📦 ${resource.size || 'N/A'}`
                      }
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;