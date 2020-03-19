<template>
  <div class="bg-white">
    <div class="banner relative">
      <div
        class="catchSlogan absolute top-0 bottom-0 m-auto md:mt-40 md:ml-16
        text-white font-medium font-huninn">
        <h2
          class="text-2xl md:text-4xl tracking-whider"
          style="text-shadow: 2px 2px 10px #000000;">
          簡單購買別人的時間！
        </h2>
        <p
          class="text-base md:text-xl w-11/12 md:w-2/3 font-normal
          mt-8 md:mt-4 md:text-white text-gray-900">
          時間就是金錢，靈活運用你的金錢和時間！購買別人的專業，甚至出售自己的時間，只要幾個步驟！
        </p>
        <button
          class="border-blue-3 text-blue-3 px-8 py-1 font-bold mt-6 text-lg joinBtn
          shadow focus:outline-none select-none block mx-auto"
          style="transform: translateX(-25px);"
          @click="$router.push('/login')">
          立即加入
        </button>
      </div>
    </div>

    <div class="introduce pt-8 mx-auto text-gray-800">
      <h2 class="text-2xl font-medium text-center text-gray-800 font-huninn hidden md:block">
        如何運作？
      </h2>
      <div class="toggleWrap mt-2 flex justify-around md:px-10">
        <button
          class="text-white font-medium text-lg md:w-1/4 md:pt-2 md:pb-1
          focus:outline-none select-none
          bg-blue-2 w-1/2 py-8"
          @click="toggleFindRentaler(true)">
          尋找販時者
        </button>
        <button
          class="text-white font-medium text-lg md:w-1/4 md:pt-2 md:pb-1
          focus:outline-none select-none
          bg-blue-3 w-1/2 py-8"
          @click="toggleFindRentaler(false)">
          我要販時
        </button>
      </div>
      <div class="flex md:block">
        <ul
          class="flex justify-around items-center text-white
          text-center px-12 md:py-16 pb-10 bg-blue-2 flex-col md:flex-row w-1/2 md:w-auto"
          v-if="isFindRentaler || windowWidth < 768">
          <li>
            <i
              class="inline-block icon_coin_mutiple w-20 h-20" />
            <h3 class="font-medium mt-3 text-xl">
              第一步
            </h3>
            <p class="font-light mt-1">
              線上儲値點數
            </p>
          </li>
          <li class="mt-12 md:mt-0">
            <i
              class="inline-block icon_search w-16 h-16 my-2" />
            <h3 class="font-medium mt-3 text-xl">
              第二步
            </h3>
            <p class="font-light mt-1">
              探索販時項目
            </p>
          </li>
          <li class="mt-12 md:mt-0">
            <i class="inline-block w-16 my-2 h-16 icon_list" />
            <h3 class="font-medium mt-3 text-xl">
              第三步
            </h3>
            <p class="font-light mt-1">
              送出預約訂單
            </p>
          </li>
          <li class="mt-12 md:mt-0">
            <i class="inline-block w-16 my-2 h-16 icon_check" />
            <h3 class="font-medium mt-3 text-xl">
              第四步
            </h3>
            <p class="font-light">
              完成交易
            </p>
          </li>
        </ul>
        <ul
          class="flex justify-around items-center text-white
          text-center px-12 md:py-16 pb-10 bg-blue-3 flex-col md:flex-row w-1/2 md:w-auto"
          v-if="!isFindRentaler || windowWidth < 768">
          <li>
            <i
              class="inline-block icon_bag w-16 h-16 my-2" />
            <h3 class="font-medium mt-3 text-xl">
              第一步
            </h3>
            <p class="font-light mt-1">
              上架服務項目
            </p>
          </li>
          <li class="mt-12 md:mt-0">
            <i
              class="inline-block icon_message w-20 h-20" />
            <h3 class="font-medium mt-3 text-xl">
              第二步
            </h3>
            <p class="font-light mt-1">
              等待購時者來訊
            </p>
          </li>
          <li class="mt-12 md:mt-0">
            <i class="inline-block w-16 my-2 h-16 icon_list" />
            <h3 class="font-medium mt-3 text-xl">
              第三步
            </h3>
            <p class="font-light mt-1">
              等待預約訂單
            </p>
          </li>
          <li class="mt-12 md:mt-0">
            <i class="inline-block w-16 my-2 h-16 icon_check" />
            <h3 class="font-medium mt-3 text-xl">
              第四步
            </h3>
            <p class="font-light">
              完成交易
            </p>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="recommend px-3 sm:px-12 pt-8 pb-16"
      style="background: #6ec5ff;">
      <h2
        class="recommend__title text-2xl font-medium font-huninn text-center py-3
        tracking-wider text-gray-800">
        精選販時者
      </h2>

      <card :products="products" />

      <div class="flex flex-col items-center mt-12">
        <i
          class="icon_dot inline-block w-8 mb-10"
          style="border-top: 5px dotted white; height: 1px; transform: rotate(90deg);" />
        <button
          class="px-8 py-1 text-blue-2 bg-white shadow-lg font-medium font-huninn
          tracking-wider border hover:border-gray-500 focus:outline-none select-none"
          style="border-radius: 20px;"
          @click="$router.push('/products')">
          尋找更多
        </button>
      </div>
    </div>

    <div class="pt-4 md:pt-10 pb-12 lg:px-16 px-4 overflow-hidden">
      <h2
        class="text-2xl text-gray-900 font-medium hidden md:block">
        平台特色
      </h2>
      <div class="md:mt-12 lg:pl-12 flex items-center relative">
        <i
          class="icon_logo h-40
          w-32 self-end mb-4 text-center relative hidden xl:inline-block">
          <span
            class="text-4xl not-italic font-bold text-blue-3 absolute
            inset-0 mx-auto pl-4"
            style="letter-spacing: 15px; top: -55px;">!!!</span>
        </i>
        <ul
          class="flex xl:ml-24 pb-4 flex-col md:flex-row items-center w-full
          md:items-start">
          <li
            class="circle mt-8 md:mt-0 border-blue-2
            md:mx-2 rounded-full px-8 text-center"
            style="border-width: 5px;">
            <h3
              class="font-medium tracking-widest bg-white inline-block px-3 text-gray-900"
              style="transform: translate(2px, -9px);">
              簡單買賣
            </h3>
            <i
              class="block w-20 h-20 text-center mx-auto md:mt-2 mt-6
              icon_simple" />
            <p class="text-xs inline-block mt-8 md:mt-4">
              只要您有空閒時間，即可註冊並上線自己的活動，又或者可以瀏覽平台，找尋自己想參與的活動，活動形式分為現場、視訊、電話、聊天室，金流則是多方支援。
            </p>
          </li>
          <li
            class="circle mt-8 border-blue-500 md:mx-2 rounded-full md:-mt-12
            px-8 text-center"
            style="border-width: 5px;">
            <h3
              class="font-medium tracking-widest bg-white inline-block px-3 text-gray-900"
              style="transform: translate(2px, -9px);">
              安全交易
            </h3>
            <i
              class="block w-20 h-20 text-center mx-auto md:mt-4 mt-6
            icon_safety" />
            <p class="text-xs inline-block mt-8 md:mt-4">
              成為販時者前須通過進一步的身份驗證， 畢竟有品質的商品是消費者消費考慮的原因之一。
            </p>
          </li>
          <li
            class="circle mt-8 md:mt-0 border-blue-500 md:mx-2 rounded-full
            px-8 text-center"
            style="border-width: 5px;">
            <h3
              class="font-medium tracking-widest bg-white inline-block px-3 text-gray-900"
              style="transform: translate(2px, -9px);">
              享受時間
            </h3>
            <i
              class="block w-20 h-20 text-center mx-auto md:mt-4 mt-6
            icon_enjoy" />
            <p class="text-xs inline-block mt-8 md:mt-4">
              在購買時間前，可以事先傳送訊息詢問販時者，當雙方都確定後才進行交易。活動當天則是各自享受雙方的時間。
            </p>
          </li>
        </ul>
        <i
          class="icon_blueDot w-5/6 absolute h-20
          right-0 mr-6 hidden md:block"
          style="bottom: -45px;" />
      </div>
      <button
        class="border-4 border-blue-600 px-8 py-2 text-blue-600 font-medium
        hover:bg-blue-600 hover:text-white mx-auto block mt-8 md:mt-16"
        style="border-radius: 25px;"
        @click="$router.push('/login')">
        立即體驗
      </button>
    </div>
  </div>
