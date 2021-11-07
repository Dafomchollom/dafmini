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
        <a-badge :count="5" class="cart_btn__badge">
          <a href="#" class="head-example" />
        </a-badge>
        Cart
      </a-button>
      <a-button type="default" class="logout_btn navbar__actions-btn">
        <a-icon type="logout" /> Log Out
      </a-button>
    </div>
    <div
      class="navbar__cart"
      :class="{ 'navbar__cart--active': isCartActive }"
    ></div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      cart_items: [],
      isCartActive: false,
    }
  },
  methods: {
    toggleCart() {
      this.isCartActive = !this.isCartActive
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
    height: 10rem;
    width: 45rem;
    background: red;
    right: 10px;
    top: 80px;
    display: none;
  }
  .navbar__cart--active {
    display: inline-block;
  }
}
</style>
