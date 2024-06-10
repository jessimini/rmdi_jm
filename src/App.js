import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

// 컴포넌트 임포트
import Navbar from './components/Navbar';
import HomePage from './containers/HomePage';
import ChatbotIcon from './containers/ChatbotIcon';
import AboutPage from './about/AboutPage';
import PatientSignUp from "./register/PatientRegister";
import PatientSignIn from "./login/PatientLogin";
import DoctorSignIn from "./login/DoctorLogin";
import LoginSelect from "./login/LoginSelect";
import PatientRecord from "./record/PatientRecord";
import Service from './service/Service';
import PatientHealthcheckup from './helthcheckup/PatientHealthcheckup';
import ApplyLayout from './reserv/(apply)/ApplyLayout'
import Apply from './reserv/page';
import OnlineReservationConfirmation from './reserv/PatientReservCheck';
import ReservationEdit from './reserv/ReservationEdit';
import AI from './AI/AI'
import AiPill from './aipill/AiPill';
import Contact from './contact/contact';
import AdminPage from './admin/AdminPage';

// 스타일 임포트
import './styles/style2.css';
import './styles/style.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init();
    fetchData().then(() => {
      setIsLoading(false);
    });
  }, []);
  
  return (
    <>
      <ChatbotIcon />
      <Router>
        <Navbar /> {/* Navbar를 여기에 한 번만 배치 */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register/PatientRegister" element={<PatientSignUp />} />
          <Route path="/login/PatientLogin" element={<PatientSignIn />} />
          <Route path="/login/DoctorLogin" element={<DoctorSignIn />} />
          <Route path="/login/SelectLogin" element={<LoginSelect />} />
          <Route path="/service" element={<Service/>} />
          <Route path="/record/PatientRecord" element={<PatientRecord />} />
          <Route path="/healthcheckup/PatientHealthcheckup" element={<PatientHealthcheckup />} />
          <Route path='/reserv/page' element={<ApplyLayout />} />
          <Route path='/recruit' element={<Apply />} />
          <Route path='/reserv/PatientReservCheck' element={<OnlineReservationConfirmation/>} />
          <Route path="/reserv/:id" element={<ReservationEdit />} />  
          <Route path='/AI' element={<AI/>}></Route>
          <Route path='/aipill/AiPill' element={<AiPill/>} />
          <Route path='/Contact' element={<Contact/>} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </Router>
    </>
  );
}

function fetchData() {
  // 데이터 로딩 시간을 시뮬레이션하는 임시 함수
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}

export default App;
