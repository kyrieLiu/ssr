// 对state中数据的重新组合
export default {
  fullName (state) {
    return `${state.firstName} sds ${state.lastName}`
  }
}
