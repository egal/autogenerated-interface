<template>
  <component :is="component" :data="data" />
</template>

<script>
export default {
  name: 'TableItem',
  props: {
    type: {
      type: String,
      default: 'Text',
    },
    data: {
      default: '',
    },
  },
  computed: {
    component() {
      if (this.type === 'string' || this.type === 'number' || this.type === 'date') {
        return () => import(`./InputText`)
      }
      return () => import(`./InputText`)
    },
  },
}
</script>

<style scoped></style>
