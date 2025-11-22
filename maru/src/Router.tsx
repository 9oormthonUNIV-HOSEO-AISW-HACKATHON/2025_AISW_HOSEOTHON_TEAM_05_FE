import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import DefaultLayout from './DefaultLayout.tsx';

const Main = lazy(() => import('./pages/main/index.tsx'));
const OnBoarding = lazy(() => import('./pages/onboarding/index.tsx'));
const Setup1 = lazy(() => import('./pages/setup/InitialSetupPage1.tsx'));
const Setup2 = lazy(() => import('./pages/setup/InitialSetupPage2.tsx'));

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<></>}>{element}</Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/onboarding" replace />,
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
  },
  {
    path: '/setup1',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: withSuspense(<Setup1 />),
      }
    ]
  },
  {
    path: '/setup2',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: withSuspense(<Setup2 />),
      }
    ]
  }
]);

export default router;
