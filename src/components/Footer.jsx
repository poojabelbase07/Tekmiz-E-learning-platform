/*
// Footer section
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 Tekmiz. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
*/

// components/Footer.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

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

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', url: 'https://twitter.com' },
    { name: 'GitHub', icon: '💻', url: 'https://github.com' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
    { name: 'Discord', icon: '💬', url: 'https://discord.com' }
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
    </footer>
  );
};

export default Footer;