

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

   // Social Links with SVG Icons
  const socialLinks = [
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com',
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ];

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