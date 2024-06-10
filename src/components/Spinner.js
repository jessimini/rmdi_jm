import React, { useState, useEffect } from 'react';

function Spinner() {
  // 스피너의 표시 상태를 결정하는 상태 변수
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 실제 앱에서는 이 부분에 데이터를 가져오는 비동기 함수를 호출합니다.
    // 예시를 위해 setTimeout을 사용하여 로딩 시간을 모방합니다.
    const timer = setTimeout(() => {
      setIsLoading(false); // 3초 후 로딩 상태를 false로 변경하여 스피너를 숨깁니다.
    }, 3000);

    // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    return () => clearTimeout(timer);
  }, []); // 빈 의존성 배열은 마운트될 때 한 번만 이 효과가 실행되도록 합니다.

  // isLoading 상태에 따라 스피너를 렌더링하거나 숨깁니다.
  if (isLoading) {
    return (
      <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-grow text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  // 로딩이 끝났으면 null을 반환하여 아무것도 렌더링하지 않습니다.
  return null;
}

export default Spinner;
