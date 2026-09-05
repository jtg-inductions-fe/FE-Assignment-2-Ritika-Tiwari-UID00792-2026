import { Outlet } from 'react-router-dom';

import { ErrorBoundary, Header } from '@components';

export const MainLayout = () => (
    <div className="app-container">
        <ErrorBoundary title="Something is wrong, we are fixing this.">
            <Header />
        </ErrorBoundary>
        <main className="main-content">
            {/* Child routes render here */}
            <Outlet />
        </main>

        <footer className="footer">
            <p>Footer</p>
        </footer>
    </div>
);
