<template>
  <div>
    <div class="banner bg-blue-400" style="height: calc(100vh - 4rem)" />

    <div class="introduce pt-8 mx-auto lg:max-w-5xl max-w-3xl text-gray-800">
      <div class="w-full introduce__title mb-6 text-center">
        <h1 class="text-4xl text-medium text-center tracking-widest inline-block">
          時販機
        </h1>
        <span class="font-bold text-sm">じはんき</span>
        <p class="text-center text-lg mt-3 tracking-wide">
          有空閒時間卻不知道怎麼利用嗎？
          讓我們來幫您！
        </p>
      </div>

      <ul class="introduce__container flex items-base justify-around flex-col lg:flex-row">
        <li
          class="introduce__item sm:mr-8 py-5 px-3 sm:px-12 text-center
          flex flex-col sm:flex-row lg:flex-col items-center lg:w-1/3">
          <i
            class="introduce__item__icon opacity-75 inline-block
            lg:w-20 lg:h-20 h-24 w-24 sm:mr-10 lg:mr-0 icon_simple flex-shrink-0" />
          <div>
            <h3 class="introduce__item__title text-2xl text-center tracking-wider mt-2">
              簡單買賣
            </h3>
            <p class="introduce__item__text mt-5 tracking-wide">
              只要您有空閒時間，即可註冊並上線自己的活動，又或者可以瀏覽平台，找尋自己想參與的活動，活動形式分為現場、視訊、電話、聊天室，金流則是多方支援。
            </p>
          </div>
        </li>

        <li
          class="introduce__item sm:mr-8 py-5 px-3 sm:px-12 text-center
          flex flex-col sm:flex-row lg:flex-col items-center lg:w-1/3">
          <i
            class="introduce__item__icon opacity-75 inline-block
            lg:w-20 lg:h-20 h-24 w-24 px-6 sm:mr-10 lg:mr-0 lg:px-0 icon_safety flex-shrink-0" />
          <div>
            <h3 class="introduce__item__title text-2xl text-center tracking-wider mt-2">
              安全交易
            </h3>
            <p class="introduce__item__text mt-5 tracking-wide">
              成為主辦前須通過進一步的身份驗證，畢竟有品質的商品是消費者消費考慮的原因之一。
            </p>
          </div>
        </li>
        <li
          class="introduce__item sm:mr-8 py-5 px-3 sm:px-12 text-center
          flex flex-col sm:flex-row lg:flex-col items-center lg:w-1/3">
          <i
            class="introduce__item__icon opacity-75 inline-block
            lg:w-20 lg:h-20 h-24 w-24 sm:mr-10 lg:mr-0 icon_enjoy flex-shrink-0" />
          <div>
            <h3 class="introduce__item__title text-2xl text-center tracking-wider mt-2">
              享受時間
            </h3>
            <p class="introduce__item__text mt-5 tracking-wide">
              在購買活動前，可以事先寄信詢問主辦，當雙方都確定後才購買。活動當天則是各自享受雙方的時間。
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div class="recommend px-3 sm:px-12 py-8">
      <h2
        class="recommend__title text-4xl text-center py-3
        tracking-wider text-gray-800">
        推薦販物
      </h2>

      <div class="recommend__container flex flex-col sm:flex-row flex-wrap">
        <div
          class="recommend__container__item md:w-1/2 lg:w-1/4 py-4 px-4 cursor-pointer"
          v-for="(item, index) in products"
          :key="index">
          <div
            class="bg-white relative shadow p-2 rounded-lg text-gray-800 hover:shadow-lg">
            <div
              class="right-0 mt-4 rounded-l-full absolute text-center
              font-bold text-xs text-white px-2 py-1 bg-orange-500
              tracking-wider"
              v-if="item.identified">
              真人認證
            </div>
            <img
              :src="item.coverImg ? `data:image/png;base64,${item.coverImg}`: 'http://alpha.backer.id/assets/images/bg/kucingmalas.jpeg'"
              class="h-32 rounded-lg w-full object-cover">
            <div class="flex justify-center">
              <img
                :src="item.img ? `data:image/png;base64,${item.img}`: 'http://alpha.backer.id/assets/images/bg/avatar-default2.jpg'"
                class="rounded-full -mt-6 border-4 object-center object-cover
                border-white mr-2 h-16 w-16">
            </div>
            <div
              class="py-2 px-2 text-center"
              style="height: 72px">
              <div class="font-bold text-center">
                {{ item.name }}
              </div>

              <div
                class="text-sm font-light text-center my-1 bg-orange-300 inline-block
                px-4 leading-6 rounded-sm">
                {{ item.slogan }}
              </div>
            </div>
            <div class="px-2">
              <h3
                class="text-lg font-bold tracking-wider text-center"
                style="-webkit-line-clamp: 2; -webkit-box-orient: vertical;
                display: -webkit-box; overflow: hidden; word-break: break-all;
                min-height: 54px">
                {{ item.title }}
              </h3>
              <div class="flex items-center justify-center mt-2">
                <p class="font-bold text-sm text-gray-700">
                  <i
                    class="w-4 h-4 inline-block icon_location"
                    style="filter: opacity(0.6); transform: translateY(2px);" />
                  {{ item.meetingPlace }}
                </p>
                <p class="text-sm text-white bg-green-600 mx-2 px-2">
                  {{ item.category }}
                </p>
              </div>
              <p class="font-bold text-sm text-gray-700 mt-2 text-center">
                NT$ {{ item.price }} / {{ item.atLeast }} 分
              </p>
            </div>
            <div class="flex justify-around">
              <button
                class="bg-red-500 hover:bg-red-700 text-white rounded
              leading-9 mt-3 w-1/2 mx-1">
                預約
              </button>
              <button
                class="bg-green-500 hover:bg-green-700 text-white
              rounded leading-9 mt-3 w-1/2 mx-1">
                事先詢問
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Homepage',
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/products?limit=4');
    return { products: data.products };
  },
  layout: 'front',
  data() {
    return {
      products: '',
    };
  },
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
} */
.icon_simple{
  background: url('~assets/icon_simple.svg') center center / contain no-repeat;
}
.icon_safety{
  background: url('~assets/icon_safety.svg') center center / contain no-repeat;
}
.icon_enjoy{
  background: url('~assets/icon_enjoy.svg') center center / contain no-repeat;
}
.icon_location{
  background: url('~assets/icon_location.svg') center center / contain no-repeat;
}
</style>
