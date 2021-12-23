<template>
  <component :is="component" :data="data" />
</template>

<script>
export default {
  name: 'TableWidget',
  props: {
    type: {
      type: String,
      default: 'Text',
    },
    data: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    component() {
      if (this.type === 'string' || this.type === 'number' || this.type === 'date') {
        return () => import(`./InputText`)
      } else if (this.type === 'select') {
        return () => import('../../Select/Select')
      }
      return () => import(`./InputText`)
    },
  },
}
</script>

<style scoped></style>
