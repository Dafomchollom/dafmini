<template>
  <div class="login_card">
    <div class="login_card__header">
      <h1>Log In</h1>
      <p>or <a @click="registerHandler">create account</a></p>
    </div>
    <div login_card__body>
      <ValidationObserver ref="loginObserver">
        <AppInputComponent
          v-model="userObject.email"
          label="Username"
          placeholder="username"
          type="email"
          required
        />
        <AppInputComponent
          v-model="userObject.password"
          label="Password"
          type="password"
          required
          rules="required"
          placeholder="password"
        />
        <a-button class="login_card__button" @click="logInHandler">
          LOG IN
        </a-button>
      </ValidationObserver>
      <p class="login_card__forgot_password">
        <a href="#forgotpassword"> forgot password? </a>
      </p>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { mapActions } from 'vuex'
import AppInputComponent from '@/components/input-components/AppInputComponent.vue'
export default {
  name: 'AppLoginComponent',
  components: {
    ValidationObserver,
    AppInputComponent,
  },
  data() {
    return {
      userObject: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async logInHandler() {
      const valid = this.$refs.loginObserver.validate()
      if (valid) {
        try {
          const { data } = await this.$axios.post(
            '/api/user/login',
            this.userObject
          )
          this.$notification.success({
            message: 'Logged In',
            description: 'Logged in successfully ',
            duration: 5,
          })
          this.setUser(data)
          this.$router.push('/shop')
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
      } else {
        this.$notification.warning({
          message: 'Wrong Input',
          description: 'Please Input the required fields',
          duration: 0,
        })
      }
    },
    registerHandler() {
      this.$emit('register')
    },
    ...mapActions({
      setUser: 'authModule/SET_USER',
    }),
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
