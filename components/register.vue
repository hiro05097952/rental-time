<template>
  <div
    class="loginBox flex justify-center px-6 fixed top-0 left-0 right-0 bottom-0
    items-center"
    style="z-index: 200;"
    @click.self="$store.commit('CHANGE_LOGIN_BOX', false)"
    @scroll.prevent
    @mousewheel.prevent
    @touchmove.prevent>
    <!-- Row -->
    <div class="w-full xl:w-3/4 lg:w-11/12 flex">
      <!-- Col -->
      <div
        class="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
        style="background-image: url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')" />
      <!-- Col -->
      <div
        class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
        <h3 class="text-2xl text-center">
          Create an Account!
        </h3>
        <ValidationObserver class="px-8 pt-3 pb-2 bg-transparent rounded" ref="signUpFrom">
          <div class="mb-6 md:flex md:justify-between">
            <div class="mb-6 md:mr-2 md:mb-0 md:w-1/2">
              <label class="block mb-2 text-sm font-bold text-gray-700" for="name">
                Name
              </label>
              <ValidationProvider
                rules="required|max:10"
                v-slot="{ errors, classes }"
                name="姓名">
                <div :class="classes">
                  <input
                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700
                    border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Name"
                    v-model="name">
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>
          </div>
          <div class="mb-6">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
              Email
            </label>
            <ValidationProvider
              rules="required|email"
              v-slot="{ errors, classes }"
              name="E-mail">
              <div :class="classes">
                <input
                  class="w-full px-3 py-2 text-sm leading-tight text-gray-700
              border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  v-model="email"
                  inputmode="email"
                  autocomplete="email">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
          <div class="mb-6 md:flex md:justify-between">
            <div class="mb-6 md:mr-2 md:mb-4 md:w-1/2">
              <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
                Password
              </label>
              <ValidationProvider
                rules="required|min:12|max:16"
                v-slot="{ errors, classes }"
                name="密碼"
                vid="password">
                <div :class="classes">
                  <input
                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700
                    border rounded shadow appearance-none focus:outline-none
                    focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    v-model="password"
                    autocomplete="current-password">
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>
            <div class="md:ml-2 md:w-1/2">
              <label class="block mb-2 text-sm font-bold text-gray-700" for="c_password">
                Confirm Password
              </label>
              <ValidationProvider
                rules="required|confirmed:password"
                v-slot="{ errors, classes }"
                name="密碼">
                <div :class="classes">
                  <input
                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700
                border rounded shadow appearance-none focus:outline-none
                focus:shadow-outline"
                    id="c_password"
                    type="password"
                    placeholder="******************"
                    v-model="passwordConfirm">
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>
          </div>
          <div class="mb-4 text-center mt-8">
            <button
              class="w-full px-4 py-2 font-bold text-white bg-blue-500
              rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="button"
              @click.prevent="signUp">
              Register Account
            </button>
          </div>
          <hr class="mb-4 border-t">
          <div class="text-center">
            <a
              class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              href="#">
              Forgot Password?
            </a>
          </div>
          <div class="text-center">
            <a
              class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              href="#"
              @click="$store.commit('CHANGE_LOGIN_BOX', 'login')">
              Already have an account? Login!
            </a>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
  },
  methods: {
    async signUp() {
      try {
        await this.validate();
        const { data } = await this.$axios.post('/api/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
          passwordConfirmation: this.password,
        });
        this.$swal.fire({
          icon: 'success',
          title: data.message,
        });
        this.$store.commit('CHANGE_LOGIN_BOX', false);
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: error.message || error.response.data.message,
        });
      }
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.signUpFrom.validate().then((success) => {
          if (success) {
            resolve();
          } else {
            reject(new Error('請完成表單'));
          }
        });
      });
    },
  },
};
</script>

<style>
.loginBox {
  background: rgba(0, 0, 0, 0.5);
}
</style>
