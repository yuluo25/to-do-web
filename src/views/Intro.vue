<template>
  <div class="intro">
    <h1>欢迎来到 Todo 应用</h1>
    <p>这是一个简单的待办事项管理应用。</p>
    <router-link to="/login" class="link">登录</router-link>
    <router-link to="/register" class="link">注册</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style scoped>
.intro {
  text-align: center;
  margin-top: 50px;
  background-color: #f9f9f9;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.intro h1 {
  font-size: 2.5em;
  color: #333;
}
.intro p {
  margin: 20px 0;
  font-size: 1.2em;
}
.link {
  margin: 0 10px;
  text-decoration: none;
  color: #007bff;
  font-size: 1.1em;
}
.link:hover {
  text-decoration: underline;
}
</style> 