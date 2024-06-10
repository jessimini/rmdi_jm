import React from 'react';
import PurposeImage from '../assets/img/purpose.jpg';

function FeatureSection() {
  return (
    <div className="container-fluid bg-primary overflow-hidden my-5 px-lg-0">
      <div className="container feature px-lg-0">
        <div className="row g-0 mx-lg-0">
          <div className="col-lg-6 feature-text py-5 wow fadeIn" data-wow-delay="0.1s">
            <div className="p-lg-5 ps-lg-0">
              <p className="d-inline-block border rounded-pill text-light py-1 px-4">Purpose</p>
              <h1 className="text-xl text-white mb-4 mt-3">신뢰성, 사용자 중심, 혁신</h1>
              <p className="text-white text-xl mb-4 pb-2">
                세 가지 가치는 모든 결정과 서비스 개발 과정에서 핵심이 됩니다. 
                <br/>율제병원의 전문 의료 지식과 결합된 우리의 기술은 사용자에게 
                <br/>안전하고, 정확하며, 간편한 온라인 건강 관리 솔루션을 제공합니다.
              </p>
              <div className="row g-4">
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{ width: '55px', height: '55px' }}>
                      <i className="fa fa-user-md text-primary"></i>
                    </div>
                    <div className="ms-4">
                      <p className="text-white mb-2">Experience</p>
                      <h5 className="text-white mb-0">Doctors</h5>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <div className="d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle bg-light" style={{ width: '55px', height: '55px' }}>
                      <i className="fa fa-check text-primary"></i>
                    </div>
                    <div className="ms-4">
                      <p className="text-white mb-2">Quality</p>
                      <h5 className="text-white mb-0">Services</h5>
                    </div>
                  </div>
                </div>
                {/* 더 많은 특징 아이템들... */}
              </div>
            </div>
          </div>
          <div className="col-lg-6 pe-lg-0 wow fadeIn" data-wow-delay="0.5s" style={{ minHeight: '400px' }}>
            <div className="position-relative h-100">
              <img className="position-absolute img-fluid w-100 h-100" src={PurposeImage} style={{ objectFit: 'cover' }} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureSection;
