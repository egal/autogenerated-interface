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
      <button class="delete-all-btn" v-if="selectAll" @click="deleteItems">
        <img :src="require('./assets/delete2.svg')" />
        <span>Удалить все</span>
      </button>
    </div>
    <slot name="controls"></slot>
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
            <th class="checkbox-container" v-if="!isLoading"></th>
            <th v-for="(header, index) in tableData?.headers" :key="index">
              <div class="table-header">
                <span>{{ header.label }}</span>
                <button v-if="header.sortable">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 477.175 477.175"
                    xml:space="preserve"
                    class="sort-asc"
                    :fill="cssConfig.headerColor"
                    @click="sortItems(header, 'asc')"
                  >
                    <g>
                      <path
                        d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
            		c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"
                      />
                    </g>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 477.175 477.175"
                    xml:space="preserve"
                    class="sort-desc"
                    :fill="cssConfig.headerColor"
                    @click="sortItems(header, 'desc')"
                  >
                    <g>
                      <path
                        d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
            		c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z
            		"
                      />
                    </g>
                  </svg>
                </button>
              </div>
            </th>
            <th class="row-options-container" v-if="!isLoading"></th>
          </tr>
          <div v-else-if="isLoading" class="skeletor-container">
            <Skeletor width="180px" height="30px" v-for="i in 5" :key="i" />
          </div>
        </thead>
        <tbody v-if="!isLoading">
          <tr v-for="item in tableData.items || []" :key="item.id">
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
            <TableRow :item="item" :edit-mode="selectedRow === item.id ? true : false"></TableRow>
            <div class="item-options-container" v-if="editable">
              <button
                class="edit-btn"
                @click="switchToEditMode(item)"
                v-if="selectedRow !== item.id"
              >
                <img :src="require('./assets/edit.svg')" />
              </button>
              <button class="save-edit-btn" @click="saveEdit()" v-if="selectedRow === item.id">
                <img :src="require('./assets/tick.svg')" />
              </button>
              <button class="delete-btn" @click="openDeleteModal(item)">
                <img :src="require('./assets/delete2.svg')" />
              </button>
            </div>
          </tr>
        </tbody>
        <div v-else-if="isLoading" class="body-skeletor-container">
          <Skeletor v-for="i in 7" width="calc(100% - 40px)" height="80px" :key="i" />
        </div>
      </table>
    </div>
    <div v-if="card" class="cards-content">
      <div v-for="cardItem in tableData.items || []" :key="cardItem.id" class="card-content">
        <TableCard
          :cardDtem="cardItem"
          :headers="tableData.headers"
          :isLoading="isLoading"
        ></TableCard>
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
      <template v-slot:innerModalContent>
        <slot name="modalContent">
          <TableModalContent
            :edit-modal="editModal"
            :delete-modal="deleteModal"
            :delete-many-modal="deleteManyModal"
            :item-id="modalItemId"
            :delete-many-ids="idsForDeletion"
            :cancel-btn-text="cancelBtnText"
            :confirm-btn-text="confirmBtnText"
            :delete-modal-text="deleteModalText"
          ></TableModalContent>
        </slot>
      </template>
    </TableModal>
    <div class="no-server-reply" v-if="noReplay">
      {{ noReplayMessage }}
    </div>
  </div>
  <Toaster></Toaster>
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
import TableModalContent from '@/components/Table/TableModalContent'
import { tableStore } from '@/storage/TableStore'
import { ToasterClass } from '../Toaster/ToasterClass'
import Toaster from '@/components/Toaster/Toaster'
let ToasterInst = new ToasterClass()
export default {
  name: 'Table',
  components: {
    Toaster,
    TableCard,
    Pagination,
    Filters,
    TableRow,
    Skeletor,
    TableModal,
    TableModalContent,
  },
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
    editable: {
      type: Boolean,
      default: true,
    },
    noReplayMessage: {
      type: String,
      default: 'Нет ответа от сервера!',
    },
    modalComponent: {
      type: [String, Object],
      default: 'TableModalComponent',
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
    cancelBtnText: {
      type: String,
      default: 'Отмена',
    },
    confirmBtnText: {
      type: String,
      default: 'Подтвердить',
    },
    deleteModalText: {
      type: String,
      default: 'Подтвердите удаление записи',
    },
  },
  data() {
    return {
      tableItemsMock: items,
      tableMetaMock: tableMetadata,
      table: {},
      card: false,
      optionsId: '',
      order: undefined,
      orderBy: undefined,
      hover: false,
      modalActive: false,
      isLoading: false,
      noReplay: false,
      editModal: false,
      deleteModal: false,
      deleteManyModal: false,
      modalItemId: null,
      rowEditMode: false,
      selectedRow: null,
      idsForDeletion: [],
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
    this.emitter.on('close', () => {
      this.modalActive = false
    })
    this.emitter.on('delete-item', () => {
      this.modalActive = false
      this.deleteItem()
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
    saveEdit() {
      this.selectedRow = ''
      constructor
        .update(this.microserviceName, this.modelName, tableStore.getState().selectedItem)
        .call()
        .then((data) => {
          ToasterInst.success(data.message)
        })
        .catch((error) => {
          ToasterInst.success(error.message)
        })
    },
    openDeleteModal(item) {
      this.modalActive = true
      this.deleteModal = true
      this.modalItemId = item.id
    },
    switchToEditMode(item) {
      this.selectedRow = item.id
      tableStore.setSelectedItem(item)
    },
    deleteItem() {
      constructor
        .delete(this.microserviceName, this.modelName, { id: this.modalItemId })
        .call()
        .then((data) => {
          ToasterInst.success(data.message)
        })
        .catch((error) => {
          ToasterInst.error(error)
        })
    },
    deleteItems() {
      constructor
        .custom(this.microserviceName, this.modelName, 'deleteMany', { ids: this.selected })
        .call()
        .then((data) => {
          ToasterInst.success(data.message)
        })
        .catch((error) => {
          ToasterInst.error(error.error)
        })
    },
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
          sortable: fields[field].sortable,
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
      tableStore.setTableData(this.tableData)
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
    getItems(currentPage, perPage, filter, withs) {
      this.$cookies.set('currentPag', Number(currentPage))
      this.$cookies.set('perPage', perPage)
      const filters = []
      const ordersArr = []
      ordersArr.push(
        typeof this.orderBy !== 'undefined' && typeof this.order !== 'undefined'
          ? [this.orderBy, this.order]
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
            this.initTable()
          } else if (this.tableMetadata && this.tableItems) {
            this.tableData.items = this.tableItems
            this.isLoading = false
          }
        })
        .catch((error) => {
          this.isLoading = false
        })
    },
    sortItems(header, order) {
      if (header.field.path.includes('[]')) {
        this.orderBy = header.field.path.replace(/[[-]]/, '')
      } else {
        this.orderBy = header.field.path
      }
      this.order = order
      this.getItems()
    },
    checkboxToggle() {
      console.log(this.tableData, this.card)
      this.card = !this.card
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/tableStyles';
</style>
