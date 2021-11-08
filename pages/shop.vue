<template>
  <div class="shop_wrapper">
    <div class="shop_wrapper-header">
      <h1>Ecommerce Website Gallery & Tech Inspiration</h1>
      <p>Browse Our Collection of the top books, games, music e.t.c</p>
    </div>
    <div class="shop_wrapper-body">
      <AppSearchComponent @products="handlerProducts" />
      <h3 v-if="products.length">Showing Search Result</h3>
      <a-row class="shop_seach-wrapper" :gutter="24">
        <a-col
          v-for="(product, index) in products"
          :key="index"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <AppProductCardComponent :product-object="product"
        /></a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
    AppSearchComponent: () => import('@/components/AppSearchComponent.vue'),
    AppProductCardComponent: () =>
      import('@/components/AppProductCardComponent.vue'),
  },
  data() {
    return {
      products: [],
    }
  },
  computed: {
    ...mapState({
      cartItems: (state) => state.cartModule.cart,
      userObject: (state) => state.authModule.userObject,
    }),
  },
  watch: {
    userObject: {
      handler(newVal) {
        if (!newVal.token) this.$router.push('/')
      },
    },
  },
  mounted() {
    if (!this.userObject.token) this.$router.push('/')
  },
  methods: {
    handlerProducts(products) {
      this.products = products
    },
  },
}
</script>

<style lang="scss" scoped>
.shop_wrapper {
  .shop_wrapper-header {
    text-align: center;
    margin: 15px 5px;
    h1 {
      font-weight: bold;
      font-size: 30px;
      letter-spacing: 3px;
    }
  }
}
</style>
