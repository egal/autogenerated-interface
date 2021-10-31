import { ActionConstructor } from '@egalteam/framework/compile/index'
import { tableMetadata } from '@/components/Table/assets/tableMetadata'
import { items } from '@/components/Table/assets/tableItems'
export class Table {
  microserviceName: string
  modelName: string
  url: string
  loading: boolean
  context: any
  tableMetadata: Record<string, unknown> = {}
  tableItems: any
  tableData = {
    tableTitle: '',
    headers: [],
    fields: [],
    items: [],
  } as any
  constructor(microserviceName: string, modelName: string, url: string, context: any) {
    this.microserviceName = microserviceName
    this.modelName = modelName
    this.url = url
    this.loading = true
    this.context = context
    this.getTableMetadata()
  }

  getTableMetadata() {
    this.tableMetadata = tableMetadata
    this.getItems()
  }
  getItems() {
    this.loading = true
    this.tableItems = items
    if (this.tableMetadata && this.tableItems) {
      this.setTableData()
    }
  }
  setTableData() {
    const fields = this.tableMetadata.fields as any
    this.tableData.items = this.tableItems
    Object.keys(fields).forEach((field: any, i: number) => {
      this.tableData.headers.push({ label: fields[field].label, sortable: fields[field].sortable })
      this.tableData.fields.push({
        key: field,
        label: fields[field].label,
        type: fields[field].type,
      })
    })
    this.loading = false
  }
}
