<template>
  <div class="register">
    <h2>用户注册</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="username" placeholder="用户名" required />
      <input type="email" v-model="email" placeholder="邮箱" required />
      <input type="password" v-model="password" placeholder="密码" required />
      <button type="submit">注册</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const handleRegister = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/auth/register', {
          username: username.value,
          email: email.value,
          password: password.value,
        });
        console.log('注册成功:', response.data);
        // 注册成功后重定向到登录页面
        router.push('/login');
      } catch (error) {
        console.error('注册失败:', error);
      }
    };

    return { username, email, password, handleRegister };
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