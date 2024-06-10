import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS 스타일시트를 가져옵니다
import CountUp from 'react-countup';
import main1Image from '../assets/img/main1.jpg'; // 이미지 경로를 적절히 조정하세요


function Header() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="container-fluid header bg-primary p-0 mb-5">
      <div className="row g-0 align-items-center flex-column-reverse flex-lg-row">
        <div className="col-lg-6 p-5" data-aos="fade-up" data-aos-delay="500">
          <h1 className="display-4 text-white mb-5">
            RMDI는
            <br /> 당신과 건강 관리의
            <br /> 첫걸음을 함께합니다
          </h1>
          <div className="row g-4">
            <div className="col-sm-4">
              <div className="border-start border-light ps-4">
                {/* CountUp 컴포넌트를 사용하여 숫자를 애니메이션합니다. */}
                <h2 className="text-white text-xl mb-1">
                  <CountUp end={123} duration={2} />
                </h2>
                <p className="text-light text-3xl mb-0">Expert Doctors</p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="border-start border-light ps-4">
                {/* CountUp 컴포넌트를 사용하여 숫자를 애니메이션합니다. */}
                <h2 className="text-white text-xl mb-1">
                  <CountUp end={1234} duration={2} />
                </h2>
                <p className="text-light text-3xl mb-0">Medical Staff</p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="border-start border-light ps-4">
                {/* CountUp 컴포넌트를 사용하여 숫자를 애니메이션합니다. */}
                <h2 className="text-white text-xl mb-1">
                  <CountUp end={12345} duration={2} />
                </h2>
                <p className="text-light text-3xl mb-0">Total Patients</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6" data-aos="fade-in" data-aos-delay="1000">
          <div className="position-relative">
            <img className="img-fluid" src={main1Image} alt="" />
            <div className="owl-carousel-text position-absolute top-50 start-50 translate-middle text-center">
              <h1 className="display-1 text-white mb-0">RMDI</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
