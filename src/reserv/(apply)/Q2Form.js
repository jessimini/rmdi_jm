// import { useState } from 'react';

// export default function Q2Form({ setFormData, formData }) {
//   return (
//     <div className="flex flex-col w-full font-suit">
//       <div className="w-full">
//         <span className="text-2xl text-[#657786]">06</span>
//       </div>
//       <div className="flex flex-col md:flex-row w-full justify-between pb-20">
//         <div className="flex flex-col md:w-[40%] pt-10 justify-between">
//           <div className="flex flex-col">
//             <span className="text-[5vw] md:text-2xl xl:text-3xl font-semibold">
//               현재 정기적으로 또는 필요시 복용하고 있는 모든 약물의 이름, 복용량, 복용 횟수를 작성해 주십시오.
//             </span>
//           </div>
//         </div>
//         <div className="md:w-[60%] xl:w-[60%] 2xl:w-[45%] font-pretend">
//           <div className="flex flex-row items-center justify-between pt-10">
//             <textarea
//               name="q2"
//               type="text"
//               required
//               value={formData.q2}
//               onChange={(e) => setFormData({ ...formData, q2: e.target.value })}
//               className="border-b border-t py-4 w-full resize-none outline-none placeholder:text-[#C8D3DA] min-h-[300px] text-[#14171A]"
//               placeholder="내용을 입력해주세요."
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from 'react';

export default function Q2Form({ setFormData, formData }) {

  return (
    <div className="flex flex-col w-full font-suit">
      <div className="w-full">
        <span className="text-2xl text-[#657786]">06</span>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between pb-20">
        <div className="flex flex-col md:w-[40%] pt-10 justify-between">
          <div className="flex flex-col">
            <span className="text-[5vw] md:text-2xl xl:text-3xl font-semibold">
              진료를 원하는 날짜와 시간을 입력해 주십시오.
            </span>
          </div>
        </div>
        <div className="md:w-[60%] xl:w-[60%] 2xl:w-[45%] font-pretend">
          <div className="flex flex-col items-start justify-between pt-10 gap-4">
            <label htmlFor="Date" className="text-[#8A9FB1]">날짜:</label>
            <input
              id="Date"
              name="Date"
              type="date"
              value={formData.Date || ''}
              onChange={(e) => setFormData({ ...formData, Date: e.target.value })}
              className="border py-2 px-4 w-full outline-none placeholder:text-[#C8D3DA] text-[#14171A]"
            />
            <label htmlFor="Time" className="text-[#8A9FB1]">시간:</label>
            <input
              id="Time"
              name="Time"
              type="time"
              value={formData.Time || ''}
              onChange={(e) => setFormData({ ...formData, Time: e.target.value })}
              className="border py-2 px-4 w-full outline-none placeholder:text-[#C8D3DA] text-[#14171A]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
