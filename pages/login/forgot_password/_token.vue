<template>
  <div
    class="flex items-center justify-center py-12">
    <ValidationObserver
      ref="forgotPassword"
      class="w-2/3 md:w-1/2 xl:w-1/3 bg-white px-5 rounded-lg relative
      pt-5 mt-8 px-8 pb-8">
      <h2 class="text-2xl text-gray-800 font-medium font-huninn text-center">
        重設密碼
      </h2>
      <div
        class="mb-6 mt-4"
        v-if="!$route.params.token">
        <label
          class="block mb-2 text-sm font-bold text-gray-700 font-huninn"
          for="username">
          帳號
        </label>
        <ValidationProvider
          v-slot="{errors, classes}"
          rules="required|email"
          name="E-mail">
          <div :class="classes">
            <input
              class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded
                shadow appearance-none focus:outline-none focus:shadow-outline"
              id="username"
              type="email"
              placeholder="請輸入註冊時的 Email"
              v-model="email">
            <span>{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
      </div>
      <div class="mb-6 mt-4" v-else>
        <label
          class="block mb-2 text-sm font-bold text-gray-700 font-huninn"
          for="newPassword">
          新密碼
        </label>
        <ValidationProvider
          v-slot="{errors, classes}"
          rules="required|min:12|max:16"
          name="密碼"
          vid="newPassword">
          <div :class="classes">
            <input
              class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded
                shadow appearance-none focus:outline-none focus:shadow-outline"
              id="newPassword"
              type="password"
              placeholder="******************"
              v-model="newPassword">
            <span>{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
      </div>
      <div v-if="$route.params.token">
        <label class="block mb-2 text-sm font-bold text-gray-700 font-huninn" for="passwordConfirm">
          確認密碼
        </label>
        <ValidationProvider
          rules="required|confirmed:newPassword"
          v-slot="{ errors, classes }"
          name="確認密碼">
          <div :class="classes">
            <input
              class="w-full px-3 py-2 text-sm leading-tight text-gray-700
                border rounded shadow appearance-none focus:outline-none
                focus:shadow-outline"
              id="passwordConfirm"
              type="password"
              placeholder="******************"
              v-model="passwordConfirm">
            <span>{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
      </div>

      <button
        class="w-1/3 md:w-1/4 px-4 py-1 font-bold text-white bg-blue-3 rounded-lg
                hover:bg-blue-600 focus:outline-none shadow-lg font-huninn
                tracking-wider block mx-auto text-center mt-8"
        type="button"
        @click="submit">
        送出
      </button>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  layout: 'front',
  data() {
    return {
      email: '',
      newPassword: '',
      passwordConfirm: '',
    };
  },
  methods: {
    async submit() {
      try {
        await this.validate();

        const config = this.$route.params.token ? {
          newPassword: this.newPassword,
          passwordConfirmation: this.passwordConfirm,
        } : {
          email: this.email,
        };
        const headers = this.$route.params.token ? {
          headers: { Authorization: `Bearer ${this.$route.params.token}` },
        } : {};

        const { data } = await this.$axios.post('/api/user/password/reset', config, headers);
        this.$swal.fire({
          icon: 'success',
          title: data.message,
        });
        setTimeout(() => {
          this.$router.replace('/');
        }, 1000);
      } catch ({ response }) {
        this.$swal.fire({
          icon: 'error',
          title: response.data.message,
        });
      }
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.forgotPassword.validate().then((success) => {
          if (success) {
            resolve();
          } else {
            reject(new Error('請填寫密碼'));
          }
        });
      });
    },
  },
};
</script>

<style>

</style>
