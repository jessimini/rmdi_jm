// PatientRecord.js
import React, { useEffect, useState } from 'react';
import './PatientRecord.css';
import MedicalRecord from './MedicalRecord'

const PatientRecord = () => {
  const [date, setDate] = useState('');
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [onlineRecords, setOnlineRecords] = useState([]); // 온라인 진료 기록을 저장할 state

  const handleSearch = async () => {
    if (date) {
      setIsSearched(true);
      try {
        // 환경 변수를 사용하여 API 엔드포인트 설정
        const response = await fetch('/data/Record.json');
        //const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
        // API로부터 선택된 날짜에 해당하는 의료 기록 데이터를 가져옴
        //const response = await fetch(`${apiUrl}/api/record/PatientRecord`);
        
        if (!response.ok) {
          throw new Error('서버에서 응답을 받는 데 실패했습니다.');
        }
        
        const fetchedRecords = await response.json();
        setMedicalRecords(fetchedRecords); // 가져온 데이터로 상태 업데이트
      } catch (error) {
        console.error("Fetching medical records failed:", error);
        // 오류 처리를 위한 상태 업데이트나 사용자에게 알림 등의 추가 로직을 여기에 구현할 수 있습니다.
      }
    } else {
      alert('날짜를 선택해주세요.'); // 날짜가 선택되지 않았을 때 사용자에게 알림
    }
  };

  const handleFetchOnlineResults = async () => {
    // API 호출을 위한 URI 설정
    const onlineApiUrl = process.env.REACT_APP_ONLINE_API_URL || 'http://127.0.0.1:8000';
    
    try {
      // 다른 데이터베이스에서 온라인 진료 기록을 가져오기 위한 API 호출
      const response = await fetch(`${onlineApiUrl}/api/online_records`);
      
      if (!response.ok) {
        throw new Error('Online records server response was not ok');
      }
      
      const fetchedOnlineRecords = await response.json();
      setOnlineRecords(fetchedOnlineRecords); // 가져온 데이터로 상태 업데이트
    } catch (error) {
      console.error("Fetching online medical records failed:", error);
      // 필요한 오류 처리 로직 추가
    }
  };


  
  const handleChangeDate = (e) => {
    setDate(e.target.value);
    setIsSearched(false); // 날짜 변경 시 isSearched를 false로 설정
  };

  return (
    <div className="patient-record-page">
      <div className="header-section flex flex-col items-center justify-center text-center pt-10 pb-10">
        <h1 style={{ fontSize: '2em', fontWeight: 'bold'}}>당신의 건강, <br /> 우리 기술로 더 가까이</h1>
        <br></br>
        <p className='text-xl text-center'>안녕하세요, 환자님의 의료 기록을 관리하는 페이지입니다.<br></br>
        진료기록을 확인해보세요.</p>
      </div>
      <div className="search-sections">
        <div className="date-search-form flex justify-center items-center space-x-4">
          <input 
            type="date" 
            value={date}
            onChange={handleChangeDate}
          />
          <button onClick={handleSearch}>진료 기록 조회</button>
        </div>
  
        {/* 의료 기록 조회 결과 섹션을 온라인 진료 결과 섹션보다 위로 이동 */}
        <div className="medical-records-results">
          {isSearched ? (
            medicalRecords.length > 0 ? (
              medicalRecords.map((record, idx) => (
                <MedicalRecord key={idx} record={record} />
              ))
            ) : (
              <p>조회된 의료 기록이 없습니다.</p>
            )
          ) : <p className='text-center'>진료 기록 조회를 눌러주세요!</p>}
        </div>
      </div>
    </div>
  );  

};
export default PatientRecord;
