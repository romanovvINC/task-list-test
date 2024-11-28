<template>
  <li class="todo-item-form">
    <TodoForm
      :isLoading="isLoading"
      @onSubmit="onSubmit"
      :submitButtonText=submitButtonText
      :formData="formData"
      @onCancel="onCancel"
    />
  </li>
</template>

<script lang="ts">
import TodoForm from '@/entities/Todos/TodoForm/TodoForm.vue'
import type { EditFormType } from '../../../todoitem/model/types/todoItem';

export default {
  name: "TodoItemForm",
  components: { TodoForm },
  props: ["formData", "isLoading"],
  data() {
    return {
      submitButtonText: "Update Task"
    };
  },
  methods: {
    onSubmit(newData: EditFormType) {
      this.$emit('onSubmit', newData)
    },
    onCancel() {
      this.$emit('onCancel')
    }
  }
};
</script>

<style>
.todo-item-form{
    width: 100%;
}
</style>
