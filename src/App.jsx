import React, { useState, useEffect, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
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
  const [loading, setLoading] = useState(true);
  const [modalProject, setModalProject] = useState(null);

  const handleLoadingDone = useCallback(() => setLoading(false), []);

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


    // Cleanup
    const existingTop = document.querySelector('.gradual-blur-top');
    const existingBottom = document.querySelector('.gradual-blur-bottom');
    if (existingTop) existingTop.remove();
    if (existingBottom) existingBottom.remove();

    return () => {
      revealElements.forEach(el => revealObserver.unobserve(el));
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      {loading && <LoadingScreen onDone={handleLoadingDone} />}
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
