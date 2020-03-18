<template>
  <div class="bg-white">
    <div class="banner relative" style="height: calc(100vh - 4rem)">
      <div class="absolute top-0 bottom-0 m-auto mt-40 ml-16 text-white font-medium font-huninn">
        <h2
          class="text-4xl tracking-whider"
          style="text-shadow: 2px 2px 10px #000000;">
          簡單購買別人的時間！
        </h2>
        <p
          class="text-xl w-2/3 font-normal mt-4"
          style="text-shadow: 2px 2px 10px #000000;">
          時間就是金錢，靈活運用你的金錢和時間！購買別人的專業，甚至出售自己的時間，只要幾個步驟！
        </p>
        <button
          class="border-blue-3 text-blue-3 px-8 py-1 font-bold mt-6 text-lg joinBtn
          shadow focus:outline-none select-none">
          立即加入
        </button>
      </div>
    </div>

    <div class="introduce pt-8 mx-auto text-gray-800">
      <h2 class="text-2xl font-medium text-center text-gray-800 font-huninn">
        如何運作？
      </h2>
      <div class="toggleWrap mt-2 flex justify-around px-10">
        <button
          class="text-white font-medium text-lg w-1/4 pt-2 pb-1 focus:outline-none select-none
          bg-blue-2"
          style="border-radius: 45px 45px 0 0; box-shadow: inset 5px 8px 7px rgba(0,0,0,0.1)"
          @click="isFindRentaler = true">
          尋找販時者
        </button>
        <button
          class="text-white font-medium text-lg w-1/4 pt-2 pb-1 focus:outline-none select-none
          bg-blue-3"
          style="border-radius: 45px 45px 0 0; box-shadow: inset 5px 8px 7px rgba(0,0,0,0.1)"
          @click="isFindRentaler = false">
          我要販時
        </button>
      </div>
      <ul
        class="flex justify-around items-center text-white
        text-center px-12 py-16"
        style="box-shadow: 0px -2px 10px rgba(0,0,0,0.2);"
        :class="[isFindRentaler ? 'bg-blue-2': 'bg-blue-3']">
        <li>
          <i
            class="inline-block"
            :class="[isFindRentaler? 'icon_coin_mutiple w-20 h-20' : 'icon_bag w-16 h-16 my-2']" />
          <h3 class="font-medium mt-3 text-xl">
            第一步
          </h3>
          <p class="font-light mt-1">
            {{ isFindRentaler?'線上儲値點數': '上架服務項目' }}
          </p>
        </li>
        <li>
          <i
            class="inline-block"
            :class="[isFindRentaler? 'icon_search w-16 h-16 my-2' : 'icon_message w-20 h-20']" />
          <h3 class="font-medium mt-3 text-xl">
            第二步
          </h3>
          <p class="font-light mt-1">
            {{ isFindRentaler ? '探索販時項目': '等待購時者來訊' }}
          </p>
        </li>
        <li>
          <i class="inline-block w-16 my-2 h-16 icon_list" />
          <h3 class="font-medium mt-3 text-xl">
            第三步
          </h3>
          <p class="font-light mt-1">
            {{ isFindRentaler? '送出預約訂單':'等待預約訂單' }}
          </p>
        </li>
        <li>
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
          style="border-radius: 20px;">
          尋找更多
        </button>
      </div>
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
  data() {
    return {
      products: '',
      isFindRentaler: true,
    };
  },
};
</script>

<style scoped lang="scss">
.banner {
  background: url('~assets/img_home.png') center center / cover no-repeat;
  width: 100vw;
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
</style>
