import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

const averages = {
  fastingbloodsugar: 104.17,
  total_cholesterol: 192.4,
  TG: 148.89,
  HDL: 52.66,
  LDL: 112.68,
  ast: 22,
  alt: 17.94,
  gtp: 22.23
};

const BarLineChartComponent = ({ label, barData, lineData, barVisible, lineVisible }) => {
  const chartData = {
    labels: barData?.map(d => d.label),
    datasets: [
      {
        type: 'bar',
        label: 'Bar Dataset',
        data: barData?.map(d => d.value),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hidden: !barVisible,
        average:averages[label]
      },
      {
        type: 'line',
        label: 'Line Dataset',
        data: lineData?.map(d => d.value),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hidden: !lineVisible,
      }
    ],
  };


  const options = {
    scales: {
      x: {
        // 이 설정을 통해 같은 카테고리 내에서 바의 너비를 조절합니다.
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      datalabels: {
        align: 'end',
        color: '#555',
        font: {
          weight: 'bold'
        },
        formatter: (value, context) => {
          // `context` 객체를 사용하여 현재 데이터 포인트의 위치를 확인
          if (context.dataset.type === 'bar') {
            return value; // 바 차트의 경우, 값 표시
          }
          return null; // 라인 차트 또는 다른 조건의 경우, 레이블 숨김
        }
      }
    }
  };

  const metricNameMapping = {
    height: '키',
    weight: '체중',
    fastingbloodsugar: '공복 혈당',
    total_cholesterol: '총 콜레스테롤',
    TG: '중성지방',
    HDL: 'HDL 콜레스테롤',
    LDL: 'LDL 콜레스테롤',
    ast: 'AST 간수치',
    alt: 'ALT 간수치',
    gtp: 'GTP 간수치'
    // 여기에 더 많은 지표와 매핑을 추가할 수 있습니다.
  };

  // 매핑된 이름을 찾거나 기본 label을 사용합니다.
  const translatedLabel = metricNameMapping[label] || label;

  return (
    <div className="chart-container">
      <h3 className='text-center font-bold'>{translatedLabel}</h3> {/* 지표명을 표시합니다. */}
      <Bar data={chartData} options={options} />
    </div>
  );
};

// 지표별 컨포넌트 
const LargeBarLineChartComponent = ({ label, barData, lineData, barVisible, lineVisible }) => {
  const chartData = {
    labels: barData?.map(d => d.label),
    datasets: [
      {
        type: 'bar',
        label: 'Bar Dataset',
        data: barData?.map(d => d.value),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hidden: !barVisible,
      },
      {
        type: 'line',
        label: 'Line Dataset',
        data: lineData?.map(d => d.value),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hidden: !lineVisible,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      datalabels: {
        align: 'end',
        color: '#555',
        font: {
          weight: 'bold'
        },
        formatter: (value, context) => {
          // `context` 객체를 사용하여 현재 데이터 포인트의 위치를 확인
          if (context.dataset.type === 'bar') {
            return value; // 바 차트의 경우, 값 표시
          }
          return null; // 라인 차트 또는 다른 조건의 경우, 레이블 숨김
        }
      }
    }
  };
  
  const metricNameMapping = {
    height: '키',
    weight: '체중',
    fastingbloodsugar: '공복 혈당',
    total_cholesterol: '총 콜레스테롤',
    TG: '중성지방',
    HDL: 'HDL 콜레스테롤',
    LDL: 'LDL 콜레스테롤',
    ast: 'AST 간수치',
    alt: 'ALT 간수치',
    gtp: 'GTP 간수치'
    // 여기에 더 많은 지표와 매핑을 추가할 수 있습니다.
  };

  const translatedLabel = metricNameMapping[label] || label;

  return (
    <div className="pt-5 pb-8" style={{ width: '1000px', height: '500px' }}>
      <h3 className='text-xl text-center font-bold pb-2'>{translatedLabel}</h3>
      <Bar data={chartData} options={options} />
      <br></br><br></br><br></br>
    </div>
  );
};



const MedicalRecordChart = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMetric, setSelectedMetric] = useState('');
  const [chartData, setChartData] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [barVisible, setBarVisible] = useState(true);
  const [lineVisible, setLineVisible] = useState(true);

  const barData = []; // 바 그래프 데이터
  const lineData = []; // 꺾은선 그래프 데이터

  // 3개씩 분할하는 함수
  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  // 지표별로 데이터를 가져오는 함수
  const fetchDataByMetric = async () => {
    if (!selectedMetric) {
      alert('조회할 지표를 선택해주세요.');
      return;
    }
    setIsSearched(true);
  
    try {
      // const response = await fetch('/data/healthcheck.json');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
      // 백엔드 API로부터 데이터 가져오기
      const response = await fetch(`${apiUrl}/api/healthcheckup/PatientHealthcheckup`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const fetchedRecords = await response.json();
  
      const processedData = fetchedRecords.map(record => ({
        label: record.year,
        value: record[selectedMetric]
      }));
      
      // 모든 연도에 대한 해당 지표 값 배열 생성
      const barLineData = {
        label: selectedMetric,
        barData: processedData,
        lineData: processedData
      };

      setChartData([barLineData]);
  } catch (error) {
    console.error("Fetching records by metric failed:", error);
    alert("데이터를 가져오는 중 문제가 발생했습니다. 나중에  다시 시도해주세요.");
  }
};

  // 연도별로 데이터를 가져오는 함수
  const fetchDataByDate = async () => {
    if (!selectedDate) {
      alert('조회할 연도를 선택해주세요.');
      return;
    }
    setIsSearched(true);

    try {

      const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiUrl}/api/healthcheckup/PatientHealthcheckup`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedRecords = await response.json(); // 데이터를 JSON으로 변환합니다.
      const yearRecord = fetchedRecords.find(record => record.year.toString() === selectedDate); // 선택된 연도에 해당하는 데이터를 찾습니다.

      // 연도별 모든 지표에 대한 데이터 배열 생성
      const processedData = Object.keys(yearRecord)
      .filter(key => key !== 'year' && key !== 'check_num' && key !== 'patient_num' && key !== 'patient_name') // 불필요한 키 제외
      .map(metric => {
        return {
          label: metric,
          barData: [{ label: selectedDate, value: yearRecord[metric] }],
          lineData: [{ label: selectedDate, value: yearRecord[metric] }]
        };
      });

        // 전체 차트 데이터 설정
        setChartData(processedData);
      } catch (error) {
        console.error("Fetching records by date failed:", error);
        alert("데이터를 가져오는 중 문제가 발생했습니다. 나중에 다시 시도해주세요.");
      }
    };

return (
  <div className="flex flex-col items-center">
    <div className="medical-record-chart-container">
      <h2 className="text-center pt-10 pb-10" style={{ fontSize: '2em', fontWeight: 'bold'}}>
        당신의 건강, <br /> 우리 기술로 더 가까이
      </h2>
      <h4 className="text-xl text-center mx-3 mb-6">
        현재까지의 본인의 건강검진 결과를 한눈에 확인해보세요.<br></br>
        당신의 건강 기록을 연도별 및 지표별로 확인하고, 시각적 분석을 통해 자신의 건강 변화를 추적하세요.
      </h4>
      <br></br><br></br>
        
      <div className='flex justify-evenly items-center mb-6 mt-6 '>
        <div className='flex items-center space-x-4'>
          <input
            className='border py-3 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-auto min-w-[150px]'
            type="number"
            id="year-select"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min="2009"
            max="2023"
            placeholder="연도 입력"
          />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4'  // 패딩 조정
          onClick={fetchDataByDate}>연도별 조회
        </button> 
      </div>
        
        <div className='flex items-center'>
          <select
            className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-auto'
            id="metric-select"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
          >
            <button onClick={() => setBarVisible(!barVisible)}>바 그래프 토글</button>
            <button onClick={() => setLineVisible(!lineVisible)}>꺾은선 그래프 토글</button>
              <option value="" disabled selected>지표 선택</option>
              <option value="height">키</option>
              <option value="weight">체중</option>
              <option value="fastingbloodsugar">공복 혈당</option>
              <option value="total_cholesterol">총 콜레스테롤</option>
              <option value="TG">중성지방</option>
              <option value="HDL">HDL</option>
              <option value="LDL">LDL</option>
              <option value="ast">AST</option>
              <option value="alt">ALT</option>
              <option value="gtp">GTP</option>
            </select>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded  ml-4'
              onClick={fetchDataByMetric}>지표별 조회
            </button>
          </div>
        </div> {/* 이 닫는 div 태그가 추가되었습니다. */}
      </div>
    
      {isSearched && chartData.length > 1 && (
        <>
          <br></br>
          <h4 className="text-2xl font-bold text-center mx-3 mb-6">
            국민건강보험공단의 건강검진 데이터 평균과 <br></br>
            당신의 건강검진 데이터를 비교해보세요!
          </h4>
          
          <div className="flex justify-center pb-4 font-bold mb-5">
            {/* 첫 번째 테이블 */}
            <div className="border border-zinc-950 mr-10">
              <table className="text-m text-left text-gray-500">
                <thead className="text-xs text-gray-700 text-center uppercase bg-gray-50 ">
                  <tr className='bg-slate-400 '>
                    <th scope="col" className="px-6 py-3 border-r">지표 이름</th>
                    <th scope="col" className="px-6 py-3 border-r">측정 값</th>
                    <th scope="col" className="px-6 py-3 border-r">평균</th>
                    <th scope="col" className="px-6 py-3">차이</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.filter(data => data.label !== "height" && data.label !== "weight").slice(0, 4).map((data, index) => (
                    <tr className="bg-white border-b text-center" key={index}>
                      <td className="px-6 py-4 font-medium text-gray-900 border-r">{data.label}</td>
                      <td className="px-6 py-4 border-r">{data.barData[data.barData.length - 1].value}</td>
                      <td className="px-6 py-4 border-r">{averages[data.label]}</td>
                      <td className="px-6 py-4">{(data.barData[data.barData.length - 1].value - averages[data.label]).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 두 번째 테이블 */}
            <div className="border border-zinc-950">
              <table className="text-m text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase text-center bg-gray-50">
                  <tr className='bg-slate-400'>
                    <th scope="col" className="px-6 py-3 border-r">지표 이름</th>
                    <th scope="col" className="px-6 py-3 border-r">측정 값</th>
                    <th scope="col" className="px-6 py-3 border-r">평균</th>
                    <th scope="col" className="px-6 py-3">차이</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.filter(data => data.label !== "height" && data.label !== "weight").slice(4, 8).map((data, index) => (
                    <tr className="bg-white border-b text-center" key={index}>
                      <td className="px-6 py-4 font-medium text-gray-900 border-r">{data.label}</td>
                      <td className="px-6 py-4 border-r">{data.barData[data.barData.length - 1].value}</td>
                      <td className="px-6 py-4 border-r">{averages[data.label]}</td>
                      <td className="px-6 py-4">{(data.barData[data.barData.length - 1].value - averages[data.label]).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <h4 className="text-2xl font-bold text-center mx-3 mb-6">
            당신의 건강검진 데이터 시각화 차트입니다.
          </h4>
          {/* 차트 표시 */}
          <div className="flex justify-around items-start mb-4 mt-2">
            {chartData.filter(data => data.label === "height" || data.label === "weight").map((data, index) => (
              <BarLineChartComponent
                key={index}
                label={data.label}
                barData={data.barData}
                lineData={data.lineData}
                barVisible={barVisible}
                lineVisible={lineVisible}
              />
            ))}
          </div>

          {/* 나머지 데이터: 4개씩 나눠서 */}
          {Array.from({ length: Math.ceil((chartData.length - 2) / 4) }).map((_, lineIndex) => (
            <div className="flex flex-wrap justify-evenly items-start mb-4">
              {chartData.filter(data => data.label !== "height" && data.label !== "weight").slice(lineIndex * 4, (lineIndex + 1) * 4).map((data, index) => (
                <BarLineChartComponent
                  key={index}
                  label={data.label}
                  barData={data.barData}
                  lineData={data.lineData}
                  barVisible={barVisible}
                  lineVisible={lineVisible}
                />
              ))}
            </div>
          ))}
        </>
      )}


      {/* 지표별 */}
      {isSearched && chartData.length === 1 && (
        <>
          {chartData.map((data, index) => (
            <LargeBarLineChartComponent
              key={index}
              label={data.label}
              barData={data.barData}
              lineData={data.lineData}
              barVisible={barVisible}
              lineVisible={lineVisible}
            />
          ))}
        
        </>
      )}
    </div>
  );
};

export default MedicalRecordChart;
