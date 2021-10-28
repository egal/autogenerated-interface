<template>
  <div class="table-container" :style="cssVars">
    <div class="filter-container">
      <slot name="filters">
        <Filters></Filters>
      </slot>
    </div>
    <div class="table-content">
      <div class="table-header">
        <TableHeader :headers="table.tableData?.headers"></TableHeader>
      </div>
      <div class="table-body">
        <div v-for="item in table.tableData?.items" :key="item.id">
          <TableRow :item="item" :fields="table.tableData?.fields"></TableRow>
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
import { Table } from './assets/Table'
export default {
  name: 'Table',
  components: { TableHeader, Pagination, TableRow, Filters },
  props: {
    card: {
      type: Boolean,
      default: false,
    },
    microserviceName: {
      type: String,
      default: '',
    },
    modelName: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    cssConfig: {
      type: Object,
      default: () => ({
        mainDarkColor: '#2F3375',
        mainAccentColor: '#0083FF',
        mainLightColor: '#F0F6F9',
        mainWhiteColor: '#FFFEFF',
        footerBackground: '#2B199F',
        headerColor: '#A7B3C8',
        iconWidth: 18,
        iconHeight: 18,
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
        sidebarBorderRadius: '0 10px 10px 0',
      }),
    },
  },
  data() {
    return {
      table: {},
      tableData: {},
    }
  },
  mounted() {
    this.table = new Table(this.microserviceName, this.modelName, this.url, this)
    console.log(this.table)
  },
  computed: {
    cssVars() {
      return {
        '--dark-color': this.cssConfig.mainDarkColor,
        '--accent-color': this.cssConfig.mainAccentColor,
        '--light-color': this.cssConfig.mainLightColor,
        '--white-color': this.cssConfig.mainWhiteColor,
        '--footer-background': this.cssConfig.footerBackground,
        '--box-shadow': this.cssConfig.boxShadow,
        '--icon-width': this.cssConfig.iconWidth,
        '--icon-height': this.cssConfig.iconHeight,
        '--sidebar-border-radius': this.cssConfig.sidebarBorderRadius,
        '--header-color': this.cssConfig.headerColor,
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/tableStyles';
</style>
