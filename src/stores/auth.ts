import { defineStore } from 'pinia';
import axios from 'axios';
import { getApiUrl } from '../config/api';
import router from '../router';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: !!localStorage.getItem('token'),
  }),

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated,
  },

  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post(getApiUrl('/auth/login'), {
          username,
          password,
        });

        const { token, user } = response.data;
        this.setToken(token);
        this.setUser(user);
        this.isAuthenticated = true;

        // 配置 axios 默认 headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return { success: true };
      } catch (error: any) {
        console.error('Login error:', error);
        return {
          success: false,
          error: error.response?.data?.error || '登录失败，请稍后重试',
        };
      }
    },

    async logout() {
      try {
        // 可以在这里添加调用后端登出接口的逻辑
        this.clearAuth();
        router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    },

    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },

    setUser(user: User) {
      this.user = user;
    },

    clearAuth() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },

    // 检查并更新认证状态
    async checkAuth() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.clearAuth();
        return false;
      }

      try {
        // 这里可以添加调用后端验证 token 的接口
        const response = await axios.get(getApiUrl('/auth/verify'), {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.user) {
          this.setUser(response.data.user);
          this.isAuthenticated = true;
          return true;
        }
        
        return false;
      } catch (error) {
        this.clearAuth();
        return false;
      }
    },

    // 初始化认证状态
    async initAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await this.checkAuth();
      }
    }
  },
}); 