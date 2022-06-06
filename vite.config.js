import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  vitePluginImp({
    libList: [
      {
        libName: "antd",
        style: (name) => `antd/es/${name}/style`,
      },
    ],
  })

  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      }
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'), // 根路径
      '@': path.resolve(__dirname, 'src') // src 路径
    }
  },
  server: {
    open: true, // 运行完成自动打开
  }
})
