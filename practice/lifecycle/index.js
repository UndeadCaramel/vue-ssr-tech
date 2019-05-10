import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  // 服务端渲染仅调用beforeCreate和created
  beforeCreate () {
    console.log(this.$el, 'before create')
  },
  created () {
    console.log(this.$el, 'created')
  },
  beforeMount () {
    console.log(this.$el, 'before mount')
  },
  mounted () {
    console.log(this.$el, 'mounted')
  },
  beforeUpdate () {
    console.log(this.$el, 'before update')
  },
  updated () {
    console.log(this.$el, 'update')
  },
  // activated和deactivated之后讲组件时会讲
  activated () {
    console.log(this.$el, 'activated')
  },
  deactivated () {
    console.log(this.$el, 'deactivated')
  },
  beforeDestroy () {
    console.log(this.$el, 'before destory')
  },
  destroyed () {
    console.log(this.$el, 'destoryed')
  },
  render (h) {
    throw new TypeError('test renderErr')
    // console.log(this.el, 'render function invoke')
    // return h('div', {}, this.text)
  },
  renderError (h, err) {
    return h('div', {}, err.stack)
  }
  // errorCaptured使用方法不明
  // errorCaptured (err, vm, info) {
  //   console.log('errCaptured')
  //   // 向上冒泡且正式环境不可使用
  //   this.error = `${err.stack}\n\nfound in ${info} of component`
  //   return false
  // }
})

app.$mount('#root')

// setInterval(() => {
//   app.text += 1
// }, 1000)

// setTimeout(() => {
//   app.$destroy()
// }, 5000)
