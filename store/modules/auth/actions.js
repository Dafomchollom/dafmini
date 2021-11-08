import { SET_USER, REMOVE_USER } from '@/store/mutation-types/auth'

export default {
  // set user object
  [SET_USER]({ commit }, payload) {
    if (payload) commit(SET_USER, payload)
  },
  // remove user
  [REMOVE_USER]({ commit }) {
    commit(REMOVE_USER)
  },
}
