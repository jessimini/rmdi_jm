import React, { useState, useEffect } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { read, utils } from 'xlsx';
import { Bar } from 'react-chartjs-2';
import exampleImage from '../assets/img/image.png';
import existingDataFile from '../assets/extended_healthcheckup.xlsx';
import 'chart.js/auto';

const BarLineChartComponent = ({ label, barData, lineData, barVisible, lineVisible, fullWidth }) => {
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
    scales: {
      x: {
        barPercentage: 0.4,
        categoryPercentage: 0.4,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false,
  };

  const metricNameMapping = {
    height: '키',
    weight: '체중',
    fasting_blood_sugar: '공복 혈당',
    total_cholesterol: '총 콜레스테롤',
    TG: '중성지방',
    HDL: 'HDL 콜레스테롤',
    LDL: 'LDL 콜레스테롤',
    ast: 'AST 간수치',
    alt: 'ALT 간수치',
    gtp: 'GTP 간수치'
  };

  const translatedLabel = metricNameMapping[label] || label;

  return (
    <div className="chart-container" style={{ height: '300px', width: fullWidth ? '100%' : 'auto' }}>
      <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>{translatedLabel}</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

const DataManagement = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMetric, setSelectedMetric] = useState('');
  const [file, setFile] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const [years, setYears] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    const loadExistingData = async () => {
      try {
        const response = await fetch(existingDataFile);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const arrayBuffer = await response.arrayBuffer();
        const workbook = read(arrayBuffer, { type: 'array' });
        if (!workbook.SheetNames.length) {
          throw new Error('No sheets found in the workbook');
        }
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const existingData = utils.sheet_to_json(worksheet);
        console.log("Loaded existing data:", existingData);
        setJsonData(existingData);

        updateYearsAndMetrics(existingData);
      } catch (error) {
        console.error("Error loading existing data:", error);
      }
    };

    loadExistingData();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const newData = utils.sheet_to_json(worksheet);
      console.log("Loaded new data:", newData);

      const mergedData = [...jsonData, ...newData];
      console.log("Merged data:", mergedData);
      setJsonData(mergedData);

      updateYearsAndMetrics(mergedData);

      alert('파일이 업로드되었습니다.');
    };
    reader.readAsArrayBuffer(file);
  };

  const updateYearsAndMetrics = (data) => {
    const years = [...new Set(data.map((row) => row.year))].sort((a, b) => a - b);
    const metrics = Object.keys(data[0]).filter((key) => !['check_num', 'patient_num', 'patient_name', 'year'].includes(key));
    setYears(years);
    setMetrics(metrics);
    console.log("Updated years:", years);
    console.log("Updated metrics:", metrics);
  };

  const fetchDataByMetric = () => {
    if (!jsonData.length) {
      alert('먼저 파일을 업로드해주세요.');
      return;
    }

    if (!selectedMetric) {
      alert('조회할 지표를 선택해주세요.');
      return;
    }
    setIsSearched(true);

    const averages = jsonData.reduce((acc, record) => {
      const year = record.year;
      if (!acc[year]) {
        acc[year] = { sum: 0, count: 0 };
      }
      acc[year].sum += record[selectedMetric];
      acc[year].count += 1;
      return acc;
    }, {});

    const processedData = Object.keys(averages).map(year => ({
      label: year,
      value: parseFloat((averages[year].sum / averages[year].count).toFixed(3)) // 소수점 3자리까지만 표시
    }));

    const barLineData = {
      label: selectedMetric,
      barData: processedData,
      lineData: processedData
    };

    setChartData([barLineData]);
  };

  const fetchDataByDate = () => {
    if (!jsonData.length) {
      alert('먼저 파일을 업로드해주세요.');
      return;
    }

    if (!selectedYear) {
      alert('조회할 연도를 선택해주세요.');
      return;
    }
    setIsSearched(true);

    const yearData = jsonData.filter(record => record.year.toString() === selectedYear);

    const averages = metrics.reduce((acc, metric) => {
      const metricData = yearData.map(record => record[metric]);
      const sum = metricData.reduce((a, b) => a + b, 0);
      const average = sum / metricData.length;
      acc[metric] = parseFloat(average.toFixed(3)); // 소수점 3자리로 수정
      return acc;
    }, {});

    const processedData = Object.keys(averages).map(metric => ({
      label: metric,
      barData: [{ label: selectedYear, value: averages[metric] }],
      lineData: [{ label: selectedYear, value: averages[metric] }]
    }));

    setChartData(processedData);
  };
  
  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">건강검진 데이터 관리하기</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">연도 선택</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                disabled={!years.length}
              >
                <option value="">연도 선택</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">지표 선택</label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                disabled={!metrics.length}
              >
                <option value="">지표 선택</option>
                {metrics && metrics.length > 0 && metrics.map((metric) => (
                  <option key={metric} value={metric}>
                    {metric}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">데이터 추가</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <div className="mt-2 flex items-start text-sm text-gray-500">
                <AiOutlineExclamationCircle className="mt-1 mr-2" />
                <div>
                  <p>csv, excel 형식의 데이터 파일만 업로드할 수 있습니다.</p>
                  <p>아래 이미지에 나타난 형식에 맞는 데이터 파일만 적용 가능합니다.</p>
                </div>
              </div>
              <img src={exampleImage} alt="데이터 파일 예시" className="mt-4 border rounded-md" />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="mt-4 flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                업로드
              </button>
            </div>
          </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">그래프로 평균 확인하기</h2>
          <div className="flex space-x-4 mb-4">
            <button
              type="button"
              onClick={fetchDataByMetric}
              className="flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              지표별 조회
            </button>
            <button
              type="button"
              onClick={fetchDataByDate}
              className="flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              연도별 조회
            </button>
          </div>
          {isSearched && chartData.length > 0 ? (
            <div className={`chart-display-area ${chartData.length === 1 ? '' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
              {chartData.map((data, index) => (
                <BarLineChartComponent
                  key={index}
                  label={data.label}
                  barData={data.barData}
                  lineData={data.lineData}
                  barVisible={true}
                  lineVisible={true}
                  fullWidth={chartData.length === 1}
                />
              ))}
            </div>
          ) : (
            <p>조회된 데이터가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataManagement;
