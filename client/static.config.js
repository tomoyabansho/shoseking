
export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/subscribe',
        component: 'src/containers/Subscribe',
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
}
