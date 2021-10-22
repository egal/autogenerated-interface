export const sidebarConfig = [
  {
    label: 'Home',
    route: 'home',
    icon: 'home',
  },
  {
    label: 'Simple Item',
    route: 'item',
    icon: 'home',
  },
  {
    label: 'Nested Item',
    route: '',
    icon: 'home',
    children: [
      {
        label: 'Child nested item',
        route: '',
        icon: 'home',
        children: [
          {
            label: 'Child 1 2',
            route: 'childtwo',
            icon: 'home',
          },
          {
            label: 'Child 1 3',
            route: 'childthree',
            icon: 'home',
          },
        ],
      },
      {
        label: 'Child 2',
        route: 'childtwo',
        icon: 'home',
      },
      {
        label: 'Child 3',
        route: 'childthree',
        icon: 'home',
      },
    ],
  },
]
