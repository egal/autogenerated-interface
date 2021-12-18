<template>
  <div class="header-container">
    <div v-for="(header, index) in headers" :key="index" class="header-item">
      <div>
        {{ header.label }} {{ index }}
        <button @click="sortItems(header)">
          <!--          <Icon-->
          <!--            class="sort-down"-->
          <!--            :class="{ 'sort-down-active': order === 'desc' }"-->
          <!--            v-if="header.sortable"-->
          <!--            icon="carbon:chevron-sort-up"-->
          <!--            width="15px"-->
          <!--            height="15px"-->
          <!--          />-->
          <!--          <Icon-->
          <!--            class="sort-up"-->
          <!--            :class="{ 'sort-up-active': order === 'asc' }"-->
          <!--            v-if="header.sortable"-->
          <!--            icon="carbon:chevron-sort-down"-->
          <!--            width="15px"-->
          <!--            height="15px"-->
          <!--          />-->
          <i
            class="bx bx-sort-down"
            id="btn-down"
            :class="{ 'icon-active': order === 'desc' }"
            v-if="header.sortable && order === 'desc'"
          ></i>
          <i
            class="bx bx-sort-up"
            id="btn-up"
            :class="{ 'icon-active': order === 'asc' }"
            v-if="header.sortable && order === 'asc'"
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableHeader',
  components: {},
  data() {
    return {
      order: 'desc',
      orderActive: false,
    }
  },
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    sortItems(header) {
      switch (this.order) {
        case 'desc':
          this.order = 'asc'
          break
        case 'asc':
          this.order = 'desc'
      }
      // this.emitter.emit('sort-item', {column:header.field, direction: this.order})
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/tableStyles';
</style>
