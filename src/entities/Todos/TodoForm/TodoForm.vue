<script lang="ts">
import SpinnerCircle from '@/shared/ui/Spinner/Spinner.vue'

export default {
  name: "TodoForm",
  components: { SpinnerCircle },
  props: ["submitButtonText", "isLoading", "formData"],
  data() {
   return {
     form: {
       title: this.formData.title,
       details: this.formData.details,
     }
   }
  }
}
</script>

<template>
  <form @submit.prevent="$emit('onSubmit', form)">
    <label>Title:</label>
    <input type="text" v-model="form.title" required :disabled="isLoading" />
    <label>Details:</label>
    <textarea :disabled="isLoading" v-model="form.details" required></textarea>
    <div class="buttons-container">
      <button type="submit" :disabled="isLoading" class="submit-button">
        <SpinnerCircle v-if="isLoading" />
        <span v-if="!isLoading">{{ submitButtonText }}</span>
      </button>
      <button type="button" @click="$emit('onCancel')" :disabled="isLoading" class="cancel-button">
        <span v-if="!isLoading">{{isLoading ? '' : 'Cancel'}}</span>
      </button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
  form {
    width: 100%;
    label {
      display: block;
      color: #bbbbbb;
      font-size: 15px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      font: var(--font-text-sm);
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    input {
      padding: 6px;
      border: 2px solid #dddddd;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 12px;
    }
    textarea {
      padding: 10px;
      border: 2px solid #dddddd;
      width: 100%;
      min-height: 100px;
      overflow-y: auto;
      box-sizing: border-box;
    }

    textarea, input {
      &:disabled {
        border: 2px solid var(--color-white);
      }
    }
    .buttons-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
      .cancel-button {
        background-color: var(--color-grey);
      }
      .submit-button {
        background-color: var(--color-green);
      }
      button {
        height: 48px;
        width: 160px;
        padding: 10px;
        border: none;
        border-radius: 8px;
        span {
          display: block;
          color: var(--color-text-inverted);
          font-size: 15px;
          cursor: pointer;
          font: var(--font-text-md);
        }
        div {
          margin-left: 48px;
        }
        transition: .1s;
        &:hover {
          opacity: 0.7;
        }
        &:disabled {
          background-color: var(--color-grey);
          opacity: 1;
        }
      }
    }
  }
</style>
