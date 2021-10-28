<template>
  <div class="row-container">
    <div class="row-content">
      <div class="table-cell" v-for="rowItem in item" :key="rowItem.id">
        {{ rowItem }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableRow',
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    item: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
  },

  methods: {},
}
</script>

<style scoped lang="scss">
@import 'assets/tableStyles';
</style>
