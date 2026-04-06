import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Demo build configuration for Vercel deployment
export default defineConfig({
    plugins: [
        react(),
    ],
    root: '.',
    build: {
        outDir: 'demo-dist',
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
});
