import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './public.route';
import { notFoundRoutes } from './notFound.route';
export const AppRoutes = () => {
    const allRoutes = [...publicRoutes, ...notFoundRoutes];
    const routeElement = useRoutes(allRoutes);
    return routeElement;
};
