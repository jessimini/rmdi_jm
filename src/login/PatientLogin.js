// export default PatientSignIn;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 사용
import './Login.css';
import {Cookies} from 'react-cookie';

const cookies = new Cookies();


function PatientSignIn() {
  const [formData, setFormData] = useState({
    patient_id: '',
    patient_password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate 훅으로 변경

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/login/PatientLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((res) => res.json())
    .then((result) => {
      if (result.message === 'success') {
        //navigate('/'); // 홈화면으로 리다이렉트
        window.location.replace('/');
        const setCookie = (name, value, options) => {
          return cookies.set(name, value, {...options}); 
        }

        setCookie('Token', '1111', {path:'/'});
        

      } else {
        setError('환자 로그인 실패! 아이디와 비밀번호를 확인해 주세요.');
      }
    })
    .catch(() => {
      setError('로그인 중 에러가 발생했습니다.');
    });
  };

  // 회원가입 페이지로 이동하는 함수
  const handleRegister = () => {
    navigate('/register/PatientRegister'); // 회원가입 경로로 이동
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <h1 className='login_text'>환자 로그인</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <label>로그인 아이디</label>
          <input
            type="text"
            name="patient_id"
            className="login-form-input"
            value={formData.patient_id}
            onChange={handleChange}
          />
          <label>로그인 비밀번호</label>
          <input
            type="password"
            name="patient_password"
            className="login-form-input"
            value={formData.patient_password}
            onChange={handleChange}
          />
          <button type="submit" className="login-form-button">로그인</button>
          <button type="button" className="login-form-button register-form-button" onClick={handleRegister}>
            회원가입
          </button>
        </form>
        {error && <div className="login-failure-message">{error}</div>}
      </div>
    </div>
  );
}

export default PatientSignIn;
