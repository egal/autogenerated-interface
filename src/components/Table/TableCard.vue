<template>
  <div>
    {{ item }}
  </div>
</template>

<script>
export default {
  name: 'TableCard',
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: undefined,
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/tableStyles';
</style>
