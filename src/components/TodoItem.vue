<template>
  <li>
    {{ todo.title }}
    <button @click="$emit('remove')">删除</button>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    todo: {
      type: Object as PropType<{id: string, title: string}>,
      required: true,
    },
  },
});
</script>

<style scoped>
li {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
