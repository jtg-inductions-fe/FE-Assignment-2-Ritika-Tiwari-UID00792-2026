import React from 'react';

import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector, fetchUsers } from '@store';

import { ErrorBoundary } from '@components';
import { Header } from '@containers';

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
