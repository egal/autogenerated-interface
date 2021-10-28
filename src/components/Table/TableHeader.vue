<template>
  <div class="header-container">
    <div v-for="(header, index) in headers" :key="index">
      <div class="header-item">{{ header }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableHeader',
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/tableStyles';
</style>
