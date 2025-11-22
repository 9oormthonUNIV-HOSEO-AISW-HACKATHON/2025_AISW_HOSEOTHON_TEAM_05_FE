import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import DefaultLayout from './DefaultLayout.tsx';

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<></>}>{element}</Suspense>
);

// Lazy pages
const Main = lazy(() => import('./pages/main/index.tsx'));
const OnBoarding = lazy(() => import('./pages/onboarding/index.tsx'));

// Router 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/onboarding" replace />,  // "/" → 온보딩
  },
  {
    path: '/onboarding',
    element: withSuspense(<OnBoarding />),
  },
{
  path: '/main',
  element: <DefaultLayout />,
  children: [
    {
      index: true,
      element: withSuspense(<Main />),
    }
  ]
}

]);

export default router;
