<template>
  <div class="shop_wrapper">
    <div class="shop_wrapper-header">
      <h1>Ecommerce Website Gallery & Tech Inspiration</h1>
      <p>Browse Our Collection of the top books, games, music e.t.c</p>
    </div>
    <div class="shop_wrapper-body">
      <AppSearchComponent />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    AppSearchComponent: () => import('@/components/AppSearchComponent.vue'),
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
