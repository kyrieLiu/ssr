<template>
  <header :class="$style.mainHeader">
    <h1>JTodo2</h1><slot></slot>
  </header>
</template>

<script>
export default {
  name: 'main-header'
}
</script>

<style lang="stylus" scoped module>
  .main-header{
    text-align center
    h1{
      font-size 100px
      color: rgba(175, 47, 47, 0.4)
      // color: black
      font-weight 100
      margin 20px
    }
  }
</style>
