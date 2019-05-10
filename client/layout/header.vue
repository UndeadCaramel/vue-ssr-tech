<template>
  <header :class= "$style.mainHeader">
    <h1>{{title}}</h1>
  </header>
</template>

<script>
export default {
  //     created () {
  //     console.log(this.$style)
  //     // -> "red_1VyoJ-uZ"
  //     // 一个基于文件名和类名生成的标识符
  //   },
  data () {
    return {
      title: 'TODO'
    }
  }
}
</script>

<style lang="stylus" module>
.main-header {
  text-align: center;

  h1 {
    font-size: 100px;
    color: rgba(0 90 0 0.8);
    font-weight: 200;
    margin: 20px;
  }
}
</style>
