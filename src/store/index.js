import Vue from 'vue'
import Vuex from 'vuex'
import togo from './modules/togo'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    togo
  },
  getters
})

export default store
