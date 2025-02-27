<template>
  <div class="register">
    <h2>用户注册</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="username" placeholder="用户名" required />
      <input type="email" v-model="email" placeholder="邮箱" required />
      <input type="password" v-model="password" placeholder="密码" required />
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <button type="submit">注册</button>
    </form>
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
    const router = useRouter();

    const handleRegister = async () => {
      try {
        errorMessage.value = ''; // 清除之前的错误信息
        const response = await axios.post(getApiUrl('/auth/register'), {
          username: username.value,
          email: email.value,
          password: password.value,
        });
        console.log('注册成功:', response.data);
        // 注册成功后重定向到登录页面
        router.push('/login');
      } catch (error) {
        console.error('注册失败:', error);
        if (error.response && error.response.data && error.response.data.error) {
          // 显示后端返回的错误信息
          errorMessage.value = error.response.data.error;
        } else {
          // 如果没有具体错误信息，显示通用错误
          errorMessage.value = '注册失败，请稍后重试';
        }
      }
    };

    return { username, email, password, errorMessage, handleRegister };
  },
});
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
input {
  width: calc(100% - 24px); /* 减去左右内边距 */
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}
.error-message {
  color: #ff3333;
  margin-bottom: 10px;
  font-size: 14px;
  text-align: center;
}
button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style> 