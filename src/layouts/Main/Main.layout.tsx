import { Outlet } from 'react-router-dom';

import { ErrorBoundary, ResponsiveContainer } from '@components';
import { Header } from '@containers';

import { StyledMain } from './Main.styles';

export const Main = () => (
    <>
        <ErrorBoundary title="Something is wrong, we are fixing this.">
            <Header />
        </ErrorBoundary>
        <StyledMain>
            {/* Child routes render here */}
            <ResponsiveContainer>
                <ErrorBoundary title="Something is wrong, we are fixing this.">
                    <Outlet />
                </ErrorBoundary>
            </ResponsiveContainer>
        </StyledMain>
    </>
);
