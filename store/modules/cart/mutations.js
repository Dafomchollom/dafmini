import { SET_ITEM_CART } from '@/store/mutation-types/cart'

export default {
  [SET_ITEM_CART](state, payload) {
    console.log('::: from  mutations :::', payload, state)
    state.cart.push(payload)
  },
  // [SET_ITEM_CART](state, payload) {
  //   cole
  // },
}
