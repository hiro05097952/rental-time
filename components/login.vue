<template>
  <div
    class="flex items-center justify-center py-12">
    <div
      class="w-11/12 sm:w-2/3 md:w-1/2 xl:w-1/3 bg-white p-5 rounded-b-lg relative
      pt-4 md:pt-10 mt-8 px-4 xs:px-8 pb-0"
      :class="{'bg-blue-1': isSignIn}">
      <!-- header -->
      <div
        class="text-xl absolute m-auto flex font-huninn
        tracking-wider text-gray-800"
        style="top: -30px; left: 0; right: 0;">
        <button
          class="py-2 md:py-5 text-center w-1/2 bg-blue-1 font-bold"
          :class="{'shadow-inner' : !isSignIn}"
          style="border-radius: 32px 32px 0 0; outline: none;"
          @click="isSignIn = true">
          登入
        </button>
        <button
          class="py-2 md:py-5 text-center w-1/2 bg-white font-bold"
          :class="{'shadow-inner' : isSignIn}"
          style="border-radius: 32px 32px 0 0; outline: none;"
          @click="isSignIn = false">
          註冊
        </button>
      </div>

      <ValidationObserver
        class="px-8 pt-6 pb-8 mb-4 bg-transparent rounded"
        ref="signInForm"
        v-if="isSignIn">
        <div class="mb-6">
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
                placeholder="請輸入 Email"
                v-model="email">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div class="mb-6">
          <div class="flex">
            <label class="block mb-2 text-sm font-bold text-gray-700 font-huninn" for="password">
              密碼
            </label>
            <nuxt-link
              to="/login/forgot_password"
              class="text-xs font-medium ml-auto text-gray-700
              hover:text-gray-900 focus:outline-none"
              style="transform: translateY(5px);">
              忘記密碼？
            </nuxt-link>
          </div>
          <ValidationProvider
            rules="required|min:8|max:16"
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
                v-model="password"
                @keypress.enter="emailSignIn">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div class="mt-6 mb-6 text-center flex justify-end">
          <button
            class="w-1/3 md:w-1/4 px-4 py-1 font-bold text-white bg-blue-3 rounded-lg
                hover:bg-blue-600 focus:outline-none shadow-lg font-huninn
                tracking-wider"
            type="button"
            @click="emailSignIn">
            登入
          </button>
        </div>
        <div class="flex justify-between flex-col items-start">
          <h3
            class="text-sm w-full text-left mb-4 font-huninn tracking-wider
            text-gray-800">
            以下帳號快速登入
          </h3>
          <div class="w-full flex justify-center">
            <button
              class="py-2 px-4 border-blue-3 rounded-lg
              hover:bg-blue-3 mr-auto"
              style="border-width: 3px; width: 47%"
              @click.prevent="fbSignIn">
              <i class="icon_fb h-6 w-6 inline-block align-middle" />
            </button>
            <button
              class="py-2 px-4 border-blue-3 rounded-lg
              hover:bg-blue-3"
              style="border-width: 3px; width: 47%"
              @click.prevent="gSignIn">
              <i class="icon_google h-6 w-6 inline-block align-middle" />
            </button>
          </div>
        </div>
      </ValidationObserver>

      <ValidationObserver
        class="px-8 pt-3 pb-2 bg-transparent rounded"
        ref="signUpFrom"
        v-else>
        <div class="mb-6 md:flex md:justify-between">
          <div class="mb-6 md:mr-2 md:mb-0 w-full">
            <label
              class="block mb-2 text-sm font-bold text-gray-700
              font-huninn"
              for="name">
              名稱
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
          <div class="flex justify-between items-center">
            <label class="block mb-2 text-sm font-bold text-gray-700 font-huninn" for="email">
              帳號
            </label>
            <span class="text-xs text-red-500 mr-2 font-huninn">日後無法更改 Email</span>
          </div>
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
                placeholder="請輸入 Email"
                v-model="email"
                inputmode="email"
                autocomplete="email">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div class="mb-6 flex-col">
          <div class="mb-6">
            <label class="block mb-2 text-sm font-bold text-gray-700 font-huninn" for="password">
              密碼
            </label>
            <ValidationProvider
              rules="required|min:8|max:16"
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
          <div>
            <label class="block mb-2 text-sm font-bold text-gray-700 font-huninn" for="c_password">
              確認密碼
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
                  v-model="passwordConfirm"
                  @keypress.enter="signUp">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
        </div>
        <div class="mt-6 mb-6 text-center flex justify-end">
          <button
            class="w-1/3 md:w-1/4 px-4 py-1 font-bold text-white bg-blue-3 rounded-lg
                hover:bg-blue-600 focus:outline-none shadow-lg font-huninn
                tracking-wider focus:outline-none select-none"
            type="button"
            @click.prevent="signUp">
            註冊
          </button>
        </div>
        <div class="flex justify-between flex-col items-start">
          <h3
            class="text-sm w-full text-left mb-4 font-huninn tracking-wider
            text-gray-800">
            以下帳號快速登入
          </h3>
          <div class="w-full flex justify-center">
            <button
              class="py-2 px-4 border-blue-3 rounded-lg
              hover:bg-blue-3 mr-auto"
              style="border-width: 3px; width: 47%"
              @click.prevent="fbSignIn">
              <i class="icon_fb h-6 w-6 inline-block align-middle" />
            </button>
            <button
              class="py-2 px-4 border-blue-3 rounded-lg
              hover:bg-blue-3"
              style="border-width: 3px; width: 47%"
              @click.prevent="gSignIn">
              <i class="icon_google h-6 w-6 inline-block align-middle" />
            </button>
          </div>
        </div>
      </ValidationObserver>
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
      name: '',
      passwordConfirm: '',
      isSignIn: true,
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
    // Server Post
    async serverSignIn(config) {
      try {
        const { data } = await this.$axios.post('/api/login', config);
        this.$swal.fire({
          icon: 'success',
          title: data.message,
        });
        this.$store.commit('UPDATE_USER', data.userInfo);
        this.$router.push('/');
      } catch ({ response }) {
        this.$swal.fire({
          icon: 'error',
          title: response.data.message,
        });
      }
    },
    // sign up
    async signUp() {
      try {
        await this.validate();
        const { data } = await this.$axios.post('/api/user', {
          name: this.name,
          email: this.email,
          password: this.password,
          passwordConfirmation: this.password,
        });
        this.$swal.fire({
          icon: 'success',
          title: data.message,
        });
        this.serverSignIn({
          email: this.email,
          password: this.password,
        });
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: error.message || error.response.data.message,
        });
      }
    },
    // validate
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs[this.isSignIn ? 'signInForm' : 'signUpFrom'].validate().then((success) => {
          if (success) {
            resolve();
          } else {
            reject(new Error(this.isSignIn ? '請填寫帳號密碼' : '請完成表單'));
          }
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.icon_fb{
  background: url(~assets/icon_login_fb.svg) center center / contain no-repeat;
}
.icon_google{
  background: url(~assets/icon_login_google.svg) center center / contain no-repeat;
}
button:hover{
  .icon_fb, .icon_google{
    filter: brightness(3000%);
  }
}
</style>
