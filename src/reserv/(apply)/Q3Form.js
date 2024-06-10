import { useState } from 'react';

export default function Q3Form({ setFormData, formData }) {
  return (
    <div className="flex flex-col w-full font-suit">
      <div className="w-full">
        <span className="text-2xl text-[#657786]">07</span>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between pb-20">
        <div className="flex flex-col md:w-[40%] pt-10 justify-between">
          <div className="flex flex-col">
            <span className="text-[5vw] md:text-2xl xl:text-3xl font-semibold">
            현재 임신 중이거나 알레르기가 있는 약물, 음식, 또는 환경에 대해 알고 계신다면 설명해 주십시오.
            </span>
          </div>
        </div>
        <div className="md:w-[60%] xl:w-[60%] 2xl:w-[45%] font-pretend">
          <div className="flex flex-row items-center justify-between pt-10">
            <textarea
              name="q3"
              type="text"
              required
              value={formData.q3}
              onChange={(e) => setFormData({ ...formData, q3: e.target.value })}
              className="border-b border-t py-4 w-full resize-none outline-none placeholder:text-[#C8D3DA] min-h-[300px] text-[#14171A]"
              placeholder="내용을 입력해주세요."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
