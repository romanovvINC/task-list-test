<script lang="ts">
  export default {
    name: "SpinnerCircle",
  }
</script>

<template>
  <div class="custom-loader" />
</template>

<style lang="scss" scoped>
.custom-loader {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side,#FFFFFF 94%,#0000) top/4px 4px no-repeat,
    conic-gradient(#0000 30%,#FFFFFF);
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 4px),#000 0);
  animation:s3 1s infinite linear;
}

@keyframes s3{
  100%{transform: rotate(1turn)}
}
</style>
