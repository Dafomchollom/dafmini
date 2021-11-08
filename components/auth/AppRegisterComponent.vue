<template>
  <div class="login_card">
    <div class="login_card__header">
      <h1>SIGN UP</h1>
      <p>already have an account <a href="#login">log in</a></p>
    </div>
    <div login_card__body>
      <ValidationObserver ref="loginObserver">
        <AppInputComponent
          v-model="userObject.email"
          label="Email"
          placeholder="username"
          required
        />
        <AppInputComponent
          v-model="userObject.loginName"
          label="Username"
          type="text"
          required
          rules="required"
          placeholder="password"
        />
        <AppInputComponent
          v-model="userObject.password"
          label="Password"
          type="password"
          required
          rules="required"
          placeholder="password"
        />
        <a-button class="login_card__button" @click="signupInHandler">
          SIGN UP
        </a-button>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import AppInputComponent from '@/components/input-components/AppInputComponent.vue'
export default {
  name: 'AppRegisterComponent',
  components: {
    ValidationObserver,
    AppInputComponent,
  },
  data() {
    return {
      userObject: {
        email: '',
        loginName: '',
        password: '',
      },
    }
  },
  methods: {
    async signupInHandler() {
      try {
        const response = await this.$axios.post(
          '/api/user/register',
          this.userObject
        )
        console.log(response.data)
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
.login_card {
  width: 350px;
  .login_card__header {
    text-align: center;
    h1 {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 4px;
    }
    a {
      color: #000000;
      border-bottom: 1px solid #000000;
    }
  }
  .login_card__body {
    width: 100%;
  }
  .login_card__button {
    width: 100%;
    border-radius: 20px;
    font-size: 13px;
    font-weight: bold;
    padding: 10px 0px;
    margin: 15px 0px;
    height: auto;
  }
  .login_card__forgot_password {
    text-align: center;
    a {
      color: #000000;
      border-bottom: 1px solid #000000;
    }
  }
}
</style>
