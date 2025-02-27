<template>
  <div class="login">
    <h2>用户登录</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="用户名" required />
      <input type="password" v-model="password" placeholder="密码" required />
      <button type="submit">登录</button>
    </form>
    <div class="register-link">
      <p>还没有账号？<router-link to="/register">立即注册</router-link></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const handleLogin = async () => {
      try {
        const response = await axios.post('http://todo.900125.xyz/api/auth/login', {
          username: username.value,
          password: password.value,
        });
        console.log('登录成功:', response.data);
        // 存储 token
        localStorage.setItem('token', response.data.token);
        // 登录成功后重定向到 Home 页面
        router.push('/home');
      } catch (error) {
        console.error('登录失败:', error);
      }
    };

    return { username, password, handleLogin };
  },
});
</script>

<style scoped>
.login {
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
.register-link {
  text-align: center;
  margin-top: 15px;
}
.register-link a {
  color: #007bff;
  text-decoration: none;
}
.register-link a:hover {
  text-decoration: underline;
}
</style> 