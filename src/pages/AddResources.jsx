// pages/AddResources.jsx - Add Resources to Playlist
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';
import styles from './AddResources.module.css';

const AddResources = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [resourceType, setResourceType] = useState('video');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
    youtubeUrl: '',
    fileName: ''
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 500MB)
      if (file.size > 500 * 1024 * 1024) {
        alert('File size should be less than 500MB');
        return;
      }

      setFormData(prev => ({ 
        ...prev, 
        file: file,
        fileName: file.name
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert('Please login to add resources');
      return;
    }

    // Validation
    if (resourceType === 'youtube') {
      if (!formData.youtubeUrl) {
        alert('Please enter YouTube URL');
        return;
      }
    } else {
      if (!formData.file) {
        alert('Please select a file to upload');
        return;
      }
    }

    setUploading(true);

    try {
      const resourceData = {
        type: resourceType,
        title: formData.title,
        description: formData.description,
        uploadedBy: currentUser.uid
      };

      if (resourceType === 'youtube') {
        resourceData.youtubeUrl = formData.youtubeUrl;
      } else {
        resourceData.file = formData.file;
      }

      console.log('📤 Uploading resource...');
      const response = await api.addResource(playlistId, resourceData);
      console.log('✅ Resource uploaded:', response);

      alert('🎉 Resource added successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        file: null,
        youtubeUrl: '',
        fileName: ''
      });

      // Navigate back to playlist detail
      navigate(`/playlist/${playlistId}`);

    } catch (error) {
      console.error('❌ Error uploading resource:', error);
      alert('Error uploading resource. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const getFileTypeIcon = () => {
    switch (resourceType) {
      case 'video': return '🎥';
      case 'pdf': return '📄';
      case 'youtube': return '▶️';
      case 'document': return '📊';
      default: return '📁';
    }
  };

  return (
    <div className={styles.addResourcesContainer}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => navigate(`/playlist/${playlistId}`)}
        >
          ← Back to Playlist
        </button>
        <h1 className={styles.title}>Add Resource to Playlist</h1>
      </div>

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.form}>
          
          {/* Resource Type Selection */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Resource Type *</label>
            <div className={styles.typeSelector}>
              <button
                type="button"
                className={`${styles.typeButton} ${resourceType === 'video' ? styles.active : ''}`}
                onClick={() => setResourceType('video')}
              >
                🎥 Video
              </button>
              <button
                type="button"
                className={`${styles.typeButton} ${resourceType === 'pdf' ? styles.active : ''}`}
                onClick={() => setResourceType('pdf')}
              >
                📄 PDF
              </button>
              <button
                type="button"
                className={`${styles.typeButton} ${resourceType === 'youtube' ? styles.active : ''}`}
                onClick={() => setResourceType('youtube')}
              >
                ▶️ YouTube
              </button>
              <button
                type="button"
                className={`${styles.typeButton} ${resourceType === 'document' ? styles.active : ''}`}
                onClick={() => setResourceType('document')}
              >
                📊 PPT
              </button>
            </div>
          </div>

          {/* Title */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Introduction to JavaScript Variables"
              className={styles.input}
              required
              disabled={uploading}
            />
          </div>

          {/* Description */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Description (Optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description of this resource..."
              rows="4"
              className={styles.textarea}
              disabled={uploading}
            />
          </div>

          {/* File Upload or YouTube URL */}
          {resourceType === 'youtube' ? (
            <div className={styles.formGroup}>
              <label className={styles.label}>YouTube URL *</label>
              <input
                type="url"
                name="youtubeUrl"
                value={formData.youtubeUrl}
                onChange={handleInputChange}
                placeholder="https://www.youtube.com/watch?v=..."
                className={styles.input}
                required
                disabled={uploading}
              />
              <p className={styles.hint}>
                Paste the full YouTube video URL
              </p>
            </div>
          ) : (
            <div className={styles.formGroup}>
              <label className={styles.label}>
                {getFileTypeIcon()} Upload File *
              </label>
              <input
                type="file"
                accept={
                  resourceType === 'video' ? 'video/*' :
                  resourceType === 'pdf' ? 'application/pdf' :
                  resourceType === 'document' ? '.ppt,.pptx' :
                  '*'
                }
                onChange={handleFileChange}
                className={styles.fileInput}
                required
                disabled={uploading}
              />
              {formData.fileName && (
                <div className={styles.filePreview}>
                  <span className={styles.fileIcon}>{getFileTypeIcon()}</span>
                  <span className={styles.fileName}>{formData.fileName}</span>
                </div>
              )}
              <p className={styles.hint}>
                Max file size: 500MB
              </p>
            </div>
          )}

          {/* Upload Progress */}
          {uploading && (
            <div className={styles.uploadProgress}>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className={styles.progressText}>
                Uploading... Please wait
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => navigate(`/playlist/${playlistId}`)}
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Add Resource'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResources;