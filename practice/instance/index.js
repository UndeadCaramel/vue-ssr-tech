import Vue from 'vue'

// new Vue({
//   el: '#root',
//   template: '<div>Hello</div>'
// })

const app = new Vue({
  //   el: '#root',
  template: '<div ref= "div">{{text}} {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  }
  // watch: {
  //   text: function (val, oldval) {
  //     console.log(val + ':' + oldval)
  //   }
  // }
})

app.$mount('#root')

// let i = 0
setInterval(() => {
  // i++
  app.text += 1 // 当有多个app.text += 1 叠加时，只会按总和变化，可用app.$nextTick()进行依次变化
  // app.obj.a = i // 如在data中未赋值则此种赋值方法无法动态改变obj中的值，可使用app.$forceUpdate()进行提交同步
  // app.$forceUpdate()
  // app.$set(app.obj, 'a', i) // 需通过set方法进行值绑定
  // app.$data.text += 1  // 等同于app.text +=1
  // app.$options.data.text += 1 // 页面显示并不发生改变
  // console.log(app.text)
}, 1000)

// 可通过delete删除data中的值
setTimeout(() => {
  // app.$delete(app.obj, 'a')
  // app.$delete(app, 'text') // 无法删除app data中的值
}, 5000)

// vue实例属性
// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }
// console.log(app.$root === app)
// console.log(app.$children)
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs)
// console.log(app.$isServer)
// console.log(app.$attr)
// console.log(app.$listeners)

// vue 实例方法
const unwatch = app.$watch('text', function (val, oldval) {
  console.log(val + ':' + oldval)
})

setTimeout(unwatch, 5000)

// app.$on('test', (a, b) => {
//   console.log(`test emited ${a} ${b}`)
// })

// app.$emit('test', 1, 2)

// app.$once('test', (a, b) => {
//   console.log(`test emited ${a} ${b}`)
// })

// setInterval(() => {
//   app.$emit('test', 1, 2)
// }, 2000)

// app.$nextTick() // 无示例
