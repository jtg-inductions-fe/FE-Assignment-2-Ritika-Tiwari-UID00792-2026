import React from 'react';

import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { ErrorBoundary } from '@components';
import { Header } from '@containers';
import { fetchUsers } from '@services';
import { useAppDispatch, useAppSelector } from '@store';

export const Main = () => {
    const dispatch = useAppDispatch();
    const authStatus = useAppSelector((state) => state.auth.status);
    React.useEffect(() => {
        if (authStatus === 'idle') {
            //This is to by pass the eslint error
            dispatch(fetchUsers())
                .unwrap()
                .catch(() => {});
        }
    }, [authStatus, dispatch]);

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <ErrorBoundary title="Something is wrong, we are fixing this.">
                <Header />
            </ErrorBoundary>
            <Box flex={1} display="flex" alignItems="center">
                {/* Child routes render here */}
                <ErrorBoundary title="Something is wrong, we are fixing this.">
                    <Outlet />
                </ErrorBoundary>
            </Box>
        </Box>
    );
};
