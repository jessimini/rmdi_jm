import React from 'react';

const TeamSection = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        {/* 섹션 제목 */}
        <div className="text-center mx-auto mb-8 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
          <p className="d-inline-block border rounded-pill py-1 px-4">Members</p> {/* '팀원들' 표시용 태그 */}
          <h1 className='text-2xl text-bold pt-3'>Our Team</h1> {/* 섹션의 메인 제목 */}
        </div>
        <div className="row g-4 justify-content-center"> {/* justify-content-center 클래스 추가 */}
          {/* 팀원 1 */}
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="team-item position-relative rounded overflow-hidden">
              <div className="overflow-hidden">
                <img className="img-fluid" src="../assets/img/jessi.jpg" alt="" />
              </div>
              <div className="team-text bg-light text-center p-4">
                <h5>Jessi Oh</h5> {/* 팀원 이름 */}
                <p className="text-primary">Backend</p> {/* 부서명 */}
                <div className="team-social text-center">
                  {/* 소셜 미디어 링크 */}
                  <a className="btn btn-square" href=""><i className="fab fa-facebook-f"></i></a>
                  <a className="btn btn-square" href=""><i className="fab fa-twitter"></i></a>
                  <a className="btn btn-square" href=""><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
          </div>
          {/* 팀원 2 */}
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="team-item position-relative rounded overflow-hidden">
              <div className="overflow-hidden">
                <img className="img-fluid" src="../assets/img/Heeyeon.jpg" alt="" />
              </div>
              <div className="team-text bg-light text-center p-4">
                <h5>Heeyeon Jo</h5> {/* 팀원 이름 */}
                <p className="text-primary">Frontend</p> {/* 부서명 */}
                <div className="team-social text-center">
                  {/* 소셜 미디어 링크 */}
                  <a className="btn btn-square" href=""><i className="fab fa-facebook-f"></i></a>
                  <a className="btn btn-square" href=""><i className="fab fa-twitter"></i></a>
                  <a className="btn btn-square" href=""><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamSection;
