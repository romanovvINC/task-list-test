<script lang="ts">
export default {
  name: "MainPageListOrder",
  data() {
    return {
      inputValue: "desc",
    }
  },
  methods: {
    fetchTodos() {
      this.$emit('updateTodos', {order: this.inputValue});
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
  <div class="order-select-container">
    <select
      class="main-page-list-order"
      v-bind:value="inputValue"
      v-bind:fetchTodos="fetchTodos"
      v-on:input="changeIpnut"
      id="search-input"
    >
      <option value="desc">descending</option>
      <option value="asc">ascending</option>
    </select>
    <span class="order-arrow" :class="[inputValue === 'desc' ? 'arrowDown' : 'arrowUp']" />
  </div>

</template>

<style lang="scss" scoped>
.order-select-container {
  position: relative;
  width: 144px;
  height: 48px;
  cursor: pointer;

  .main-page-list-order {
    all: unset;
    position: relative;
    height: 100%;
    width: 100%;
    font: var(--font-text-sm);
    font-weight: 600;
    box-sizing: border-box;
    padding: 12px 0 0 12px;
    background: var(--color-primary);
    border-radius: 8px;
    border: 2px solid var(--color-green);
  }

  .order-arrow {
    right: 12px;
    position: absolute;
    top: 10px;
    z-index: 1;
    content: '.';
    width: 24px;
    height: 24px;
    transition: all .3s ease-out;
    background: url('../../../../../shared/lib/assets/icons/arrow-icon.svg') no-repeat;
    transform: rotate(0deg);
    &:hover {
      opacity: .8;
    }
  }

  .arrowDown {
    transform: rotate(180deg);
  }
}
</style>
