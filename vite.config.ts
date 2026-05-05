import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isPage = mode === 'page';

  return {
    plugins: [
      vue(),
      ...(isPage ? [] : [dts({
        bundleTypes: true,
        compilerOptions: {
          preserveSymlinks: false
        }
      })])
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 8080,
    },
    build: isPage ? {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'), // 网页必须用 index.html
        },
        output: {
          globals: {
            vue: 'Vue',
            'vue-i18n': 'VueI18n',
          },
        },
      },
      outDir: 'dist-page'
    } : {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'VueImgCutter',
        fileName: (format) => `vue-img-cutter.${format}.js`,
      },
      cssCodeSplit: false,
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
  }
});
