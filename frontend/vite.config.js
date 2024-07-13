// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import reactRefresh from '@vitejs/plugin-react';  
import { defineConfig } from 'vite';  

export default defineConfig({  
  plugins: [reactRefresh()],  
  build: {  
    outDir: 'dist', // پوشه خروجی برای فایل های build  
    minify: true, // فشرده‌سازی فایل‌ها  
    terserOptions: {  
      compress: {  
        keep_infinity: true,  
        drop_console: true,  
      },  
    },  
    manifest: true, // ایجاد فایل manifest برای cache‌کردن  
  },  
});