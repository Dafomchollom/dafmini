<template>
  <nav class="navbar">
    <span class="navbar__brand"><span>RS2</span>.Shop</span>
    <div class="navbar__actions">
      <a-button
        type="default"
        class="cart_btn navbar__actions-btn"
        sizw="large"
        @click="toggleCart"
      >
        <a-icon type="shopping-cart" />
        <a-badge :count="cartItems.length" class="cart_btn__badge">
          <a href="#" class="head-example" />
        </a-badge>
        Cart
      </a-button>
      <a-button type="default" class="logout_btn navbar__actions-btn">
        <a-icon type="logout" /> Log Out
      </a-button>
    </div>
    <div class="navbar__cart" :class="{ 'navbar__cart--active': isCartActive }">
      <div
        v-for="(item, index) in cartItems"
        :key="index"
        class="navbar__cart-cartItem"
      >
        <img :src="item.image" class="cart_img" alt="" />
        <div>
          <span
            ><b>{{ item.name }}</b></span
          ><br />
          <span>Quantity: {{ item.quantity }}</span>
          <span>Price: ${{ item.price }}</span>
        </div>
        <a-button shape="circle" icon="close" @click="removeItem(item)" />
      </div>
      <p class="cart_totalPrice">
        <b>Total :</b> <span>${{ totalPrice }}</span>
      </p>
      <a-button class="cart_btn" @click.prevent="purchaseHandler"
        >Place Order</a-button
      >
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      cart_items: [],
      isCartActive: false,
    }
  },
  computed: {
    ...mapState({
      cartItems: (state) => state.cartModule.cart,
      totalPrice: (state) => state.cartModule.totalPrice,
      userObject: (state) => state.authModule.userObject,
    }),
  },
  watch: {},
  methods: {
    toggleCart() {
      this.isCartActive = !this.isCartActive
    },
    removeFromCart(item) {},
    ...mapActions({
      removeItem: 'cartModule/REMOVE_ITEM_CART',
    }),
    async purchaseHandler() {
      // construct payload for BE
      const itemsBought = this.cartItems.map((item) => {
        const data = { productId: item._id, quantity: item.quantity }
        return data
      })
      const data = {
        userID: this.userObject._id,
        itemsBought,
      }
      try {
        await this.$axios.post('/api/product/buyproducts', data)
        this.$notification.success({
          message: 'Purchase Successful',
          description: 'your items have been purchased successfully',
          duration: 5,
        })
      } catch (error) {
        const { default: errorHandler } = await import('@/utils/errorHandler')
        errorHandler(error).forEach((msg) =>
          this.$notification.error({
            message: 'Error!',
            description: msg,
            duration: 0,
          })
        )
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  background: #fff;
  width: 100%;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-shadow: 0px 12px 15px -7px rgba(110, 110, 110, 0.47);
  -webkit-box-shadow: 0px 12px 15px -7px rgba(110, 110, 110, 0.47);
  -moz-box-shadow: 0px 12px 15px -7px rgba(110, 110, 110, 0.47);
  .navbar__brand {
    color: #000000;
    font-size: 30px;
    font-weight: bold;
    span {
      color: #2645ff;
    }
  }
  .navbar__actions {
    .navbar__actions-btn {
      margin: 0px 8px;
    }
    .cart_btn {
      .cart_btn__badge {
        background: #2645ff;
        position: absolute;
        right: 0;
        top: -1px;
      }
    }
  }
  .navbar__cart {
    position: absolute;
    height: auto;
    width: 25rem;
    background: #fff;
    border-radius: 20px;
    right: 0px;
    top: 90px;
    display: none;
    z-index: 1;
    padding: 10px 15px;
    box-shadow: 0px 12px 15px -7px rgba(110, 110, 110, 0.47);
    -webkit-box-shadow: 0px 12px 15px -7px rgba(110, 110, 110, 0.47);
    -moz-box-shadow: 0px 12px 15px -7px rgba(110, 110, 110, 0.47);
    .navbar__cart-cartItem {
      margin: 10px 0px;
      border-bottom: 2px solid #cacaca;
      height: auto;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cart_img {
        width: 70px;
      }
    }
    .cart_btn {
      width: 100%;
    }
    .cart_totalPrice {
      display: flex;
      justify-content: space-between;
    }
  }

  .navbar__cart--active {
    display: inline-block;
  }
}
</style>
