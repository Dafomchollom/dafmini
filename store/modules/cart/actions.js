import { SET_ITEM_CART } from '@/store/mutation-types/cart'

export default {
  [SET_ITEM_CART]({ commit }, payload) {
    console.log('payload store', payload)
    if (payload) commit(SET_ITEM_CART, payload)
  },
}
