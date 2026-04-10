import React, { useEffect } from 'react';

const projectData = {
  'anatomy': {
    title: 'VR Human Anatomy Experience',
    desc: 'Unreal Engine real-time project. Modular 3D environment focusing on real-time lighting and optimized scene performance. Modular organ assets with clean topology using Maya/ZBrush, textured in Substance 3D Painter.',
    videos: [
      'https://drive.google.com/file/d/156K970WqPBSidzC6cFI5gvoiEw_Cs-cN/preview?usp=sharing'// <-- Add the embed link here
    ],
    images: [
      '/images/vrHospital.png',// <-- Add the image Path
      '/images/vrHospital2.png',// <-- Add the image Path
      '/images/VrHospital3.png',
      '/images/VrHospital4.png',
      '/images/model1.png',
      '/images/model2.png',
      '/images/model3.png'
    ]
  },
  'modular-env': {
    title: 'Environment Design',
    desc: 'Academic Project.environment assets created in Maya and 3ds Max. Textured with optimized PBR materials in Substance 3D Painter and assembled/lit inside Unreal Engine.',
    videos: [
      'https://drive.google.com/file/d/1QLjNJewEBY28vwUCN3BOnfXmNPO0kbbQ/preview?usp=sharing'// <-- Add the embed link here
    ],
    images: [
      '/images/enviroment/Japanese eno1.jpg',
      '/images/enviroment/Japanese eno2.jpg',
      '/images/enviroment/Japanese eno3.jpg',
      '/images/enviroment/Japanese eno4.jpg',
      '/images/enviroment/convo0538.png',
      '/images/enviroment/convo1060.png',
      '/images/enviroment/convo1429.png'
    ]
  },
  'costume-design': {
    title: 'Costume Design',
    desc: 'Academic Project focusing on realistic garments designed in Marvelous Designer and seamlessly integrated as optimized cloth assets in Unreal Engine.',
    images: [
      '/images/characters/japanese_cloth1.jpg',
      '/images/characters/japanese_cloth2.jpg',
      '/images/characters/japanese_cloth Wire.jpg',
      '/images/characters/armor.jpg',
      '/images/characters/armor long.jpg',
      '/images/characters/armor wire.jpg'
    ]
  },
  'hard-surface': {
    title: 'Hard Surface Models',
    desc: 'A collection of complex hard surface models created using ZBrush and Maya, emphasizing detailed topology and mechanical precision.',
    categories: [
      {
        name: 'Sci-Fi Drone',
        videos: [
          'https://drive.google.com/file/d/1EQnUb3_6hzG0AuIvfp384a_D_V99En3y/preview?usp=drive_link'// <-- Add the embed link here
        ],
        images: [
          '/images/scifi/Scifi- Drone.png',
          'public/images/HardSurfaces/HighresScreenshot00000.png',
          'public/images/HardSurfaces/HighresScreenshot00001.png',
          'public/images/HardSurfaces/HighresScreenshot00002.png',
          'public/images/HardSurfaces/HighresScreenshot00003.png',
          'public/images/HardSurfaces/HighresScreenshot00004.png',
          '/images/scifi/drone close.jpeg',
          '/images/scifi/sci-fi drone wire close.jpg',
          '/images/scifi/Scifi- DroneWire.jpg'
        ]
      },
      {
        name: 'Straw Hat',
        images: [
          '/images/HardSurfaces/strawHat.jpg',
          '/images/HardSurfaces/strawHatColor.jpg',
          '/images/HardSurfaces/strawHatColorClose.jpg',
          '/images/HardSurfaces/strawHatWire.jpg',
          '/images/HardSurfaces/strawHatWireL.jpg'
        ]
      },
      {
        name: 'Skateboard',
        images: [
          '/images/HardSurfaces/sketeboard3.jpg',
          '/images/HardSurfaces/sketeboard4.jpg',
          '/images/HardSurfaces/sketeboardwire.jpg',
          '/images/HardSurfaces/sketeboardwire2.jpg'
        ]
      }
    ]
  },
  'character-showcase': {
    title: 'Character Showcase',
    desc: 'Detailed 3D character models focused on anatomical accuracy, high-poly sculpting, and expressive posing.',
    videos: [
      'https://drive.google.com/file/d/1lxj9uo5aWkQqNrh1AxZIHe0rTN3vbtqw/preview?usp=sharing'// <-- Add the embed link here
    ],
    images: [
      '/images/characters/predator color.png',
      '/images/characters/prewire close.png',
      '/images/characters/predator.png',
      '/images/characters/prewire.png'
    ]
  },
  'Enviroment Showcase': {
    title: 'Enviroment Showcase',
    videos: [
      'https://drive.google.com/file/d/1doIMXI3QQPoBHQZABQ_E24h6G0TBFNND/preview?usp=sharing'// <-- Add the embed link here
    ],
    desc: 'Academic Project.environment assets created in Maya and 3ds Max. Textured with optimized PBR materials in Substance 3D Painter and assembled/lit inside Unreal Engine.',
    images: [
      '/images/F1 enviroment/drift.0004.png',
      '/images/F1 enviroment/PitTrack.1222.png',
      '/images/F1 enviroment/RaceTrack.0358.png',
      '/images/F1 enviroment/RaceTrack.0645.png',
      '/images/F1 enviroment/RaceTrack.0898.png',
      '/images/F1 enviroment/ShutterOut.0147.png',
      'public/images/F1 enviroment/Screenshot (631).png',
      'public/images/F1 enviroment/Screenshot (632).png'
    ]
  },
  'modular-environment': {
    title: 'Modular Environment',
    desc: 'A showcase of modular environment pieces designed for seamless grid-snapping and optimized rendering in game engines.',
    images: [
      '/images/space1.png',
      '/images/space2.png',
      '/images/space3.png',
      '/images/space4.png',
      '/images/space5.png',
      '/images/space6.png'
    ]
  }
};

