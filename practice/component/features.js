import Vue from 'vue'

const ChildComponent = {
  template: `
  <div>{{data.text}}</div>
  `,
  inject: ['newVue', 'data'],
  mounted () {
    // console.log(this.$parent.$options.name)
    console.log(this.newVue.$options.name)
    console.log(this.text)
  }
}

const component = {
  name: 'comp',
  components: {
    ChildComponent
  },
  // slot中可以使用后备内容，即当未传入标签中没有传入内容时的默认内容
  // template: `
  // <div :style="style">
  //   <div class="header">
  //     <slot name="header"></slot>
  //   </div>
  //   <div class="body">
  //     <slot name="body"></slot>
  //   </div>
  // </div>
  // `,
  template: `
  <div :style="style">
    <div class="header">
      <slot name="header" :text="text" aaa="1">{{text}}</slot>
    </div>
    <div class="body">
      <slot name="body"></slot>
    </div>
    <child-component></child-component>
  </div>
  `,
  data () {
    return {
      // vue中，样式必须使用字符串，不能直接使用数字
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid red'
      },
      text: 'comp text'
    }
  }
}

new Vue({
  name: 'root',
  components: {
    CompOne: component
  },
  el: '#root',
  data: {
    text: 0
  },
  // 增加text时，由于要传递值在初始化时还没有产生，需要使用provide(){}方法来进行值传递,provide/inject用来在多层级中传递上级的值，且默认绑定无响应，需要响应需自己提供get方法
  // provide: {
  //   newVue: this,
  //   text: this.text
  // },
  provide () {
    const data = {}
    // 不推荐使用这种方法进行手动响应
    Object.defineProperty(data, 'text', {
      get: () => this.text,
      enumerable: true
    })
    return {
      newVue: this,
      data
    }
  },
  // 此方法已在vue 2.6 废弃
  // template: `
  //   <comp-one>
  //   <span slot="header" slot-scope="slotProps">{{slotProps.text}} {{slotProps.aaa}}</span>
  //     <span slot="body">This is body.</span>
  //   </comp-one>
  // `,
  // vue2.6之后使用v-slot进行绑定，且v-slot只能用在template标签上，只有当组件中只有默认插槽时可在任意标签使用v-slot；与slot="xxx"可以用在任意标签不同，
  // vue2.6之后 slot-scope也被废弃，改为使用<template v-slot:header="slotProps">
  template: `
  <div>
    <comp-one ref="comp">
      <template v-slot:header="slotProps">
        <span ref="span">{{slotProps.aaa}} {{slotProps.text}}</span>
      </template>
      <template v-slot:body>
        <span>This is body.</span>
      </template>
    </comp-one>
    <input type="text" v-model="text"/>
  </div>
  `,
  mounted () {
    // console.log(this.$refs.comp)
    // console.log(this.$refs.span)
  }
})
