<template>
  <div class="px-8 py-8 flex">
    <div class="side border-2 border-red-500 w-1/4 px-3 py-4 text-gray-800">
      <div>
        <h3 class="text-xl font-bold mb-2">
          條件篩選
        </h3>
        <ul class="leading-7 border-b border-gray-400 py-2">
          <li class="font-bold mb-1">
            接受類型
          </li>
          <li><input class="mx-2" type="checkbox">面談</li>
          <li><input class="mx-2" type="checkbox">視訊</li>
          <li><input class="mx-2" type="checkbox">電話</li>
          <li><input class="mx-2" type="checkbox">聊天室</li>
        </ul>

        <div class="leading-7 border-b border-gray-400 py-2">
          <h4 class="font-bold mb-1">
            認證
          </h4>
          <p>
            <input class="mx-2" type="checkbox">
            專人認證
          </p>
        </div>

        <div class="leading-7 border-b border-gray-400 py-2">
          <h4 class="font-bold mb-1">
            價錢篩選
          </h4>
          <input
            class="appearance-none w-1/3 bg-grey-lighter text-grey-darker
          border border-red rounded mb-3"
            type="text">
          ~
          <input
            class="appearance-none w-1/3 bg-grey-lighter text-grey-darker
          border border-red rounded mb-3"
            type="text">
          <button
            class="bg-transparent hover:bg-indigo-500 text-indigo-700
          font-semibold hover:text-white px-8 border border-indigo-500
          hover:border-transparent h-8 items-center mr-8 rounded-sm">
            套用
          </button>
        </div>
      </div>

      <ul class="mt-10 leading-7 pl-4">
        <li>
          <h3 class="text-xl font-bold mb-2" style="transform: translateX(-12px);">
            所有分類
          </h3>
        </li>
        <li><a href="#">創業 / 副業</a></li>
        <li><a href="#">行銷</a></li>
        <li><a href="#">聊天</a></li>
        <li><a href="#">音樂 / 樂器</a></li>
        <li><a href="#">職場溝通 / 諮詢</a></li>
        <li><a href="#">料理</a></li>
        <li><a href="#">攝影</a></li>
        <li><a href="#">人生規劃</a></li>
        <li><a href="#">占卜</a></li>
        <li><a href="#">戀愛諮詢</a></li>
        <li><a href="#">飲食調理 / 減肥</a></li>
        <li><a href="#">化妝 / 保養</a></li>
        <li><a href="#">家庭 / 教育</a></li>
        <li><a href="#">健身 / 運動</a></li>
        <li><a href="#">動畫製作</a></li>
        <li><a href="#">其他</a></li>
      </ul>
    </div>

    <div class="main w-3/4">
      <div class="main__sortBar bg-gray-200 h-24 flex items-center px-12 ml-4 text-gray-800">
        <button
          class="bg-transparent hover:bg-indigo-500 text-indigo-700
        font-semibold hover:text-white px-8 border border-indigo-500
        hover:border-transparent h-8 items-center mr-8 rounded-sm">
          最新
        </button>
        <button
          class="bg-transparent hover:bg-indigo-500 text-indigo-700
        font-semibold hover:text-white px-8 border border-indigo-500
        hover:border-transparent h-8 items-center mr-8 rounded-sm">
          最熱銷
        </button>
        <div class="relative inline-block w-32 mr-8">
          <select
            class="block appearance-none w-full bg-white border border-gray-400
          hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight
          focus:outline-none focus:shadow-outline">
            <option value="">
              從低到高
            </option>
            <option value="">
              從高到低
            </option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex
          items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
          </div>
        </div>
        <div class="relative inline-block w-32">
          <select
            class="block appearance-none w-full bg-white border
          border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded
          shadow leading-tight focus:outline-none focus:shadow-outline">
            <option value="">
              -- 地區 --
            </option>
            <option value="">
              台北市
            </option>
            <option value="">
              新北市
            </option>
            <option value="">
              宜蘭縣
            </option>
            <option value="">
              花蓮縣
            </option>
            <option value="">
              台東縣
            </option>
            <option value="">
              桃園市
            </option>
            <option value="">
              新竹市
            </option>
            <option value="">
              苗栗縣
            </option>
            <option value="">
              台中市
            </option>
            <option value="">
              南投縣
            </option>
            <option value="">
              彰化縣
            </option>
            <option value="">
              雲林縣
            </option>
            <option value="">
              嘉義縣
            </option>
            <option value="">
              台南市
            </option>
            <option value="">
              高雄市
            </option>
            <option value="">
              屏東縣
            </option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0
          flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
          </div>
        </div>
      </div>

      <div class="main__container flex flex-col sm:flex-row flex-wrap">
        <div
          class="main__container__item md:w-1/2 lg:w-1/3 py-4 px-4 cursor-pointer"
          v-for="(item, index) in products"
          :key="index"
          @click="$router.push(`/products/${item.productId}`)">
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
                  {{ item.category | category }}
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
  name: 'Products',
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/api/products');
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
.icon_location{
  background: url('~assets/icon_location.svg') center center / contain no-repeat;
}
</style>
