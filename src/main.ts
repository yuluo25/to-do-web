import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 导入路由
import './styles/styles.css';

createApp(App).use(router).mount('#app');
