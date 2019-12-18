import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
// import a from './modules/a'

export default () => {
  const store = new Vuex.Store({
    // 是否禁止在外面直接修改state
    strict: true,
    state,
    mutations,
    getters,
    actions,
    // 模块化作用域单独模块引用，基本结构可以和最上面一层一样，调用形式"this.$store.state.[模块名].[模块state变量]"，示例"this.$store.state.b.text"
    // modules: {
    //   a,
    //   b: {
    //     // mapState中引用可以使用以下形式：
    //     // ...mapState({
    //     //   text: state => state.a.text
    //     // })
    //     state: {
    //       text: 'text in b'
    //     },
    //     // 是否启用独立的命名空间
    //     namespaced: true,
    //     // 如果没有启用独立的命名空间（默认），调用方式可以直接应用其名字 ...mapMutations=(['updateText'])
    //     // 如果有启用独立的命名空间，调用方式不可直接应用其名字 ...mapMutations=(['b/updateText'])， this应用则是this['b/updateText']
    //     // 一般建议使用类的方式进行重命名 ...mapMutations=({ updateText: 'b/updateText' })
    //     mutations: {
    //       updateText (state, t) {
    //         state.text = t
    //       }
    //     },
    //     getters: {
    //       textPlus (state, getters, rootState) {
    //         return state.text + ' ' + rootState.b.text
    //       }
    //     },
    //     actions: {
    //       add ({ state, commit, rootState }) {
    //         console.log('in b/add')
    //         // 可直接commit当前作用域的mutations
    //         // 当启用了当前命名空间，如果要commit根节点的数据，比如commit，a模块里的mutation，则应该在commit加上第三个参数"{root: true}"
    //         commit('a/updateText', state.text + ': ' + rootState.count, {root: true})
    //         commit('updateText', state.text + ': ' + rootState.count)
    //       }
    //     }
    //   }
    // }
    // 自定义一些操作，会在初始化的时候自动调用，比如做一些"订阅"操作等
    plugins: [
      st => {
        // 订阅，监听所有方法调用
        st.subscribeAction((action, state) => {
          console.log(action.type)
          console.log(action.payload)
        })
      }
    ]
  })

  if (module.hot) {
    module.hot.accept([
      './state',
      './mutations',
      './actions',
      './getters'
    ], () => {
      const newState = require('./state').default
      const newMutations = require('./mutations').default
      const newActions = require('./actions').default
      const newGetters = require('./getters').default
      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newActions,
        actions: newGetters
      })
    })
  }

  return store
}
