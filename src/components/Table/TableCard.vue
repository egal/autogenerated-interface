<template>
  <div class="card-items-container">
    <div class="card-headers">
      <div v-for="header in headers" :key="header.id">
        {{ header.label }}
      </div>
    </div>
    <div class="card-items">
      <div v-for="item in cardItem" :key="item.id">
        {{ cardItem }}
      </div>
    </div>
  </div>
</template>

<script>
import { tableStore } from '@/storage/TableStore'

export default {
  name: 'TableCard',
  data() {
    return {
      fields: tableStore.getState().tableData.fields,
    }
  },
  props: {
    cardItem: {
      type: Object,
      default: undefined,
    },
    headers: {
      type: Object,
      default: undefined,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
}
</script>

<style scoped lang="scss">
@import 'assets/tableStyles';
</style>
