import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    // linkExactActiveClass: 'exact-active-link',
    // linkActiveClass: 'active-link',
    // 页面滚动行为
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    // 当浏览器不支持mode: 'history'时默认转为hash方式
    fallback: true,
    // 自定义字符串转json串方法
    // parseQuery ( query ) {},
    // 自定义json串转字符串方法
    // stringifyQuery () {},
    mode: 'history',
    // base: '/base/',
    routes
  })
}
