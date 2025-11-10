// pages/About.jsx - Clean & Premium Design
import React from 'react';
import styles from './About.module.css';

const About = () => {
  const features = [
    {
      icon: '📚',
      title: 'Curated Content',
      description: 'Hand-picked playlists with videos, notes, and resources in one place.'
    },
    {
      icon: '🎯',
      title: 'Organized Learning',
      description: 'Everything you need organized in structured playlists.'
    },
    {
      icon: '👥',
      title: 'Student to Teacher',
      description: 'Share your knowledge and create playlists for learners worldwide.'
    }
  ];

  return (
    <div className={styles.aboutContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          Learning made <span className={styles.highlight}>simple</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Access comprehensive playlists with videos, notes, and resources—all organized 
          in one place for your exam prep, interview preparation, and skill development.
        </p>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <h2 className={styles.sectionTitle}>Our Mission</h2>
        <p className={styles.missionText}>
          At Tekmiz, we believe learning should be organized, accessible, and collaborative. 
          We're solving the problem of scattered resources that students face every day.
        </p>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Choose Tekmiz</h2>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Ready to Start Learning?</h2>
          <p className={styles.ctaText}>
            Join Tekmiz and access quality education resources
          </p>
          <button className={styles.ctaButton}>Get Started Free</button>
        </div>
      </section>
    </div>
  );
};

export default About;