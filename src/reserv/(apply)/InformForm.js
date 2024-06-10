export default function InformForm({ setFormData, formData }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  return (
    <div className="flex flex-col w-full font-suit">
      <div className="w-full">
        <span className="text-2xl text-[#657786]">03</span>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between">
        <div className="md:w-[40%] pt-10">
          <span className="text-[5vw] md:text-2xl xl:text-3xl font-semibold">
            인적 사항을 입력해주세요.
          </span>
        </div>
        <div className="md:w-[60%] xl:w-[60%] 2xl:w-[45%] font-pretend">
          <div className="flex flex-row items-center justify-between pt-10">
            <label className="w-[30%] text-[#8A9FB1]">이름</label>
            <input
              name="name"
              type="text"
              required
              value={formData.name}
              onKeyDown={handleKeyDown}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border-b p-2 w-[70%] outline-none placeholder:text-[#C8D3DA] text-[#14171A]"
              placeholder="이름을 입력해주세요."
            />
          </div>
          <div className="flex flex-row items-center justify-between pt-10">
            <label className="w-[30%] text-[#8A9FB1]">성별</label>
            <input
              name="sex"
              type="text"
              required
              value={formData.sex}
              onKeyDown={handleKeyDown}
              onChange={(e) =>
                setFormData({ ...formData, sex: e.target.value })
              }
              className="border-b p-2 w-[70%] outline-none placeholder:text-[#C8D3DA] text-[#14171A]"
              placeholder="성별을 입력해주세요. (남자 or 여자)"
            />
          </div>
          <div className="flex flex-row items-center justify-between pt-10">
            <label className="w-[30%] text-[#8A9FB1]">생년월일</label>
            <input
              name="birth"
              type="text"
              required
              value={formData.birth}
              onKeyDown={handleKeyDown}
              onChange={(e) =>
                setFormData({ ...formData, birth: e.target.value })
              }
              className="border-b p-2 w-[70%] outline-none placeholder:text-[#C8D3DA] text-[#14171A]"
              placeholder="생년월일을 입력해주세요. (ex-1999.01.01)"
            />
          </div>
          <div className="flex flex-row items-center justify-between pt-10">
            <label className="w-[30%] text-[#8A9FB1]">연락처</label>
            <input
              name="phone"
              type="text"
              required
              value={formData.phone}
              onKeyDown={handleKeyDown}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="border-b p-2 w-[70%] outline-none placeholder:text-[#C8D3DA] text-[#14171A]"
              placeholder="연락처를 입력해주세요."
            />
          </div>
          <div className="flex flex-row items-center justify-between pt-10">
            <label className="w-[30%] text-[#8A9FB1]">이메일</label>
            <input
              name="email"
              type="text"
              required
              value={formData.email}
              onKeyDown={handleKeyDown}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border-b p-2 w-[70%] outline-none placeholder:text-[#C8D3DA] text-[#14171A]"
              placeholder="이메일을 입력해주세요."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
