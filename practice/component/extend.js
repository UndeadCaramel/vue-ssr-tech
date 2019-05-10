import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: {
      type: String,
      required: true
    }
  },
  mounted () {
    console.log('comp mounted')
  },
  template: `
  <div>
    <input type="text" v-model="text">
    <span @click="handleChange">{{propOne}}</span>
    <span v-show="active">show this content</span>
  </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

const parent = new Vue({
  name: 'parent'
})

const component2 = {
  // parent: parent 声明组件时无法指定parent，只有在new一个对象时才能指定parent
  extends: component,
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    // console.log('copm2 mounted')
    console.log(this.$parent.$options.name)
    this.$parent.text = '12345'
  }
}

// const CompVue = Vue.extend(component)

// new CompVue({
//   el: '#root',
//   data: {
//     text: 1
//   },
//   // 无法使用props对props中的值进行赋值，需使用propsdata
//   // props: {
//   //   propOne: '123'
//   // }
//   propsData: {
//     propOne: '123'
//   },
//   mounted () {
//     console.log('compVue mounted')
//   }
// })

new Vue({
  parent: parent, // 声明组件时无法指定parent，只有在new一个对象时才能指定parent
  name: 'root',
  components: {
    Comp: component2
  },
  el: '#root',
  template: `
  <div>
    <span>{{text}}</span>
    <comp prop-one="123"></comp>
  </div>
  `,
  data: {
    text: 2
  },
  mounted () {
    console.log(this.$parent.$options.name)
  }
})
