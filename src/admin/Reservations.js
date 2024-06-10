import React, { useEffect, useState } from 'react';
import professor1 from '../assets/img/professor1.jpg';
import professor2 from '../assets/img/professor2.jpg';
import professor3 from '../assets/img/professor3.jpg';
import professor4 from '../assets/img/professor4.jpg';
import professor5 from '../assets/img/professor5.jpg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [approvalMethod, setApprovalMethod] = useState('auto');
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedReservation, setEditedReservation] = useState({});

  useEffect(() => {
    fetch('/data/reservations.json')
      .then(response => response.json())
      .then(data => {
        const reservationsWithId = data.map(reservation => ({
          ...reservation,
          id: uuidv4(),
        }));
        setReservations(reservationsWithId);
      });
  }, []);

  useEffect(() => {
    const savedApprovalMethod = localStorage.getItem('approvalMethod');
    if (savedApprovalMethod) {
      setApprovalMethod(savedApprovalMethod);
    }
  }, []);

  const handleApprovalChange = (event) => {
    setApprovalMethod(event.target.value);
  };

  const handleSave = (event) => {
    event.preventDefault();
    localStorage.setItem('approvalMethod', approvalMethod);
    alert('승인 방식이 저장되었습니다.');
  };

  const professors = [
    { name: '김준완 교수', imageUrl: professor1 },
    { name: '채송화 교수', imageUrl: professor2 },
    { name: '양석형 교수', imageUrl: professor3 },
    { name: '이익준 교수', imageUrl: professor4 },
    { name: '안정원 교수', imageUrl: professor5 },
  ];

  const handleProfessorClick = (professor) => {
    if (selectedProfessor && selectedProfessor.name === professor.name) {
      setSelectedProfessor(null);
    } else {
      setSelectedProfessor(professor);
    }
  };

  const filteredReservations = selectedProfessor
    ? reservations.filter(reservation => reservation.professor.includes(selectedProfessor.name.split(' ')[0]))
    : reservations;

  const handleEditClick = (id) => {
    const selectedReservation = reservations.find(reservation => reservation.id === id);

    if (!selectedReservation) {
      alert('선택한 예약이 존재하지 않습니다.');
      return;
    }

    setEditingId(id);
    setEditedReservation({
      ...selectedReservation,
      date: new Date(selectedReservation.date),
      time: selectedReservation.time || "09:00"
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditedReservation({ ...editedReservation, [name]: value });
  };

  const handleDateChange = (date) => {
    setEditedReservation({ ...editedReservation, date });
  };

  const handleEditSave = () => {
    const editedDate = format(editedReservation.date, 'yyyy-MM-dd');
    const editedTime = editedReservation.time;
    const editedProfessor = editedReservation.professor;

    // 같은 교수의 같은 시간에 예약이 있는지 확인
    const conflictingReservation = reservations.find(reservation =>
      reservation.id !== editingId &&
      reservation.professor === editedProfessor &&
      reservation.date === `${editedDate} ${editedTime}`
    );

    if (conflictingReservation) {
      alert('같은 교수의 같은 시간에 이미 예약이 있습니다.');
      return;
    }

    // 수정된 예약으로 교체
    const updatedReservations = reservations.map(reservation =>
      reservation.id === editingId
        ? { ...editedReservation, date: `${editedDate} ${editedTime}` }
        : reservation
    );

    setReservations(updatedReservations);
    setEditingId(null);
    alert('수정이 완료되었습니다.');
  };

  const handleDeleteClick = (id) => {
    const confirmed = window.confirm('정말 이 예약을 삭제하시겠습니까?');
    if (confirmed) {
      const updatedReservations = reservations.filter(reservation => reservation.id !== id);
      setReservations(updatedReservations);
      alert('예약이 삭제되었습니다.');
    }
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 9; hour <= 17; hour++) {
      const hourString = hour.toString().padStart(2, '0');
      times.push(`${hourString}:00`);
      if (hour < 17) {
        times.push(`${hourString}:30`);
      }
    }
    return times;
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">의료인 목록 설정하기</h2>
          <div className="flex overflow-x-auto space-x-4">
            {professors.map((professor) => (
              <label
                key={professor.name}
                className={`flex flex-col items-center min-w-[120px] cursor-pointer gap-2 rounded-lg border p-4 transition hover:bg-gray-50 ${selectedProfessor && selectedProfessor.name === professor.name ? 'border-blue-500 bg-gray-100' : 'border-gray-200'}`}
                onClick={() => handleProfessorClick(professor)}
              >
                <img className="h-24 w-24 rounded-full" src={professor.imageUrl} alt={professor.name} />
                <div className="flex items-center">
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{professor.name}</h3>
                  <input
                    type="checkbox"
                    className="ml-2 rounded border-gray-300"
                    checked={selectedProfessor && selectedProfessor.name === professor.name}
                    readOnly
                  />
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">예약자 목록</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">닉네임</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">예약 날짜</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">교수명</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">메모</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      {editingId === reservation.id ? (
                        <input
                          type="text"
                          name="nickname"
                          value={editedReservation.nickname}
                          onChange={handleEditChange}
                          className="form-input"
                        />
                      ) : (
                        reservation.nickname
                      )}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {editingId === reservation.id ? (
                        <input
                          type="text"
                          name="email"
                          value={editedReservation.email}
                          onChange={handleEditChange}
                          className="form-input"
                        />
                      ) : (
                        reservation.email
                      )}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {editingId === reservation.id ? (
                        <>
                          <DatePicker
                            selected={editedReservation.date}
                            onChange={handleDateChange}
                            className="form-input"
                            dateFormat="yyyy-MM-dd"
                          />
                          <select
                            name="time"
                            value={editedReservation.time}
                            onChange={handleEditChange}
                            className="form-select mt-2"
                          >
                            {generateTimeOptions().map((time, idx) => (
                              <option key={idx} value={time}>{time}</option>
                            ))}
                          </select>
                        </>
                      ) : (
                        reservation.date
                      )}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {editingId === reservation.id ? (
                        <input
                          type="text"
                          name="professor"
                          value={editedReservation.professor}
                          onChange={handleEditChange}
                          className="form-input"
                        />
                      ) : (
                        reservation.professor
                      )}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {editingId === reservation.id ? (
                        <input
                          type="text"
                          name="memo"
                          value={editedReservation.memo}
                          onChange={handleEditChange}
                          className="form-input"
                        />
                      ) : (
                        reservation.memo
                      )}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                      {editingId === reservation.id ? (
                        <button
                          onClick={handleEditSave}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-full w-16 text-xs"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(reservation.id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full w-16 text-xs"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteClick(reservation.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full w-16 text-xs ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">예약 승인 및 시간 설정</h2>
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block text-gray-700">승인 방식 설정</label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="approval"
                    value="auto"
                    checked={approvalMethod === 'auto'}
                    onChange={handleApprovalChange}
                  />
                  <span className="ml-2 text-gray-700">자동 승인</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio"
                    name="approval"
                    value="manual"
                    checked={approvalMethod === 'manual'}
                    onChange={handleApprovalChange}
                  />
                  <span className="ml-2 text-gray-700">수동 승인</span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">최대 예약수 제한</label>
              <input type="number" className="mt-2 form-input w-full" min="1" />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              저장
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
