export const sidebarConfig = {
  sidebarTitle: 'Egal',
  sidebarItems: [
    {
      label: 'Home',
      route: 'home',
      icon: 'bx bx-grid-alt',
    },
    {
      label: 'Simple Item',
      route: 'item',
      icon: 'bx bx-user',
    },
    {
      label: 'Nested Item',
      route: '',
      icon: 'bx bx-chat',
      children: [
        {
          label: 'Child 1',
          route: 'childnested',
          icon: 'bx bx-pie-chart-alt-2',
          children: [
            {
              label: 'Child 1 2',
              route: 'childtwo',
              icon: 'bx bx-folder',
            },
            {
              label: 'Child 1 3',
              route: 'childthree',
              icon: 'bx bx-cart-alt',
            },
          ],
        },
        {
          label: 'Child 2',
          route: 'childtwo',
          icon: 'bx bx-heart',
        },
        {
          label: 'Child 3',
          route: 'childthree',
          icon: 'bx bx-cog',
        },
      ],
    },
  ],
}
