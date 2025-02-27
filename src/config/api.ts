// API 配置文件
export const API_CONFIG = {
  baseURL: 'https://todo.900125.xyz/api',
};

// 创建一个获取完整 URL 的辅助函数
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
}; 