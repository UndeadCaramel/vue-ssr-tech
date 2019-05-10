<template>
    <section class="real-app">
        <input type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="接下去要做什么..."
        @keyup.enter= "addTodo"
        >
        <Item v-for="todo in filterItems"
        :key="todo.id"
        :todo="todo"
        @del="deleteTodo"
        />
        <Tabs :filter="filter"
        :todos="todos"
        @clear="clear"
        @toggleFilter="toggleFilter"
        />
        <!-- <router-view /> -->
    </section>
</template>


<script>
import Item from './item.vue'
import Tabs from './tabs.vue'

let id = 0
export default {
  // beforeRouteEnter中无法取到组件中的this,因为此时组件并未加载，但是可以通过next(vm)来取得组件,
  // 可在进入页面之前获取数据，与watch()和mountedd()方法相比较优越，可省去watch开销，而且在beforeRouteUpdate
  // 时mounted并不会进行再此加载
  beforeRouteEnter (to, from, next) {
    console.log('TODO before route enter', this)
    next(vm => {
      console.log('Todo vm.id=', vm.id)
    })
  },
  // 同一个组件在不同路由下时出发，例：/app/:id
  beforeRouteUpdate (to, from, next) {
    console.log('TODO before route update,this,id=', this.id)
    next()
  },
  beforeRouteLeave (to, from, next) {
    // just use this
    console.log('TODO before route leaveS', this)
    if (global.confirm('Are you sure?')) {
      next()
    }
  },
  props: ['id'],
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  mounted () {
    console.log(this.id)
  },
  components: {
    Item,
    Tabs
  },
  computed: {
    filterItems: function () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => todo.completed === completed)
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        context: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clear () {
      this.todos = []
    }

  }
}
</script>

</script>

<style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>
