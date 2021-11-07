<template>
  <div class="home_Wrapper">
    <AppNavbarComponent />
    <div class="home_Wrapper__body">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import AppNavbarComponent from '@/components/layout/AppNavbarComponent'
export default {
  components: {
    AppNavbarComponent,
  },
}
</script>
<style lang="scss" scoped>
.home_Wrapper {
  height: 100vh;
  width: 100%;
  background: #f5f4ff;
  .home_Wrapper__body {
    padding: 0px 10px;
  }
}
.login_Wrapper__row {
  height: 100%;
  .login_Wrapper__row__login_colum {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.infosidebar {
  background: linear-gradient(rgba(210, 71, 90, 0.5), rgba(210, 71, 90, 0.5)),
    url('../assets/images/authbackground.jpg');
  background-size: cover;
  background-position: center;
  // background: red;
  height: 100%;
}
</style>
