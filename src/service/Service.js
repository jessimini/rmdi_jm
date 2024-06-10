import React from 'react';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

function Service() {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: "600px"}}>
          <p className="d-inline-block border rounded-pill py-1 px-4"style={{fontSize: '18px'}}>Services</p>
          <h1 style={{ fontSize: '2em', fontWeight: 'bold'}}><br />당신의 건강, <br /> 우리 기술로 더 가까이</h1>
          <h1 className='max-w-4xl text-xl text-center pb-3 pt-4'>RMDI의 원격 의료와 의료 AI 서비스로, 언제 어디서나 전문 의료를 경험하세요.
              지금 바로 이용해 보고, 건강 관리를 새로운 차원으로 끌어올리세요!</h1>
        </div>
        <div className="row g-4">
          <ServiceItem
            iconClass="fas fa-file-medical"
            title="건강검진 데이터 조회"
            description="건강검진 결과와 이력을 손쉽게 조회할 수 있는 서비스입니다."
            path="/healthcheckup/PatientHealthcheckup"
          />
          <ServiceItem
            iconClass="fas fa-laptop-medical"
            title="비대면 진료 예약"
            description="온라인을 통해 쉽게 의료진과의 비대면 진료를 예약할 수 있습니다."
            path = "/reserv/page"
          />
          <ServiceItem
            iconClass="fas fa-file-waveform"
            title="진료기록 조회"
            description="과거 및 현재의 진료 기록을 안전하게 확인하고 관리할 수 있습니다."
            path="/record/PatientRecord"// '진료기록 조회' 서비스 항목에 대한 경로를 설정합니다.
          />
          <ServiceItem
            iconClass="fas fa-calendar-check"
            title="온라인 예약 확인"
            description="온라인으로 예약한 진료의 상태를 확인할 수 있습니다."
            path="/reserv/PatientReservCheck"
          />
        </div>
      </div>
    </div>
  );
}

function ServiceItem({ iconClass, title, description, path }) {
  // 특정 타이틀에 대한 스타일을 조정합니다.
  const titleStyle = { fontSize: '20px', fontWeight: 'bold' };

  return (
    <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
      <div className="service-item bg-light rounded h-100 p-5">
        <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-4" style={{ width: "65px", height: "65px" }}>
          <i className={iconClass} style={{ color: "#005eff", fontSize: "2em" }}></i>
        </div>
        <h4 className="mb-3" style={titleStyle}>{title}</h4>
        <p>{description}</p>
        <NavLink to={path} className="btn"
        style={{
          backgroundColor: 'white', // 흰색 배경
          color: '#003366', // 파란색 텍스트
          //border: '1px solid #ddd', // 경계선
          borderRadius: '20px', // 둥근 모서리
          padding: '10px 20px', // 내부 여백
          textDecoration: 'none', // 텍스트 밑줄 제거
          display: 'inline-flex', // 아이콘과 텍스트 정렬
          alignItems: 'center', // 세로 중앙 정렬
          justifyContent: 'center', // 가로 중앙 정렬
          marginTop: '20px' // 위쪽 마진 추가
        }}>
          <i className="fas fa-plus text-primary me-3"></i>더보기
        </NavLink>
      </div>
    </div>
  );
}

export default Service;
