<template>
  <div
    style="background: linear-gradient(180deg, #FFFFFF 35%, #FFE8BF 60%);"
    class="min-h-screen">
    <nav
      class="flex items-center justify-end fixed top-0 left-0 w-full tracking-wider h-16
      bg-gray-700 z-50">
      <nuxt-link
        class="logo h-12 w-48 mr-auto ml-4 text-white px-2 py-3 bg-gray-900 relative pl-12"
        to="/">
        <i
          class="inline-block h-10 w-10 absolute top-0 left-0 mt-1 icon_logo"
          style="filter: invert(1);" />
        <h1 class="border-l-2 border-white pl-4 text-lg font-bold tracking-widest inline-block">
          時販機
        </h1>
        <span class="font-bold text-xs text-white">じはんき</span>
      </nuxt-link>
      <ul class="flex items-center mr-10">
        <li class="mr-8">
          <nuxt-link class="text-white" to="/products">
            探索
          </nuxt-link>
        </li>
        <li>
          <a href="" class="text-white">成為販物主</a>
        </li>
      </ul>
      <button
        class="btn-outline text-white"
        @click="$store.commit('CHANGE_LOGIN_BOX', 'login')">
        登入
      </button>
      <button
        class="btn-outline text-white"
        @click="logout">
        登出
      </button>
    </nav>

    <div class="main pt-16" style="min-height: 19rem">
      <nuxt />
    </div>

    <footer
      class="footer py-5 px-5 flex flex-col md:flex-row
      justify-around tracking-wider leading-7 pl-12 md:pl-5 text-gray-800">
      <ul class="flex flex-col lg:w-5/12 md:pl-8">
        <li class="text-2xl mb-5">
          時販機
          <span class="font-bold text-xs">じはんき</span>
        </li>
        <li>客服時間：週一至週五 8:30 ~ 11:30, 13:30 ~ 18:00</li>
        <li>客服電話：02-8512-7525</li>
        <li>
          <button
            class="btn-outline mt-6 text-gray-700 hover:text-white">
            線上詢問
          </button>
        </li>
      </ul>
      <ul class="flex flex-col lg:w-3/12 mt-12 md:mt-0">
        <li class="text-2xl mb-5">
          服務須知
        </li>
        <li><a href="#">買前須知</a></li>
        <li><a href="#">服務流程</a></li>
        <li><a href="#">常見問題</a></li>
        <li><a href="#">如何購買(顧客)</a></li>
        <li><a href="#">如何主辦活動</a></li>
        <li><a href="#">關於付款方式 / 手續費</a></li>
        <li><a href="#">禁止行為 / 通報</a></li>
      </ul>
      <ul class="flex flex-col lg:w-3/12 mt-12 md:mt-0">
        <li class="text-2xl mb-5">
          關於我們
        </li>
        <li>
          <p class="mb-2">
            <a href="#">關於時販機</a>
          </p>
          <a
            href="#"
            class="inline-block h-10 w-10 icon_ig" />
          <a
            href="#"
            class="inline-block h-10 w-10 icon_fb"
            style="transform: translateY(-2px);" />
          <a
            href="#"
            class="inline-block h-10 w-10 icon_twitter"
            style="transform: translateY(-1px);" />
          <a
            href="#"
            class="inline-block h-10 w-10 icon_youtube" />
        </li>
        <li><a href="#">服務條款</a></li>
        <li><a href="#">隱私權宣告</a></li>
      </ul>
    </footer>
    <loginBox v-if="$store.state.loginBox === 'login'" />
    <registerBox v-if="$store.state.loginBox === 'register'" />
  </div>
</template>

<script>
import loginBox from '~/components/login.vue';
import registerBox from '~/components/register.vue';

export default {
  components: {
    loginBox,
    registerBox,
  },
  data() {
    return {
    };
  },
  methods: {
    async logout() {
      try {
        const { data } = await this.$axios.get('/api/logout');
        this.$swal.fire({
          icon: 'success',
          title: data.message,
        });
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
.btn-outline{
  @apply bg-transparent
  font-semibold px-8 border border-gray-500
  h-8 items-center mr-8 rounded-sm;
  &:hover{
    @apply bg-gray-500 border-transparent;
  }
}
.icon_logo{
  background: url(~assets/icon_logo.svg) center center / cover no-repeat;
}
.icon_fb{
  background: url(~assets/icon_fb.svg) center center / cover no-repeat;
}
.icon_ig{
  background: url(~assets/icon_ig.svg) center center / cover no-repeat;
}
.icon_twitter{
  background: url(~assets/icon_twitter.svg) center center / cover no-repeat;
}
.icon_youtube{
  background: url(~assets/icon_youtube.svg) center center / cover no-repeat;
}
</style>
