import { motion } from 'framer-motion';

export default function ApplyLayout() {
  return (
    <div className="flex w-full bg-[#007bff] justify-center">
      <div className="flex flex-col mx-8 py-8 w-[90%] justify-between items-center">
        <div className="text-center pt-4 pb-6">
            
          <span className='text-3xl md:text-4xl lg:text-4xl font-bold text-white leading-tight'>
            RMDI 병원 온라인 예약 페이지에 오신 것을 환영합니다!  <br /> <br /> <br />
          </span>

          <span className="text-[6.3vw] md:text-3xl text-white leading-[1.5] font-suit">
            RMDI 병원에서는 환자 중심의 진료를 실천하며, <br /> 최신 의료 기술과 전문적인 의료진을 통해 여러분의 건강을 최우선으로 생각합니다. <br /> <br />
            저희 병원은 다양한 전문 분야를 아우르는 의료 서비스를 제공하고 있으며, <br />
            모든 환자분들이 필요로 하는 맞춤형 진료를 제공하기 위해 노력하고 있습니다. <br /><br />
          </span>

          <span className='text-[5vw] md:text-xl text-white leading-[1.5] font-suit'>

            &#x2714; 언제 어디서나 접속 가능한 온라인 예약 시스템을 통해, 바쁜 일상 속에서도 진료 예약을 손쉽게 관리할 수 있습니다.<br />
            &#x2714; 귀하의 상태와 필요에 가장 적합한 의료진을 선택할 수 있으며, 선호하는 날짜와 시간에 맞춰 예약할 수 있습니다.<br />
            &#x2714; 예약 과정에서 진료에 필요한 사전 정보를 제공받을 수 있으며, 준비사항을 미리 확인할 수 있어 진료 당일 더욱 편안하게 방문하실 수 있습니다.<br /><br />
          </span>
          
          <span className="text-[6.3vw] md:text-3xl text-white leading-[1.5] font-suit">
            <br />RMDI 병원, 여러분의 건강한 내일을 위해 항상 여기에 있습니다. <br /><br />
          </span>
          
        </div>
        <div>
          <a href="/recruit">
            <motion.button
              initial={{
                backgroundColor: '#003366',
                color: '#fff',
              }}
              whileHover={{
                backgroundColor: '#fff',
                color: '#003366',
              }}
              transition={{
                duration: 0.6,
              }}
              className="px-[6vw] py-[1vw] md:px-10 md:py-3 text-[5vw] md:text-3xl rounded-full border-2 border-[#fff] text-white font-pretend"
            >
              예약하기
            </motion.button>
          </a>
        </div>
      </div>
    </div>
  );
}



