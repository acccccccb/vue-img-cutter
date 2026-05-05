import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VueImgCutter',
      fileName: (format) => `vue-img-cutter.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'vue-i18n'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-i18n': 'VueI18n',
        },
      },
    },
  },
});
