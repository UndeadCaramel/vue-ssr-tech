import Vuex from 'vuex'
// import Vue from 'vue'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'

// Vue.use(Vuex)

// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     updateCount (state, num) {
//       state.count = num
//     }
//   }
// })

// export default store

export default () => {
  // return new Vuex.Store({
  //   state: {
  //     count: 0
  //   },
  //   mutations: {
  //     updateCount (state, num) {
  //       state.count = num
  //     }
  //   }
  // })
  return new Vuex.Store({
    state: defaultState,
    mutations,
    getters
  })
}
