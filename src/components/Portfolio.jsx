import React from 'react';

const Portfolio = ({ onOpenModal }) => {
  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container section-padding">
        <div className="section-header">
          <h2>Portfolio</h2>
          <div className="header-line"></div>
        </div>

        <div className="portfolio-grid" id="portfolio-grid">
          <div className="portfolio-item reveal" onClick={() => onOpenModal('anatomy')}>
            <img src="/images/VrHospital4.png" alt="VR Human Anatomy" />
            <div className="portfolio-overlay">
              <h3>VR Human Anatomy</h3>
              <p>Unreal Engine / VR Development</p>
              <span className="view-project">View Catalog &rarr;</span>
            </div>
            <div className="emission-border"></div>
          </div>

          <div className="portfolio-item reveal" onClick={() => onOpenModal('modular-env')}>
            <img src="/images/enviroment/Japanese eno4.jpg" alt="Enviroment Design" />
            <div className="portfolio-overlay">
              <h3>Enviroment Design</h3>
              <p>Unreal Engine</p>
              <span className="view-project">View Catalog &rarr;</span>
            </div>
            <div className="emission-border"></div>
          </div>

          <div className="portfolio-item reveal" onClick={() => onOpenModal('costume-design')}>
            <img src="/images/characters/japanese_cloth1.jpg" alt="Costume Design" />
            <div className="portfolio-overlay">
              <h3>Costume Design</h3>
              <p>Marvelous Designer</p>
              <span className="view-project">View Catalog &rarr;</span>
            </div>
            <div className="emission-border"></div>
          </div>

          <div className="portfolio-item reveal" onClick={() => onOpenModal('hard-surface')}>
            <img src="/images/scifi/Scifi- Drone.png" alt="Hard Surface Models" />
            <div className="portfolio-overlay">
              <h3>Hard Surface Models</h3>
              <p>ZBrush / Maya</p>
              <span className="view-project">View Catalog &rarr;</span>
            </div>
            <div className="emission-border"></div>
          </div>

          <div className="portfolio-item reveal" onClick={() => onOpenModal('character-showcase')}>
            <img src="/images/characters/predator color.png?q=80&w=800&auto=format&fit=crop" alt="Character Showcase" />
            <div className="portfolio-overlay">
              <h3>Character Showcase</h3>
              <p>3D Character Modeling</p>
              <span className="view-project">View Catalog &rarr;</span>
            </div>
            <div className="emission-border"></div>
          </div>

          <div className="portfolio-item reveal" onClick={() => onOpenModal('Enviroment Showcase')}>
            <img src="/images/F1 enviroment/drift.0004.png" alt="Enviroment Showcase" />
            <div className="portfolio-overlay">
              <h3>Enviroment Showcase</h3>
              <p>3D Enviroment Modeling</p>
              <span className="view-project">View Catalog &rarr;</span>
            </div>
            <div className="emission-border"></div>
          </div>

          <div className="portfolio-item reveal" onClick={() => onOpenModal('modular-environment')}>
            <img src="/images/space1.png" alt="Modular Environment" />
            <div className="portfolio-overlay">
              <h3>Modular Environment</h3>
              <p>Modular 3D Assets</p>
              <span className="view-project">View Catalog &rarr;</span>
            </div>
            <div className="emission-border"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
