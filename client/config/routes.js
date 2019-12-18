// import Todo from '../views/todo/todo'
import Login from '../views/login/login'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  // {
  //   path: '/app',
  //   redirect: '/app/1325'
  // },
  {
    path: '/app',
    // 路由参数传递，可跳转至'/app/123'，可通过当前路由对象（this.$route）下的（param）object中获取信息
    // path: '/app/:id',
    // 是否将路由参数以props的形式传入组件，第一种
    // props: true,
    // 第二种传入一个object
    // props:{
    //   id: 1321
    // },
    // 第三种，通过传入方法，利用route获取想要的任何参数
    // props: (route) => ({ id: route.params.id }),
    // component: Todo,
    // 直接引用import路径，需要"babel-plugin-syntax-dynamic-import"组件支持
    component: () => import('../views/todo/todo'),
    // 路由中包含多个组件，<router-view/> 也得有多个，具体区别，添加"name"属性
    // components: {
    //   default: Todo, // <router-view/> 默认
    //   a: Login // <router-view name="a"/>
    // },
    // name可以用于路由跳转，以"<router-link :to={ name: '...' }> ... <router-link/>"的形式
    // name: 'app',
    // 自定义一些路由相关信息，放在外面会被vue忽略
    meta: {
      title: 'this is app',
      description: 'dddd'
    }
    // 每个路由单独设置进入回调钩子
    // beforeEnter (to, from, next) {
    //   console.log('before enter \'/app\'')
    //   next()
    // }
    // 放置子路由信息，记得在上层中放置<router-view/>
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: Login
  }
]
