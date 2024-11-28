<script lang="ts">
export default {
  name: "TodoItemSkeleton",
}
</script>

<template>
  <li class="todo-item-skeleton">
    <div class="left-box">
      <div class="complete-button">
      </div>
      <div class="todo-info">
        <div class="title">
        </div>
        <div class="date">
        </div>
      </div>
      <div class="todo-details">
        <div class="todo-details-text">
        </div>
      </div>
    </div>
    <div class="right-box">
      <div class="edit-button"></div>
      <div class="edit-button"></div>
    </div>
  </li>
</template>

<style lang="scss">
@mixin background-gradient {
  background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
  background-size: 600px;
}
@mixin icon-gradient {
  background-image: linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px);
  background-size: 600px;
}
.todo-item-skeleton {
  display: flex;
  justify-content: space-between;
  height: 70px;
  width: 100%;
  padding: 16px 24px;
  border-radius: 12px;
  background: var(--color-white);
  box-sizing: border-box;
  .left-box {
    display: flex;
    height: 100%;
    width: 50%;
    justify-content: left;
    .complete-button {
      height: 100%;
      aspect-ratio: 1;
      margin-right: 16px;
      border-radius: 8px;
      @include background-gradient;
      animation: shine-lines 1s infinite linear;
    }
    .todo-info {
      margin-right: 16px;
      height: 100%;
      width: 200px;
      .title {
        border-radius: 4px;
        margin: 0 0 8px 0;
        height: 40%;
        width: 100%;
        @include background-gradient;
        animation: shine-lines 1s infinite linear;
      }
      .date {
        width: 100%;
        height: 40%;
        @include background-gradient;
        animation: shine-lines 1s infinite linear;
      }
    }
    .todo-details {
      height: 100%;
      width: 40%;
      .todo-details-text {
        @include background-gradient;
        animation: shine-lines 1s infinite linear;
      }
    }
  }

  .right-box {
    display: flex;
    height: 100%;
    width: 50%;
    justify-content: right;
    :last-child {
      margin-left: 18px;
    }
    .edit-button {
      height: 100%;
      aspect-ratio: 1;
      border-radius: 8px;
      @include background-gradient;
      animation: shine-icon 1s infinite linear;
    }
  }
  @keyframes shine-lines {
  0% {
    background-position: -100px
  }
  40%, 100% {
    background-position: 360px
  }
  }
  @keyframes shine-icon {
    0% {
      background-position: -50px
    }
    40%, 100% {
      background-position: 50px
    }
  }

}
</style>
