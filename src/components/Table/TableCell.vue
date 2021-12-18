<template>
  <div>
    <div v-if="Array.isArray(item) && item.length">
      <div v-for="cell in item" :key="cell">
        <span>{{ cell }}</span>
      </div>
    </div>
    <div v-else-if="Array.isArray(item) && !item.length">
      <span>-</span>
    </div>
    <div v-else>
      {{ item }}
    </div>
    <TableWidget></TableWidget>
  </div>
</template>

<script>
import TableWidget from './Widgets/TableWidget'
export default {
  name: 'TableCell',
  components: {
    TableWidget,
  },
  data() {
    return {}
  },
  props: {
    item: {
      type: [String, Number, Array, Boolean],
      default: undefined,
    },
    fieldPath: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped></style>
