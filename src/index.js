// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import 'aos/dist/aos.css'; // AOS 스타일시트 추가
import './styles/bootstrap.min.css'; 
import './reserv/page.module.css'
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CookiesProvider } from 'react-cookie';

//import reportWebVitals from './reportWebVitals';

library.add(fas);

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);