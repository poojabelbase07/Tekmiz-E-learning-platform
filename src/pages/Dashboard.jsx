// pages/Dashboard.jsx - STUDENT MODE ONLY
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(currentUser?.name || '');
  const [saving, setSaving] = useState(false);

  // TODO: Fetch saved playlists from backend
  const savedPlaylists = [];

  const handleSaveName = async () => {
    if (!newName.trim() || newName === currentUser.name) {
      setIsEditing(false);
      return;
    }

    setSaving(true);
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { name: newName });
      
      setCurrentUser({ ...currentUser, name: newName });
      setIsEditing(false);
      alert('✅ Name updated successfully!');
    } catch (error) {
      console.error('Error updating name:', error);
      alert('❌ Failed to update name');
    } finally {
      setSaving(false);
    }
  };

  if (!currentUser) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      
      {/* Profile Section */}
      <div className={styles.profile}>
        <div className={styles.avatar}>
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
        
        {isEditing ? (
          <div className={styles.editMode}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className={styles.input}
              disabled={saving}
            />
            <div className={styles.editButtons}>
              <button onClick={handleSaveName} className={styles.save} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => setIsEditing(false)} className={styles.cancel} disabled={saving}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.info}>
            <h1 className={styles.name}>{currentUser.name}</h1>
            <button onClick={() => setIsEditing(true)} className={styles.edit}>
              Edit Name
            </button>
            <p className={styles.email}>{currentUser.email}</p>
          </div>
        )}
      </div>

      {/* Saved Playlists */}
      <div className={styles.section}>
        <h2 className={styles.title}>Saved Playlists</h2>
        
        {savedPlaylists.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.icon}>📌</span>
            <p>No saved playlists yet</p>
            <button onClick={() => navigate('/')} className={styles.browse}>
              Browse Playlists
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {savedPlaylists.map(playlist => (
              <div key={playlist._id} className={styles.card} onClick={() => navigate(`/playlist/${playlist._id}`)}>
                <img src={playlist.thumbnail} alt={playlist.title} className={styles.thumb} />
                <h3 className={styles.cardTitle}>{playlist.title}</h3>
                <p className={styles.author}>{playlist.author}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;