const ProjectModal = ({ projectId, onClose }) => {
  useEffect(() => {
    if (projectId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [projectId, onClose]);

  if (!projectId || !projectData[projectId]) return null;

  const data = projectData[projectId];

  return (
    <div id="project-modal" className="modal active">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>&times;</button>
        <div className="modal-body">
          <div className="modal-header">
            <h2 id="modal-title">{data.title}</h2>
            <p id="modal-desc">{data.desc}</p>
          </div>
          <div id="modal-gallery-container">
            {data.categories ? (
              data.categories.map((cat, catIdx) => (
                <div key={catIdx} className="modal-category" style={{ marginBottom: '40px' }}>
                  <h3 style={{ color: 'var(--accent-cyan)', fontSize: '1.5rem', marginBottom: '20px', fontWeight: '600' }}>{cat.name}</h3>
                  <div className="modal-gallery">
                    {cat.videos && cat.videos.map((vidSrc, idx) => (
                      <div key={`vid-${idx}`} style={{ width: '100%', marginBottom: '20px' }}>
                        <iframe src={vidSrc} width="100%" height="500px" style={{ border: 'none', borderRadius: '8px' }} allow="autoplay; fullscreen" allowFullScreen></iframe>
                      </div>
                    ))}
                    {cat.images && cat.images.map((imgSrc, idx) => (
                      <img key={idx} src={imgSrc} alt={`${cat.name} view ${idx + 1}`} loading="lazy" />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="modal-gallery">
                {data.videos && data.videos.map((vidSrc, idx) => (
                  <div key={`vid-${idx}`} style={{ width: '100%', marginBottom: '20px' }}>
                    <iframe src={vidSrc} width="100%" height="500px" style={{ border: 'none', borderRadius: '8px' }} allow="autoplay; fullscreen" allowFullScreen></iframe>
                  </div>
                ))}
                {data.images && data.images.map((imgSrc, idx) => (
                  <img key={idx} src={imgSrc} alt={`${data.title} view ${idx + 1}`} loading="lazy" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
