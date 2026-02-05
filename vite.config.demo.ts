import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

// Demo build configuration for Vercel deployment
export default defineConfig({
    plugins: [
        tailwindcss(),
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

