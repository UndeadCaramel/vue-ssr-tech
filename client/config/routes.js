// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'
// 动态import，可以页面代码进行异步生成，当路由指向页面时才进行页面的js生成，
// 可以加快页面的渲染速度，免去一次性加载js造成的加载速度较慢，及开销较大
// 使用时需要引入新的babel插件syntax-dynamic-import

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    beforeEnter (to, from, next) {
      console.log('before enter')
      next()
    },
    path: '/app',
    // props: (router) => ({ id: router.query.b }),
    component: () => import('../views/todo/todo.vue'),
    // component: Todo,
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    name: 'app'
  },
  {
    path: '/app/:id',
    props: true, // 可通过prop在vue组件中直接获取id，不推荐使用此种方法将id耦合在url中
    // props: (router) => ({ id: router.query.b }), 此方法可以自定转换为id的内容，此处将url后的？b=456作为id传入
    component: () => import('../views/todo/todo.vue')
  //   name: 'app',
  //   meta: {
  //     title: 'This is app',
  //     description: 'asd'
  //   },
  //   children: [
  //     {
  //       path: 'test',
  //       component: Login
  //     }
  //   ]
  },
  {
    path: '/login',
    // component: Login
    component: () => import('../views/login/login.vue')
    // components: {
    //   default: Login,
    //   a: Todo
    // }
  }
  // {
  //   path: '/login/exact',
  //   component: Login
  // },
]
