import React from 'react';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container section-padding">
        <div className="section-header">
          <h2>About Me</h2>
          <div className="header-line"></div>
        </div>

        <div className="about-grid">
          <div className="about-image-container reveal">
            <div className="profile-frame">
              <img src="/images/profile.jpeg" alt="M Hemanth Kumar Profile" className="profile-pic" id="profile-img" />
              <div className="frame-glow"></div>
            </div>
          </div>

          <div className="about-content reveal">
            <p className="bio-text">
                Creative and detail-oriented Game Designer and Environment Artist with hands-on experience in Unreal Engine, Autodesk Maya, Substance 3D Painter, and Marvelous Designer. Skilled in hard-surface modeling, enviroment creation, level design, gameplay implementation using Basic Blueprints, PBR texturing, and real-time asset optimization. Strong understanding of player experience, environment storytelling, and modular asset pipelines for game production.
            </p>

            <div className="timeline">
              <h3 className="timeline-title">Education</h3>
              <div className="timeline-item">
                <div className="timeline-dot glow-blue"></div>
                <div className="timeline-content">
                  <h4>Bachelor of Science in Game Art & Design</h4>
                  <p className="timeline-date">Graduating 2026 | Dr. MGR Education and Research Institute, Chennai</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Higher Secondary School (12th)</h4>
                  <p className="timeline-date">May 2021 | W.P.A Soundarapandian Hr. Sec. School, Chennai</p>
                  <p className="timeline-desc">Score: 69.83%</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Secondary School (10th)</h4>
                  <p className="timeline-date">Mar 2019 | Sir M.CT.M Boys Hr. Sec. School, Chennai</p>
                  <p className="timeline-desc">Score: 51.40%</p>
                </div>
              </div>
            </div>

            <div className="languages-section mt-4">
              <h3 className="timeline-title" style={{ marginTop: '30px' }}>Languages</h3>
              <p className="bio-text">Fluent in Tamil and English.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
