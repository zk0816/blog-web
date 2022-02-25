import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// import typescript from "@rollup/plugin-typescript";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // typescript({
    //         tsconfig: "./tsconfig.json",
    //     }),
  ],
  base: './',
  resolve:{
    alias:{
      '@': path.resolve(__dirname,'./src')
    },
    extensions: [".tsx", ".ts", ".js"],
  },
   // 打包配置
    build: {
        target: 'modules', // 设置最终构建的浏览器兼容目标。modules:支持原生 ES 模块的浏览器
        outDir: 'dist', // 指定输出路径
        assetsDir: 'assets', // 指定生成静态资源的存放路径
        sourcemap: false, // 构建后是否生成 source map 文件
        minify: 'terser' // 混淆器，terser构建后文件体积更小
    },
  // 本地配置
  server: {
    cors:true,
    host: '0.0.0.0',
    port: 8080,
    proxy:{
      '/api':{
        target:'http://localhost:9080',
        changeOrigin:true,
        //rewrite: (path) => path.replace(/^\/api/, '')
      },
      //高德接口
      '/v3':{
        target:'https://restapi.amap.com',
        changeOrigin:true,
        //rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  }
})
