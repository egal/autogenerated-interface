<template>
  <transition name="modal-animation">
    <div v-if="modalActive" class="modal" @click="close">
      <transition name="modal-animation-inner">
        <div v-if="modalActive" class="modal-inner">
          <slot name="modalContent">
            <div class="edit-modal-content" v-if="editModal">
              <div v-for="i in item" :key="i">{{ i }}</div>
              <!--              edit-->
              <!--              {{ item }}-->
            </div>
          </slot>
          <!-- Modal Content -->
          <slot name="modalControls">
            <div class="controls-container">
              <button @click="close" type="button" class="cancel-btn">{{ cancelBtnText }}</button>
              <button @click="confirm" type="button" class="confirm-btn">
                {{ confirmBtnText }}
              </button>
            </div>
          </slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TableModal',
  props: {
    modalActive: {
      type: Boolean,
      default: false,
    },
    cancelBtnText: {
      type: String,
      default: 'Отмена',
    },
    confirmBtnText: {
      type: String,
      default: 'Сохранить',
    },
    data() {
      return {
        modalActive: false,
        editModal: false,
        item: null,
      }
    },
  },
  mounted() {
    this.emitter.on('edit-modal', (item) => {
      this.item = item
      this.editModal = true
    })
  },
  methods: {
    close() {
      this.emitter.emit('close')
    },
    confirm() {
      this.emitter.emit('confirm')
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);

  .modal-inner {
    position: relative;
    max-width: 640px;
    width: 80%;
    min-height: 350px;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: #fff;
    padding: 40px 16px;
    display: flex;
    flex-direction: column;

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
  }
}
</style>
