import { Link, Outlet } from 'react-router-dom';

export const Main = () => (
    //This is for the demo purpose only
    <div className="app-container">
        <header className="header">
            <h1>Header</h1>
            <nav>
                <Link to="home">Home</Link> | <Link to="cart">cart</Link>
            </nav>
        </header>

        <main className="main-content">
            {/* Child routes render here */}
            <Outlet />
        </main>
    </div>
);
