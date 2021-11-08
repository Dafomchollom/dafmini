import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  userObject: {},
}

export default {
  namespaced: true,
  mutations,
  actions,
  state,
  getters,
}
