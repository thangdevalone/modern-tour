import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            rollupTypes: true,
            // `exports.require.types` points to dist/index.d.cts, which the
            // plugin does not emit — duplicate the rolled-up declarations.
            afterBuild: () => {
                copyFileSync(
                    resolve(__dirname, 'dist/index.d.ts'),
                    resolve(__dirname, 'dist/index.d.cts'),
                );
            },
        }),
        cssInjectedByJsPlugin(),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'FramerTour',
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime', 'framer-motion'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                    'framer-motion': 'FramerMotion',
                },
            },
        },
        cssCodeSplit: false,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
});
