<template>
  <div class="login_Wrapper">
    <a-row class="login_Wrapper__row">
      <a-col :span="12" class="login_Wrapper__row__login_colum">
        <Nuxt />
      </a-col>
      <a-col :span="12" class="infosidebar"> </a-col>
    </a-row>
    fsf
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.login_Wrapper {
  height: 100vh;
  width: 100%;
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
