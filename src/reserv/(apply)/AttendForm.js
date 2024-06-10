import { useEffect, useState } from 'react';

export default function AttendForm({ setFormData, formData }) {
  const [selectedGrade, setSelectedGrade] = useState(formData.grade);
  const [selectedSemester, setSelectedSemester] = useState(formData.semester);
  const [selectedAttend, setSelectedAttend] = useState(formData.attend);
  const grades = ['당일', '이틀 전', '일주일 전', '한 달 전'];
  const semesters = ['없음', '있음'];
  const attends = ["가능", "불가능"];

  useEffect(() => {
    setFormData({
      ...formData,
      grade: selectedGrade,
      semester: selectedSemester,
      attend: selectedAttend,
    });
  }, [selectedGrade, selectedAttend, selectedSemester]);

  return (
    <div className="flex flex-col w-full font-suit">
      <div className="w-full">
        <span className="text-2xl text-[#657786]">04</span>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between pb-20">
        <div className="md:w-[40%] pt-10">
          <span className="text-[5vw] md:text-2xl xl:text-3xl font-semibold">
            자신의 현재 상태를 입력해주세요.
          </span>
        </div>
        <div className="md:w-[60%] xl:w-[60%] 2xl:w-[45%] font-pretend">
          <div className="flex flex-row items-start justify-between pt-10">
            <label className="w-[30%] text-[#8A9FB1]">현재 겪고 있는 증상이 시작된 시점은 언제입니까?</label>
            <div className="grid grid-cols-2 w-[70%] gap-4 gap-y-6">
              {grades.map((grade, idx) => {
                return (
                  <GradeCard
                    key={idx}
                    grade={grade}
                    setSelectedGrade={setSelectedGrade}
                    selectedGrade={selectedGrade}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-row items-start justify-between pt-10">
            <label className="w-[30%] text-[#8A9FB1]">해당과에서 진료를 받은 경험이 있습니까?</label>
            <div className="grid grid-cols-2 w-[70%] gap-4 gap-y-6">
              {semesters.map((semester, idx) => {
                return (
                  <SemesterCard
                    key={idx}
                    semester={semester}
                    setSelectedSemester={setSelectedSemester}
                    selectedSemester={selectedSemester}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-row items-start justify-between pt-10">
            <label className="w-[30%] text-[#8A9FB1]">다가오는 이틀 내에 병원 방문이 가능하십니까?</label>
            <div className="grid grid-cols-2 w-[70%] gap-4 gap-y-6">
              {attends.map((attend, idx) => {
                return (
                  <AttendCard
                    key={idx}
                    attend={attend}
                    setSelectedAttend={setSelectedAttend}
                    selectedAttend={selectedAttend}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GradeCard({ grade, selectedGrade, setSelectedGrade }) {
  return (
    <div
      onClick={(e) => {
        setSelectedGrade(grade);
      }}
      className="w-full cursor-pointer font-pretend"
    >
      <div
        className={`flex flex-col items-center space-y-3 pb-3  ${
          selectedGrade === grade ? 'text-[#14171A]' : 'text-[#8A9FB1]'
        }`}
      >
        <span className="text-xl">{grade}</span>
      </div>
      <hr
        className={`border-0 h-[1px] ${
          selectedGrade === grade ? 'bg-[#14171A]' : 'bg-[#C8D3DA]'
        }`}
      />
    </div>
  );
}

function SemesterCard({ semester, selectedSemester, setSelectedSemester }) {
  return (
    <div
      onClick={(e) => {
        setSelectedSemester(semester);
      }}
      className="w-full cursor-pointer font-pretend"
    >
      <div
        className={`flex flex-col items-center space-y-3 pb-3  ${
          selectedSemester === semester ? 'text-[#14171A]' : 'text-[#8A9FB1]'
        }`}
      >
        <span className="text-xl">{semester}</span>
      </div>
      <hr
        className={`border-0 h-[1px] ${
          selectedSemester === semester ? 'bg-[#14171A]' : 'bg-[#C8D3DA]'
        }`}
      />
    </div>
  );
}

function AttendCard({ attend, setSelectedAttend, selectedAttend }) {
  return (
    <div
      onClick={(e) => {
        setSelectedAttend(attend);
      }}
      className="w-full cursor-pointer font-pretend"
    >
      <div
        className={`flex flex-col items-center space-y-3 pb-3  ${
          selectedAttend === attend ? 'text-[#14171A]' : 'text-[#8A9FB1]'
        }`}
      >
        <span className="text-xl">{attend}</span>
      </div>
      <hr
        className={`border-0 h-[1px] ${
          selectedAttend === attend ? 'bg-[#14171A]' : 'bg-[#C8D3DA]'
        }`}
      />
    </div>
  );
}
