import { SET_USER, REMOVE_USER } from '@/store/mutation-types/auth'

export default {
  // set Item to cart
  [SET_USER](state, payload) {
    state.userObject = payload
  },

  // remove item from cart
  [REMOVE_USER](state) {
    state.userObject = {}
  },
}
