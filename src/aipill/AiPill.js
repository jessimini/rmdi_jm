import React, { useState } from 'react';
import axios from 'axios';

const AiPill = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [drugInfo, setDrugInfo] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file);

    console.log("File uploaded:", file);

    try {
      const response = await axios.post('http://localhost:8000/aipill/AiPill', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Server response:", response.data);
      setDrugInfo(response.data);
    } catch (error) {
      console.error('Error fetching drug info:', error);
      setDrugInfo(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <img 
        src={require('../../src/assets/img/AiPill.png')} 
        alt="AiPill"
        className="ml-20 mb-8" 
      />
      <div className="flex space-x-14">
        <div className="flex flex-col items-center mb-20">
          <label className="text-5xl font-semibold text-gray-700 mb-4">약 이미지 업로드</label>
          <div className="relative w-80">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="flex items-center justify-center h-24 border-4 border-dashed border-gray-300 rounded-lg bg-white text-gray-500 hover:border-blue-500 hover:text-blue-500 transition duration-300 text-lg">
              파일 선택
            </div>
          </div>
        </div>
        <div className="text-gray-500 text-xl w-90 mt-10 ">
          <p className="font-semibold mb-2">AI가 약물 이미지를 더욱 잘 인식하기 위해, 다음 사항을 유의해 주세요 :</p>
          <ol className="list-decimal list-inside">
            <li className="mb-1">정면에서 촬영: 약물을 정면에서 똑바로 찍어 주세요.</li>
            <li className="mb-1">배경 정리: 주변에 다른 물건이 없도록 약물만 나오게 찍어 주세요.</li>
            <li>선명하게 촬영: 약물이 선명하게 보이도록 사진을 찍어 주세요.</li>
          </ol>
        </div>
      </div>
      <div className='flex w-full'>
        {selectedFile && drugInfo && (
          <div className="flex flex-col items-center mt-8 pt-4 w-1/2">
            <img src={drugInfo.img_key} alt="Selected Pill" className="w-50" />
            <label className="text-xl mt-3 font-semibold text-center text-gray-700 mb-4">식품의약품안전처의 이미지</label>
          </div>
        )}
        {drugInfo && (
          <div className="flex flex-col text-gray-700 bg-gray-100 p-5 rounded-lg shadow-md mt-8 mb-12 ">
            <p className="font-semibold text-2xl mb-4 text-center">제품 기본정보</p>
            <p className='text-xl'><span className="font-semibold">약 이름 : </span>{drugInfo.dl_name}</p>
            <p className='text-xl'><span className="font-semibold">약 이름(영문) : </span>{drugInfo.dl_name_en}</p>
            <hr className="my-2 border-gray-300" />
            <p className='text-xl'><span className="font-semibold">성 분 : </span>{drugInfo.dl_material}</p>
            <p className='text-xl'><span className="font-semibold">성 분(영문) : </span>{drugInfo.dl_material_en}</p>
            <hr className="my-2 border-gray-300" />
            <p className='text-xl'><span className="font-semibold">제조사 : </span>{drugInfo.dl_company}</p>
            <hr className="my-2 border-gray-300" />
            <p className='text-xl'><span className="font-semibold">전문/일반의약품코드 : </span>{drugInfo.di_etc_otc_code}</p>
            <hr className="my-2 border-gray-300" />
            <p className='text-xl'><span className="font-semibold">분류번호 : </span>{drugInfo.di_class_no}</p>
            <hr className="my-2 border-gray-300" />
            <p className='text-xl'><span className="font-semibold">형태 : </span>{drugInfo.chart}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AiPill;

