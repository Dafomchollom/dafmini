<template>
  <div>
    <component :is="computedComponent" @register="registerHandler"></component>
  </div>
</template>

<script>
// import AppLoginComponent from '@/components/auth/AppLoginComponent.vue'
export default {
  components: {
    AppLoginComponent: () => import('@/components/auth/AppLoginComponent.vue'),
    AppRegisterComponent: () =>
      import('@/components/auth/AppRegisterComponent.vue'),
  },
  data() {
    return {
      login: true,
    }
  },
  layout: 'login',
  computed: {
    computedComponent() {
      return this.login === true ? 'AppLoginComponent' : 'AppRegisterComponent'
    },
  },
  methods: {
    registerHandler() {
      this.login = !this.login
    },
  },
}
</script>
