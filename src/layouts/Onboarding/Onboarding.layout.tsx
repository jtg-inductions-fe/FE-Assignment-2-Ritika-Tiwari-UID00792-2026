import { Outlet } from 'react-router-dom';

import { ErrorBoundary} from '@components';

export const Onboarding = () => (
    <div className="onboarding-container">
        <ErrorBoundary title="Something is wrong, we are fixing this.">
            <Outlet />
        </ErrorBoundary>
    </div>
);
