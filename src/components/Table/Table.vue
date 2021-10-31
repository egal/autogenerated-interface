<template>
  <div class="view-switch-btn" :style="cssVars">
    <div class="toggle-button-cover">
      <div class="button-cover">
        <div class="button r" id="button-3">
          <input type="checkbox" class="checkbox" @input="checkboxToggle()" />
          <div class="knobs"></div>
          <div class="layer"></div>
        </div>
      </div>
    </div>
  </div>
  <div :style="cssVars" :class="{ 'card-container': card, 'table-container': !card }">
    <div class="filter-container">
      <slot name="filters">
        <Filters></Filters>
      </slot>
    </div>

    <div class="table-content" v-if="!card">
      <div class="table-header">
        <TableHeader :headers="table.tableData?.headers"></TableHeader>
      </div>
      <div class="table-body">
        <div v-for="item in table.tableData?.items" :key="item.id" class="table-item">
          <TableRow :item="item" :fields="table.tableData?.fields"></TableRow>
          <button @click="toggleOptionsMenu(item.id)" class="options-btn">
            <i class="bx bx-dots-horizontal-rounded" id="btn" />
          </button>
        </div>
      </div>
      <div class="table-footer">
        <Pagination></Pagination>
      </div>
    </div>
    <div v-if="card" class="cards-content">
      <div v-for="item in table.tableData?.items" :key="item.id" class="card-content">
        <TableCard :item="item" :headers="table.tableData?.headers"></TableCard>
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
import TableCard from '@/components/Table/TableCard'
export default {
  name: 'Table',
  components: { TableCard, TableHeader, Pagination, TableRow, Filters },
  props: {
    // card: {
    //   type: Boolean,
    //   default: false,
    // },
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
        lightSecondaryColor: '#dedffb',
        mainAccentColor: '#0083FF',
        lightAccentColor: '#96ccff',
        lightGrayColor: '#e3eaf6',
        darkGrayColor: '#d3d8e1',
        mainLightColor: '#F0F6F9',
        mainWhiteColor: '#FFFEFF',
        footerBackground: '#2B199F',
        headerColor: '#A7B3C8',
        iconWidth: 18,
        iconHeight: 18,
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
        sidebarBorderRadius: '0 10px 10px 0',
        boldBoxShadow: '0 4px 20px -2px rgba(50, 50, 71, 0.08)',
        mainBorderRadius: 'border-radius: 20px',
      }),
    },
  },
  data() {
    return {
      table: {},
      tableData: {},
      card: false,
      showOptions: false,
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
        '--light-accent-color': this.cssConfig.lightAccentColor,
        '--light-secondary-color': this.cssConfig.lightSecondaryColor,
        '--accent-color': this.cssConfig.mainAccentColor,
        '--light-color': this.cssConfig.mainLightColor,
        '--white-color': this.cssConfig.mainWhiteColor,
        '--footer-background': this.cssConfig.footerBackground,
        '--box-shadow': this.cssConfig.boxShadow,
        '--icon-width': this.cssConfig.iconWidth,
        '--icon-height': this.cssConfig.iconHeight,
        '--sidebar-border-radius': this.cssConfig.sidebarBorderRadius,
        '--header-color': this.cssConfig.headerColor,
        '--light-gray-color': this.cssConfig.lightGrayColor,
        '--dark-gray-color': this.cssConfig.darkGrayColor,
        '--bold-box-shadow': this.cssConfig.boldBoxShadow,
        '--main-border-radius': this.cssConfig.mainBorderRadius,
      }
    },
  },
  methods: {
    checkboxToggle() {
      this.card = !this.card
    },
    toggleOptionsMenu(id) {
      this.emitter.emit('open-options', id)
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/tableStyles';
</style>
