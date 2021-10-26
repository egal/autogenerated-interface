<template>
  <div class="table-container">
    <div class="table-name">
      <h3></h3>
    </div>
    <div class="filter-container">
      <slot name="filters">
        <Filters></Filters>
      </slot>
    </div>
    <div class="table-content">
      <div class="table-header">
        <TableHeader></TableHeader>
      </div>
      <div class="table-body">
        <div class="table-row">
          <TableRow></TableRow>
        </div>
      </div>
      <div class="table-footer">
        <Pagination></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Filters from './Filters'
import TableRow from './TableRow'
import Pagination from './Pagination'
import TableHeader from './TableHeader'
export default {
  name: 'Table',
  components: { TableHeader, Pagination, TableRow, Filters },
  props: {
    card: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped></style>
