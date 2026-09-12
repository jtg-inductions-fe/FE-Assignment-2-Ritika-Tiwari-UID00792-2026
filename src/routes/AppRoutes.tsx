import { createBrowserRouter } from 'react-router-dom';

import { Main } from '@layouts';
import {
    Cart,
    Home,
    Login,
    Menu,
    NotFoundPage,
    OrderPortal,
    Restaurant,
    SignUp,
} from '@pages';

import { ROUTES } from './AppRoutes.constants';
import { ProtectedRoutes } from './ProtectedRoutes';

export const AppRoutes = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <Main />,
        children: [
            {
                path: ROUTES.LOGIN,
                element: <Login />,
            },
            {
                path: ROUTES.SING_UP,
                element: <SignUp />,
            },
            {
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: ROUTES.HOME,
                        element: <Home />,
                    },
                    {
                        index: true,
                        element: <Restaurant />,
                    },
                    {
                        path: ROUTES.MENU,
                        element: <Menu />,
                    },
                    {
                        path: ROUTES.CART,
                        element: <Cart />,
                    },
                    {
                        path: ROUTES.ORDER_PORTAl,
                        element: <OrderPortal />,
                    },
                    {
                        path: ROUTES.NOT_FOUND_PAGE,
                        element: <NotFoundPage />,
                    },
                ],
            },
        ],
    },
]);
