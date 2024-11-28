<script lang="ts">
import MainPageListSearch from './MainPageListSearch/MainPageListSearch.vue'
import type { FetchArticlesListProps } from '@/entities/Todos/TodoList/services/getTodos/getTodos'
import MainPageListOrder from './MainPageListOrder/MainPageListOrder.vue'
import MainPageListSort from './MainPageListSort/MainPageListSort.vue'

export default {
  name: "MainPageListFilters",
  components: { MainPageListOrder, MainPageListSearch, MainPageListSort },
  props: ["fetchTodos"],
  methods: {
    updateTodos(props: FetchArticlesListProps) {
      this.$emit('fetchTodos', props);
    },
  }
}
</script>

<template>
  <div class="main-page-list-filters">
    <MainPageListSearch @updateTodos="updateTodos" />
    <MainPageListSort @updateTodos="updateTodos" />
    <MainPageListOrder @updateTodos="updateTodos" />
  </div>
</template>

<style lang="scss" scoped>
  .main-page-list-filters {
    display: flex;
    justify-content: right;
    align-items: center;
    position: relative;
    gap: 16px;
  }
</style>
