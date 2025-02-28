<template>
  <li class="todo-item" :class="{ 'completed': todo.completed, 'no-transition': noTransition }">
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
    noTransition: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  margin-bottom: 0.75rem;
  background: var(--bg-blur-light);
  border-radius: var(--border-radius-xl);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all var(--transition-normal) cubic-bezier(0.4, 0, 0.2, 1);
}

/* 禁用已确认项目的过渡动画 */
.no-transition.todo-item {
  transition: none !important;
}

.todo-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
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
  gap: 1rem;
  flex: 1;
}

.todo-title {
  font-size: 1rem;
  color: var(--text-primary);
  transition: color var(--transition-normal);
}

.completed .todo-title {
  color: var(--text-tertiary);
  text-decoration: line-through;
}

.todo-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--border-radius-full);
  border: none;
  background: transparent;
  color: var(--text-tertiary);
  transition: all var(--transition-normal);
  cursor: pointer;
}

.btn-icon:hover {
  background: var(--danger-color);
  color: white;
  transform: scale(1.05);
}

.btn-icon svg {
  width: 18px;
  height: 18px;
  stroke-width: 1.5px;
}

.checkbox-wrapper {
  position: relative;
  width: 22px;
  height: 22px;
}

.todo-checkbox {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.checkbox-label {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.todo-checkbox:checked + .checkbox-label {
  background: var(--primary-color);
  border-color: var(--primary-color);
}

.todo-checkbox:checked + .checkbox-label::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 11px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.todo-checkbox:focus ~ .checkbox-label {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
}
</style>
