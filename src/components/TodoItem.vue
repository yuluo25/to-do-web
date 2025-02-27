<template>
  <li class="todo-item" :class="{ 'completed': todo.completed }">
    <div class="todo-content">
      <div class="checkbox-wrapper">
        <input 
          type="checkbox" 
          :id="'todo-' + todo.id" 
          :checked="todo.completed"
          @change="$emit('toggle')"
          class="todo-checkbox"
        />
        <label :for="'todo-' + todo.id" class="checkbox-label"></label>
      </div>
      <span class="todo-title">{{ todo.title }}</span>
    </div>
    <div class="todo-actions">
      <button @click="$emit('remove')" class="btn-icon btn-danger" title="删除">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    todo: {
      type: Object as PropType<{id: string, title: string, completed?: boolean}>,
      required: true,
    },
  },
});
</script>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.75rem;
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal) ease;
  border-left: 4px solid var(--primary-color);
}

.todo-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.todo-item.completed {
  border-left-color: var(--success-color);
  background-color: rgba(16, 185, 129, 0.05);
}

.todo-item.completed .todo-title {
  text-decoration: line-through;
  color: var(--text-tertiary);
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.todo-title {
  font-size: 1rem;
  color: var(--text-primary);
  transition: color var(--transition-fast) ease;
}

.todo-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--border-radius-full);
  background-color: transparent;
  color: var(--text-tertiary);
  transition: all var(--transition-fast) ease;
  padding: 0;
}

.btn-icon:hover {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--danger-color);
  transform: scale(1.1);
}

.checkbox-wrapper {
  position: relative;
  width: 20px;
  height: 20px;
}

.todo-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-label {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast) ease;
}

.todo-checkbox:checked ~ .checkbox-label {
  background-color: var(--success-color);
  border-color: var(--success-color);
}

.checkbox-label:after {
  content: "";
  position: absolute;
  display: none;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.todo-checkbox:checked ~ .checkbox-label:after {
  display: block;
}

.todo-checkbox:focus ~ .checkbox-label {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
}
</style>
