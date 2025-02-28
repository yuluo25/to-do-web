import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from './utils/auth';
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
  { 
    path: '/', 
    component: Intro,
    meta: { requiresAuth: false }
  },
  { 
    path: '/login', 
    component: Login,
    meta: { requiresAuth: false }
  },
  { 
    path: '/register', 
    component: Register,
    meta: { requiresAuth: false }
  },
  { 
    path: '/home', 
    component: Home,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(base),
  routes,
});

// 导航守卫
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth ?? false;
  const isLoggedIn = isAuthenticated();

  if (requiresAuth && !isLoggedIn) {
    // 如果需要认证但未登录，重定向到登录页
    next('/login');
  } else if (isLoggedIn && (to.path === '/login' || to.path === '/register' || to.path === '/')) {
    // 如果已登录，访问登录/注册/介绍页面时重定向到首页
    next('/home');
  } else {
    next();
  }
});

export default router; 