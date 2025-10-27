// components/TeacherModal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TeacherModal.module.css';

const TeacherModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState('check'); // 'check' or 'upgrade'
  const [teacherData, setTeacherData] = useState({
    interests: [],
    bio: ''
  });

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const interests = [
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

  const handleInterestToggle = (interest) => {
    setTeacherData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleUpgrade = () => {
    // Add teacher role to existing user
    const currentRole = localStorage.getItem('userRole') || 'student';
    const roles = currentRole.includes('teacher') ? currentRole : `${currentRole},teacher`;
    
    localStorage.setItem('userRole', roles);
    localStorage.setItem('teacherInterests', JSON.stringify(teacherData.interests));
    localStorage.setItem('teacherBio', teacherData.bio);

    // Success!
    alert('🎉 Welcome to Teacher Mode!');
    onClose();
    navigate('/teacher');
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        {/* Auth Check Step */}
        {!isLoggedIn ? (
          <>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>🎓 Become a Teacher</h2>
              <button className={styles.closeButton} onClick={onClose}>✕</button>
            </div>

            <div className={styles.modalBody}>
              <p className={styles.authMessage}>
                To become a teacher on Tekmiz, you need to have an account first.
              </p>

              <div className={styles.authOptions}>
                <button 
                  className={styles.primaryButton}
                  onClick={() => {
                    onClose();
                    navigate('/login');
                  }}
                >
                  I have an account - Login
                </button>

                <button 
                  className={styles.secondaryButton}
                  onClick={() => {
                    onClose();
                    navigate('/register');
                  }}
                >
                  I'm new here - Register
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Teacher Upgrade Step */
          <>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>🎓 Upgrade to Teacher</h2>
              <button className={styles.closeButton} onClick={onClose}>✕</button>
            </div>

            <div className={styles.modalBody}>
              <p className={styles.upgradeMessage}>
                Share your knowledge with learners worldwide!
              </p>

              <div className={styles.formSection}>
                <label className={styles.label}>What will you teach? (Select topics)</label>
                <div className={styles.interestsGrid}>
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      className={`${styles.interestChip} ${
                        teacherData.interests.includes(interest) ? styles.selected : ''
                      }`}
                      onClick={() => handleInterestToggle(interest)}
                    >
                      {teacherData.interests.includes(interest) ? '✓ ' : ''}
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formSection}>
                <label className={styles.label}>Tell us about yourself (Optional)</label>
                <textarea
                  value={teacherData.bio}
                  onChange={(e) => setTeacherData({ ...teacherData, bio: e.target.value })}
                  placeholder="I'm passionate about teaching..."
                  className={styles.textarea}
                  rows="4"
                />
              </div>

              <button 
                className={styles.activateButton}
                onClick={handleUpgrade}
                disabled={teacherData.interests.length === 0}
              >
                Activate Teacher Mode
              </button>

              {teacherData.interests.length === 0 && (
                <p className={styles.helpText}>Please select at least one topic to continue</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherModal;