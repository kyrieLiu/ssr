import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history',
    // 设置基础路由
    // base: '/base/',
    // 设置router-link的样式class
    linkActiveClass: 'active-link', // 部分重合样式
    linkExactActiveClass: 'exact-active-link', // 完全重合的样式
    // 页面跳转时判断是否有保留的滚动信息，可以直接滚动到最开始浏览时候的滚动状态
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    // // 自定义将路由后参数字符串转成Object
    // parseQuery (query) {
    //
    // },
    // // 自定义将object转成路由后参数字符串
    // stringifyQuery (Obj) {
    //
    // }
    // 是否进行热跳转，也就是只更新<roouter-view>部分的组件，其他部分保持，如果设置成false，每一次跳转都是重新全页面加载
    fallback: true
  })
}
