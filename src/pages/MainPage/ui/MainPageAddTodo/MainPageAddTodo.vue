<script lang="ts">
import TodoForm from '@/entities/Todos/TodoForm/TodoForm.vue'

export default {
  name: "MainPageAddTodo",
  components: { TodoForm },
  data() {
    return {
      formProps: {
        title: "",
        details: "",
      },
      isLoading: false,
      submitButtonText: "Add Todo"
    };
  },
  methods: {
    setIsLoading(newIsLoading: boolean) {
      this.isLoading = newIsLoading;
    },
    onCancel() {
      this.$emit("setCreateFormVisible");
    },
    onSubmit(formData: {title: string, details: string}) {
      const newProject = {
        title: formData.title,
        details: formData.details,
        complete: false,
        date: new Date().toISOString()
      };
      this.setIsLoading(true);
      fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      })
        .then(() => {
          this.$emit("fetchTodos", {})
          this.$emit("setCreateFormVisible");
          this.setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.name)
          this.setIsLoading(false);
        });
    },
  },
};
</script>

<template>
  <li class="add-todo-container ">
    <TodoForm
      :isLoading="isLoading"
      @onSubmit="onSubmit"
      @onCancel="onCancel"
      :submitButtonText=submitButtonText
      :formData="formProps"
    />
  </li>
</template>

<style lang="scss" scoped>
.add-todo-container {
  border-radius: 12px;
  list-style-type: none;
  margin-bottom: 24px;
  padding: 24px;
  background-color: var(--color-card-bg);
}
</style>
