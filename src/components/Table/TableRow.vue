<template>
  <td class="table-cell" v-for="field in fields" :key="field.id">
    <TableCell
      :item="renderTableCell(item, field)"
      :type="field.type"
      :fieldPath="field.path"
    ></TableCell>
  </td>
  <div class="item-options-container" v-if="showOptions" @mouseleave="showOptions = false">
    <button class="edit-btn" @click="openModal(item, 'edit')">
      <i class="bx bx-edit-alt" />Edit
    </button>
    <button class="delete-btn" @click="openModal(item.id, 'delete')">
      <i class="bx bx-trash" />Delete
    </button>
  </div>

  <!--  <div class="row-container">-->
  <!--    <div class="row-content">-->
  <!--      <div class="table-cell" v-for="rowItem in item" :key="rowItem.id">-->
  <!--        <TableCell :item="rowItem"></TableCell>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <div class="item-options-container" v-if="showOptions">-->
  <!--      <button class="edit-btn"><i class="bx bx-edit-alt" />Edit</button>-->
  <!--      <button class="delete-btn"><i class="bx bx-trash" />Delete</button>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
import TableCell from '@/components/Table/TableCell'
import { format } from 'date-fns'
export default {
  name: 'TableRow',
  components: { TableCell },
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    item: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      showOptions: false,
      selected: [],
    }
  },
  mounted() {
    this.emitter.on('open-options', (id) => {
      if (this.item.id === id) {
        this.showOptions = !this.showOptions
      }
    })
  },
  computed: {},
  methods: {
    renderTableCell(item, field) {
      let fieldKey = []
      let valuesArr = []
      let fieldPath
      let nestedArr = []
      if (field.key[0].includes('[]')) {
        fieldKey = field.key[0].replace(/[[-]]/, '')
      } else {
        fieldKey = field.key[0]
      }
      for (let i of Object.keys(item)) {
        if (i === fieldKey) {
          switch (field.type) {
            case 'string':
              if (field.computed.length === 0) {
                return item[i]
              } else {
                return item[i]
              }
            case 'string[]':
              fieldPath = field.path.replace(/[[-]]/g, '')
              for (let i in field.key) {
                if (field.key[i].includes('[]')) {
                  nestedArr = item[field.key[i].replace(/[[-]]/, '')]
                  if (nestedArr.length > 0) {
                    for (let i in nestedArr) {
                      valuesArr.push(nestedArr[i][field.key[1]])
                    }
                  }
                }
              }
              return valuesArr
            case 'date':
              return this.formatDate(item[i], field)
            case 'bool':
            case 'float':
            case 'button':
            case 'select':
            default:
              return item[i]
          }
        }
      }
    },
    formatDate(item, field) {
      return format(new Date(item), field.computed.format)
    },
    openModal(id, actionName) {
      if (actionName === 'edit') {
        this.emitter.emit('open-edit-modal', id)
      } else {
        this.emitter.emit('open-delete-modal', id)
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/tableStyles';
</style>
