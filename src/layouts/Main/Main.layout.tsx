import { Outlet } from 'react-router-dom';

import { ErrorBoundary, ResponsiveContainer } from '@components';
import { Header } from '@containers';

export const Main = () => (
        <>
            <ErrorBoundary title="Something is wrong, we are fixing this.">
                <Header />
            </ErrorBoundary>
            <main>
                {/* Child routes render here */}
                <ResponsiveContainer>
                    <ErrorBoundary title="Something is wrong, we are fixing this.">
                        <Outlet />
                    </ErrorBoundary>
                </ResponsiveContainer>
            </main>
        </>
    );
