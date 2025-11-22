import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import router from './Router.tsx';
import { queryClient } from './QueryClient.tsx';
import theme from './styles/theme.ts';
import { Global, ThemeProvider } from '@emotion/react';
import globalStyles from './styles/globalStyle.ts';
import './App.css';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<div>Loading...</div>}>
          <Global styles={globalStyles} />
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
