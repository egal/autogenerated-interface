<template>
  <div v-if="!editMode">
    <div v-if="Array.isArray(item) && item.length">
      <div v-for="cell in item" :key="cell">
        <span>{{ cell }}</span>
      </div>
    </div>
    <div v-else>
      <span>{{ item }} </span>
    </div>
  </div>
  <div v-if="editMode">
    <input
      type="text"
      v-model="updatedCell"
      @input="$emit('input', { key: this.fieldPath, item: $event.target.value })"
    />
  </div>
  <TableWidget></TableWidget>
</template>

<script>
import TableWidget from './Widgets/TableWidget'
export default {
  name: 'TableCell',
  components: {
    TableWidget,
  },
  data() {
    return {
      updatedCell: this.item,
      showInput: false,
      selectedItem: this.item,
    }
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
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['input'],
  methods: {},
}
</script>

<style scoped></style>
