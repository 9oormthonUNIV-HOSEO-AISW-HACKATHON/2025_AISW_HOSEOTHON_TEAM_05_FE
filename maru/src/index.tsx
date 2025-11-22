import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';

declare global {
  interface Window {
    Kakao: any;
  }
}

if (window.Kakao && !window.Kakao.isInitialized()) {
  window.Kakao.init("5d67e5ebfbcdc432fc1f194e2841be44");
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
