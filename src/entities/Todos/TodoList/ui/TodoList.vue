<script lang="ts">
import TodoItem from "../../TodoItem/ui/TodoItem.vue";
import TodoItemSkeleton from '@/entities/Todos/TodoItem/ui/TodoItemSkeleton.vue'

export default {
  name: "TodoList",
  components: { TodoItemSkeleton, TodoItem },
  props: ["todos", "isFormVisible", "isLoading", "editFormId"],
  methods: {
    fetchTodos() {
      this.$emit('fetchTodos', {});
    },
    deleteMethod() {
      this.$emit('deleteMethod');
    },
    completeMethod() {
      this.$emit('completeMethod');
    },
    setFormVisible() {
      this.$emit('setFormVisible');
    },
    setEditFormId(id: number | null) {
      this.$emit('setEditFormId', id);
    },
    onCancel() {
      this.$emit('onCancel');
    }
  }
};
</script>

<template>
  <ul class="todo-list" v-if="!isLoading">
    <TodoItem
      v-for="todo in todos" :key="todo.id"
      :todo="todo"
      :isLoading="isLoading"
      :editFormId="editFormId"
      @delete="deleteMethod"
      @fetchTodos="fetchTodos"
      @complete="completeMethod"
      @setFormVisible="setFormVisible"
      @setEditFormId="setEditFormId"
    />
  </ul>
  <ul class="todo-list" v-if="isLoading">
    <TodoItemSkeleton
      v-for="index in 6" :key="index"
    />
  </ul>
</template>

<style lang="scss">
  .todo-list {
    background: var(--color-card-bg);
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    border-radius: 12px;
  }
</style>
