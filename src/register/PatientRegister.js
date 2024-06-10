import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 사용
import '../login/Login.css';

function PatientSignUp() {
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_id: '',
    patient_password: '',
  });
  const navigate = useNavigate(); // 회원가입 후 로그인 페이지로 이동하기 위한 navigate 함수

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 회원가입 API 호출
    fetch('http://127.0.0.1:8000/api/register/PatientRegister', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      // 회원가입 성공 후 로그인 페이지로 이동
      navigate('/login/PatientLogin');
    });
  };

  return (
    <div className="login-page-container"> {/* 로그인 스타일의 부모 컨테이너 사용 */}
      <div className="login-form-container"> {/* 로그인 스타일의 폼 컨테이너 사용 */}
        <h2 className='login_text'>환자 회원가입</h2>
        <form onSubmit={handleSubmit} className="login-form"> {/* 로그인 스타일의 폼 클래스 사용 */}
          <label>이름</label>
          <input
            type="text"
            name="patient_name"
            className="login-form-input" // 로그인 스타일의 인풋 클래스 사용
            value={formData.patient_name}
            onChange={handleChange}
          />
          <label>로그인 아이디</label>
          <input
            type="text"
            name="patient_id"
            className="login-form-input" // 로그인 스타일의
            // 인풋 클래스 사용
            value={formData.patient_id}
            onChange={handleChange}
          />
          <label>로그인 비밀번호</label>
          <input
            type="password" // 비밀번호 필드는 type을 "password"로 설정
            name="patient_password"
            className="login-form-input" // 로그인 스타일의 인풋 클래스 사용
            value={formData.patient_password}
            onChange={handleChange}
          />
          <button type="submit" className="login-form-button">회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default PatientSignUp;
