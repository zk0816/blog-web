import { defineConfig, loadEnv , ConfigEnv,} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({mode}: ConfigEnv) => {
  const env = loadEnv(mode, __dirname)
  return {
  plugins: [
    react(),
  ],
  base: './',
  resolve:{
    alias:{
      '@': path.resolve(__dirname,'./src')
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  css:{
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(__dirname, 'src/style/global.less')}";`
      }
    }
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
        target: env.VITE_RES_URL,
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
}
})
