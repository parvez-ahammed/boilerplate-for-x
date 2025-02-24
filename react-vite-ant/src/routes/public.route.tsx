import { AboutUsPage } from '@/pages/aboutUs.page';
import { ContactUsPage } from '@/pages/contactUs.page';
import { HomePage } from '@/pages/home.page';
import { ServicesPage } from '@/pages/services.page';
import { RouteObject } from 'react-router-dom';

export const publicRoutes: RouteObject[] = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/home',
        element: <HomePage />,
    },
    {
        path: '/about',
        element: <AboutUsPage />,
    },
    {
        path: '/services',
        element: <ServicesPage />,
    },
    {
        path: '/contact',
        element: <ContactUsPage />,
    },
];
