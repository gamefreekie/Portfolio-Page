import React from 'react';

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-background">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/images/portfoleo.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content left-align">
        <div className="hero-subtitle slide-up">
          <div className="subtitle-line"></div>
          <span>B.SC. GAME ART & DESIGN</span>
        </div>
        <h1 className="hero-title slide-up-delay">
          <span className="filled-text">M HEMANTH</span><br />
          <span className="stroke-text">KUMAR</span>
        </h1>
        <h2 className="hero-role slide-up-delay-2">3D Environment Modeler & Game Artist</h2>
        <div className="hero-cta slide-up-delay-4">
          <a href="#portfolio" className="btn btn-outline">VIEW PORTFOLIO</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
