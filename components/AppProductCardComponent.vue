<template>
  <div class="product_card_wrapper">
    <div class="product_card_wrapper--header">
      <img
        :src="productObject.image"
        class="product_card_wrapper--header_image Centered"
        alt=""
      />
    </div>
    <div class="product_card_wrapper--body">
      <p class="product_card_wrapper--body_title">
        NAME: {{ productObject.name.toUpperCase() }}
      </p>
      <p>{{ productObject.description }}</p>
      <p class="product_card_wrapper--body_price">
        Price: ${{ productObject.price }}
      </p>
      <div class="quantity">
        <a-button icon="plus" @click="addQuantity" />
        {{ quantity }}<a-button icon="minus" @click="subQuantity" />
      </div>
      <a-button
        class="product_card_wrapper--body_button"
        @click="addToCartHandler"
        >Add to Cart</a-button
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AppProductCardComponent',
  props: {
    productObject: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      quantity: 1,
    }
  },
  computed: {
    ...mapState({
      cartItems: (state) => state.cartModule.cart,
    }),
  },
  methods: {
    addToCartHandler() {
      // check if item is in store

      const itemInStore = this.cartItems.find(
        (item) => item.name === this.productObject.name
      )
      if (!itemInStore) {
        this.addToCart({ ...this.productObject, quantity: this.quantity })
        this.$notification.success({
          message: 'Item Added to Cart',
          description: `${this.productObject.name} has been successfully added to your cart`,
          duration: 0,
        })
      } else {
        this.$notification.warning({
          message: 'Warning',
          description: 'item exits in cart already',
          duration: 0,
        })
      }
    },
    addQuantity() {
      this.quantity = this.quantity + 1
    },
    subQuantity() {
      if (this.quantity > 1) this.quantity = this.quantity - 1
    },
    ...mapActions({
      addToCart: 'cartModule/SET_ITEM_CART',
    }),
  },
}
</script>
<style lang="scss" scoped>
.product_card_wrapper {
  background: #fff;
  margin: 10px 0px;
  padding: 10px 15px;
  .product_card_wrapper--header {
    width: 100%;
    height: 100%;
    max-height: 30rem;
    overflow: hidden;
    img {
      max-width: 100%;
      max-height: 100%;
      min-width: 100%;
      min-height: 100%;
      margin: auto;
      display: block;
    }
  }
  .product_card_wrapper--body {
    .product_card_wrapper--body_title,
    .product_card_wrapper--body_price {
      font-weight: bold;
      font-size: 15px;
      margin: 10px 0px;
    }
    .product_card_wrapper--body_button {
      width: 100%;
      padding: 10px;
      height: auto;
    }
  }
  .quantity {
    display: flex;
    justify-content: space-between;
    margin: 10px 30px;
  }
}
</style>
