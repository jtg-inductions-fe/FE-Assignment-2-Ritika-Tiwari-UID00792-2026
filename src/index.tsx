import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

<<<<<<< HEAD
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { AppRoutes } from 'routes/AppRoutes';
import { store } from '@store';
=======
import { RouterProvider } from 'react-router-dom';
import { AppRoutes } from 'routes/AppRoutes';
>>>>>>> 0c20c1b ([RT_A2_01]: feat: Set up the routing of pages in project.)

import { CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from '@theme';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <CssBaseline />
                <RouterProvider router={AppRoutes} />
            </Provider>
        </ThemeProvider>
    </StrictMode>,
);
