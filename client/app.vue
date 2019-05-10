<template>
    <div id = "app">
        <div id = "cover"></div>
        <Header></Header>
        <p>{{fullName}} {{counter}}</p>
        <!-- <router-link :to="{name:'app'}">app</router-link> -->
        <router-link to="/app">app</router-link>
        <router-link to="/app/123">app123</router-link>
        <router-link to="/app/456">app456</router-link>
        <router-link to="/login">login</router-link>
        <!-- <router-link to="/login/exact">login exact</router-link> -->
        <!-- <Todo></Todo> -->
        <transition name="fade">
          <router-view />
        </transition>
        <Footer></Footer>
        <!-- <router-view name="a"/> -->
    </div>
</template>

<script>
    import {
      mapState,
      mapGetters
    } from 'vuex'
    import Header from './layout/header.vue'
    import Footer from './layout/footer.jsx'
    // import Todo from './views/todo/todo.vue'

    export default {
      components: {
        Header,
        Footer
      },
      mounted () {
        console.log(this.$store)
        let i = 0
        setInterval(() => {
          this.$store.commit('updateCount', i++)
        }, 1000)
        // console.log(this.$route)
      },
      computed: {
        // 方法名与显示相同时使用...mapState(['count'])，不同时使用以下方式mapGetters与此相同
        ...mapState({
          counter: 'count' // 也可以使用counter: (state) => state.count
        }),
        // count: function () {
        //   return this.$store.state.count
        // },
        ...mapGetters(['fullName'])
        // fullName: function () {
        //   return this.$store.getters.fullName
        // }
      }
    }
</script>

<style lang="stylus" scoped>
#app{
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
}

#cover{
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background-color: orange;
    opacity: .3;
    z-index: -1;
}
</style>

