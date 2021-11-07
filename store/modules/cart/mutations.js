import { SET_ITEM_CART } from '@/store/mutation-types/cart'

export default {
  [SET_ITEM_CART](state, payload) {
    state.cart.push(payload)
  },
}
