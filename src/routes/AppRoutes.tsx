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
import {
    createBrowserRouter,
} from 'react-router-dom';
import { ROUTES } from './AppRoutes.constants';

export const AppRoutes = createBrowserRouter(
    [{
        path: ROUTES.ROOT,
        element: <Main />,
        children: [
            {
                path: ROUTES.HOME,
                element: <Home />,
            },
            {
                path: ROUTES.SING_UP,
                element: <SignUp />,
            },
            {
                path: ROUTES.LOGIN,
                element: <Login />,
            },
            {
                path: ROUTES.RESTAURANT,
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
            }
        ]
    }
]);
