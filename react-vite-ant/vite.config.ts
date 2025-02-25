import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import autoprefixer from 'autoprefixer';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), tsconfigPaths(), svgr()],
    server: {
        host: '0.0.0.0',
        port: 8080,
    },
    css: {
        postcss: {
            plugins: [autoprefixer()],
        },
    },
});
