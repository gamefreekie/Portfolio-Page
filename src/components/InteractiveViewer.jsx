import React, { useState, useRef, useEffect } from 'react';
import '@google/model-viewer';

const InteractiveViewer = () => {
  const [exposure, setExposure] = useState(1.0);
  const [shadowIntensity, setShadowIntensity] = useState(1.5);
  const [environmentImage, setEnvironmentImage] = useState('legacy');
  const [isWireframe, setIsWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  
  const viewerRef = useRef(null);

  const handleEnvChange = (e) => {
    const val = e.target.value;
    if (val === 'legacy' || val === 'neutral') {
      setEnvironmentImage(val);
    } else {
      setEnvironmentImage('https://modelviewer.dev/shared-assets/environments/' + val);
    }
  };

  const printCode = () => {
    const config = `<model-viewer src="/3d_Model/Drone.glb" exposure="${exposure}" shadow-intensity="${shadowIntensity}" environment-image="${environmentImage}" auto-rotate="${autoRotate}"></model-viewer>`;
    console.log("Current Settings:", config);
    alert("Settings printed to Developer Console (F12)!");
  };

  // Toggle wireframe mode by accessing the underlying Three.js model scene graph
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    
    // We must wait for the model to load before applying material changes
    const applyWireframe = () => {
      const model = viewer.model;
      
      if (model && model.materials) {
        const symbol = Object.getOwnPropertySymbols(viewer).find(s => s.description === 'scene');
        if (symbol && viewer[symbol]) {
             viewer[symbol].traverse((node) => {
                 if (node.isMesh && node.material) {
                     if (Array.isArray(node.material)) {
                         node.material.forEach(m => {
                             m.wireframe = isWireframe;
                             m.needsUpdate = true;
                         });
                     } else {
                         node.material.wireframe = isWireframe;
                         node.material.needsUpdate = true;
                     }
                 }
             });
             
             // Model-Viewer uses LitElement which aborts updates if values are identical.
             // We force a re-render by doing an imperceptible camera rotation delta.
             if (typeof viewer.getCameraOrbit === 'function') {
                 const orbit = viewer.getCameraOrbit();
                 // Add a micro-radian to bypass `old === new` checks
                 orbit.theta += 0.00001;
                 viewer.cameraOrbit = `${orbit.theta}rad ${orbit.phi}rad ${orbit.radius}m`;
                 viewer.jumpCameraToGoal(); // snap instantly so there's no visible slide
             } else {
                 // Fallback if the version differs
                 viewer.cameraOrbit = `auto auto 105%`;
             }
             
             if (typeof viewer.requestUpdate === 'function') {
                 viewer.requestUpdate();
             }
        }
      }
    };

    if (viewer.isLoaded) {
       applyWireframe();
    } else {
       viewer.addEventListener('load', applyWireframe);
       return () => viewer.removeEventListener('load', applyWireframe);
    }
  }, [isWireframe]);

  return (
    <section id="interactive-viewer" className="viewer-section section-padding">
      <div className="container collapse-padding">
        <div className="section-header">
          <h2>Interactive 3D Viewer</h2>
          <div className="header-line"></div>
        </div>

        <div className="viewer-container reveal" style={{ position: 'relative' }}>
          <model-viewer 
            ref={viewerRef}
            id="main-viewer" 
            src="/3d_Model/Drone.glb" 
            alt="3D Drone Model" 
            auto-rotate={autoRotate ? "true" : undefined}
            camera-controls="true" 
            shadow-intensity={shadowIntensity} 
            environment-image={environmentImage} 
            exposure={exposure}
            interaction-prompt="hover" 
            class="model-preview"
            style={{ width: '100%', height: '600px', background: 'radial-gradient(circle at center, #2a2a2f 0%, #111111 100%)', borderRadius: '20px', border: '1px solid rgba(0, 238, 255, 0.2)', boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,0,0,0.5)' }}>

            <div id="controls" className="viewer-controls"
                style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 100, background: 'rgba(0,0,0,0.8)', border: '1px solid var(--accent-cyan)', padding: '15px', borderRadius: '12px', color: 'white', minWidth: '220px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: 'var(--accent-cyan)' }}>Editor Controls</h4>
              
              {/* Toggles */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' }}>
                <label style={{ fontSize: '0.85rem' }}>Wireframe Mode</label>
                <input type="checkbox" checked={isWireframe} onChange={(e) => setIsWireframe(e.target.checked)} style={{ cursor: 'pointer' }} />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center' }}>
                <label style={{ fontSize: '0.85rem' }}>Auto-Rotate</label>
                <input type="checkbox" checked={autoRotate} onChange={(e) => setAutoRotate(e.target.checked)} style={{ cursor: 'pointer' }} />
              </div>

              <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', margin: '10px 0' }}></div>

              {/* Sliders */}
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '5px' }}>Exposure: <span>{exposure}</span></label>
              <input type="range" min="0" max="2" step="0.1" value={exposure} onChange={(e) => setExposure(e.target.value)} style={{ width: '100%', marginBottom: '15px', cursor: 'pointer' }} />

              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '5px' }}>Shadow Intensity: <span>{shadowIntensity}</span></label>
              <input type="range" min="0" max="2" step="0.1" value={shadowIntensity} onChange={(e) => setShadowIntensity(e.target.value)} style={{ width: '100%', marginBottom: '15px', cursor: 'pointer'  }} />

              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '5px' }}>Environment</label>
              <select onChange={handleEnvChange} style={{ width: '100%', background: '#222', color: 'white', border: '1px solid var(--border-color)', padding: '5px', borderRadius: '4px', cursor: 'pointer'  }}>
                  <option value="legacy">Default (Studio)</option>
                  <option value="neutral">Neutral</option>
                  <option value="whipple_creek_regional_park_04_1k.hdr">Forest</option>
                  <option value="aircraft_workshop_01_1k.hdr">Workshop</option>
                  <option value="spruit_sunrise_1k_HDR.hdr">Sunrise</option>
              </select>

              <button onClick={printCode} style={{ marginTop: '15px', width: '100%', background: 'var(--accent-cyan)', color: 'black', border: 'none', padding: '8px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Print Settings to Console</button>
            </div>
          </model-viewer>
        </div>
      </div>
    </section>
  );
};

export default InteractiveViewer;
