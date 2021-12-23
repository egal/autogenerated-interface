<template>
  <div @mouseup="$emit('close')" @mousedown="keep = true" v-if="data" class="toaster">
    <div
      class="color-toaster"
      :class="{
        danger: data.variant === 'danger',
        info: data.variant === 'info',
        primary: data.variant === 'primary',
        success: data.variant === 'success',
      }"
    >
      <div class="toaster-message">
        {{ data.message }}
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
.danger {
  @include toaster('danger');
}
.info {
  @include toaster('info');
}
.primary {
  @include toaster('primary');
}
.success {
  @include toaster('success');
}
</style>
