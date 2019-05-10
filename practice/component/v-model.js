import Vue from 'vue'

const component = {
  // 也可以通过model选项来进行绑定,当使用model修改为value1时，value将不再生效
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value', 'value1'],
  template: `
  <div>
    <!-- <input type="text" @input="handleInput" :value="value"/> -->
    <input type="text" @input="handleChange" :value="value1"/>
  </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    },
    handleChange (e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  // <comp-one :value="value" @input="value = arguments[0]" ></comp-one>等效于<comp-one v-model="value"></comp-one>,
  // v-model="value"相当于:value="value" @input="value = arguments[0]"
  // @input="value = arguments[0]" 相当于 @input="handleInput",并在Vue对象中增加handleinput方法
  // methods: {
  //   handleInput () {
  //     value = arguments[0]
  //   }
  // }
  template: `
  <div>
    <comp-one v-model="value"></comp-one>
  </div>
  `,
  data () {
    return {
      value: 1
    }
  }
})
