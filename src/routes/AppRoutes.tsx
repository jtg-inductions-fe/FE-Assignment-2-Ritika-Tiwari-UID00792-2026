import { MainLayout } from 'layouts';
import {
    Cart,
    Home,
    Login,
    Menu,
    NotFoundPage,
    OrderPortal,
    Restaurant,
    SignUp,
} from 'pages';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';

export const AppRoutes = createBrowserRouter(
    createRoutesFromElements(
        // Main layout mapping the core features of the application
        <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            {/* Core application features */}
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-portal" element={<OrderPortal />} />
            {/* fallback route mapping forany unrecognized paths directly to the 404 page */}
            <Route path="*" element={<NotFoundPage />} />
        </Route>,
    ),
);
