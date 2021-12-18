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
  <div class="controls-panel">
    <div class="checkbox-container">
      <input
        class="custom-checkbox"
        type="checkbox"
        name="custom-checkbox"
        id="custom-checkbox"
        v-model="selectAll"
      />
      <label for="custom-checkbox">Выбрать все</label>
    </div>
    <div class="table-row-controls">
      <button class="delete-all-btn" v-if="selectAll">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
        >
          <path d="M12 12h2v12h-2z" fill="#688BB6" />
          <path d="M18 12h2v12h-2z" fill="#688BB6" />
          <path
            d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z"
            fill="#688BB6"
          />
          <path d="M12 2h8v2h-8z" fill="#688BB6" /></svg
        >Удалить все
      </button>
    </div>
    <slot name="controls"> </slot>
  </div>
  <div :style="cssVars" :class="{ 'card-container': card, 'table-container': !card }">
    <div class="filter-container">
      <slot name="filters">
        <Filters></Filters>
      </slot>
    </div>
    <div class="table-content" v-if="!card">
      <table>
        <thead>
          <tr v-if="!isLoading">
            <th class="checkbox-container" v-if="!isLoading">
              <!--              <input-->
              <!--                class="custom-checkbox"-->
              <!--                type="checkbox"-->
              <!--                name="custom-checkbox"-->
              <!--                id="custom-checkbox"-->
              <!--                v-model="selectAll"-->
              <!--              />-->
              <!--              <label for="custom-checkbox"></label>-->
            </th>
            <th v-for="(header, index) in tableData?.headers" :key="index">
              {{ header.label }}
              <button @click="sortItems(header)">
                <i
                  class="bx bx-sort-alt-2"
                  id="btn-default"
                  v-if="header.sortable && (order !== 'desc' || order !== 'asc')"
                ></i>
              </button>
            </th>
          </tr>
          <div v-else-if="isLoading" class="skeletor-container">
            <Skeletor width="180px" height="30px" v-for="i in 5" :key="i" />
          </div>
        </thead>
        <tbody v-if="!isLoading">
          <tr v-for="item in tableData.items" :key="item.id">
            <td class="checkbox-container">
              <input
                class="custom-checkbox"
                type="checkbox"
                name="custom-checkbox"
                :id="item.id"
                :value="item.id"
                v-model="selected"
              />
              <label :for="item.id"></label>
            </td>
            <TableRow :item="item" :fields="tableData && tableData.fields"></TableRow>
            <button @click="toggleOptionsMenu(item.id)" class="options-btn">
              <i class="bx bx-dots-horizontal-rounded" />
            </button>
          </tr>
        </tbody>
        <div v-else-if="isLoading" class="body-skeletor-container">
          <Skeletor v-for="i in 7" width="calc(100% - 40px)" height="80px" :key="i" />
        </div>
      </table>
    </div>
    <div v-if="card" class="cards-content">
      <div v-for="item in tableData.items" :key="item.id" class="card-content">
        <TableCard :item="item" :headers="tableData.headers" :isLoading="isLoading"></TableCard>
      </div>
    </div>
    <div class="table-footer" v-if="!isLoading">
      <slot name="pagination">
        <Pagination
          :count="totalCount"
          :perPage="perPage"
          :currentPage="currentPage"
          @input="
            (page) => {
              setCurrentPage(page)
            }
          "
        ></Pagination>
      </slot>
    </div>
    <TableModal @close="toggleModal" :modalActive="modalActive">
      <template v-slot:modalContent>
        <slot name="modalInfo">
          <!--          <div class="modal-content">-->
          <!--            <h1>This is a Modal Header</h1>-->
          <!--            <p>This is a modal message</p>-->
          <!--          </div>-->
        </slot>
      </template>
    </TableModal>
    <div class="no-server-reply" v-if="noReplay">
      {{ noReplayMessage }}
    </div>
  </div>
</template>

<script>
import Filters from './Filters'
import Pagination from './Pagination'
import TableCard from '@/components/Table/TableCard'
import TableRow from '@/components/Table/TableRow'
import constructor from './assets/EgalConstructor'
import { items } from '@/components/Table/assets/tableItems'
import { tableMetadata } from '@/components/Table/assets/tableMetadata'
import TableModal from '@/components/Table/TableModal'
import 'vue-skeletor/dist/vue-skeletor.css'
import { Skeletor } from 'vue-skeletor'

