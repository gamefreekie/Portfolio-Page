import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import InteractiveViewer from './components/InteractiveViewer';
import Portfolio from './components/Portfolio';
import LogoLoop from './components/LogoLoop';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';

function App() {
  const [modalProject, setModalProject] = useState(null);

  useEffect(() => {
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };
    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(el => revealObserver.observe(el));

    // --- Gradual Blur Effect ---
    function createGradualBlur(position, height, zIndex = 1000) {
      if (document.querySelector(`.gradual-blur-${position}`)) return; // Prevent dupes natively

      const container = document.createElement('div');
      container.className = `gradual-blur gradual-blur-fixed gradual-blur-${position}`;
  
      Object.assign(container.style, {
          position: 'fixed', left: '0', right: '0', height: height,
          pointerEvents: 'none', zIndex: zIndex,
      });
  
      if (position === 'top') container.style.top = '0';
      else container.style.bottom = '0';
  
      const inner = document.createElement('div');
      inner.className = 'gradual-blur-inner';
      container.appendChild(inner);
  
      const divCount = 5;
      const strength = 2; // from preset
      const increment = 100 / divCount;
      const direction = position === 'top' ? 'to bottom' : 'to top';
  
      for (let i = 1; i <= divCount; i++) {
          const progress = i / divCount;
          const blurValue = 0.0625 * ((progress * divCount) + 1) * strength;
  
          const p1 = Math.round((increment * i - increment) * 10) / 10;
          const p2 = Math.round(increment * i * 10) / 10;
          const p3 = Math.round((increment * i + increment) * 10) / 10;
          const p4 = Math.round((increment * i + increment * 2) * 10) / 10;
  
          let gradient = `transparent ${p1}%, black ${p2}%`;
          if (p3 <= 100) gradient += `, black ${p3}%`;
          if (p4 <= 100) gradient += `, transparent ${p4}%`;
  
          const div = document.createElement('div');
          Object.assign(div.style, {
              position: 'absolute', inset: '0',
              maskImage: `linear-gradient(${direction}, ${gradient})`,
              webkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
              backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
              webkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
              opacity: 1
          });
          inner.appendChild(div);
      }
      document.body.appendChild(container);
    }

    createGradualBlur('top', '8rem', 990);
    createGradualBlur('bottom', '8rem', 990);

    const handleBlurVisibility = () => {
        const topBlur = document.querySelector('.gradual-blur-top');
        const bottomBlur = document.querySelector('.gradual-blur-bottom');

        if (window.scrollY <= 10) {
            if (topBlur) topBlur.style.opacity = '0';
        } else {
            if (topBlur) topBlur.style.opacity = '1';
        }

        const scrollPosition = window.scrollY + window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight;

        if (scrollPosition >= totalHeight - 10) {
            if (bottomBlur) bottomBlur.style.opacity = '0';
        } else {
            if (bottomBlur) bottomBlur.style.opacity = '1';
        }
    };

    handleBlurVisibility();
    window.addEventListener('scroll', handleBlurVisibility, { passive: true });

    // Cleanup
    return () => {
      revealElements.forEach(el => revealObserver.unobserve(el));
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cursor-glow"></div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <InteractiveViewer />
        <Portfolio onOpenModal={setModalProject} />
        <LogoLoop />
        <Contact />
      </main>
      <Footer />

      {/* Dynamic Portfolio Catalog Modal */}
      <ProjectModal projectId={modalProject} onClose={() => setModalProject(null)} />
    </>
  );
}

export default App;
