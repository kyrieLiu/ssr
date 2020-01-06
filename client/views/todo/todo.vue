<template>
<section class="real-app">
  <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下来要做什么"
      @keyup.enter="addTodo"
  >
  <Item
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @delete="deleteTodo"
  ></Item>
  <Tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearCompleted="clearCompleted"
  ></Tabs>
</section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'

let id = 0
export default {
  name: 'todo',
  metaInfo: {
    title: 'The Todo page'
  },
  components: {
    Item,
    Tabs
  },
  // beforeRouteEnter (to, from, next) {
  //   console.log('todo before enter')
  //   next(vm => {
  //     // 这个vm是当前组件对象
  //     // console.log(vm)
  //     // console.log('vm.name: ' + vm.name)
  //   })
  // },
  // beforeRouteUpdate (to, from, next) {
  //   console.log('todo before update')
  //   next()
  // },
  // beforeRouteLeave (to, from, next) {
  //   console.log('todo before leave')
  //   if (global.confirm('are you sure!!')) {
  //     next()
  //     return
  //   }
  //   next()
  // },
  props: ['id'],
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  mounted () {
    // console.log('this.id = ' + this.id)
    // console.log('this.$route.params.id = ' + this.$route.params.id)
  },
  asyncData () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(123)
      }, 1000)
    })
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      } else {
        return this.todos.filter(todo => (this.filter === 'completed') === todo.completed)
      }
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .real-app{
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666
  }
  .add-input{
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
  }
</style>
