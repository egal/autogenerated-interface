import { Store } from './Store'
interface Table extends Object {
  tableData: {
    tableTitle: string
    headers: Array<Record<string, unknown>>
    fields: Array<Record<string, unknown>>
    items: Array<Record<string, unknown>>
  }
  selectedItem: Record<string, unknown>
}

class TableStore extends Store<Table> {
  protected data(): Table {
    return {
      tableData: {
        tableTitle: '',
        headers: [],
        fields: [],
        items: [],
      },
      selectedItem: {},
    }
  }

  public setTableData(tableData: {
    tableTitle: string
    headers: Array<Record<string, unknown>>
    fields: Array<Record<string, unknown>>
    items: Array<Record<string, unknown>>
  }) {
    this.state.tableData = tableData
  }
  public setSelectedItem(item: Record<string, unknown>) {
    this.state.selectedItem = item
  }
}

export const tableStore: TableStore = new TableStore()
