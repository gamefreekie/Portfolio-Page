import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

function LoadingScreen({ onDone }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out at 4.4s, fully gone by 5s
    const fadeTimer = setTimeout(() => setFadeOut(true), 1900);
    const doneTimer = setTimeout(() => onDone(), 2500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`loading-screen${fadeOut ? ' loading-screen--fade' : ''}`}>
      <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>
      <p className="loading-screen__text">Loading<span className="loading-dots"></span></p>
    </div>
  );
}

export default LoadingScreen;
