<template>
  <div class="home-container">
    <div class="home-header">
      <h1 class="gradient-text">我的待办清单</h1>
      <p class="subtitle">高效管理您的日常任务</p>
    </div>
    
    <!-- 错误提示 -->
    <transition name="fade">
      <div v-if="errorMessage" class="alert alert-danger">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>{{ errorMessage }}</span>
      </div>
    </transition>
    
    <div v-if="isLoggedIn" class="todo-container card">
      <!-- 添加待办事项输入框 -->
      <div class="input-group">
        <input 
          v-model="newTodo" 
          @keyup.enter="addTodo" 
          placeholder="添加新的待办事项..." 
          :disabled="isLoading" 
          class="todo-input"
        />
        <button 
          @click="addTodo" 
          class="btn-add" 
          :disabled="!newTodo.trim() || isLoading"
          :class="{ 'btn-disabled': !newTodo.trim() || isLoading }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          添加
        </button>
      </div>
      
      <!-- 任务统计 -->
      <div v-if="todos.length > 0" class="todo-stats">
        <div class="stat-item">
          <span class="stat-label">总任务</span>
          <span class="stat-value">{{ todos.length }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">已完成</span>
          <span class="stat-value">{{ completedCount }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">未完成</span>
          <span class="stat-value">{{ todos.length - completedCount }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">完成率</span>
          <span class="stat-value">{{ completionRate }}%</span>
        </div>
      </div>
      
      <!-- 加载状态指示器 -->
      <div v-if="isLoading" class="loading-indicator">
        <div class="spinner animate-spin"></div>
        <p>加载中...</p>
      </div>
      
      <!-- 待办事项列表 -->
      <TodoList 
        :todos="todos" 
        @remove="removeTodo"
        @toggle="toggleTodo"
      />
    </div>
    
    <div v-else class="login-card card">
      <div class="login-illustration">
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </div>
      <h2>请先登录</h2>
      <p class="login-message">登录后即可查看和管理您的待办事项</p>
      <button @click="goToLogin" class="btn btn-primary login-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
          <polyline points="10 17 15 12 10 7"></polyline>
          <line x1="15" y1="12" x2="3" y2="12"></line>
        </svg>
        去登录
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import TodoList from '../components/TodoList.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { API_CONFIG } from '../config/api';

// 创建一个新的 axios 实例
const api = axios.create({
  baseURL: API_CONFIG.baseURL,
});

// 添加请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default defineComponent({
  components: {
    TodoList,
  },
  setup() {
    const router = useRouter();
    const newTodo = ref('');
    const todos = ref<Array<{id: string, title: string, completed: boolean}>>([]);
    const isLoggedIn = ref(false);
    const isLoading = ref(false);
    const errorMessage = ref('');

    // 计算属性：已完成的任务数量
    const completedCount = computed(() => {
      return todos.value.filter(todo => todo.completed).length;
    });

    // 计算属性：完成率
    const completionRate = computed(() => {
      if (todos.value.length === 0) return 0;
      return Math.round((completedCount.value / todos.value.length) * 100);
    });

    // 显示错误信息的函数
    const showError = (message: string) => {
      errorMessage.value = message;
      // 3秒后自动清除错误信息
      setTimeout(() => {
        errorMessage.value = '';
      }, 3000);
    };

    const fetchTodos = async () => {
      isLoading.value = true;
      try {
        const response = await api.get('/todos');
        todos.value = response.data.map((todo: any) => ({
          ...todo,
          completed: todo.completed || false
        }));
      } catch (error) {
        console.error('获取待办事项失败:', error);
        showError('获取待办事项失败，请刷新页面重试');
      } finally {
        isLoading.value = false;
      }
    };

    const addTodo = async () => {
      if (newTodo.value.trim()) {
        // 创建一个临时ID，用于在后端响应前标识这个待办事项
        const tempId = `temp-${Date.now()}`;
        // 创建新的待办事项对象
        const newTodoItem = {
          id: tempId,
          title: newTodo.value.trim(),
          completed: false
        };
        
        // 先在前端添加，实现即时反馈
        todos.value.push(newTodoItem);
        // 清空输入框
        const todoText = newTodo.value;
        newTodo.value = '';
        
        try {
          // 发送请求到后端
          const response = await api.post('/todos', { title: todoText });
          
          // 请求成功，用后端返回的数据（包含真实ID）替换临时数据
          const index = todos.value.findIndex(todo => todo.id === tempId);
          if (index !== -1) {
            todos.value[index] = {
              ...response.data,
              completed: response.data.completed || false
            };
          }
        } catch (error) {
          // 请求失败，从列表中移除临时添加的项
          const index = todos.value.findIndex(todo => todo.id === tempId);
          if (index !== -1) {
            todos.value.splice(index, 1);
          }
          // 恢复输入框内容，方便用户重试
          newTodo.value = todoText;
          console.error('添加待办事项失败:', error);
          // 显示错误提示
          showError('添加待办事项失败，请重试');
        }
      }
    };

    const toggleTodo = async (index: number) => {
      const todo = todos.value[index];
      const originalStatus = todo.completed;
      
      // 先在前端更新状态，实现即时反馈
      todo.completed = !originalStatus;
      
      try {
        // 发送请求到后端
        await api.patch(`/todos/${todo.id}`, { completed: todo.completed });
        // 请求成功，不需要额外操作
      } catch (error) {
        // 请求失败，恢复原状态
        todo.completed = originalStatus;
        console.error('更新待办事项状态失败:', error);
        // 显示错误提示
        showError('更新待办事项状态失败，请重试');
      }
    };

    const removeTodo = async (index: number) => {
      // 保存要删除的待办事项，以便在请求失败时恢复
      const todoToRemove = todos.value[index];
      // 保存删除位置
      const deletedIndex = index;
      
      // 先在前端删除，实现即时反馈
      todos.value.splice(index, 1);
      
      try {
        // 发送请求到后端
        await api.delete(`/todos/${todoToRemove.id}`);
        // 请求成功，不需要额外操作
      } catch (error) {
        // 请求失败，恢复删除的项
        todos.value.splice(deletedIndex, 0, todoToRemove);
        console.error('删除待办事项失败:', error);
        // 显示错误提示
        showError('删除待办事项失败，请重试');
      }
    };

    const goToLogin = () => {
      router.push('/login');
    };

    onMounted(() => {
      // 检查用户是否已登录
      const token = localStorage.getItem('token');
      if (token) {
        isLoggedIn.value = true;
        fetchTodos();
      } else {
        isLoggedIn.value = false;
      }
    });

    return { 
      newTodo, 
      todos, 
      addTodo, 
      removeTodo, 
      toggleTodo,
      goToLogin, 
      isLoggedIn, 
      isLoading, 
      errorMessage,
      completedCount,
      completionRate
    };
  },
});
</script>

<style scoped>
.home-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.home-header {
  text-align: center;
  margin-bottom: 2rem;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin-top: 0.5rem;
}

.todo-container {
  padding: 2rem;
}

.input-group {
  display: flex;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
}

.todo-input {
  flex: 1;
  padding: 1rem 1.25rem;
  border: none;
  border-radius: 0;
  font-size: 1rem;
}

.todo-input:focus {
  box-shadow: none;
}

.btn-add {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  font-weight: 500;
  transition: all var(--transition-fast) ease;
}

.btn-add:hover {
  background-color: var(--primary-hover);
}

.btn-disabled {
  background-color: var(--text-tertiary);
  cursor: not-allowed;
}

.btn-disabled:hover {
  background-color: var(--text-tertiary);
  transform: none;
  box-shadow: none;
}

.todo-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  background-color: var(--bg-tertiary);
  border-radius: var(--border-radius-lg);
  padding: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 1rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: var(--bg-tertiary);
  border-radius: var(--border-radius-lg);
  margin-bottom: 1.5rem;
}

.spinner {
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 1rem;
}

.login-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 2rem;
  text-align: center;
}

.login-illustration {
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  opacity: 0.8;
}

.login-message {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  max-width: 400px;
}

.login-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  font-size: 1.125rem;
}

.alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: var(--border-radius-lg);
  margin-bottom: 1.5rem;
}

.alert-danger {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--danger-color);
  border-left: 4px solid var(--danger-color);
}

.mr-2 {
  margin-right: 0.5rem;
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
