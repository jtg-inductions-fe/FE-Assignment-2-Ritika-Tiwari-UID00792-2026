import { Outlet } from 'react-router-dom';

import { ErrorBoundary, Header } from '@components';

export const Main = () => (
    <>
        <ErrorBoundary title="Something is wrong, we are fixing this.">
            <Header />
        </ErrorBoundary>
        <main>
            {/* Child routes render here */}
            <Outlet />
        </main>
    </>
);
