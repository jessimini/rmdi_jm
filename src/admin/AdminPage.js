import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Reservations from './Reservations'; // 예약 페이지 임포트
import UserManagement from './UserManagement';
import DataManagement from './DataManagement';

const AdminPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen ml-64">
        <Routes>
          <Route path="dashboard" element={<MainContent />} />
          <Route path="reservations" element={<Reservations />} /> {/* 예약 페이지 경로 추가 */}
          <Route path="usermanagement" element={<UserManagement />} /> {/* 새로운 UserManagement 경로 추가 */}
          <Route path="datamanagement" element={<DataManagement />} />
          {/* <Route path="" element={<MainContent />} /> 기본 라우트를 MainContent로 설정 */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
