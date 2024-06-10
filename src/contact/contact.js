import React from 'react';

const Contact = () => {

  return (
    <div className="flex justify-center">
      {/* <div className="fullscreen-bg"></div> 배경 이미지를 위한 div 추가 */}
      <img 
        src={require('../../src/assets/img/contact.png')} 
        alt="AiPill"
        className="w-4/5"
      />
    </div>
  );
}

export default Contact;