import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
    build: {
        outDir: 'public/build', // Pastikan ini sesuai dengan lokasi yang Anda inginkan
        manifest: true, // Pastikan manifest dihasilkan
        rollupOptions: {
               external: ['@headlessui/react'],
        },
       },
});
