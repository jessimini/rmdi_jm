// src/containers/AboutPage.js
import React from 'react';
import AboutHeader from './AboutHeader';
import About from './About';
import FeatureSection from './FeatureSection';
import Team from './Team';


const AboutPage = () => {
  return (
    <>
      <AboutHeader />
      <About />
      <FeatureSection />
      <Team />
      {/* 다른 섹션들이 여기에 들어갈 수 있습니다. */}
    </>
  );
}

export default AboutPage;
