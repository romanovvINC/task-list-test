<script lang="ts">
  export default {
    data() {
      return {
        inputValue: "",
      }
    },
    methods: {
      fetchTodos() {
          this.$emit('updateTodos', {search: this.inputValue});
       },
      changeIpnut(event: Event) {
        const target = (<HTMLInputElement>event.target);
        this.inputValue = target.value;
        this.fetchTodos();
        console.log(this.fetchTodos);
      }
    }
  }
</script>

<template>
  <input placeholder="search..." type="search" class="main-page-list-search" v-bind:value="inputValue" v-bind:fetchTodos="fetchTodos" v-on:input="changeIpnut" id="search-input">
</template>

<style lang="scss" scoped>
  .main-page-list-search {
    all: unset;
    box-sizing: border-box;
    font: var(--font-text-sm);
    font-weight: 600;
    border: 2px solid var(--color-green);
    padding: 0 0 4px 16px;
    height: 48px;
    font-size: 18px;
  }
</style>
