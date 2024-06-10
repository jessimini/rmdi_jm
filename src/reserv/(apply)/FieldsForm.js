import { useEffect, useState } from 'react';
import FieldsCard from './FieldsCard';

const fields = [
  {
    id: 0,
    field: '간담췌외과',
    doctor: '이익준교수', 
    keyword: '간담췌외과',
  },
  {
    id: 1,
    field: '흉부외과',
    doctor: '김준완교수',
    keyword: '흉부외과',
  },
  {
    id: 2,
    field: '신경외과',
    doctor: '채송화교수',
    keyword: '신경외과',
  },
  {
    id: 3,
    field: '산부인과',
    doctor: '양석형교수',
    keyword: '산부인과',
  },
  {
    id: 4,
    field: '소아외과',
    doctor: '안정원교수',
    keyword: '소아외과',
  },
];

export default function FieldsForm({ formData, setFormData }) {
  const [selectedField, setSelectedField] = useState(formData.field || '');

  useEffect(() => {
    // 선택된 field에 해당하는 doctor 찾기
    const selectedDoctor = fields.find(field => field.field === selectedField)?.doctor || '';
    
    // formData 업데이트 시 field와 doctor 값을 함께 설정
    setFormData({ ...formData, field: selectedField, doctor: selectedDoctor });
  }, [selectedField, setFormData]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full">
        <span className="text-2xl text-[#657786]">01</span>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between">
        <div className="md:w-[40%] pt-10">
          <span className="text-[5vw] md:text-2xl xl:text-3xl font-semibold">
            진료과를 선택해주세요.
          </span>
        </div>
        <div className="md:w-[60%]">
          {fields.map((field, idx) => {
            return (
              <FieldsCard
                key={idx}
                field={field}
                index={idx}
                setSelectedField={setSelectedField}
                selectedField={selectedField}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
