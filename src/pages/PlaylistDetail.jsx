// pages/PlaylistDetail.jsx - COMPLETE WITH RESOURCES
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlaylistsContext } from '../context/PlaylistContext';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';
import styles from './PlaylistDetail.module.css';

const PlaylistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPlaylistById } = usePlaylistsContext();
  const { currentUser } = useAuth();

  const playlist = getPlaylistById(id);
  const [resources, setResources] = useState([]);
  const [currentResource, setCurrentResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  // Fetch resources when component mounts
  useEffect(() => {
    if (id) {
      fetchResources();
    }
  }, [id]);

  const fetchResources = async () => {
    try {
      console.log('📚 Fetching resources for playlist:', id);
      const response = await api.getPlaylistResources(id);
      setResources(response.resources);
      console.log('✅ Resources loaded:', response.resources.length);
      
      // Set first video as current if exists
      if (response.resources.length > 0) {
        const firstVideo = response.resources.find(r => r.type === 'video' || r.type === 'youtube');
        if (firstVideo) {
          setCurrentResource(firstVideo);
        }
      }
    } catch (error) {
      console.error('❌ Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResourceClick = (resource) => {
    if (resource.type === 'video' || resource.type === 'youtube') {
      setCurrentResource(resource);
    } else if (resource.type === 'pdf' || resource.type === 'document') {
      // Open PDF/PPT in new tab
      window.open(resource.fileUrl, '_blank');
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    // TODO: Update like count via API
  };

  const handleComment = () => {
    alert('Comment feature coming soon!');
  };

  const handleAddResources = () => {
    navigate(`/teacher/playlist/${id}/add-resources`);
  };

  const getYouTubeEmbedUrl = (url) => {
    // Convert YouTube URL to embed URL
    const videoId = url.split('v=')[1] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
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

  const getAuthorAvatar = () => {
    if (playlist.author) {
      return playlist.author.charAt(0).toUpperCase();
    }
    return '?';
  };

  const isOwner = currentUser && currentUser.uid === playlist.authorId;

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
        {/* Left Side - Video Player / Thumbnail */}
        <div className={styles.videoSection}>
          {currentResource && (currentResource.type === 'video' || currentResource.type === 'youtube') ? (
            <div className={styles.videoPlayer}>
              {currentResource.type === 'youtube' ? (
                <iframe
                  src={getYouTubeEmbedUrl(currentResource.fileUrl)}
                  title={currentResource.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={styles.iframe}
                ></iframe>
              ) : (
                <video 
                  controls 
                  className={styles.videoElement}
                  key={currentResource.fileUrl}
                >
                  <source src={currentResource.fileUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ) : (
            // Show thumbnail when no video selected
            <div className={styles.noVideo}>
              {playlist.thumbnail ? (
                <img 
                  src={playlist.thumbnail} 
                  alt={playlist.title}
                  className={styles.thumbnailImage}
                />
              ) : (
                <span className={styles.noVideoIcon}>📚</span>
              )}
              <h2>{playlist.title}</h2>
              <p>
                {resources.length === 0 
                  ? 'No resources have been added to this playlist yet.' 
                  : 'Select a video from the resource list to start watching'}
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

          {/* Add Resources Button (Only for owner) */}
          {isOwner && (
            <button 
              className={styles.addResourceBtn}
              onClick={handleAddResources}
            >
              + Add Resources
            </button>
          )}

          <div className={styles.resourcesList}>
            {loading ? (
              <div className={styles.loadingResources}>
                <p>Loading resources...</p>
              </div>
            ) : resources.length === 0 ? (
              <div className={styles.emptyResources}>
                <p className={styles.emptyIcon}>📭</p>
                <p className={styles.emptyText}>
                  No resources added yet
                </p>
              </div>
            ) : (
              resources.map((resource, index) => (
                <div
                  key={resource._id}
                  className={`${styles.resourceItem} ${
                    currentResource?._id === resource._id ? styles.activeResource : ''
                  }`}
                  onClick={() => handleResourceClick(resource)}
                >
                  <div className={styles.resourceNumber}>{index + 1}</div>
                  <div className={styles.resourceContent}>
                    <div className={styles.resourceHeader}>
                      <h4 className={styles.resourceTitle}>{resource.title}</h4>
                      <span className={styles.resourceType}>
                        {resource.type === 'video' ? '🎥' : 
                         resource.type === 'youtube' ? '▶️' :
                         resource.type === 'pdf' ? '📄' : '📊'}
                      </span>
                    </div>
                    <p className={styles.resourceMeta}>
                      {resource.type === 'video' || resource.type === 'youtube'
                        ? `⏱️ ${resource.duration || 'Video'}` 
                        : resource.type === 'pdf' 
                        ? '📄 PDF Document'
                        : '📊 Presentation'
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