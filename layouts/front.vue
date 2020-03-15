<template>
  <div
    class="min-h-screen">
    <nav
      class="flex items-center justify-end fixed top-0 left-0 w-full tracking-wider h-16
      bg-blue-2 z-50 font-huninn">
      <nuxt-link
        class="logo h-12 mr-auto ml-4 text-white px-2 py-3 relative pl-12"
        to="/">
        <i
          class="inline-block h-8 w-8 absolute top-0 left-0 mt-1 icon_logo"
          style="top: 3px; left: 23px;" />
        <h1 class="pl-4 text-lg font-bold tracking-widest inline-block">
          時販機
        </h1>
        <span class="font-bold text-white">じはんき</span>
      </nuxt-link>
      <ul class="flex items-center mr-6">
        <li class="mr-6">
          <nuxt-link
            class="text-white border-2 border-white font-medium
            hover:bg-white hover:text-blue-3 px-4 py-2"
            style="border-radius: 32px"
            to="/products">
            尋找販時
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            to="/"
            class="text-white border-2 border-white font-medium
            hover:bg-white hover:text-blue-3 px-4 py-2"
            style="border-radius: 32px">
            我要販物
          </nuxt-link>
        </li>
      </ul>
      <div
        class="loginBtnWrap h-full flex items-center justify-center
        cursor-pointer"
        v-if="!$store.state.userInfo.userId">
        <button
          class="bg-blue-3 text-white px-12 font-medium h-full"
          @click="$router.push('/login')">
          登入 / 註冊
        </button>
      </div>
      <!-- login nav -->
      <div
        class="loginBtnWrap h-full flex items-center justify-center
        cursor-pointer text-white"
        v-else>
        <button class="bg-blue-3 h-full flex px-4">
          <i
            class="icon_coin w-6 h-6"
            style="transform: translateY(2px);" />
          <h3 class="ml-3 mr-1 text-xl tracking-wide">
            {{ $store.state.userInfo.point }}
          </h3>
          <span class="text-xs">我的點數</span>
        </button>
        <div class="bg-blue-3 h-full relative">
          <button class="h-full px-3 accountBtn">
            <i
              class="icon_user w-5 h-5 inline-block"
              style="transform: translateY(3px);" />
            會員資料
          </button>
          <div
            class="absolute left-0 right-0 m-auto toggleNavbar rounded-b hidden">
            <button class="px-3 py-4">
              <i
                class="icon_coin inline-block w-5 h-5"
                style="transform: translateY(4px);" />
              儲值點數
            </button>
            <button class="px-3 py-4">
              <i
                class="icon_time inline-block w-5 h-5"
                style="transform: translateY(4px);" />
              我的商品
            </button>
            <button class="px-3 py-4">
              <i
                class="icon_list inline-block w-5 h-5"
                style="transform: translateY(4px);" />
              我的訂單
            </button>
            <button
              class="py-4 pb-5 rounded-b
              w-full"
              @click="$store.dispatch('logout')">
              登出
            </button>
          </div>
        </div>
        <button class="bg-blue-3 h-full px-4">
          <i
            class="icon_notify w-6 h-6 inline-block"
            style="transform: translateY(3px);" />
        </button>
      </div>
    </nav>

    <div class="main pt-16 bg" style="min-height: 23rem">
      <nuxt />
    </div>

    <footer
      class="footer py-8 px-5 flex flex-col md:flex-row
      justify-around tracking-wider leading-7 pl-12 md:pl-5 text-white
      bg-blue-3 items-start">
      <div class="flex items-bottom py-1">
        <i
          class="h-8 w-8 mr-2 icon_logo"
          style="transform: translateY(-2px);" />
        <h2
          class="text-2xl mb-5 font-huninn">
          時販機
          <span class="text-xl">じはんき</span>
        </h2>
      </div>
      <ul class="flex flex-col mt-12 md:mt-0 py-1">
        <li class="text-2xl mb-5 font-huninn">
          服務須知
        </li>
        <li>
          <nuxt-link to="/">
            購物須知
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/">
            常見問題
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/">
            付款方式
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/">
            服務條款
          </nuxt-link>
        </li>
      </ul>
      <ul class="flex flex-col mt-12 md:mt-0 py-1">
        <li class="text-2xl mb-5 font-huninn">
          關於我們
        </li>
        <li>
          <nuxt-link to="/">
            關於時販機
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/">
            隱私權宣告
          </nuxt-link>
        </li>
      </ul>
      <button
        class="messageBtn border-2 border-white text-lg px-4 py-1 pl-10
        hover:text-blue-3 hover:bg-white font-huninn relative"
        style="border-radius: 32px;">
        <i
          class="h-5 w-5 inline-block icon_message absolute
          top-0 bottom-0 m-auto"
          style="left: 12px; top: -1px;" />
        24 小時線上客服
      </button>
      <div
        class="flex justify-between w-1/6
        mr-10 py-1">
        <nuxt-link
          to="/"
          class="w-8 h-8 inline-block
          icon_ig" />
        <nuxt-link
          to="/"
          class="w-8 h-8 inline-block
          icon_twitter" />
        <nuxt-link
          to="/"
          class="w-8 h-8 inline-block
          icon_fb" />
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
.btn-outline{
  @apply bg-transparent
  font-semibold px-8 border border-gray-500
  h-8 items-center mr-8 rounded-sm;
  &:hover{
    @apply bg-gray-500 border-transparent;
  }
}
.icon_logo{
  background: url(~assets/icon_header_logo.svg) center center / contain no-repeat;
}
.icon_fb{
  background: url(~assets/icon_footer_fb.svg) center center / contain no-repeat;
}
.icon_ig{
  background: url(~assets/icon_footer_ig.svg) center center / contain no-repeat;
}
.icon_twitter{
  background: url(~assets/icon_footer_twitter.svg) center center / contain no-repeat;
}
.icon_message{
  background: url(~assets/icon_footer_customerservice.svg) center center / contain no-repeat;
}
.icon_user{
  background: url(~assets/icon_member.svg) center center / contain no-repeat;
}
.icon_notify{
  background: url(~assets/icon_header_message.svg) center center / contain no-repeat;
}
.icon_coin{
  background: url(~assets/icon_header_point.svg) center center / contain no-repeat;
}
.icon_time{
  background: url(~assets/icon_navbar_product.svg) center center / contain no-repeat;
}
.icon_list{
  background: url(~assets/icon_navbar_order.svg) center center / contain no-repeat;
}
.bg{
  background: transparent linear-gradient(180deg,
  #0068BF 0%, #0068BFFB 29%, #0068BFA0 100%, #0068BF00 100%)
  0% 0% no-repeat padding-box;
}
.loginBtnWrap{
  & > button:hover{
    background: transparent linear-gradient(180deg,
    #404040C4 0%, #151515 100%) 0% 0% no-repeat padding-box;
  }
  & > div:hover {
    background: transparent linear-gradient(180deg,
    #404040C4 0%, #202020 100%) 0% 0% no-repeat padding-box;
    .toggleNavbar{
      background: transparent linear-gradient(180deg,
    #202020 0%, #151515 100%) 0% 0% no-repeat padding-box;
      button:hover{
        background: #404040C4;
      }
    }
  }
  & .accountBtn:hover ~ .toggleNavbar {
    display: block;
  }
}
.toggleNavbar:hover{
  display: block;
}
.messageBtn:hover i {
  filter: invert(44%) sepia(82%) saturate(7078%) hue-rotate(193deg) brightness(88%) contrast(101%);
}
</style>
