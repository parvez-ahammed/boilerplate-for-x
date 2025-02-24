import { AppProvider } from './providers/AppProvider';
import { AppRoutes } from './routes/routes';

function App() {
    return (
        <AppProvider>
            <AppRoutes />
        </AppProvider>
    );
}

export default App;
