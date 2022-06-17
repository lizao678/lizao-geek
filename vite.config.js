import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import path from 'path'
import viteCompression from 'vite-plugin-compression';
import PluginImportToCDN from 'vite-plugin-cdn-import';

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
  }),
  viteCompression({
    verbose: true, // 是否在控制台输出压缩结果
    ext: '.gz', // 生成的压缩包后缀
    threshold: 1024, // 体积大于 threshold 才会被压缩,单位 b
    algorithm: 'gzip',// 	压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
    deleteOriginFile: false, // 压缩后是否删除源文件
    // filter: 接收一个正则，指定哪些资源不压缩
  }),
  PluginImportToCDN({
    modules: [
      /* {
        name: 'react',
        var: 'react',
        path: 'https://unpkg.com/react@18/umd/react.development.js'
      },
      {
        name: 'react-dom',
        var: 'react-dom',
        path: 'https://unpkg.com/react-dom@18/umd/react-dom.development.js'
      }, */
      /*  {
         name: 'react-quill',
         var: 'react-quill',
         path: 'https://unpkg.com/react-quill@1.3.5/dist/react-quill.js'
       }, */
      {
        name: 'echarts',
        var: 'echarts',
        path: 'https://lib.baomitu.com/echarts/5.3.2/echarts.common.min.js'
      },

    ]
  })
  ],
  base: './',
  build: {
    sourcemap: true
  },
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
    port: 8088
  }
})
