import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import adminAvatar from '../assets/img/admin-avatar.png'; // 관리자 프로필 사진 경로
import admin1 from '../assets/img/admin1.jpg'; 
import admin2 from '../assets/img/admin2.jpg'; 
Chart.register(...registerables);

// 관리자 프로필 컴포넌트
const AdminProfile = ({ admin, admins, onSelectAdmin }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex flex-col items-center">
      <img
        src={admin.avatar || adminAvatar}
        alt="Administrator Profile"
        className="w-24 h-24 rounded-full mb-4"
      />
      <h3 className="text-lg font-semibold">{admin.name}</h3>
      <p className="text-gray-500 mb-4">{admin.email}</p>
      <div className="flex flex-col items-start w-full">
        <div className="flex justify-between w-full mb-2">
          <span>App</span>
          <span className="text-blue-500">{admin.app}</span>
          <button className="text-blue-500 hover:underline">설정</button>
        </div>
        <div className="flex justify-between w-full mb-2">
          <span>도메인</span>
          <button className="text-blue-500 hover:underline">설정</button>
        </div>
        <div className="flex justify-between w-full">
          <span>SMS</span>
          <span className="text-blue-500">{admin.sms}건</span>
          <button className="text-blue-500 hover:underline">설정</button>
        </div>
      </div>
      <hr className="my-4 w-full" />
      <AdminSettings admins={admins} onSelectAdmin={onSelectAdmin} />
    </div>
  </div>
);

// 운영진 설정 컴포넌트
const AdminSettings = ({ admins, onSelectAdmin }) => (
  <div className="w-full">
    <h2 className="text-lg font-semibold mb-4">운영진 설정</h2>
    <div className="flex justify-around">
      {admins.map(admin => (
        <img
          key={admin.id}
          src={admin.avatar || adminAvatar}
          alt={admin.name}
          className="w-16 h-16 rounded-full cursor-pointer"
          onClick={() => onSelectAdmin(admin)}
        />
      ))}
    </div>
  </div>
);

const MainContent = () => {
  const [queries, setQueries] = useState([]);
  const [visitorData, setVisitorData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState({
    id: 1,
    name: 'Administrator',
    email: 'admin1234@yonsei.ac.kr',
    part: 'Administrator',
    sms: '0',
    avatar: adminAvatar,
  });

  const admins = [
    { id: 1, name: 'Administrator', email: 'admin1234@yonsei.ac.kr', part: 'Administrator', sms: '0', avatar: adminAvatar },
    { id: 2, name: 'Developer', email: '0jessi.min@gamil.com', part: 'Web Developer', sms: '2', avatar: admin1 },
    { id: 3, name: 'Developer', email: '7531hy@yonsei.ac.kr', part: 'Web Developer', sms: '5', avatar: admin2 },
  ];

  useEffect(() => {
    fetch('/data/userQueries.json')
      .then(response => response.json())
      .then(data => setQueries(data));
    fetch('/data/visitorStats.json')
      .then(response => response.json())
      .then(data => setVisitorData(data));
    fetch('/data/recentActivities.json')
      .then(response => response.json())
      .then(data => setActivities(data));
  }, []);

  const chartData = {
    labels: visitorData.map(item => item.date),
    datasets: [
      {
        label: '페이지뷰',
        data: visitorData.map(item => item.pageviews),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4, // 곡선형 스타일
      },
      {
        label: '방문자',
        data: visitorData.map(item => item.visitors),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4, // 곡선형 스타일
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">방문자 통계</h2>
          <div className="relative h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="col-span-1 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">최근 활동</h2>
          <div className="overflow-y-auto h-64">
            <ul className="relative">
              {activities.map((activity, index) => (
                <li key={index} className="mb-2 flex items-start">
                  <div className="bg-blue-500 rounded-full h-3 w-3 mt-1.5"></div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">{activity.date}</p>
                    <p>{activity.description}</p>
                  </div>
                </li>
              ))}
              <li className="absolute top-0 left-1.5 w-0.5 bg-blue-500 h-full"></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">사용자 문의</h2>
          <div className="overflow-y-auto max-h-80"> {/* max-h 값을 64에서 80으로 증가 */}
            {queries.map((query, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="font-bold text-lg mb-2">[{query.query}] {query.content}</p>
                <p className="text-sm text-gray-500">{query.date}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end"> {/* "더보기" 버튼을 오른쪽으로 정렬 */}
            <button className="mt-4 text-blue-500 hover:underline">더보기</button>
          </div>
        </div>
        <div className="col-span-1">
          <AdminProfile admin={selectedAdmin} admins={admins} onSelectAdmin={setSelectedAdmin} />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
