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
  server: {
    cors:true,
    host: '0.0.0.0',
    port: 8080,
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
  }
})
