<template>
  <div class="intro-container">
    <div class="intro-content card">
      <div class="intro-header">
        <h1 class="gradient-text">欢迎使用待办清单</h1>
        <p class="intro-subtitle">高效的任务管理工具，助您轻松掌控每一天</p>
      </div>

      <div class="intro-features">
        <div class="feature-item">
          <div class="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h3>任务管理</h3>
          <p>轻松创建和管理您的待办事项</p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h3>实时同步</h3>
          <p>数据实时保存，随时随地访问</p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3>多人协作</h3>
          <p>支持团队协作，提高工作效率</p>
        </div>
      </div>

      <div class="intro-actions">
        <router-link to="/login" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
          </svg>
          登录
        </router-link>
        <router-link to="/register" class="btn btn-outline">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          注册
        </router-link>
      </div>
    </div>

    <div class="intro-decoration">
      <div class="decoration-circle decoration-circle-1"></div>
      <div class="decoration-circle decoration-circle-2"></div>
      <div class="decoration-circle decoration-circle-3"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style scoped>
.intro-container {
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

.intro-content {
  width: 100%;
  max-width: 800px;
  padding: 3rem 2rem;
  text-align: center;
  z-index: 10;
}

.intro-header {
  margin-bottom: 3rem;
}

.intro-subtitle {
  color: var(--text-secondary);
  font-size: 1.25rem;
  margin-top: 1rem;
}

.intro-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-item {
  padding: 1.5rem;
  background-color: var(--bg-tertiary);
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-normal) ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-lg);
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.feature-item h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.feature-item p {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0;
}

.intro-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.intro-actions .btn {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 2rem;
  font-size: 1.125rem;
  font-weight: 500;
}

.intro-decoration {
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

@media (max-width: 640px) {
  .intro-features {
    grid-template-columns: 1fr;
  }

  .intro-actions {
    flex-direction: column;
  }

  .intro-content {
    padding: 2rem 1rem;
  }
}
</style> 