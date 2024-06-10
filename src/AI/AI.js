// AI.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

function AI() {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: "600px"}}>
          <p className="d-inline-block border rounded-pill py-1 px-4"style={{fontSize: '18px'}}>AI Services</p>
          <h1 style={{ fontSize: '2em', fontWeight: 'bold'}}><br />스마트한 건강 솔루션, <br /> AI와 함께하세요.</h1>
          <br></br>
          <h2 className='text-xl font-bold'>건강 관리가 이제는 한층 간편해졌습니다! <br></br> AI 기술을 활용하여, 약 찾기와 식단 관리를 수행해보세요. <br></br> 
          </h2>
        </div>
        <div className="row g-4">
          <ServiceItem
            iconClass="fas fa-pills"
            title="AI 약찾기 서비스"
            description="어떤 약인지 모르시겠다면 사진을 찍어 확인할 수 있습니다."
            path="/aipill/AiPill"
          />
          {/* <ServiceItem
            iconClass="fas fa-laptop-medical" 
            title="AI 식단 관리"
            description="오늘의 식단의 사진을 찍어 섭취량과 영양소를 확인할 수 있습니다."
            path="/aifood/AiFood"
          /> */}
          {/* <ServiceItem
            iconClass="fas fa-calendar-check" 
            title="AI 챗봇"
            description="개인화된 챗봇에게 맞춤형 정보를 얻을 수 있습니다. "
            path="https://chat.openai.com/"
          /> */}
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

export default AI;
