import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container section-padding">
        <div className="status-banner reveal">
          <div className="status-dot"></div>
          <p>I am fully immersed in developing my skills through various projects. Therefore, I am
            unavailable for freelance projects at the moment.</p>
        </div>

        <div className="contact-card reveal">
          <h2>Get In Touch</h2>
          <p>Available for collaborative studio opportunities and networking.</p>

          <div className="contact-links">
            <a href="mailto:mhemanthkumar191020@gmail.com" className="contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>mhemanthkumar191020@gmail.com</span>
            </a>
            <a href="tel:+918122023697" className="contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+91 812 202 3697</span>
            </a>
            <a href="https://www.linkedin.com/in/hemanth-kumar-m-73657526a/" target="_blank"
              rel="noopener noreferrer" className="contact-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path
                  d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
