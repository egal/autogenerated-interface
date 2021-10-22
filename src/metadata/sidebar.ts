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
    route: '',
    icon: 'nested',
    children: [
      {
        label: 'Child 1',
        route: '',
        icon: '',
        children: [
          {
            label: 'Child 1 2',
            route: 'childtwo',
            icon: '',
          },
          {
            label: 'Child 1 3',
            route: 'childthree',
            icon: '',
          },
        ],
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
