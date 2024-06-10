import doctorImage from '../assets/img/chae-song-hwa.png';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/style2.css'

const OnlineReservationConfirmation = () => {
  const [reservationData, setReservationData] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [calendarValue, setCalendarValue] = useState(new Date());

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const response = await fetch('/data/reserv.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReservationData(data); // Assuming 'data' is an array of reservations
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchReservationData();
  }, []);

  const onDayClick = (value) => {
    const clickedDate = value.toLocaleDateString('en-CA');
    const matchedReservation = reservationData.find(reservation => reservation.Date === clickedDate);
    setSelectedReservation(matchedReservation);
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toLocaleDateString('en-CA');
      if (reservationData.some(reservation => reservation.Date === dateStr)) {
        return 'highlight'; // 예약이 있는 날짜에 적용할 클래스
      }
    }
    return null;
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류가 발생했습니다: {error.message}</div>;
  if (!reservationData || reservationData.length === 0) return <div>예약 정보를 불러올 수 없습니다.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mt-10 mb-10" style={{ fontSize: '2em', fontWeight: 'bold'}}>당신의 건강, <br /> 우리 기술로 더 가까이</h2>
      <h4 className="text-xl text-center pb-3">정확한 진료 예약으로 더욱 안심하실 수 있습니다.<br /> 예약 내용을 확인하시고, RMDI와 함께 건강한 미래를 설계해 보세요!</h4>
      
      <div className="p-4 bg-white border-t pt-5 shadow-md rounded-lg my-4 flex flex-col ">
        <div className="flex justify-center pb-4">

          <div className="flex flex-col pr-24">
            <div className='flex text-center justify-center text-center'>
              <img src='/img/reserv_calendar.png' className='w-7 h-7 mr-2'></img>
              <h1 className='text-2xl pb-4 font-bold'>예약 확인하기</h1>
            </div>
            <Calendar
              className="mx-auto shadow-xl rounded-lg"
              onChange={setCalendarValue}
              value={calendarValue}
              onClickDay={onDayClick}
              tileClassName={tileClassName}
            />
          </div>

          {selectedReservation && (
            <div className="flex pb-4"> 
              <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-md">
                <h4 className='text-xl font-bold '>의사 프로필</h4>
                <img src={selectedReservation.doctorImage} alt="의사 프로필" className="mt-3"/>
                <p className='text-lg font-bold mt-2 text-black'>{selectedReservation.doctor}</p>
                <p className='text-lg'>{selectedReservation.field}</p>
              </div>
            </div>
          )}
        </div>
        
        {selectedReservation && (
          <div className=" border border-gray-300 rounded-lg shadow-md text-center">
            <div className='flex flex-col justify-center items-center'>
              <h4 className='text-2xl font-bold mt-5 mb-5'>예약 내용</h4>
            </div>
            <div className='flex mx-auto w-11/12 max-w-6xl my-4'>
            <div className='flex flex-1 space-x-4 pb-5'>
              <div>
                <div className='border border-blue-500 shadow-lg rounded-lg flex-1 flex flex-col p-4'>
                  <p className="text-xl font-semibold text-black mb-1">환자 이름 : <span className="font-black">{selectedReservation.name}</span></p>
                  <p className="text-xl font-semibold text-black mb-1">성별 : <span className="font-black">{selectedReservation.sex}</span></p>
                  <p className="text-xl font-semibold text-black mb-1">생년월일 : <span className="font-black">{selectedReservation.birth}</span></p>
                </div>

                <div className='border border-blue-500 shadow-lg rounded-lg flex-1 p-4'>
                  <p className="text-xl font-semibold text-black mb-1">진료 예약 날짜 : <span className="font-black">{selectedReservation.Date}</span></p>
                  <p className="text-xl font-semibold text-black mb-1">진료 예약 시간 : <span className="font-black">{selectedReservation.Time}</span></p>
                  <p className="text-lg font-semibold text-black mt-1">화상 채팅 코드 : <span className="font-black">{1713494428217}</span></p>
                  <button 
                    onClick={() => window.open(`http://localhost:3000/`, '_blank')}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
                  >
                    화상 채팅 입장하기
                  </button>
                
                </div>
              </div>
              
              <div className='flex flex-col justify-center items-center border border-blue-500 shadow-lg rounded-lg flex-1 p-4'>
                <p className="text-xl font-semibold mb-1 text-black pb-2">증상 시작 시점 : <span className="font-normal">{selectedReservation.grade}</span></p>
                <br></br>
                <p className="text-xl font-semibold mb-1 text-black">증상 : <span className="font-normal">{selectedReservation.q1}</span></p>
              </div>
                
              <button
                onClick={() => window.location.href = `/edit/${selectedReservation.id}`}
                className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
              >
                예약 수정하기
              </button>
            </div>


            </div>

          </div>
        )}
      </div>
    </div>

  );
};

export default OnlineReservationConfirmation;

