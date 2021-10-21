export const sidebarConfig = [
  {
    label: 'Home',
    route: 'home',
    icon: 'home',
  },
  {
    label: 'Simple Item',
    route: 'item',
    icon: 'item',
  },
  {
    label: 'Nested Item',
    route: 'nested',
    icon: 'nested',
    children: [
      {
        label: 'Child 1',
        route: 'childone',
        icon: '',
      },
      {
        label: 'Child 2',
        route: 'childtwo',
        icon: '',
      },
      {
        label: 'Child 3',
        route: 'childthree',
        icon: '',
      },
    ],
  },
]
