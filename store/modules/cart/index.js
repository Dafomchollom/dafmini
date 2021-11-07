import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  cart: [],
}

export default {
  namespaced: true,
  mutations,
  actions,
  state,
  getters,
}
