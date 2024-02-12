const navigation = () => {
  return [
    {
      icon: 'tabler:smart-home',
      title: 'Dashboard',
      path: '/dashboards'
    },
    {
      title: 'HR Management',
      icon: 'tabler:users',
      children: [
        {
          title: 'User Management',
          path: '/HR-Management/user-management'
        },
        {
          title: 'Roles',
          path: '/HR-Management/roles'
        },
        {
          title: 'Permissions',
          path:'/HR-Management/permissions'
        }
      ]
    },

    {
      icon: 'tabler:building',
      title: 'Assets Management',
      children: [
        {
          title: 'Routes',
          path: '/assets-management/routes'
        },
        {
          title: 'Sites',
          path: '/assets-management/sites'
        },

        { title: 'Questionnaires', path: '/assets-management/questioneries' },
        {
          title: 'Groups',
          path: '/assets-management/groups'
        }
      ]
    },

    {
      title: 'Reports',
      icon: 'tabler:checklist',
      children: [
        {
          title: 'Users Reports',
          path: '/reports/user-reports'
        },
        {
          title: 'Sites Reports',
          path: '/reports/site-reports'
        }
      ]
    },
    {
      title: 'Settings',
      icon: 'tabler:settings',
      path: '/setting'
    }
  ]
}

export default navigation
