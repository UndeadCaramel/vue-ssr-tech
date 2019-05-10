import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name: {{name}}</p>
      <p>Name: {{getName()}}</p>
      <p>FullName: {{fullName}}</p>
      <p>Number: {{number}}</p>
      <p>Number: <input type="text" v-model="number"/></p>
      <p>FirstName: <input type="text" v-model="firstName"/></p>
      <p>LastName: <input type="text" v-model="lastName"/></p>
      <p>Name: <input type="text" v-model="name"/></p>
      <p>Obj-a: <input type="text" v-model="obj.a"/></p>
    </div>
  `,
  data: {
    firstName: 'Kiran',
    lastName: 'Vincent',
    number: 0,
    fullName: '',
    obj: {
      a: '123'
    }
  },
  computed: {
    // name () {
    //   console.log('new name')
    //   // return this.firstName + ' ' + this.lastName // 可使用字符串模板 `${this.firstName} ${this.lastName}`
    //   return `${this.firstName} ${this.lastName}`
    // }
    name: {
      get () {
        console.log('new name')
        return `${this.firstName} ${this.lastName}`
      },
      set (name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  // mounted () {
  //   this.obj = {
  //     a: '456'
  //   }
  // },
  watch: {
    // 使用此方法可再初始时执行watch，handler为默认方法的实际调用方法
    firstName: {
      handler (newName, oldName) {
        this.fullName = `${newName} ${this.lastName}`
      },
      immediate: true
    },
    obj: { // 可使用'obj.a' 替换obj vue默认对最后一个对象进行监听，此时可以不需要使用deep
      handler (newName, oldName) {
        console.log('obj changed')
      },
      immediate: true,
      deep: true // 使用deep开销会相当的大
    },
    // 默认不执行
    // firstName (newName, oldName) {
    //   this.fullName = `${newName} ${this.lastName}`
    // },
    lastName (newName, oldName) {
      this.fullName = `${this.firstName} ${newName}`
    }
  },
  methods: {
    getName () {
      console.log('getName invoked')
      return `${this.firstName} ${this.lastName}`
    }
  }
})
