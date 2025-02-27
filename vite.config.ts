import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/to-do-web/', // 添加base配置，值应该是你的GitHub仓库名
  server: {
    port: 8081, // 可以根据需要修改端口
  },
});