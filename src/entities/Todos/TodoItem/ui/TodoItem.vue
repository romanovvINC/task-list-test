<script lang="ts">
import EditIcon from '@/shared/lib/assets/icons/edit-icon.svg?component'
import DeleteIcon from '@/shared/lib/assets/icons/delete-icon.svg?component'
import fetchDeleteTodo from '@/entities/Todos/TodoList/services/deleteTodo/deleteTodo'
import { updateCompletedTodo, fetchEditTodo } from '@/entities/Todos/TodoList/services/editTodo/editTodo'
import type { EditFormType } from '../../TodoItem/model/types/todoItem';
import TodoItemForm from '@/entities/Todos/TodoItem/ui/TodoItemForm/TodoItemForm.vue';
import { useDebounceFn } from '@vueuse/core'
import { fromIsoToFormat } from '../../../../shared/lib/utils/Date/fromIsoToFormat'

export default {
  components: { TodoItemForm, EditIcon, DeleteIcon },
  props: ["todo", "isLoading", "editFormId"],
  data() {
    console.log(this.todo.id)
    return {
      showDetails: false,
      urlThis: "http://localhost:8000/todos/" + this.todo.id,
      formData: {
        title: this.todo.title,
        details: this.todo.details,
      } as EditFormType,
      isFormLoading: false,
    };
  },
  methods: {
    fromIsoToFormat,
    showDetail() {
      this.showDetails = !this.showDetails;
    },
    setIsFormLoading(loading: boolean) {
      this.isFormLoading = loading;
    },
    onEditButton() {
      this.$emit('setEditFormId', this.todo.id);
    },
    onCancel() {
      this.$emit('setEditFormId', null);
    },
    onDelete() {
      this.isFormLoading = true;
      fetchDeleteTodo(this.todo.id).then(() => {
        this.$emit("fetchTodos", {})
      }).finally(() =>this.isFormLoading = false);
    },
    onEditSubmit(newData: EditFormType) {
      console.log('lol')
      this.setIsFormLoading(true);
      fetchEditTodo(newData, this.todo.id).then(() => {
        console.log('success');
        this.setIsFormLoading(false);
        this.$emit("fetchTodos", {})
        this.$emit('setEditFormId', null);
      }).catch(() => {
        this.setIsFormLoading(false);
      });
    },
    debouncedUpdateCompleteTodo: useDebounceFn((complete, id) => {
      updateCompletedTodo(complete, id)
    }),
    updateCompleteTodo() {
      this.debouncedUpdateCompleteTodo(!this.todo.complete, this.todo.id)
        .then(() => console.log('complete'))
        .catch((err) => console.log(err.name));
    },
  },
}
</script>

<template>
  <li class="todo-item" :key="todo.id" v-if="editFormId !== todo.id">
    <div class="left-box">
      <input @click="updateCompleteTodo" :checked="todo.complete" type="checkbox" class="complete-button" :id="todo.id + 'input'" />
      <label :for="todo.id + 'input'" />
      <div class="todo-info">
        <p class="title">{{ todo.title }}</p>
        <p class="date">{{ todo.date ? fromIsoToFormat(todo.date) : 'publish date' }}</p>
      </div>
      <div class="todo-details" @click="showDetail()" :class="{ 'todo-details-showed': showDetails}">
        <p class="todo-details-text">
          {{ todo.details }}
        </p>
      </div>

    </div>
    <div class="right-box">
      <button :disabled="isFormLoading" @click=onEditButton class="edit-button"><EditIcon class="icon" /></button>
      <button :disabled="isFormLoading" @click="onDelete" class="edit-button"><DeleteIcon class="icon" /></button>
    </div>
  </li>
  <TodoItemForm
    @onSubmit="onEditSubmit"
    @onCancel="onCancel"
    :formData="formData"
    :isLoading="isFormLoading"
    v-if="editFormId === todo.id"
  />
</template>

<style lang="scss">
.todo-item {
  width: 100%;
  height: 100%;
  padding: 16px 24px;
  background: var(--color-white);
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  .left-box {
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: flex-start;
    .complete-button {
      position: absolute;
      width: 24px;
      height: 24px;
      z-index: -1;
      opacity: 0;
    }
    .complete-button+label {
      cursor: pointer;
      width: 24px;
      height: 24px;
      position: relative;
      top: 8px;
      margin-right: 16px;
      display: inline-flex;
      align-items: center;
      user-select: none;
      &:hover {
        opacity: 0.8;
      }
    }
    .complete-button+label::before {
      content: '';
      width: 100%;
      height: 100%;
      display: inline-block;
      flex-shrink: 0;
      flex-grow: 0;
      border: 1px solid #adb5bd;
      border-radius: 0.25em;
      margin-right: 0.5em;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 50% 50%;
    }
    .complete-button:checked+label::before {
      border-color: var(--color-green);
      background-color: var(--color-green);
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
    }
    .todo-info {
      margin-right: 16px;
      .title {
        margin: 0;
      }
      .date {
        font-size: 14px;
      }
    }
    .todo-details {
      cursor: pointer;
      height: 100%;
      width: 300px;
      .todo-details-text {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .todo-details-showed {
      .todo-details-text {
        white-space: wrap;
        text-overflow: clip;
        overflow: auto;
        cursor: text;
      }
    }
  }

  .right-box {
    height: 100%;
    :last-child {
      margin-left: 4px;
      .icon {
        position: relative;
        top: 2.5px;
        transform: scale(0.9);
      }
    }
    .edit-button {
      cursor: pointer;
      transition: .1s;
      height: 100%;
      .icon {
        fill: var(--color-grey);

      }
      &:hover {
        opacity: .5;
      }
      &:disabled {
        opacity: .3;
      }
    }
  }
}
</style>
