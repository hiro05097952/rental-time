<template>
  <loginComponent />
</template>

<script>
import loginComponent from '~/components/login.vue';

export default {
  name: 'LoginPage',
  header() {
    return {
      title: '登入 | 時販機',
    };
  },
  layout: 'front',
  components: {
    loginComponent,
  },
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>

<style>

</style>
