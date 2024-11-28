<script lang="ts">
import TodoList from '@/entities/Todos/TodoList/ui/TodoList.vue'
import { type TodoItemType } from '@/entities/Todos/index.ts'
import MainPageAddTodo from '@/pages/MainPage/ui/MainPageAddTodo/MainPageAddTodo.vue'
import MainPageListFilters from './MainPageListFilters/MainPageListFilters.vue'
import fetchTodoListDebounced, { type FetchArticlesListProps } from '@/entities/Todos/TodoList/services/getTodos/getTodos'

export default {
  name: "MainPage",
  components: { MainPageAddTodo, TodoList, MainPageListFilters },
  data() {
    return {
      todos: [] as TodoItemType[],
      editFormId: null as number | null,
      isCreateFormVisible: false,
      current: "all",
      isTodosLoading: false,
    };
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {
    deleteMethod(id: number) {
      this.todos = this.todos.filter((project) => project.id !== id);
    },
    completeMethod(id: number) {
        const completed = this.todos.find((project) => project.id === id);
        if (completed) {
          completed.complete = !completed.complete;
        }
    },
    setEditFormId(id: number | null) {
      this.isCreateFormVisible = false;
      this.editFormId = id;
    },
    setCreateFormVisible() {
      this.editFormId = null;
      this.isCreateFormVisible = !this.isCreateFormVisible;
    },
    fetchTodos(props?: FetchArticlesListProps) {
      this.isTodosLoading = true;
      fetchTodoListDebounced(props ? props : {}).then((data) => {
        this.isTodosLoading = false;
        this.todos = data;
      }).catch(() => {
        this.isTodosLoading = false;
      });
    },

  },
  computed: {
    filteredProjects() {
      if (this.current === "completed") {
        return this.todos.filter((project) => project.complete);
      } else if (this.current === "ongoing") {
        return this.todos.filter((project) => !project.complete);
      } else {
        return this.todos;
      }
    },
  },
};
</script>

<template>
  <main>
    <div class='container'>
      <h1 class='title'>Todo List</h1>
      <div class='filters-container' v-if="editFormId === null && !isCreateFormVisible">
        <button class="add-task-button" @click="setCreateFormVisible()">{{ isCreateFormVisible ? 'Cancel' : 'Add Task'}}</button>
        <MainPageListFilters @fetchTodos="fetchTodos" />
      </div>
      <MainPageAddTodo
        v-if="isCreateFormVisible"
        @fetchTodos="fetchTodos"
        @setCreateFormVisible="setCreateFormVisible"
      />
      <TodoList
        :todos="todos"
        @deleteMethod="deleteMethod"
        @fetchTodos="fetchTodos"
        @completeMethod="completeMethod"
        @setEditFormId="setEditFormId"
        :current="current"
        :isLoading="isTodosLoading"
        :editFormId="editFormId"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
  main {
    padding-top: 40px;
    background-color: var(--color-primary);
    min-height: 100vh;
    width: 100%;
    .container {
      box-sizing: border-box;
      max-width: var(--width-desktop);
      margin-inline: auto;

      .title {
        margin-bottom: 40px;
        text-align: center;
        text-transform: uppercase;
      }

      .filters-container {
        padding-inline: 24px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 48px;
        margin-bottom: 24px;

        .add-task-button {
          color: var(--color-text-inverted);
          font: var(--font-text-md);
          border: none;
          cursor: pointer;
          border-radius: 8px;
          width: 144px;
          height: 100%;
          background-color: var(--color-green);

          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }
</style>
