import { createRouter, createWebHistory } from 'vue-router';
import Intro from './views/Intro.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Home from './views/Home.vue';

// 为ImportMeta添加env属性的类型声明
declare module 'vite/client' {
  interface ImportMeta {
    readonly env: Record<string, string>;
  }
}

// 获取基础路径，用于GitHub Pages部署
const base = import.meta.env ? import.meta.env.BASE_URL || '/' : '/';

const routes = [
  { path: '/', component: Intro },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home },
];

const router = createRouter({
  // 使用相对路径，适配GitHub Pages
  history: createWebHistory('/to-do-web/'),
  routes,
});

export default router; 