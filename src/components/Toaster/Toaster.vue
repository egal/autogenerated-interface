<template>
  <transition name="slide">
    <div class="toaster-container" v-if="toasters.length">
      <div
        class="toaster-item"
        v-for="toaster in toasters"
        :key="toaster.id"
        :style="`transform: ${getPosition(toaster.id)}`"
      >
        <ToasterItem :data="toaster" @close="close(toaster.id)" :position="position" />
      </div>
    </div>
  </transition>
</template>

<script>
import ToasterItem from './ToasterItem.vue'

export default {
  name: 'ToasterContainer',
  components: { ToasterItem },
  props: {
    position: {
      type: String,
      default: 'top-left',
    },
  },
  data() {
    return {
      toasters: [],
      positions: {
        top: 'top',
        topLeft: 'top-left',
        topRight: 'top-right',
        bottom: 'bottom',
        bottomLeft: 'bottom-left',
        bottomRight: 'bottom-right',
      },
    }
  },
  computed: {},
  mounted() {
    this.emitter.on('toaster', (data) => {
      const params = {
        header: data.header,
        message: data.message,
        variant: data.variant,
        duration: data.duration,
        id: `${this.toasters.length}${new Date().getMilliseconds()}`,
      }
      this.toasters.push(params)
    })
    this.emitter.on('close', (id) => {
      this.close(id)
    })
  },
  methods: {
    close(id) {
      const index = this.toasters.findIndex((item) => item.id === id)
      this.toasters.splice(index, 1)
    },

    getPosition(id) {
      const index = this.toasters.findIndex((item) => item.id === id)
      let position = 0
      this.toasters.forEach((item, itemIndex) => {
        if (itemIndex >= index) {
          return
        }
        position += item.header ? 110 : 90
      })
      return `translateY(${position}px)`
    },
  },
}
</script>

<style scoped lang="scss">
@import 'toaster';
</style>
