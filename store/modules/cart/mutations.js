import { SET_ITEM_CART } from '@/store/mutation-types/cart'

export default {
  // set Item to cart
  [SET_ITEM_CART](state, payload) {
    state.cart.push(payload)
    let totalPrice = 0
    state.cart.forEach((item) => {
      totalPrice = totalPrice + parseFloat(item.price)
    })
    state.totalPrice = totalPrice
  },
}
