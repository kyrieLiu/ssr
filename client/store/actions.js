export default {
  updateCountSync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', data.num)
      store.commit('updateCount1', data.num - 5)
    }, data.time + 500)
  },
  updateCount1Sync (store, data) {
    setTimeout(() => {
      store.commit('updateCount1', data.num)
    }, data.time + 500)
  }
}
