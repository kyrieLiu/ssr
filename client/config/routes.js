import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: () => import(/* webpackChunkName: "todo-view" */ '../views/todo/todo.vue'),
    meta: {
      title: 'this is app',
      description: 'dddd'
    }
  },
  {
    path: '/login',
    component: Login
  }
]
