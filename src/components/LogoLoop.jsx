import React from 'react';

const LogoLoop = () => {
  return (
    <section className="logo-loop-section section-padding">
      <div className="logoloop logoloop--horizontal logoloop--fade">
        <div className="logoloop__track">
          {[1, 2, 3].map((listIdx) => (
            <ul className="logoloop__list" aria-hidden={listIdx !== 1 ? "true" : "false"} key={listIdx}>
              <li className="logoloop__item"><img src="/images/Svg/unreal-engine-svgrepo-com.svg" alt="Unreal Engine" /></li>
              <li className="logoloop__item"><img src="/images/Svg/unity-svgrepo-com.svg" alt="Unity 3D" /></li>
              <li className="logoloop__item"><img src="/images/Svg/maya-svgrepo-com.svg" alt="Maya" /></li>
              <li className="logoloop__item"><img src="/images/Svg/autodesk-3ds-max-icon.svg" alt="3DS Max" /></li>
              <li className="logoloop__item"><img src="/images/Svg/zbrush-svgrepo-com.svg" alt="ZBrush" /></li>
              <li className="logoloop__item"><img src="/images/Svg/adobe-substance-3d-painter-icon.svg" alt="Substance 3D" /></li>
              <li className="logoloop__item"><img src="/images/Svg/marvlous design.png" alt="Marvelous Designer" /></li>
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoLoop;
