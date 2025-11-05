

// components/Footer.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TeacherModal from './TeacherModal';
import styles from './Footer.module.css';

const Footer = () => {
  const navigate = useNavigate();
  const { currentUser, isTeacher } = useAuth();
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [isTeacherMode, setIsTeacherMode] = useState(false); // optional, if have toggle logic
  const currentYear = new Date().getFullYear();

   console.log("👀 Footer rendered, showTeacherModal =", showTeacherModal);
  /*
  const handleTeacherClick = () => {
  // If not logged in, show teacher modal (ask to login)
  if (!currentUser) {
    setShowTeacherModal(true);
    return;
  }

  // If logged in and already a teacher
  if (isTeacher()) {
    if (isTeacherMode) {
      navigate('/'); // go to student home
      setIsTeacherMode(false);
    } else {
      navigate('/teacher'); // go to teacher dashboard
      setIsTeacherMode(true);
    }
  } else {
    // Logged in but not yet a teacher
    setShowTeacherModal(true);
  }
};
*/
const handleTeacherClick = () => {
  console.log("✅ Teacher button clicked");
  console.log("CurrentUser:", currentUser);
  console.log("IsTeacher:", isTeacher ? isTeacher() : "no function");

  if (!currentUser) {
    console.log("➡️ Not logged in, showing modal");
    setShowTeacherModal(true);
    return;
  }

  if (isTeacher && isTeacher()) {
    console.log("➡️ Logged in as teacher, navigating...");
    if (isTeacherMode) {
      navigate('/');
      setIsTeacherMode(false);
    } else {
      navigate('/teacher');
      setIsTeacherMode(true);
    }
  } else {
    console.log("➡️ Logged in but not teacher, showing modal");
    setShowTeacherModal(true);
  }
};


  const footerLinks = {
    platform: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Dashboard', path: '/dashboard' }
    ],
    resources: [
      { name: 'Become a Teacher', path: '/teacher' },
      { name: 'Browse Playlists', path: '/' },
      { name: 'Help Center', path: '/contact' },
      { name: 'FAQ', path: '/about' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Cookie Policy', path: '#' },
      { name: 'Accessibility', path: '#' }
    ]
  };

  

  const handleLinkClick = (path) => {
    if (path.startsWith('#')) {
      return;
    }
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Top Section */}
        <div className={styles.footerTop}>
          {/* Brand */}
          <div className={styles.brandSection}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>T</div>
              <span className={styles.logoText}>Tekmiz</span>
            </div>
            <p className={styles.brandDescription}>
              Empowering learners with organized, accessible, and quality technical education.
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className={styles.linksSection}>
            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Platform</h4>
              <ul className={styles.linkList}>
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.path)}
                      className={styles.link}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Resources</h4>
              <ul className={styles.linkList}>
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() =>  {
                         if (link.name === 'Become a Teacher') {
                           handleTeacherClick();
                        } else {
                          handleLinkClick(link.path);
                        }
                        }}
                      className={styles.link}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.linkTitle}>Legal</h4>
              <ul className={styles.linkList}>
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.path)}
                      className={styles.link}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Bottom Section */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} Tekmiz. All rights reserved. Made with ❤️ for learners worldwide.
          </p>
          <p className={styles.tagline}>
            Learn. Teach. Grow.
          </p>
        </div>
      </div>

     {showTeacherModal && (
  <TeacherModal 
    isOpen={showTeacherModal}
    onClose={() => setShowTeacherModal(false)} 
  />
)}
    </footer>
  );
};

export default Footer;