</template>

<script>
import card from '~/components/card.vue';

export default {
  name: 'Homepage',
  components: {
    card,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/products?limit=6');
    return { products: data.products };
  },
  layout: 'front',
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
      this.windowWidth = window.innerWidth;
    });
  },
  data() {
    return {
      products: '',
      isFindRentaler: true,
      windowWidth: '',
    };
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    toggleFindRentaler(isFindRentaler) {
      if (this.windowWidth < 768) {
        return;
      }
      this.isFindRentaler = isFindRentaler;
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style scoped lang="scss">
.banner {
  background: url('~assets/img_home.png') center center / cover no-repeat;
  width: 100vw;
  height: calc(100vh - 4rem);
}
.catchSlogan{
  p{
    text-shadow: 2px 2px 10px #000000;
  }
}
.introduce{
  button{
    border-radius: 45px 45px 0 0;
    box-shadow: inset 5px 8px 7px rgba(0,0,0,0.1);
  }
  ul{
    box-shadow: 0px -2px 10px rgba(0,0,0,0.2);
  }
}
.circle{
  height: 16rem;
  width: 16rem;
}
@media (max-width: 767px) {
  .banner{
    height: calc(50vh);
    margin-bottom: 20vh;
  }
  .catchSlogan{
    top: 42vh;
    left: 30px;
    p{
      text-shadow: none;
    }
  }
  .introduce{
    button{
      border-radius: 0;
      box-shadow: none;
    }
    ul{
      box-shadow: none;
    }
  }
  .circle{
    height: 20rem;
    width: 20rem;
    i{
      width: 6rem;
      height: 6rem;
    }
  }
}
.joinBtn{
  background: #ffffff88;
  border-radius: 20px;
  border-width: 3px;
  &:hover{
    @apply bg-blue-2 text-white border-blue-2;
  }
}
.icon_coin_mutiple{
  background: url('~assets/icon_findseller_step1.svg') center center / contain no-repeat;
}
.icon_search{
  background: url('~assets/icon_findseller_step2.svg') center center / contain no-repeat;
}
.icon_list{
  background: url('~assets/icon_findseller_step3.svg') center center / contain no-repeat;
}
.icon_check{
  background: url('~assets/icon_findseller_step4.svg') center center / contain no-repeat;
}
.icon_bag{
  background: url('~assets/icon_sell_step1.svg') center center / contain no-repeat;
}
.icon_message{
  background: url('~assets/icon_sell_step2.svg') center center / contain no-repeat;
}
.icon_simple{
  background: url('~assets/icon_home_simplydeal.svg') center center / contain no-repeat;
}
.icon_safety{
  background: url('~assets/icon_home_safelydeal.svg') center center / contain no-repeat;
}
.icon_enjoy{
  background: url('~assets/icon_home_enjoytime.svg') center center / contain no-repeat;
}
.icon_logo{
  background: url(~assets/icon_header_logo.svg) center center / contain no-repeat;
  filter: invert(50%) sepia(23%) saturate(6564%) hue-rotate(185deg) brightness(99%) contrast(92%);
}
.icon_blueDot{
  background: url(~assets/dec_home_character.svg) center center / contain no-repeat;
}
</style>
