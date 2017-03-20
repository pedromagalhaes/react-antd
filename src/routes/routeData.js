export const routeData = [
  {
    key : '/',
    menuIcon: 'home',
    menuLabel: 'Home',
    pageTitle: 'Home Page',
    index: true
  },
  {
    key : '/counter',
    menuIcon: 'clock-circle-o',
    menuLabel: 'Counter',
    pageTitle: 'Counter Page'
  },
  {
    key : 'sub1',
    menuIcon: 'user',
    menuLabel: 'Notes',
    subMenus: [
      {
        key : '/zen',
        menuLabel: 'View Notes',
        pageTitle: 'View Notes'
      },
      {
        key : '/zen/new',
        menuLabel: 'Add Note',
        pageTitle: 'Add Note'
      },
      {
        key : '/zen/edit/:id',
        menuLabel: 'Edit Note',
        pageTitle: 'Edit Note',
        hide: true
      }
    ]
  }
]

export default {}
