import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    build: {
        manifest: true,
        rollupOptions: {
            input: {
                app: 'resources/js/app.jsx',
            },
        },
    },
});
