<script lang="ts">
export default {
  name: "MainPageListSort",
  data() {
    return {
      inputValue: "title",
    }
  },
  methods: {
    fetchTodos() {
      this.$emit('updateTodos', {sort: this.inputValue});
    },
    changeIpnut(event: Event) {
      const target = (<HTMLInputElement>event.target);
      this.inputValue = target.value;
      this.fetchTodos();
    }
  }
}
</script>

<template>
  <div class="order-select-sort">
    <select
      class="main-page-list-sort"
      v-bind:value="inputValue"
      v-bind:fetchTodos="fetchTodos"
      v-on:input="changeIpnut"
      id="search-input"
    >
      <option value="title">by title</option>
      <option value="details">by details</option>
      <option value="date">by date</option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.order-select-sort {
  position: relative;
  width: 128px;
  height: 48px;
  cursor: pointer;

  .main-page-list-sort {
    all: unset;
    font: var(--font-text-sm);
    font-weight: 600;
    font-size: 18px;
    position: relative;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 12px 0 0 12px;
    background: var(--color-primary);
    border-radius: 8px;
    border: 2px solid var(--color-green);
    > option {
      border: 1px solid var(--color-green);
      font: var(--font-text-sm);
      font-size: 18px;
      font-weight: 600;
    }
  }
}
</style>
