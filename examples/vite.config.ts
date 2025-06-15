import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import vitePluginEslint from 'vite-plugin-eslint'
// import vitePluginDts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginEslint({
      include: ['./**/*.ts', './**/*.vue', './**/*.js']
    }),
    // vitePluginDts({
    //   entryRoot: "./",
    //   outDir: ["../examples-dist"],
    //   tsconfigPath: "../tsconfig.buildts.json",
    // }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "../packages"),
    },
  },
  build: {
    outDir: '../examples-dist', // 关键：指定输出目录
    emptyOutDir: true,
    rollupOptions: {
      // external: ['vue'],
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        format: 'esm',
        // dir: '../examples-dist',
        esModule: true,
        manualChunks: {
          vue: ['vue']
        },
        // globals: {
        //   vue: 'Vue',
        // },
      },
    },
  },
})
