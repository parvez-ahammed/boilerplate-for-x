import { BrowserRouter } from 'react-router-dom';

interface AppProviderProps {
    children: React.ReactNode;
}
export const AppProvider = (props: AppProviderProps) => {
    return <BrowserRouter>{props.children}</BrowserRouter>;
};
