import { SET_ITEM_CART, REMOVE_ITEM_CART } from '@/store/mutation-types/cart'

export default {
  // set item in cart
  [SET_ITEM_CART]({ commit }, payload) {
    if (payload) commit(SET_ITEM_CART, payload)
  },
  // remove item from cart
  [REMOVE_ITEM_CART]({ commit }, payload) {
    if (payload) commit(REMOVE_ITEM_CART, payload)
  },
}
