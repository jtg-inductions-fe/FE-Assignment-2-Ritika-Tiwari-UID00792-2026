import Header from 'components/common/Header/Header.component';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => (
    <div className="app-container">
        <Header></Header>

        <main className="main-content">
            {/* Child routes render here */}
            <Outlet />
        </main>

        <footer className="footer">
            <p>Footer</p>
        </footer>
    </div>
);
