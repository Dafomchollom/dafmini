<template>
  <AppLoginComponent />
</template>

<script>
// import AppLoginComponent from '@/components/auth/AppLoginComponent.vue'
export default {
  components: {
    AppLoginComponent: () => import('@/components/auth/AppLoginComponent.vue'),
  },
  layout: 'login',
}
</script>
