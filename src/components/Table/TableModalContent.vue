<template>
  <slot name="modalContent">
    <div class="edit-modal-content" v-if="editModal">
      <div v-for="i in item" :key="i">
        {{ i }}
        <TableWidget></TableWidget>
      </div>
    </div>
    <div class="delete-modal-content" v-if="deleteModal">
      <h1>{{ deleteModalText }}</h1>
    </div>
  </slot>
  <!-- Modal Content -->
  <div class="controls-container">
    <button @click="close" type="button" class="cancel-btn">{{ cancelBtnText }}</button>
    <button @click="deleteItem" type="button" class="confirm-btn">
      <span>{{ confirmBtnText }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'TableModalContent',
  props: {
    cancelBtnText: {
      type: String,
      default: 'Отмена',
    },
    confirmBtnText: {
      type: String,
      default: 'Подтвердить',
    },
    editModal: {
      type: Boolean,
      default: false,
    },
    deleteModal: {
      type: Boolean,
      default: false,
    },
    deleteManyModal: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: null,
    },
    deleteManyIds: {
      type: Array,
      default: () => [],
    },
    deleteModalText: {
      type: String,
      default: 'Подтвердите удаление записи',
    },
  },
  data() {
    return {
      // editModal: false,
      // item: null,
      // deleteItem: false,
      // deleteManyModal: false,
    }
  },
  mounted() {
    // this.emitter.on('edit-modal', (item) => {
    //   this.item = item
    //   this.editModal = true
    //   this.deleteItem = false
    //   console.log(this.item)
    // })
    // this.emitter.on('delete-modal', (id) => {
    //   console.log(id, 'delete modal id')
    //   this.item = id
    //   this.deleteItem = true
    //   this.editModal = false
    //   console.log('delete-modal', this.deleteItem)
    // })
  },
  methods: {
    close() {
      this.emitter.emit('close')
    },
    deleteItem() {
      console.log('delete item modal')
      this.emitter.emit('delete-item')
    },
  },
}
</script>

<style lang="scss" scoped>
.controls-container {
  display: flex;
  justify-content: center;
  margin: auto auto 0 auto;
  button {
    padding: 15px 20px;
    border: none;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 8px;
    width: 150px;
  }
  .cancel-btn {
    background-color: #d3d8e1;
    color: #fff;
    margin-right: 20px;
  }
  .confirm-btn {
    background-color: #2f3375;
    color: #fff;
    margin-left: 20px;
  }
}
</style>
