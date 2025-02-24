import { NotFoundPage } from '@/pages/notFound.page';
import { RouteObject } from 'react-router-dom';

export const notFoundRoutes: RouteObject[] = [
    {
        path: '*',
        element: <NotFoundPage />,
    },
];
