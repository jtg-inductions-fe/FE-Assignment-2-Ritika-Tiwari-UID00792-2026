import React from 'react';

import { Outlet } from 'react-router-dom';

import { ErrorBoundary } from '@components';
import { Header } from '@containers';
import { fetchUsers, useAppDispatch, useAppSelector } from '@store';

export const Main = () => {
    const dispatch = useAppDispatch();
    const authStatus = useAppSelector((state) => state.auth.status);
    React.useEffect(() => {
        if (authStatus == 'idle') {
            void dispatch(fetchUsers());
        }
    }, [authStatus, dispatch]);

    return (
        <>
            <ErrorBoundary title="Something is wrong, we are fixing this.">
                <Header />
            </ErrorBoundary>
            <main>
                {/* Child routes render here */}
                <ErrorBoundary title="Something is wrong, we are fixing this.">
                    <Outlet />
                </ErrorBoundary>
            </main>
        </>
    );
};
