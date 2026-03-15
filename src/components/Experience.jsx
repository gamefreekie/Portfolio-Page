import React from 'react';

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <div className="container section-padding">
        <div className="section-header">
          <h2>Experience & Notable Projects</h2>
          <div className="header-line"></div>
        </div>

        <div className="timeline">
          <div className="timeline-item reveal">
            <div className="timeline-dot glow-yellow"></div>
            <div className="timeline-content">
              <h4>VR Human Anatomy Experience - Unreal Engine</h4>
              <p className="timeline-date">Sri Lalithambigai Medical College and Hospital(Dr MGR Eduction and Research Institute) |Sep 2025 - Feb 2026 | Real-time Project</p>
              <p className="timeline-desc">Designed and assembled a modular 3D environment in Unreal Engine, focusing on real-time lighting, spatial composition, and optimized scene performance. Created modular organ assets with clean topology and efficient UV layouts using Autodesk Maya and high-detail sculpting in ZBrush. Applied optimized PBR materials and texture baking workflows in Substance 3D Painter for game-ready asset integration.</p>
            </div>
          </div>

          <div className="timeline-item reveal">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h4>Modular Environment Design - Unreal Engine</h4>
              <p className="timeline-date">Academic Project</p>
              <p className="timeline-desc">Designed and developed modular environment assets using Maya and 3ds Max. Created reusable wall, floor, and prop assets following a grid-based workflow. Textured assets using Substance 3D Painter with optimized PBR materials, and assembled, lit, and optimized the level inside Unreal Engine.</p>
            </div>
          </div>

          <div className="timeline-item reveal">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h4>Costume Design Academic Project</h4>
              <p className="timeline-date">Academic Project</p>
              <p className="timeline-desc">Designed realistic garments using Marvelous Designer and seamlessly integrated the optimized cloth assets into Unreal Engine environments.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
