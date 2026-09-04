import { ErrorBoundary, Header } from '@components';
import { Outlet } from 'react-router-dom';

export const Main = () => (
    //This is for the demo purpose only
    <div className="app-container">
        <ErrorBoundary title="Something is wrong, we are fixing this.">
            <Header />
        </ErrorBoundary>
        <main className="main-content">
            {/* Child routes render here */}
            <Outlet />
        </main>
    </div>
);
