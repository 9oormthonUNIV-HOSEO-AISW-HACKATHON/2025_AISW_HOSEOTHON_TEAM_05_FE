import { createBrowserRouter } from 'react-router-dom';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello React!</div>, // 테스트용 페이지
  },
]);

export default router;
