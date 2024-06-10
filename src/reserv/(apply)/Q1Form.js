import { useState } from 'react';

export default function Q1Form({ setFormData, formData }) {
  return (
    <div className="flex flex-col w-full font-suit">
      <div className="w-full">
        <span className="text-2xl text-[#657786]">05</span>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between pb-20">
        <div className="flex flex-col md:w-[40%] pt-10 justify-between">
          <div className="flex flex-col">
            <span className="text-[5vw] md:text-2xl xl:text-3xl font-semibold">
              현재 경험하고 있는 증상과 통증의 정도, 위치를 구체적으로 설명해 주십시오.
            </span>
            <br />
            <span className="text-[#8A9FB1]">
              (통증이 있다면, 그 정도를 0부터 10까지의 척도로 평가해 주십시오.)
            </span>
          </div>
          <br />

          <span className="text-[#8A9FB1]">
            없을 경우 "없음"으로 기재해주세요.
          </span>
        </div>
        <div className="md:w-[60%] xl:w-[60%] 2xl:w-[45%] font-pretend">
          <div className="flex flex-row items-center justify-between pt-10">
            <textarea
              name="q1"
              type="text"
              required
              value={formData.q1}
              onChange={(e) => setFormData({ ...formData, q1: e.target.value })}
              className="border-b border-t py-4 w-full resize-none outline-none placeholder:text-[#C8D3DA] min-h-[300px] text-[#14171A]"
              placeholder="내용을 입력해주세요."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
