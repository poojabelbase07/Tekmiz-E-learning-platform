// pages/About.jsx
import React from 'react';
import styles from './About.module.css';

const About = () => {
  const features = [
    {
      icon: '📚',
      title: 'Curated Content',
      description: 'Access hand-picked playlists with videos, notes, cheat sheets, and resources all in one place.'
    },
    {
      icon: '🎯',
      title: 'Organized Learning',
      description: 'No more juggling between platforms. Everything you need is organized in structured playlists.'
    },
    {
      icon: '👥',
      title: 'Student to Teacher',
      description: 'Anyone can become a teacher. Share your knowledge and create playlists for learners worldwide.'
    },
    {
      icon: '🔍',
      title: 'Easy Discovery',
      description: 'Search for topics, teachers, or specific playlists. Find exactly what you need instantly.'
    },
    {
      icon: '💡',
      title: 'Interview Prep',
      description: 'Get interview-ready with specialized playlists containing practice questions and solutions.'
    },
    {
      icon: '🚀',
      title: 'Better Experience',
      description: 'Clean UI, smooth navigation, and user-friendly controls for an enhanced learning journey.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Learners' },
    { number: '500+', label: 'Playlists' },
    { number: '100+', label: 'Teachers' },
    { number: '50+', label: 'Topics' }
  ];

  return (
    <div className={styles.aboutContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Welcome to <span className={styles.brandName}>Tekmiz</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Your ultimate e-learning platform for technical education
          </p>
          <p className={styles.heroDescription}>
            Tekmiz brings together students and educators in a seamless learning experience. 
            Access comprehensive playlists with videos, notes, and resources—all organized 
            in one place for your exam prep, interview preparation, and skill development.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statBox}>
              <h3 className={styles.statNumber}>{stat.number}</h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <h2 className={styles.sectionTitle}>Our Mission</h2>
        <div className={styles.missionContent}>
          <div className={styles.missionText}>
            <p>
              At Tekmiz, we believe learning should be <strong>organized, accessible, and collaborative</strong>. 
              We're solving the problem of scattered resources and platform hopping that students face every day.
            </p>
            <p>
              Our platform empowers learners to find everything they need in structured playlists—from 
              video tutorials and PDF notes to interview cheat sheets and practice problems. No more 
              endless searching across multiple platforms.
            </p>
            <p>
              But we're more than just a content library. Tekmiz is a <strong>community-driven platform</strong> where 
              students can become teachers, sharing their knowledge and helping others learn.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Choose Tekmiz?</h2>
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

      {/* How It Works Section */}
      <section className={styles.howItWorksSection}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.stepsContainer}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3 className={styles.stepTitle}>Sign Up</h3>
            <p className={styles.stepDescription}>
              Create your free account and join the Tekmiz community
            </p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3 className={styles.stepTitle}>Explore & Learn</h3>
            <p className={styles.stepDescription}>
              Browse playlists, save your favorites, and start learning
            </p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3 className={styles.stepTitle}>Become a Teacher</h3>
            <p className={styles.stepDescription}>
              Switch to teacher mode and create your own playlists
            </p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <h3 className={styles.stepTitle}>Share & Inspire</h3>
            <p className={styles.stepDescription}>
              Help others learn with your curated content and expertise
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Ready to Start Learning?</h2>
          <p className={styles.ctaText}>
            Join thousands of students and teachers on Tekmiz today
          </p>
          <button className={styles.ctaButton}>Get Started Free</button>
        </div>
      </section>
    </div>
  );
};

export default About;