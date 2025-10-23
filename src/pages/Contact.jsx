// pages/Contact.jsx
import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TODO: Implement actual form submission (Firebase, email service, etc.)
    console.log('Form submitted:', formData);
    
    // Show success message
    setFormStatus('success');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    // Clear success message after 5 seconds
    setTimeout(() => {
      setFormStatus(null);
    }, 5000);
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      content: 'support@tekmiz.com',
      link: 'mailto:support@tekmiz.com'
    },
    {
      icon: '💬',
      title: 'Discord',
      content: 'Join our community',
      link: '#'
    },
    {
      icon: '🐦',
      title: 'Twitter',
      content: '@tekmiz',
      link: '#'
    }
  ];

  const faqs = [
    {
      question: 'How do I create a playlist?',
      answer: 'Switch to teacher mode from your dashboard, then click "Create Playlist" to start adding resources.'
    },
    {
      question: 'Is Tekmiz free to use?',
      answer: 'Yes! Tekmiz is completely free for both students and teachers. We believe education should be accessible to everyone.'
    },
    {
      question: 'Can I download resources offline?',
      answer: 'Currently, resources need to be accessed online. We\'re working on offline access in future updates.'
    },
    {
      question: 'How do I become a teacher?',
      answer: 'Click on "Become a Teacher" in the sidebar or dashboard, complete the registration, and you\'re all set!'
    }
  ];

  return (
    <div className={styles.contactContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Get in Touch</h1>
        <p className={styles.heroSubtitle}>
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </section>

      {/* Contact Info Cards */}
      <section className={styles.contactInfoSection}>
        <div className={styles.contactInfoGrid}>
          {contactInfo.map((info, index) => (
            <a 
              key={index} 
              href={info.link} 
              className={styles.contactInfoCard}
              target={info.link.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
            >
              <div className={styles.contactIcon}>{info.icon}</div>
              <h3 className={styles.contactTitle}>{info.title}</h3>
              <p className={styles.contactContent}>{info.content}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Main Content: Form + FAQ */}
      <section className={styles.mainSection}>
        <div className={styles.contentWrapper}>
          {/* Contact Form */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Send us a Message</h2>
            
            {formStatus === 'success' && (
              <div className={styles.successMessage}>
                <span className={styles.successIcon}>✓</span>
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Your full name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="your.email@example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="What is this regarding?"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className={styles.textarea}
                  placeholder="Tell us more about your question or feedback..."
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className={styles.faqSection}>
            <h2 className={styles.sectionTitle}>Frequently Asked</h2>
            <div className={styles.faqList}>
              {faqs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>{faq.question}</h3>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Help Section */}
      <section className={styles.helpSection}>
        <div className={styles.helpCard}>
          <h2 className={styles.helpTitle}>Need More Help?</h2>
          <p className={styles.helpText}>
            Check out our documentation and guides for detailed information about using Tekmiz.
          </p>
          <button className={styles.helpButton}>Visit Help Center</button>
        </div>
      </section>
    </div>
  );
};

export default Contact;