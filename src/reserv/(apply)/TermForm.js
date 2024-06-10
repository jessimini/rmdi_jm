
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function TermForm({ formData, setFormData }) {
  const [selectedInformTerm, setSelectedInformTerm] = useState(
    formData.informTerm
  );
  const [viewInformTerm, setViewInformTerm] = useState(false);
  const [selectedPortfolioTerm, setSelectedPortfolioTerm] = useState(
    formData.portfolioTerm
  );
  const [viewPortfolioTerm, setViewPortfolioTerm] = useState(false);

  const informTerms = [true, false];
  const portfolioTerms = [true, false];

  useEffect(() => {
    setFormData({
      ...formData,
      informTerm: selectedInformTerm,
      portfolioTerm: selectedPortfolioTerm,
    });
  }, [selectedInformTerm, selectedPortfolioTerm]);

  return (
    <div className="flex flex-col w-full font-suit">
      <AnimatePresence>
        {viewInformTerm ? (
          <Term1Modal
            setViewInformTerm={setViewInformTerm}
            viewInformTerm={viewInformTerm}
          />
        ) : null}
        {viewPortfolioTerm ? (
          <Term2Modal
            setViewPortfolioTerm={setViewPortfolioTerm}
            viewPortfolioTerm={viewPortfolioTerm}
          />
        ) : null}
      </AnimatePresence>

      <div className="w-full">
        <span className="text-2xl text-[#657786]">11</span>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between">
        <div className="md:w-[40%] pt-10">
          <span className="text-[5vw] md:text-2xl xl:text-3xl font-semibold">
            개인정보 수집에 대한 동의
          </span>
        </div>
        <div className="md:w-[60%] xl:w-[60%] 2xl:w-[45%] font-pretend pb-40 space-y-16">
          <div className="flex flex-row items-start justify-between pt-10">
            <label className="flex flex-row w-[30%] text-[#8A9FB1]">
              개인정보(인적사항) 수집
              <img
                src="/question-mark.png"
                width={15}
                height={15}
                alt="questionMark"
                className="object-contain ml-2 w-[30px] md:w-[20px]"
                onClick={() => {
                  setViewInformTerm(true);
                }}
              />
            </label>
            <div className="grid grid-cols-2 w-[60%] gap-4 gap-y-6">
              {informTerms.map((term, idx) => {
                return (
                  <InformTermCard
                    key={idx}
                    term={term}
                    setSelectedInformTerm={setSelectedInformTerm}
                    selectedInformTerm={selectedInformTerm}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-row items-start justify-between pt-10">
          <label className="flex flex-row w-[30%] text-[#8A9FB1]">
            개인정보(증상사진) 수집
            <img
              src="/question-mark.png"
              width={15}
              height={15}
              alt="questionMark"
              className="object-contain ml-2 w-[30px] md:w-[20px]"
              onClick={() => {
                setViewPortfolioTerm(true);
              }}
            />
          </label>
          <div className="grid grid-cols-2 w-[60%] gap-4 gap-y-6">
              {portfolioTerms.map((term, idx) => {
                return (
                  <PortfolioTermCard
                    key={idx}
                    term={term}
                    setSelectedPortfolioTerm={setSelectedPortfolioTerm}
                    selectedPortfolioTerm={selectedPortfolioTerm}
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

function InformTermCard({ term, setSelectedInformTerm, selectedInformTerm }) {
  return (
    <div
      onClick={() => {
        setSelectedInformTerm(term);
      }}
      className="w-full cursor-pointer font-pretend"
    >
      <div
        className={`flex flex-col items-center space-y-3 pb-3  ${
          selectedInformTerm === term ? 'text-[#14171A]' : 'text-[#8A9FB1]'
        }`}
      >
        <span className="text-[3vw] md:text-xl">
          {term ? '동의함' : '동의하지 않음'}
        </span>
      </div>
      <hr
        className={`border-0 h-[1px]  ${
          selectedInformTerm === term ? 'bg-[#14171A]' : 'bg-[#C8D3DA]'
        }`}
      />
    </div>
  );
}

function PortfolioTermCard({
  term,
  setSelectedPortfolioTerm,
  selectedPortfolioTerm,
}) {
  return (
    <div
      onClick={() => {
        setSelectedPortfolioTerm(term);
      }}
      className="w-full cursor-pointer font-pretend"
    >
      <div
        className={`flex flex-col items-center space-y-3 pb-3  ${
          selectedPortfolioTerm === term ? 'text-[#14171A]' : 'text-[#8A9FB1]'
        }`}
      >
        <span className="text-[3vw] md:text-xl">
          {term ? '동의함' : '동의하지 않음'}
        </span>
      </div>
      <hr
        className={`border-0 h-[1px]  ${
          selectedPortfolioTerm === term ? 'bg-[#14171A]' : 'bg-[#C8D3DA]'
        }`}
      />
    </div>
  );
}

function Term1Modal({ setViewInformTerm, viewInformTerm }) {
  return (
    <motion.div
      initial={{
        translateY: '100%',
      }}
      animate={{
        translateY: '-5%',
      }}
      exit={{
        translateY: '100%',
      }}
      transition={{
        duration: 0.4,
      }}
      onClick={() => {
        setViewInformTerm(!viewInformTerm);
      }}
      className="fixed top-0 left-0 right-0 bottom-0 z-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-[50%] left-[50%] w-[90vw] md:w-[1000px] h-[800px] p-[40px] bg-[#14171ad2] backdrop-blur-[10px] z-10 overflow-y-scroll scrollbar-hide translate-x-[-50%] translate-y-[-5%] rounded-[40px]"
      >
        <div className="flex flex-col text-white pb-[400px]">
          <div className="flex justify-end w-full">
            <image
              src="/exitBtn.png"
              width={50}
              height={0}
              alt="exitBtn"
              onClick={() => {
                setViewInformTerm(!viewInformTerm);
              }}
              className="w-[43px] p-[10px] rounded-full bg-[#657786] cursor-pointer"
            />
          </div>
          <div className="flex flex-col font-pretend md:w-[75%] space-y-16">
            <span className="text-[6vw] md:text-3xl">
              개인정보(인적사항) 수집에 대한 안내
            </span>
            <span className="text-[3vw] md:text-base font-light">
            수집된 인적사항은 예약 시스템 관리, 의료 서비스 제공, 의료 진료의 품질 향상 및 관련 법규 준수를 위한 목적으로만 사용됩니다. <br></br><br></br>
            귀하의 개인정보는 최고 수준의 보안과 기밀 유지 조치 하에 안전하게 관리됩니다.
            귀하가 제공한 개인정보는 귀하의 명시적 동의 없이 제3자에게 공개되거나 다른 목적으로 사용되지 않습니다. <br></br><br></br>
            귀하는 언제든지 자신의 개인정보에 대한 접근, 수정, 삭제를 요청할 권리가 있으며, 이에 대한 자세한 사항은 RMDI 병원의 개인정보 보호정책을 참조하시거나, 개인정보 보호 담당자에게 문의하실 수 있습니다.
            </span>
            <span className="text-[3vw] md:text-base font-light leading-loose text-[#00B8FF]">
              1. 수집 이용 항목 : 이름, 생년월일, 연락처, 이메일
              <br />
              2. 수집 이용 목적 : 온라인 진료 예약 절차 진행 및 연락
              <br />
              3. 정보 보유 기간 : 정보 입력 후 1년
              <br />
            </span>
            <span className="text-[3vw] md:text-base font-light">
              위의 개인정보 수집 이용에 대한 동의를 거부할 권리가 있습니다.
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Term2Modal({ setViewPortfolioTerm, viewPortfolioTerm }) {
  return (
    <motion.div
      initial={{
        translateY: '100%',
      }}
      animate={{
        translateY: '-5%',
      }}
      exit={{
        translateY: '100%',
      }}
      transition={{
        duration: 0.4,
      }}
      onClick={() => {
        setViewPortfolioTerm(!viewPortfolioTerm);
      }}
      className="fixed top-0 left-0 right-0 bottom-0 z-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-[50%] left-[50%] w-[90vw] md:w-[1000px] h-[800px] p-[40px] bg-[#14171ad2] backdrop-blur-[10px] z-10 overflow-y-scroll scrollbar-hide translate-x-[-50%] translate-y-[-5%] rounded-[40px]"
      >
        <div className="flex flex-col text-white pb-[400px]">
          <div className="flex justify-end w-full">
            <image
              src="/exitBtn.png"
              width={50}
              height={0}
              alt="exitBtn"
              onClick={() => {
                setViewPortfolioTerm(!viewPortfolioTerm);
              }}
              className="w-[43px] p-[10px] rounded-full bg-[#657786] cursor-pointer"
            />
          </div>
          <div className="flex flex-col font-pretend md:w-[75%] space-y-16">
            <span className="text-3xl">
              개인정보(증상사진) 수집에 대한 안내
            </span>
            <span className="text-[3vw] md:text-base font-light">
            제출하신 증상 관련 정보와 사진은 의료진의 진단 및 치료 계획 수립에만 사용됩니다. <br></br><br></br>
            모든 데이터는 엄격한 개인정보 보호 기준에 따라 처리되며, 귀하의 개인정보와 사진은 최고 수준의 보안 하에 보호됩니다.
            사진을 첨부하실 때는 개인 식별 정보가 포함되지 않도록 주의해 주시기 바랍니다. 
            귀하의 사생활 보호와 안전을 위해, 사진은 증상을 명확하게 보여주는 범위 내에서만 제공해 주십시오.
            귀하의 증상과 관련된 모든 정보는 의료 목적으로만 사용되며, 귀하의 명시적 동의 없이는 제3자와 공유되지 않습니다.<br></br><br></br> 
            언제든지 귀하는 자신이 제공한 정보에 대한 접근, 수정, 삭제를 요청할 수 있으며, 이와 관련된 문의는 RMDI 병원의 개인정보 보호 담당자에게 하실 수 있습니다.
            </span>
            <span className="text-[3vw] md:text-base font-light leading-loose text-[#00B8FF]">
              1. 수집 이용 항목 : 첨부된 증상 사진 
              <br />
              2. 수집 이용 목적 : 증상의 상태를 확인하기 위함
              <br />
              3. 정보 보유 기간 : 정보 입력 후 1년
              <br />
            </span>
            <span className="text-[3vw] md:text-base font-light">
              위의 개인정보 수집 이용에 대한 동의를 거부할 권리가 있습니다.
              <br />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
