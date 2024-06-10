// src/components/About.js
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import main3Image from '../assets/img/main3.jpg';
import main2Image from '../assets/img/main2.jpg';

function About() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
          <div className="d-flex flex-column">
              <img className="img-fluid rounded w-75 align-self-end" src={main3Image} alt="Main 3" />
              <img className="img-fluid rounded w-50 bg-white pt-3 pe-3" src={main2Image} alt="Main 2" style={{ marginTop: '-10%' }} />
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="500">
          <p className="d-inline-block border rounded-pill py-1 px-4" style={{ fontSize: '18px' }}>About Us</p>
            <h1 className="mb-4 text-bold text-3xl"><br />건강관리의 미래, <br /> RMDI와 함께</h1>
            <p className='mb-4 text-bold text-2xl'>RMDI은 최고의 의료 서비스를 제공하기 위해 <br />율제병원과 손을 잡고, 건강 관리의 미래를 선도합니다.</p>
            <p><br /><i className=" text-xl far fa-check-circle text-primary me-3"></i>건강 검진 데이터 조회</p>
            <p><i className=" text-xl far fa-check-circle text-primary me-3"></i>AI 기반 약 찾기 서비스</p>
            <a className="btn btn-primary rounded-pill py-3 px-5 mt-3" href="/About"style={{ fontSize: '16px' }}>Read More</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
