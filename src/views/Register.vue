<template>
  <div class="auth-container">
    <div class="auth-card card">
      <div class="auth-header">
        <h1 class="gradient-text">创建账户</h1>
        <p class="auth-subtitle">注册一个新账户开始使用</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="username" class="form-label">用户名</label>
          <div class="input-with-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="input-icon">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input 
              id="username"
              v-model="username" 
              placeholder="请输入用户名" 
              required 
              class="auth-input"
            />
          </div>
        </div>
        
        <div class="form-group">
          <label for="email" class="form-label">邮箱</label>
          <div class="input-with-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="input-icon">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <input 
              id="email"
              type="email" 
              v-model="email" 
              placeholder="请输入邮箱" 
              required 
              class="auth-input"
            />
          </div>
        </div>
        
        <div class="form-group">
          <label for="password" class="form-label">密码</label>
          <div class="input-with-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="input-icon">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input 
              id="password"
              type="password" 
              v-model="password" 
              placeholder="请输入密码" 
              required 
              class="auth-input"
            />
          </div>
        </div>
        
        <transition name="fade">
          <div v-if="errorMessage" class="auth-error">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{{ errorMessage }}</span>
          </div>
        </transition>
        
        <transition name="fade">
          <div v-if="successMessage" class="auth-success">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>{{ successMessage }}</span>
          </div>
        </transition>
        
        <button type="submit" class="auth-button btn-primary" :disabled="isLoading">
          <span v-if="!isLoading">注册</span>
          <div v-else class="button-spinner animate-spin"></div>
        </button>
      </form>
      
      <div class="auth-footer">
        <p>已有账号？<router-link to="/login" class="auth-link">立即登录</router-link></p>
      </div>
    </div>
    
    <div class="auth-decoration">
      <div class="decoration-circle decoration-circle-1"></div>
      <div class="decoration-circle decoration-circle-2"></div>
      <div class="decoration-circle decoration-circle-3"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { getApiUrl } from '../config/api';

export default defineComponent({
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const successMessage = ref('');
    const isLoading = ref(false);
    const router = useRouter();

    const handleRegister = async () => {
      try {
        isLoading.value = true;
        errorMessage.value = ''; // 清除之前的错误信息
        successMessage.value = ''; // 清除之前的成功信息
        
        const response = await axios.post(getApiUrl('/auth/register'), {
          username: username.value,
          email: email.value,
          password: password.value,
        });
        
        console.log('注册成功:', response.data);
        successMessage.value = '注册成功！即将跳转到登录页面...';
        
        // 3秒后重定向到登录页面
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } catch (error) {
        console.error('注册失败:', error);
        if (error.response && error.response.data && error.response.data.error) {
          // 显示后端返回的错误信息
          errorMessage.value = error.response.data.error;
        } else {
          // 如果没有具体错误信息，显示通用错误
          errorMessage.value = '注册失败，请稍后重试';
        }
      } finally {
        isLoading.value = false;
      }
    };

    return { username, email, password, errorMessage, successMessage, isLoading, handleRegister };
  },
});
</script>

<style scoped>
.auth-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.auth-card {
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  z-index: 10;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-subtitle {
  color: var(--text-secondary);
  margin-top: 0.5rem;
}

.auth-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.input-with-icon {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-tertiary);
}

.auth-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  font-size: 1rem;
  transition: all var(--transition-fast) ease;
}

.auth-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.auth-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--danger-color);
  border-radius: var(--border-radius-md);
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.auth-success {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
  border-radius: var(--border-radius-md);
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.auth-button {
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.button-spinner {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
}

.auth-footer {
  text-align: center;
  margin-top: 1.5rem;
  color: var(--text-secondary);
}

.auth-link {
  color: var(--primary-color);
  font-weight: 500;
  text-decoration: none;
  transition: color var(--transition-fast) ease;
}

.auth-link:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}

.auth-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.decoration-circle-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  top: -100px;
  right: -100px;
}

.decoration-circle-2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(to right, var(--accent-color), var(--primary-color));
  bottom: -200px;
  left: -200px;
}

.decoration-circle-3 {
  width: 200px;
  height: 200px;
  background: linear-gradient(to right, var(--secondary-color), var(--accent-color));
  top: 50%;
  right: 10%;
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 