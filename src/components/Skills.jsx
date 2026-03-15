import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Magic Bento Grid Effect
    const cards = document.querySelectorAll('.magic-bento-card');
    if (cards.length === 0) return;

    const glowColor = '0, 238, 255'; // Cyan
    const spotlightRadius = 400;
    const particleCount = 12;
    const isMobile = window.innerWidth <= 768;

    let spotlight = document.querySelector('.global-spotlight');
    if (!spotlight) {
        spotlight = document.createElement('div');
        spotlight.className = 'global-spotlight';
        spotlight.style.cssText = `
            position: fixed;
            width: 800px;
            height: 800px;
            border-radius: 50%;
            pointer-events: none;
            background: radial-gradient(circle,
                rgba(${glowColor}, 0.15) 0%,
                rgba(${glowColor}, 0.08) 15%,
                rgba(${glowColor}, 0.04) 25%,
                rgba(${glowColor}, 0.02) 40%,
                rgba(${glowColor}, 0.01) 65%,
                transparent 70%
            );
            z-index: 200;
            opacity: 0;
            transform: translate(-50%, -50%);
            mix-blend-mode: screen;
        `;
        document.body.appendChild(spotlight);
    }

    let isInsideAnySection = false;

    const handleGlobalMouseMove = (e) => {
        const hoveredSection = Array.from(document.querySelectorAll('.bento-section')).find(section => {
            const rect = section.getBoundingClientRect();
            return e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom;
        });

        isInsideAnySection = !!hoveredSection;

        if (!isInsideAnySection) {
            gsap.to(spotlight, { opacity: 0, duration: 0.3 });
            cards.forEach(card => card.style.setProperty('--glow-intensity', '0'));
            return;
        }

        const proximity = spotlightRadius * 0.5;
        const fadeDistance = spotlightRadius * 0.75;
        let minDistance = Infinity;

        cards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const centerX = cardRect.left + cardRect.width / 2;
            const centerY = cardRect.top + cardRect.height / 2;
            const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
            const effectiveDistance = Math.max(0, distance);

            minDistance = Math.min(minDistance, effectiveDistance);

            let glowIntensity = 0;
            if (effectiveDistance <= proximity) {
                glowIntensity = 1;
            } else if (effectiveDistance <= fadeDistance) {
                glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
            }

            const relativeX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
            const relativeY = ((e.clientY - cardRect.top) / cardRect.height) * 100;
            card.style.setProperty('--glow-x', `${relativeX}%`);
            card.style.setProperty('--glow-y', `${relativeY}%`);
            card.style.setProperty('--glow-intensity', glowIntensity.toString());
            card.style.setProperty('--glow-radius', `${spotlightRadius}px`);
            card.style.setProperty('--glow-color', glowColor);
        });

        gsap.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.1 });
        const targetOpacity = minDistance <= proximity ? 0.8 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0;
        gsap.to(spotlight, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5 });
    };

    const handleGlobalMouseLeave = () => {
        isInsideAnySection = false;
        cards.forEach(card => card.style.setProperty('--glow-intensity', '0'));
        gsap.to(spotlight, { opacity: 0, duration: 0.3 });
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseleave', handleGlobalMouseLeave);

    const cleanupFns = [];

    cards.forEach(card => {
        let isHovered = false;
        let particlesData = [];

        const createParticle = (x, y) => {
            const el = document.createElement('div');
            el.className = 'particle';
            el.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background: rgba(${glowColor}, 1);
                box-shadow: 0 0 6px rgba(${glowColor}, 0.6);
                pointer-events: none;
                z-index: 100;
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                opacity: 0;
            `;
            return el;
        };

        const handleMouseEnter = () => {
            isHovered = true;
            if (isMobile) return;

            const rect = card.getBoundingClientRect();
            for (let i = 0; i < particleCount; i++) {
                setTimeout(() => {
                    if (!isHovered) return;
                    const p = createParticle(Math.random() * rect.width, Math.random() * rect.height);
                    card.appendChild(p);
                    particlesData.push(p);

                    gsap.to(p, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
                    gsap.to(p, {
                        x: (Math.random() - 0.5) * 100,
                        y: (Math.random() - 0.5) * 100,
                        rotation: Math.random() * 360,
                        duration: 2 + Math.random() * 2,
                        ease: 'none',
                        repeat: -1,
                        yoyo: true
                    });
                    gsap.to(p, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
                }, i * 100);
            }

            gsap.to(card, { rotateX: 5, rotateY: 5, scale: 1.02, duration: 0.3, transformPerspective: 1000, zIndex: 10 });
        };

        const handleMouseLeave = () => {
            isHovered = false;
            if (isMobile) return;

            particlesData.forEach(p => {
                gsap.to(p, { scale: 0, opacity: 0, duration: 0.3, onComplete: () => p.remove() });
            });
            particlesData = [];

            gsap.to(card, { rotateX: 0, rotateY: 0, x: 0, y: 0, scale: 1, duration: 0.3, zIndex: 1 });
        };

        const handleMouseMove = (e) => {
            if (isMobile) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;
            gsap.to(card, { rotateX, rotateY, duration: 0.1, transformPerspective: 1000 });

            const magnetX = (x - centerX) * 0.15;
            const magnetY = (y - centerY) * 0.15;
            gsap.to(card, { x: magnetX, y: magnetY, duration: 0.3 });
        };

        const handleClick = (e) => {
            if (isMobile) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const maxDist = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height));

            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute; width: ${maxDist * 2}px; height: ${maxDist * 2}px; border-radius: 50%;
                background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
                left: ${x - maxDist}px; top: ${y - maxDist}px; pointer-events: none; z-index: 1000;
            `;
            card.appendChild(ripple);
            gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, onComplete: () => ripple.remove() });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('click', handleClick);

        cleanupFns.push(() => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('click', handleClick);
        });
    });

    return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseleave', handleGlobalMouseLeave);
        cleanupFns.forEach(fn => fn());
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="skills-section bento-section">
      <div className="container section-padding">
        <div className="section-header">
          <h2>Technical Skills & Competencies</h2>
          <div className="header-line"></div>
        </div>

        <div className="skills-category reveal">
          <h3 className="skill-cat-title">Game Engines</h3>
          <div className="skills-grid">
            <div className="magic-bento-card magic-bento-card--border-glow particle-container" style={{ '--glow-color': '0, 238, 255' }}>
              <div className="magic-bento-card__content">
                <img src="/images/Svg/unreal-engine-svgrepo-com.svg" alt="Unreal Engine Icon" style={{ width: '80px', height: '80px', margin: '0 0 16px 0 !important', filter: 'drop-shadow(0 0 10px rgba(0, 238, 255, 0.4))', objectFit: 'contain', alignSelf: 'flex-start' }} />
                <h2 className="magic-bento-card__title">Unreal Engine</h2>
                <p className="magic-bento-card__description">Level Design, Blueprint Basics, Lighting, Material Setup</p>
              </div>
            </div>
            <div className="magic-bento-card magic-bento-card--border-glow particle-container" style={{ '--glow-color': '0, 238, 255' }}>
              <div className="magic-bento-card__content">
                <img src="/images/Svg/unity-svgrepo-com.svg" alt="Unity 3D Icon" style={{ width: '80px', height: '80px', margin: '0 0 16px 0 !important', filter: 'drop-shadow(0 0 10px rgba(0, 238, 255, 0.4))', objectFit: 'contain', alignSelf: 'flex-start' }} />
                <h2 className="magic-bento-card__title">Unity 3D</h2>
                <p className="magic-bento-card__description">Level Design, Scene Assembly</p>
              </div>
            </div>
          </div>
        </div>

        <div className="skills-category reveal" style={{ marginTop: '40px' }}>
          <h3 className="skill-cat-title">3D Modeling & Animation</h3>
          <div className="skills-grid">
            <div className="magic-bento-card magic-bento-card--border-glow particle-container" style={{ '--glow-color': '0, 238, 255' }}>
              <div className="magic-bento-card__content">
                <img src="/images/Svg/maya-svgrepo-com.svg" alt="Autodesk Maya Icon" style={{ width: '80px', height: '80px', margin: '0 0 16px 0 !important', filter: 'drop-shadow(0 0 10px rgba(0, 238, 255, 0.4))', objectFit: 'contain', alignSelf: 'flex-start' }} />
                <h2 className="magic-bento-card__title">Autodesk Maya</h2>
                <p className="magic-bento-card__description">Modeling, UV Mapping, Basic Animation, Rendering</p>
              </div>
            </div>
            <div className="magic-bento-card magic-bento-card--border-glow particle-container" style={{ '--glow-color': '0, 238, 255' }}>
              <div className="magic-bento-card__content">
                <img src="/images/Svg/autodesk-3ds-max-icon.svg" alt="Autodesk 3ds Max Icon" style={{ width: '80px', height: '80px', margin: '0 0 16px 0 !important', filter: 'drop-shadow(0 0 10px rgba(0, 238, 255, 0.4))', objectFit: 'contain', alignSelf: 'flex-start' }} />
                <h2 className="magic-bento-card__title">Autodesk 3ds Max</h2>
                <p className="magic-bento-card__description">Environment Modeling, Modular Assets</p>
              </div>
            </div>
            <div className="magic-bento-card magic-bento-card--border-glow particle-container" style={{ '--glow-color': '0, 238, 255' }}>
              <div className="magic-bento-card__content">
                <img src="/images/Svg/zbrush-svgrepo-com.svg" alt="ZBrush Icon" style={{ width: '80px', height: '80px', margin: '0 0 16px 0 !important', filter: 'drop-shadow(0 0 10px rgba(0, 238, 255, 0.4))', objectFit: 'contain', alignSelf: 'flex-start' }} />
                <h2 className="magic-bento-card__title">ZBrush</h2>
                <p className="magic-bento-card__description">Hard surface sculpting, Prop Detailing, Retopology Basics</p>
              </div>
            </div>
          </div>
        </div>

        <div className="skills-category reveal" style={{ marginTop: '40px' }}>
          <h3 className="skill-cat-title">Texturing & Cloth Simulation</h3>
          <div className="skills-grid">
            <div className="magic-bento-card magic-bento-card--border-glow particle-container" style={{ '--glow-color': '0, 238, 255' }}>
              <div className="magic-bento-card__content">
                <img src="/images/Svg/adobe-substance-3d-painter-icon.svg" alt="Substance 3D Painter Icon" style={{ width: '80px', height: '80px', margin: '0 0 16px 0 !important', filter: 'drop-shadow(0 0 10px rgba(0, 238, 255, 0.4))', objectFit: 'contain', alignSelf: 'flex-start' }} />
                <h2 className="magic-bento-card__title">Substance 3D Painter</h2>
                <p className="magic-bento-card__description">PBR Texturing, Material Creation, Texture Baking</p>
              </div>
            </div>
            <div className="magic-bento-card magic-bento-card--border-glow particle-container" style={{ '--glow-color': '0, 238, 255' }}>
              <div className="magic-bento-card__content">
                <img src="/images/Svg/marvlous design.png" alt="Marvelous Designer Icon" style={{ width: '80px', height: '80px', margin: '0 0 16px 0 !important', filter: 'drop-shadow(0 0 10px rgba(0, 238, 255, 0.4))', objectFit: 'contain', alignSelf: 'flex-start' }} />
                <h2 className="magic-bento-card__title">Marvelous Designer</h2>
                <p className="magic-bento-card__description">Garment Creation, Cloth Simulation, Game Engine Export</p>
              </div>
            </div>
          </div>
        </div>

        <div className="skills-category reveal" style={{ marginTop: '40px' }}>
          <h3 className="skill-cat-title">Adobe Creative Suite</h3>
          <div className="skills-grid">
            <div className="magic-bento-card magic-bento-card--border-glow particle-container" style={{ '--glow-color': '0, 238, 255' }}>
              <div className="magic-bento-card__content">
                <img src="/images/Svg/adobe-photoshop-svgrepo-com.svg" alt="Adobe Photoshop Icon" style={{ width: '80px', height: '80px', margin: '0 0 16px 0 !important', filter: 'drop-shadow(0 0 10px rgba(0, 238, 255, 0.4))', objectFit: 'contain', alignSelf: 'flex-start' }} />
                <h2 className="magic-bento-card__title">Adobe Photoshop</h2>
                <p className="magic-bento-card__description">Texture Editing, UI Elements</p>
              </div>
            </div>
            <div className="magic-bento-card magic-bento-card--border-glow particle-container" style={{ '--glow-color': '0, 238, 255' }}>
              <div className="magic-bento-card__content">
                <img src="/images/Svg/adobe-illustrator-svgrepo-com.svg" alt="Adobe Illustrator Icon" style={{ width: '80px', height: '80px', margin: '0 0 16px 0 !important', filter: 'drop-shadow(0 0 10px rgba(0, 238, 255, 0.4))', objectFit: 'contain', alignSelf: 'flex-start' }} />
                <h2 className="magic-bento-card__title">Adobe Illustrator</h2>
                <p className="magic-bento-card__description">Concept Support, Graphic Assets</p>
              </div>
            </div>
          </div>
        </div>

        <div className="skills-category reveal" style={{ marginTop: '40px' }}>
          <h3 className="skill-cat-title" style={{ color: 'var(--accent-yellow)' }}>Core Competencies</h3>
          <div className="competencies-list">
            <span className="comp-badge">Modular Environment Design</span>
            <span className="comp-badge">Level Design & World Building</span>
            <span className="comp-badge">PBR Texturing</span>
            <span className="comp-badge">Real-Time Optimization</span>
            <span className="comp-badge">Blueprint Scripting</span>
            <span className="comp-badge">VR Environment Designer</span>
            <span className="comp-badge">3D Sculpting & Asset Creation</span>
            <span className="comp-badge">Problem Solving</span>
            <span className="comp-badge">Team Collaboration</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
