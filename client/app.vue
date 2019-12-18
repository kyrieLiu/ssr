<template>
  <div id="app">
    <div id="cover"></div>
    <router-link to="/app">app</router-link>
    <router-link to="/login">login</router-link>
    <Header>
      {{ fullName + ' ' + count}}
    </Header>
<!--    <todo></todo>-->
    <transition name="fade">
      <router-view/>
    </transition>
    <Footer></Footer>
<!--    <router-view name="a"/>-->
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'

import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'

export default {
  metaInfo: {
    title: 'Todo App'
  },
  components: {
    Header,
    Footer,
    Todo
  },
  mounted () {
    // this.updateCount(5)
    // this.updateCount1(5)
    // this.updateCount(10)
    // this.updateCount1(0)
    // this.updateCountSync({ num: 10, time: 3000 })
    // console.log(this.$store.state.count + ' ' + this.$store.state.count1)
    // this.updateCount1Sync({ num: 0, time: 3000 })
  },
  computed: {
    // count () {
    //   return this.$store.state.count
    // },
    // fullName () {
    //   return this.$store.getters.fullName
    // },
    // ...需要安装"babel-preset-stage-1"
    // 第一种调用形式，用数组
    // ...mapState(['count']),
    // 第二种调用形式，用Object
    ...mapState({
      // 注意这里count， 其实是可以另外命名的
      count: state => {
        return state.count
      }
    }),
    ...mapGetters(['fullName'])
  },
  methods: {
    ...mapMutations(['updateCount', 'updateCount1']),
    ...mapActions(['updateCountSync', 'updateCount1Sync'])
  }
}
</script>

<style lang="stylus" scoped>
  #app{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
  }
  #cover{
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background-color #999
    opacity .9
    z-index -1
  }
</style>
