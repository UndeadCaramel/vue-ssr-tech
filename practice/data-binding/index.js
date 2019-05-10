import Vue from 'vue'

new Vue({
  el: '#root',
  template:
  // `
  // <div>
  //   {{isActive ? 'active' : 'not active'}}{{arr.join(' ')}}{{Date.now()}} //可访问部分js内置全局对象，自定义全局对象无法访问
  // </div>
  // `,
  // `
  //   <div :id="aaa" @click="handleClick">
  //     <p v-html="html"></p>
  //   </div>
  // `,
  `
    <div :class="[{ active : !isActive }, isActive? 'active':'deactive', aaa]" :style="[styles, styles2]">
      <p>{{getJoinedArr(arr)}}</p>
    </div>
  `,
  data: {
    isActive: false,
    html: `<span>0</span>`, // html要使用v-html绑定，直接使用{{}}会转化成字符串进行输出,且html中不可使用{{}}
    arr: [1, 2, 3],
    aaa: 'main',
    styles: {
      color: 'red',
      appearance: 'none' // vue 自动添加浏览器内核前缀
    },
    styles2: {
      color: 'black', // vue 默认覆盖前面的同名样式
      'font-size': '50px'
    }
  },
  methods: {
    handleClick () {
      alert('clicked') // eslint-disable-line
    },
    getJoinedArr (arr) {
      return arr.join('X')
    }
  }
})
