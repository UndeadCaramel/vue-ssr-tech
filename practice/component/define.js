import Vue from 'vue'

// 此处定义全局变量则当一个组件数据变化时所有的组建绑定数据都发生变化,
// 所以需要使用data方法，在方法中返回绑定数据
// const data = {
//  text: 0
// }

// 此处虽会改变但是控制台中会报错，vue不建议在子组件中修改父组件的值，多处的修改可能导致逻辑的混乱，vue推荐使用单向流,
// 需要修改父组件的值时，通过调用父组件方法告知父组件，通过父组件来进行修改
// mounted () {
//   this.propOne = 'inner content'
// }

const component = {
  props: {
    active: {
      // type: Boolean,
      required: true,
      // default: true, 和required 2选1
      // 如果type为对象，则需要使用default方法返回一个对象，和data方法同样原因
      // default () {
      //    return {
      //    }
      // }
      // 自定义校验方法
      validator (value) {
        return typeof value === 'boolean'
      }
    },
    propOne: String,
    onChange: Function
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
      this.onChange() // 推荐使用this.$emit.handleChange()方法，props中的onChange需要去掉，并将父组件中事件绑定由:click修改为@change
    }
  }
}

// Vue.component('compOne', component)

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  mounted () {
    console.log(this.$refs.comp1)
  },
  template: `
  <div>
    <comp-one ref="comp1" :active="active" :prop-one="propOne" :onChange="handleChange"></comp-one>
    <comp-one active="false" propOne="text2"></comp-one>
  </div>
  `,
  data: {
    active: true,
    propOne: 'text1'
  },
  methods: {
    handleChange () {
      this.propOne += 1
    }
  }
})
