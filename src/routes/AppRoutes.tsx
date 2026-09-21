import { createBrowserRouter } from 'react-router-dom';

import { Main } from '@layouts';
import { Login, SignUp } from '@pages';
import { Cart, Menu, NotFoundPage, OrderPortal, Restaurant } from '@pages';

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
                ],
            },
            {
                path: ROUTES.NOT_FOUND_PAGE,
                element: <NotFoundPage />,
            },
        ],
    },
]);
