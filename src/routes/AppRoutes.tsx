import { MainLayout } from 'components/layouts/Main/Main.layout';
import { Cart } from 'pages/Cart';
import { Home } from 'pages/Home';
import { Login } from 'pages/Login';
import { Menu } from 'pages/Menu';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage.page';
import { OrderPortal } from 'pages/OrderPortal';
import { Restaurant } from 'pages/Restaurant';
import { SignUp } from 'pages/Signup';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';

export const AppRoutes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-portal" element={<OrderPortal />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>,
    ),
);
