import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // 새로운 CSS 스타일을 적용한 CSS 파일의 경로
import {Cookies} from 'react-cookie';

const cookies = new Cookies();

function DoctorSignIn() {
  const [formData, setFormData] = useState({
    doctor_id: '',
    doctor_password: '',
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
    fetch('http://127.0.0.1:8000/api/login/DoctorLogin', {
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

        setCookie('Token', 'A4fdRG&52#f');
      } else {
        setError('의사 로그인 실패! 의사번호와 아이디, 비밀번호를 확인해 주세요.');
      }
    })
    .catch(() => {
      setError('로그인 중 에러가 발생했습니다.');
    });
  };

  return (
    <div className="login-page-container"> {/* 새로운 부모 요소 추가 */}
      <div className="login-form-container">
        <h2>의사 회원 로그인</h2>
        <form onSubmit={handleSubmit} className="login-form">
        <label>의사 번호</label>
        <input
          type="text"
          name="doctor_num"
          className="login-form-input"
          value={formData.doctor_num}
          onChange={handleChange}
        />
        <label>로그인 아이디</label>
        <input
          type="text"
          name="doctor_id"
          className="login-form-input"
          value={formData.doctor_id}
          onChange={handleChange}
        />
        <label>로그인 비밀번호</label>
        <input
          type="password"
          name="doctor_password"
          className="login-form-input"
          value={formData.doctor_password}
          onChange={handleChange}
        />
        <button type="submit" className="login-form-button">로그인</button>
      </form>
      {error && <div className="login-failure-message">{error}</div>}
    </div>
    </div>
  );
}


export default DoctorSignIn;
