import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import vitePluginEslint from 'vite-plugin-eslint'
import vitePluginDts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginEslint({
      include: ['packages/**/*.ts', 'packages/**/*.vue', 'packages/**/*.js'],
    }),
    vitePluginDts({
      entryRoot: "./packages",
      outDir: ["./dist/lib"],
      tsconfigPath: "./tsconfig.buildts.json",
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "packages"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'fanvas',
      // 将添加适当的扩展名后缀
      fileName: 'fanvas',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
