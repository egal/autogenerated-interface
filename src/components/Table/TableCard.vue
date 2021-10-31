<template>
  <div class="card-items-container">
    <div class="card-headers">
      <div v-for="header in headers" :key="header.id">
        {{ header.label }}
      </div>
    </div>
    <div class="card-items">
      <div v-for="cardItem in item" :key="cardItem.id">
        {{ cardItem }}
      </div>
    </div>
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
    headers: {
      type: Object,
      default: undefined,
    },
  },
  methods: {},
}
</script>

<style scoped lang="scss">
@import 'assets/tableStyles';
</style>
