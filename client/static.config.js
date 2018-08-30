
export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    return [
      {
        path: '/',
        component: 'src/containers/Blog',
      },
      {
        path: '/subscribe',
        component: 'src/containers/Subscribe',
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
}
