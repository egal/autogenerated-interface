<template>
  <div>
    <div v-if="type === 'select'">
      <Select :options="select.options" :label="select.label" :placeholder="placeholder"></Select>
    </div>
  </div>
</template>

<script>
import Select from '@/components/Select/Select'
import { selectData } from '@/components/Select/selectData'
export default {
  name: 'Filters',
  components: { Select },
  data() {
    return {
      select: selectData,
      placeholder: 'select',
    }
  },
  props: {
    type: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss"></style>
