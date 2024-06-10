import React, { useEffect, useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/data/users.json')
      .then(response => response.json())
      .then(data => setUsers(data));
    
    fetch('/data/reservations.json')
      .then(response => response.json())
      .then(data => setReservations(data));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
        <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">유저 관리</h2>
          <label
            htmlFor="search"
            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={handleSearch}
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
              placeholder="UserName"
            />
            <span
              className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
            >
              UserName
            </span>
          </label>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">전체 사용자</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">유저이름</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가입일</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">예약/문의</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">메모</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{user.nickname}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{user.reservations}/{user.inquiries}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{user.memo}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full w-16 text-xs">Edit</button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full w-16 text-xs ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">등록된 의료인</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">의사번호</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">진료과</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map((reservation, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{reservation.professorId}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{reservation.professor}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{reservation.department}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full w-16 text-xs">Edit</button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full w-16 text-xs ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
