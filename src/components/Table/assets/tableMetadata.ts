// export const tableMetadata = {
//   fields: {
//     id_field: {
//       label: 'id field',
//       type: 'number',
//       sortable: true,
//     },
//     string_field: {
//       label: 'string field',
//       type: 'string',
//       sortable: true,
//     },
//     number_field: {
//       label: 'number field',
//       type: 'number',
//       sortable: false,
//     },
//     date_field: {
//       label: 'date field',
//       type: 'Date',
//       sortable: true,
//     },
//     select_field: {
//       label: 'select field',
//       type: 'Select',
//       sortable: false,
//     },
//   },
//   filters: [],
//   orders: [],
//   withs: [],
// }
export const tableMetadata = {
  fields: [
    {
      computed: { case: 'toUpperCase()' },
      case: 'toUpperCase()',
      label: 'ФИО',
      path: 'full_name',
      type: 'string',
    },
    {
      computed: { format: 'dd-MM-yy' },
      format: 'dd-MM-yy',
      label: 'Дата рождения',
      path: 'birth_date',
      type: 'date',
    },
    {
      computed: [],
      label: 'Статус',
      path: 'is_active',
      type: 'bool',
    },
    {
      computed: { accuracy: 2 },
      accuracy: 2,
      label: 'Ставка',
      path: 'rate',
      type: 'float',
    },
    {
      computed: { case: 'toLowerCase()' },
      case: 'toLowerCase()',
      label: 'Отдел',
      path: 'departments[].name',
      type: 'string[]',
    },
  ],
  filter: [],
  label: 'Сотрудники',
  order: ['full_name', 'desc'],
  relations: ['departments'],
}