export default {
  name: 'Table',
  components: { TableModal, TableCard, Pagination, Filters, TableRow, Skeletor },
  props: {
    microserviceName: {
      type: String,
      default: '',
    },
    modelName: {
      type: String,
      default: '',
    },
    metadataActionName: {
      type: String,
      default: '',
    },
    tableName: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    init: {
      type: Function,
      default: () => this.initTable(),
    },
    noReplayMessage: {
      type: String,
      default: 'Нет ответа от сервера!',
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
        tableRowHover: '#f0f6f9',
      }),
    },
  },
  data() {
    return {
      table: {},
      card: false,
      optionsId: '',
      order: '',
      hover: false,
      modalActive: false,
      isLoading: false,
      noReplay: false,
      currentPage: 1,
      perPage: 10,
      selected: [],
      tableItems: [],
      totalCount: null,
      tableData: {
        tableTitle: '',
        headers: [],
        fields: [],
        items: [],
      },
    }
  },
  mounted() {
    this.isLoading = true
    this.getMetadata()
    this.emitter.on('open-edit-modal', (item) => {
      this.emitter.emit('edit-modal', item)
      this.modalActive = true
    })
    this.emitter.on('close', () => {
      this.modalActive = false
    })
    this.currentPage =
      this.$cookies.get('currentPage') && this.$cookies.get('currentPage').length
        ? Number(this.$cookies.get('currentPage'))
        : this.currentPage

    this.perPage =
      this.$cookies.get('perPage') && this.$cookies.get('perPage').length
        ? Number(this.$cookies.get('perPage'))
        : this.perPage
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
        '--sidebar-border-radius': this.cssConfig.sidebarBorderRadius,
        '--header-color': this.cssConfig.headerColor,
        '--light-gray-color': this.cssConfig.lightGrayColor,
        '--dark-gray-color': this.cssConfig.darkGrayColor,
        '--bold-box-shadow': this.cssConfig.boldBoxShadow,
        '--main-border-radius': this.cssConfig.mainBorderRadius,
        '--table-row-hover-background': this.cssConfig.tableRowHover,
      }
    },
    selectAll: {
      get: function () {
        return this.tableData?.items ? this.selected.length == this.tableData?.items.length : false
      },
      set: function (value) {
        let selected = []
        if (value) {
          this.tableData?.items.forEach(function (item) {
            selected.push(item.id)
          })
        }
        this.selected = selected
      },
    },
  },
  methods: {
    setCurrentPage(currentPage = this.currentPage, perPage = this.perPage) {
      this.currentPage = currentPage
      this.perPage = perPage
      this.getItems(this.currentPage, this.perPage)
    },
    toggleModal() {
      this.modalActive = !this.modalActive
    },
    initTable() {
      const fields = this.tableMetadata.fields
      this.tableData.items = this.tableItems
      Object.keys(fields).forEach((field, i) => {
        this.tableData.headers.push({
          label: fields[field].label,
          field: fields[field],
        })
        let path = fields[field].path.split('.')
        for (let i in path) {
          if (path[i].includes('[]')) {
            console.log(path[i], 'contains')
          }
        }
        this.tableData.fields.push({
          key: fields[field].path.split('.'),
          label: fields[field].label,
          type: fields[field].type,
          path: fields[field].path,
          computed: fields[field].computed,
        })
      })
      this.isLoading = false
    },
    getMetadata() {
      this.isLoading = true
      constructor
        .custom(this.microserviceName, this.modelName, this.metadataActionName)
        .call()
        .then((data) => {
          this.tableMetadata = data[this.tableName]
          const initCurrentPage = this.$cookies.get('currentPage') || 1
          const initPerPage = this.$cookies.get('perPage') || 10

          this.getItems(+initCurrentPage, +initPerPage)
        })
        .catch((error) => {
          this.isLoading = false
        })
    },
    getItems(currentPage, perPage = this.perPage, filter, withs, orders) {
      this.$cookies.set('currentPage', Number(currentPage))
      this.$cookies.set('perPage', Number(perPage))
      const filters = []
      const ordersArr = []
      ordersArr.push(
        orders && orders.length
          ? orders
          : this.tableMetadata.order.length
          ? this.tableMetadata.order
          : undefined,
      )
      const withsArr = withs || this.tableMetadata.relations
      if (this.tableMetadata.filter?.length) {
        this.tableMetadata.filter.forEach((filter) => {
          filters.push(filter)
        })
      }
      constructor
        .getItems(this.microserviceName, this.modelName)
        .filter(filters)
        .withs(withsArr)
        .order(ordersArr)
        .setPagination(perPage, currentPage)
        .call()
        .then((data) => {
          this.totalCount = data.total_count
          this.tableItems = data.items
          if (this.tableMetadata && !this.tableData.headers.length) {
            console.log('init')
            this.initTable()
          } else if (this.tableMetadata && this.tableItems) {
            console.log('else')
            console.log(this.tableData.items)
            console.log(this.tableItems)
            this.tableData.items = this.tableItems
            console.log(this.tableData.items)
            this.isLoading = false
          }
        })
        .catch((error) => {
          this.isLoading = false
        })
    },
    sortItems(header) {
      console.log(header)
    },
    checkboxToggle() {
      console.log('checkbox toggle', this.card)
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
