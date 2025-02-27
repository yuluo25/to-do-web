<template>
  <div class="todo-list-container">
    <transition-group name="todo-list" tag="ul" class="todo-list">
      <TodoItem
        v-for="(todo, index) in todos"
        :key="todo.id"
        :todo="todo"
        @remove="() => $emit('remove', index)"
        @toggle="() => $emit('toggle', index)"
      />
    </transition-group>
    <div v-if="todos.length === 0" class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="empty-icon">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
      <p class="empty-text">暂无待办事项</p>
      <p class="empty-hint">添加一些任务开始吧！</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import TodoItem from './TodoItem.vue';

export default defineComponent({
  components: {
    TodoItem,
  },
  props: {
    todos: {
      type: Array as PropType<Array<{id: string, title: string, completed?: boolean}>>,
      required: true,
    },
  },
});
</script>

<style scoped>
.todo-list-container {
  margin-top: 1.5rem;
}

.todo-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  background-color: var(--bg-tertiary);
  border-radius: var(--border-radius-lg);
  color: var(--text-tertiary);
  text-align: center;
}

.empty-icon {
  margin-bottom: 1rem;
  color: var(--text-tertiary);
  opacity: 0.5;
}

.empty-text {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.empty-hint {
  font-size: 0.875rem;
  color: var(--text-tertiary);
}

/* 列表动画 */
.todo-list-enter-active,
.todo-list-leave-active {
  transition: all 0.3s ease;
}

.todo-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.todo-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.todo-list-move {
  transition: transform 0.5s ease;
}
</style>
