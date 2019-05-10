import Vue from 'vue'

new Vue({
  el: '#root',
  // <div v-text="text"></div>等同于在标签中使用{{text}},但是使用v-text时,不能再在标签内写入内容，需使用<div v-text="'Text:' + text"></div>
  // v-show相当于在标签上增加了一个display:none，v-if则动态在dom流中增删节点，容易导致性能问题
  // v-once 数据只进行一次绑定，类型给标签加上readonly
  // v-model.trim= 表示去掉输入的两边空格，v-model.lazy= 表事绑定数据的事件变为onchange,默认为oninput,v-model.number= 表示绑定数据必须为数字
  template: `
  <div>
    <div v-if="active">Text: {{text}}</div>
    <div v-else-if="text === 0">text is 0</div>
    <div v-else>else content</div>
    <div v-html="html"></div>
    <ul>
      <li v-for="(item, index) in arr" :key="item">{{index}}:{{item}}</li>
    </ul>
    <ul>
      <li v-for="(val, key, index) in obj" :key="key">{{index}}:{{key}}:{{val}}</li>
    </ul>
    <input type="text" v-model="text"/>
    <div>
      <input type="checkbox" :value="'a'" v-model="arr"/>
      <input type="checkbox" :value="'b'" v-model="arr"/>
      <input type="checkbox" :value="'c'" v-model="arr"/>
    </div>
    <div>
      <input type="checkbox" :value="arr[0]" v-model="arr"/>
      <input type="checkbox" :value="arr[1]" v-model="arr"/>
      <input type="checkbox" :value="arr[2]" v-model="arr"/>
    </div>
    <div>
      <input type="checkbox" v-for="item in arr" :value="item" v-model="checked_arr" :key="item"/>
    </div>
    <div>
      <input type="radio" :value="'a'" v-model="arr"/>
      <input type="radio" :value="'b'" v-model="arr"/>
      <input type="radio" :value="'c'" v-model="arr"/>
    </div>
    <div>
      <input type="radio" v-for="item in arr" :value="item" v-model="checked_radio" :key="item"/>
    </div>
  </div>
  `,
  data: {
    text: 1,
    active: true,
    html: `<p>This is html</p>`,
    arr: ['a', 'b', 'c'],
    obj: {
      name: 'jack',
      age: 13,
      sex: 'male'
    },
    checked_arr: [],
    checked_radio: ''
  }
})
