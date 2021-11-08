import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  cart: [],
  totalPrice: 0,
}

export default {
  namespaced: true,
  mutations,
  actions,
  state,
  getters,
}
