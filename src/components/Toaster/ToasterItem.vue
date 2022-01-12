<template>
  <div @mouseup="$emit('close')" @mousedown="keep = true" v-if="data" class="toaster">
    <div
      class="color-toaster"
      :class="{
        light: theme === 'light',
        dark: theme === 'dark',
        success: data.variant === 'success',
        error: data.variant === 'error',
      }"
    >
      <div class="toaster-content">
        <div class="toaster-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-info-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path
              d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
            />
          </svg>
        </div>
        <div class="toaster-message">
          <h4>Toaster Header</h4>
          <p>{{ data.message }}</p>
        </div>
      </div>
      <div class="toaster-close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toaster',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          message: 'Something went wrong',
          variant: 'danger',
          duration: 4000,
        }
      },
    },
    theme: {
      type: String,
      default: 'light',
    },
  },
  data() {
    return {
      keep: false,
    }
  },
  emits: ['close'],
  computed: {},
  mounted() {
    setTimeout(() => {
      if (!this.keep) {
        this.emitter.emit('close', this.data.id)
      }
    }, this.data.duration)
  },
}
</script>

<style scoped lang="scss">
@import './toaster';
.success {
  @include toaster('primary');
}
.error {
  @include toaster('danger');
}
</style>
