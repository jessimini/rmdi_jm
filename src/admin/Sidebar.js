import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Users, Folder, Archive, HelpCircle, Settings } from 'react-feather';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700 font-bold' : '';
  };

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen flex flex-col fixed top-0 left-0 z-10">
      <div className="p-4 text-2xl font-bold">RMDI</div>
      <nav className="mt-10">
        <ul className="navbar__menu">
          <li className={`navbar__item ${isActive('/admin/dashboard')}`}>
            <Link to="/admin/dashboard" className="navbar__link flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              <Home className="w-5 h-5 mr-3" />
              <span>통계 및 보고서</span>
            </Link>
          </li>
          <li className={`navbar__item ${isActive('/admin/reservations')}`}>
            <Link to="/admin/reservations" className="navbar__link flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              <MessageSquare className="w-5 h-5 mr-3" />
              <span>예약</span>
            </Link>
          </li>
          <li className={`navbar__item ${isActive('/admin/usermanagement')}`}>
            <Link to="/admin/usermanagement" className="navbar__link flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              <Users className="w-5 h-5 mr-3" />
              <span>유저 관리</span>
            </Link>
          </li>
          <li className={`navbar__item ${isActive('/admin/datamanagement')}`}>
            <Link to="/admin/datamanagement" className="navbar__link flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
              <Folder className="w-5 h-5 mr-3" />
              <span>데이터 관리</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
