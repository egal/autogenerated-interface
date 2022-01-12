<template>
  <td class="table-cell" v-for="field in fields" :key="field.id">
    <TableCell
      :item="renderTableCell(item, field)"
      :type="field.type"
      :fieldPath="field.path"
      :edit-mode="editMode"
      @input="(value) => setEditItem(value)"
    ></TableCell>
  </td>
</template>

<script>
import TableCell from '@/components/Table/TableCell'
import { format } from 'date-fns'
import { tableStore } from '@/storage/TableStore'
export default {
  name: 'TableRow',
  components: { TableCell },
  props: {
    item: {
      type: Object,
      default: undefined,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showOptions: false,
      selected: [],
      itemRow: this.item,
      itemToUpdate: this.item,
      fields: tableStore.getState().tableData.fields,
    }
  },
  computed: {},
  methods: {
    setEditItem(value) {
      let valueKey = value.key
      let valueItem = value.item
      Object.entries(this.itemToUpdate).forEach(([key, value]) => {
        if (valueKey === key) {
          this.itemToUpdate[key] = valueItem
          tableStore.setSelectedItem(this.itemToUpdate)
        }
      })
    },
    renderTableCell(item, field) {
      console.log(field, 'field')
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
                  } else {
                    return '-'
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
  },
}
</script>

<style scoped lang="scss">
@import 'assets/tableStyles';
</style>
