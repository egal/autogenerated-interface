<template>
  <div class="row-container">
    <div class="row-content">
      <div class="table-cell" v-for="rowItem in item" :key="rowItem.id">
        {{ rowItem }}
      </div>
    </div>
    <div class="item-options-container" v-if="showOptions">
      <button class="edit-btn"><i class="bx bx-edit-alt" />Edit</button>
      <button class="delete-btn"><i class="bx bx-trash" />Delete</button>
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
  data() {
    return {
      showOptions: false,
    }
  },
  mounted() {
    this.emitter.on('open-options', (id) => {
      console.log('kgfg')
      if (this.item.id === id) {
        this.showOptions = !this.showOptions
      }
    })
  },
  methods: {},
}
</script>

<style scoped lang="scss">
@import 'assets/tableStyles';
</style>
