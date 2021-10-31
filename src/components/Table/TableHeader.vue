<template>
  <div class="header-container">
    <div v-for="(header, index) in headers" :key="index">
      <div class="header-item">
        {{ header.label }}
        <button @click="sortItems(header)">
          <i class="bx bx-sort-down" id="btn" v-if="header.sortable"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableHeader',
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    sortItems(header) {
      this.$root.$emit('sort-item', header)
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/tableStyles';
</style>
