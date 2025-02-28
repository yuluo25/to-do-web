import axios, { AxiosInstance } from 'axios';
import { getApiUrl } from '../config/api';

// Token 相关的类型定义
interface TokenData {
  token: string;
  expiresAt: number;
}

// 保存 token 到 localStorage
export const saveToken = (token: string) => {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 设置24小时过期
  const tokenData: TokenData = {
    token,
    expiresAt,
  };
  localStorage.setItem('tokenData', JSON.stringify(tokenData));
};

// 从 localStorage 获取 token
export const getToken = (): string | null => {
  const tokenDataStr = localStorage.getItem('tokenData');
  if (!tokenDataStr) return null;

  try {
    const tokenData: TokenData = JSON.parse(tokenDataStr);
    // 如果 token 已过期，清除并返回 null
    if (Date.now() >= tokenData.expiresAt) {
      clearToken();
      return null;
    }
    return tokenData.token;
  } catch {
    clearToken();
    return null;
  }
};

// 清除 token
export const clearToken = () => {
  localStorage.removeItem('tokenData');
};

// 检查是否已登录
export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};

// 刷新 token
export const refreshToken = async (customAxios?: AxiosInstance): Promise<boolean> => {
  const currentToken = getToken();
  if (!currentToken) return false;

  try {
    const axiosInstance = customAxios || axios;
    const response = await axiosInstance.post(getApiUrl('/auth/refresh'), {}, {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });
    
    if (response.data && response.data.token) {
      saveToken(response.data.token);
      return true;
    }
    return false;
  } catch {
    clearToken();
    return false;
  }
};

// 设置 axios 默认请求头
export const setupAxiosAuth = (customAxios?: AxiosInstance) => {
  const axiosInstance = customAxios || axios;

  // 请求拦截器
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 响应拦截器处理 token 过期
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // 如果是 401 错误且未尝试过刷新 token
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        // 尝试刷新 token
        const refreshed = await refreshToken(axiosInstance);
        if (refreshed) {
          // 更新请求头中的 token
          const token = getToken();
          originalRequest.headers.Authorization = `Bearer ${token}`;
          // 重试原始请求
          return axiosInstance(originalRequest);
        }
      }
      
      return Promise.reject(error);
    }
  );
}; 