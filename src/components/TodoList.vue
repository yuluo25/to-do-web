<template>
  <ul>
    <TodoItem
      v-for="(todo, index) in todos"
      :key="todo.id"
      :todo="todo"
      @remove="() => $emit('remove', index)"
    />
  </ul>
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
      type: Array as PropType<Array<{id: string, title: string}>>,
      required: true,
    },
  },
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
</style>
