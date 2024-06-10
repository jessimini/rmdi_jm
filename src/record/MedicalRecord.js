// MedicalRecord.js
import React from 'react';

//const MedicalRecord = ({ id, patientName, date, condition, ...otherProps }) => {
const MedicalRecord = (props) => {
  // 이 예시에서는 id, patientName, date, condition 등의 속성을 기록에서 사용한다고 가정합니다.
  return (
    <div className="flex w-full">
      <div className='flex flex-row w-full justify-center pb-5'>
        <div className='flex flex-col p-4 justify-center items-center border-r border-gray-300'>
          <div className='flex flex-col align-center items-center text-center p-2 gap-2'>
            <h3 className='text-3xl font-bold pb-3'>Patient</h3>
            <img src='/img/record_patient.png' className="w-50 h-55"/>
            <span className='font-bold text-xl'>환자 ID : {props.record.patient_num}</span>
            <span className='font-bold text-xl'>이름 : {props.record.patient_name}</span>
          </div>
          <div className='flex flex-col align-center items-center text-center p-2 pt-5 gap-2'>
            <h3 className='text-3xl font-bold pb-3'>Doctor</h3>
            <img src='/img/record_doctor.png' className="w-50 h-55"/>
            <p className='font-bold text-xl'>의사 이름 : {props.record.doctor_name}</p>
            <p className='font-bold text-xl'>진료 과 : {props.record.department}</p>
            <p className='font-bold text-xl'>병원 이름 : {props.record.hospital_name}</p>
          </div>
        </div>
        <div className='flex flex-col p-4 w-[70%]'>
          <h3 className='text-3xl p-2 font-bold text-center'>진료 일시 : {props.record.treatment_date}</h3>  
          <hr/>
          <div className='flex flex-col justify-center h-full'>
            <div className='flex flex-col pb-6 pt-10'>
              <div className='flex flex-row pb-6 pt-6'>
                <img src='/img/record_report.png' className='w-[30px] h-[30px]'/>
                <h3 className='text-2xl font-bold'>Medical Record</h3>
              </div>
              <div className='flex bg-white p-4 rounded-lg text-xl'>
              {props.record.diagnosis}
              </div>
            </div>
            <hr/>
            <div className='flex flex-col pb-6 pt-10'>
              <div className='flex flex-row pb-6 pt-6'>
                  <img src='/img/record_medicines.png' className='w-[30px] h-[30px]' />
                  <h3 className='text-2xl font-bold'>Prescription</h3>
              </div>
              <div className='flex bg-white p-4 rounded-lg text-xl'>
              {props.record.prescription}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalRecord;
