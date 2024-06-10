// src/containers/HomePage.js
import React from 'react';
import Header from '../components/Header';
import About from '../about/About';
import Service from '../service/Service';

const HomePage = () => {

  return (
    <div>
      <Header />
      <About />
      <Service />
    </div>
  );
}

export default HomePage;
