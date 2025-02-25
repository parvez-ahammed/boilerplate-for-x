import { GlobalStyle } from '@/styles/global';
import { styledTheme } from '@config/styled-components';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

interface AppProviderProps {
    children: React.ReactNode;
}
export const AppProvider = (props: AppProviderProps) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GlobalStyle />
            <ThemeProvider theme={styledTheme}>
                <BrowserRouter>{props.children}</BrowserRouter>
            </ThemeProvider>
        </Suspense>
    );
};
