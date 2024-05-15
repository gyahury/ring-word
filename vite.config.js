import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: '/ring-word/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        wordPage: path.resolve(__dirname, 'wordPage/index.html'),
        word: path.resolve(__dirname, 'word/index.html'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});
