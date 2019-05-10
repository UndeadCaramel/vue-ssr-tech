import Vue from 'vue'

const component = {
  props: ['propOne'],
  //  template: `
  //  <div :style="style">
  //    <slot name="header"></slot>
  //  </div>
  //  `,
  render (createElement) {
    return createElement('div', {
      style: this.style,
      on: {
        click: () => this.$emit('click')
      }
    }, [this.$slots.header, this.propOne])
  },
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid red'
      }
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: component
  },
  //  template: `
  //  <comp-one ref="comp">
  //    <span slot="header" ref="span">{{text}}</span>
  //  </comp-one>
  //  `,
  data: {
    text: 0,
    propOne: 123
  },
  //  等价于下面的render(createElement)
  //  render () {
  //    return this.$createElement()
  //  }
  // nativeOn将事件绑定到组件根节点原生的dom上，本身为原生dom，则直接绑定到dom，on那将事件绑定到组件
  render (createElement) {
    return createElement('comp-one', {
      ref: 'comp',
      props: {
        propOne: this.propOne
      },
      //  on: {
      //    click: this.handleClick
      //  },
      nativeOn: {
        click: this.handleClick
      }
    }, [createElement(
      'span', {
        slot: 'header',
        ref: 'span',
        domProps: {
          innerHTML: '<span>inner html</span>'
        },
        attrs: {
          id: 'test'
        }
      }, this.text)
    ])
  },
  methods: {
    handleClick () {
      console.log('click comp-one')
    }
  }
})
