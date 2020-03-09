<template>
  <div
    class="loginBox flex justify-center px-6 fixed top-0 left-0 right-0 bottom-0
    items-center"
    style="z-index: 200"
    @click.self="$store.commit('CHANGE_LOGIN_BOX', false)"
    @scroll.prevent
    @mousewheel.prevent
    @touchmove.prevent>
    <!-- Row -->
    <div class="w-full xl:w-3/4 lg:w-11/12 flex">
      <!-- Col -->
      <div
        class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
        style="background-image: url('https://source.unsplash.com/K4mSJ7kc0As/600x800')" />
      <!-- Col -->
      <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
        <h3 class="py-4 text-2xl text-center">
          Welcome Back!
        </h3>
        <ValidationObserver
          class="px-8 pt-6 pb-8 mb-4 bg-transparent rounded"
          ref="signInForm">
          <div class="mb-6">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="username">
              Email
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
                  placeholder="Username"
                  v-model="email">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
          <div class="mb-6">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
              Password
            </label>
            <ValidationProvider
              rules="required|min:12|max:16"
              v-slot="{ errors, classes }"
              name="密碼">
              <div :class="classes">
                <input
                  class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border
                rounded shadow appearance-none focus:outline-none
                focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                  v-model="password">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
          <div class="mb-6">
            <input class="mr-2 leading-tight" type="checkbox" id="checkbox_id">
            <label class="text-sm" for="checkbox_id">
              Remember Me
            </label>
          </div>
          <div class="mb-6 text-center">
            <button
              class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full
                hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="button"
              @click="emailSignIn">
              Sign In
            </button>
            <button
              class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full
                hover:bg-blue-700 focus:outline-none focus:shadow-outline mt-4"
              type="button"
              @click="gSignIn">
              Google Sign In
            </button>
          </div>
          <hr class="mb-6 border-t">
          <div class="text-center">
            <a
              class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              href="#"
              @click.prevent="$store.commit('CHANGE_LOGIN_BOX', 'register')">
              Create an Account!
            </a>
          </div>
          <div class="text-center">
            <a
              class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              href="./forgot-password.html">
              Forgot Password?
            </a>
          </div>
          <div class="text-center">
            <a
              class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              href="./forgot-password.html"
              @click.prevent="fbSignIn">
              FB test
            </a>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      isSignIn: '',
    };
  },
  mounted() {
    window.fbAsyncInit = function init() {
      window.FB.init({
        appId: process.env.fb_appId,
        cookie: true,
        xfbml: true,
        version: 'v6.0',
      });

      window.FB.AppEvents.logPageView();
    };
    this.fbInit(document, 'script', 'facebook-jssdk');
  },
  methods: {
    async emailSignIn() {
      try {
        await this.validate();

        this.serverSignIn({
          email: this.email,
          password: this.password,
        });
      } catch ({ message }) {
        this.$swal.fire({
          icon: 'error',
          title: message,
        });
      }
    },
    async gSignIn() {
      try {
        const GoogleUser = await this.$gAuth.signIn();
        // console.log('user => ', GoogleUser);
        const token = GoogleUser.getAuthResponse().id_token;

        this.serverSignIn({
          token,
        });
      } catch (err) {
        console.log('google sign in err => ', err);
      }
    },
    fbInit(d, s, id) {
      let js = null;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    },
    fbSignIn() {
      window.FB.login(({ status, authResponse }) => {
        if (status === 'connected') {
          this.serverSignIn({
            accessToken: authResponse.accessToken,
            userID: authResponse.userID,
          });
        }
      }, {
        scope: 'public_profile,email',
      });
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.signInForm.validate().then((success) => {
          if (success) {
            resolve();
          } else {
            reject(new Error('請填寫帳號密碼'));
          }
        });
      });
    },
    async serverSignIn(config) {
      try {
        const { data } = await this.$axios.post('/api/login', config);
        this.$swal.fire({
          icon: 'success',
          title: data.message,
        });
        this.$store.commit('CHANGE_LOGIN_BOX', false);
      } catch ({ response }) {
        this.$swal.fire({
          icon: 'error',
          title: response.data.message,
        });
      }
    },
  },
};
</script>

<style>
.loginBox {
  background: rgba(0, 0, 0, 0.5);
}
</style>
