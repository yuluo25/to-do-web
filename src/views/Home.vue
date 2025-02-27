<template>
  <div class="home">
    <h2>我的待办事项</h2>
    
    <!-- 错误提示 -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
    <div v-if="isLoggedIn">
      <!-- 添加待办事项输入框 -->
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="添加新的待办事项" :disabled="isLoading" />
      
      <!-- 加载状态指示器 -->
      <div v-if="isLoading" class="loading-indicator">
        <div class="spinner"></div>
        <p>加载中...</p>
      </div>
      
      <!-- 待办事项列表 -->
      <TodoList :todos="todos" @remove="removeTodo" />
    </div>
    <div v-else class="login-message">
      <p>请先登录以查看和管理您的待办事项</p>
      <button @click="goToLogin" class="login-button">去登录</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import TodoList from '../components/TodoList.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// 创建一个新的 axios 实例
const api = axios.create({
  baseURL: 'http://todo.900125.xyz/api',
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
    const todos = ref<Array<{id: string, title: string}>>([]);
    const isLoggedIn = ref(false);
    const isLoading = ref(false);
    const errorMessage = ref('');

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
        todos.value = response.data;
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
          title: newTodo.value.trim()
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
            todos.value[index] = response.data;
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
        // 如果用户未登录，可以重定向到登录页面
        // 或者显示提示信息
        console.warn('用户未登录，无法获取待办事项');
        // 如果有路由，可以使用以下代码重定向到登录页面
        // router.push('/login');
      }
    });

    return { newTodo, todos, addTodo, removeTodo, goToLogin, isLoggedIn, isLoading, errorMessage };
  },
});
</script>

<style scoped>
.home {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}
.home:hover {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
}
input {
  width: calc(100% - 24px); /* 减去左右内边距 */
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 16px;
}
.login-message {
  text-align: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-bottom: 20px;
}
.login-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.login-button:hover {
  background-color: #0056b3;
}
.error-message {
  color: red;
  margin-bottom: 20px;
}
.loading-indicator {
  text-align: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
