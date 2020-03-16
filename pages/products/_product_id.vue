<template>
  <div
    class="px-4 py-8 flex flex-col md:flex-row bg-blue-1 pt-24 relative text-gray-900
    md:px-8">
    <div class="main w-full md:w-3/4 flex-shrink">
      <div class="absolute text-gray-700 text-sm" style="top: 20px; left: 33px;">
        <nuxt-link to="/" class="link mr-1">
          首頁
        </nuxt-link>
        >
        <nuxt-link to="/products" class="link mx-1">
          尋找販時者
        </nuxt-link>
        >
        <nuxt-link class="link mx-1" :to="$route.path">
          {{ product.title }}
        </nuxt-link>
      </div>
      <h2
        class="text-xl font-medium tracking-wider -mt-10 mb-3
        text-gray-900 font-huninn">
        販時資訊
      </h2>
      <div class="main__item pr-0 md:pr-4">
        <img
          :src="product.coverImg ? `data:image/png;base64,${product.coverImg}`: 'http://alpha.backer.id/assets/images/bg/kucingmalas.jpeg'"
          class="rounded-md w-full object-cover shadow"
          style="height: 20rem;">

        <div class="my-6 pb-2 mt-6 mx-2 border-b border-gray-600">
          <div class="flex items-start mb-5 text-gray-900 flex-wrap font-huninn">
            <h1 class="text-2xl font-medium tracking-widest pl-2 mr-auto font-sans">
              {{ product.title }}
            </h1>
            <p class="font-medium pt-1 mr-3 text-lg" v-if="product.meetingPlace">
              <i
                class="w-5 h-5 inline-block icon_location opacity-75"
                style="transform: translateY(2px);" />
              {{ product.meetingPlace }}
            </p>
            <p
              class="text-white bg-blue-700 mx-2 px-4 py-1
              inline-block rounded font-medium tracking-wider">
              {{ product.category | category }}
            </p>
          </div>

          <div class="typeWrap mb-4 px-2 font-huninn flex items-center">
            <div
              class="h-4 w-4 border border-gray-500 rounded-sm"
              :class="{'bg-green-400': product.type.includes('meeting')}" />
            <p class="ml-2 mr-4">
              面談
            </p>
            <div
              class="h-4 w-4 border border-gray-500 rounded-sm"
              :class="{'bg-green-400': product.type.includes('video')}" />
            <p class="ml-2 mr-4">
              視訊
            </p>
            <div
              class="h-4 w-4 border border-gray-500 rounded-sm"
              :class="{'bg-green-400': product.type.includes('phone')}" />
            <p class="ml-2 mr-4">
              電話
            </p>
            <div
              class="h-4 w-4 border border-gray-500 rounded-sm"
              :class="{'bg-green-400': product.type.includes('chat')}" />
            <p class="ml-2 mr-4">
              聊天室
            </p>
          </div>

          <!-- eslint-disable-next-line -->
          <div v-html="product.productDescription"
               class="px-3 py-2 tracking-wider"
               v-if="product.productDescription" />
          <div
            v-else
            class="px-3 py-2 tracking-wider text-lg text-gray-800">
            尚無販物描述
          </div>
          <span class="text-sm tracking-wider block text-right mt-6">
            販時起始日： {{ product.createTime | dateDisplay }}
          </span>
        </div>
        <div class="px-2">
          <h2
            class="text-xl font-medium tracking-wider
            text-gray-900 font-huninn">
            販時者資訊
          </h2>
          <div class="mt-8 px-2 flex">
            <img
              :src="product.img && !product.img.includes('http') ?
                `data:image/png;base64,${product.img}`: product.img ? product.img :
                  'https://image.flaticon.com/icons/svg/149/149072.svg'"
              class="rounded-lg shadow object-center object-cover h-48 w-48">
            <div class="ml-8 w-full tracking-wider">
              <h3 class="text-xl font-medium text-gray-900 tracking-widest">
                {{ product.name }}
              </h3>
              <p
                class="text-lg mt-4 font-medium bg-blue-3 text-white
                inline-block px-2 rounded font-huninn"
                v-if="product.slogan">
                {{ product.slogan }}
              </p>
              <p class="mt-4">
                {{ product.userdescription || '此人尚無自我介紹' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="side px-4 lg:px-8 ml-4 text-gray-800 bg-white rounded-lg pt-8 pb-4
      border border-gray-700 shadow flex-shrink-0">
      <h2 class="text-lg font-medium tracking-wider font-huninn">
        時間價格
      </h2>
      <div class="mt-6 mb-10">
        <h3 class="text-2xl font-bold text-center font-huninn">
          {{ product.price }}
          <span class="text-sm inline-block" style="transform: translateY(-10px);">點數</span>
          / 30
          <span class="text-sm inline-block" style="transform: translateY(-10px);">分</span>
        </h3>
        <div
          class="flex border border-gray-600 rounded-lg
          text-center w-1/2 mx-auto items-center h-8
          justify-center mt-6 mb-2 font-huninn hover:border-gray-700 shadow">
          <button
            class="h-full w-12 font-medium text-2xl w-1/3 hover:text-gray-900 focus:outline-none"
            @click="qty = qty <= 1 ? qty : qty - 1">
            <span style="transform: translateY(-2px) scale(1, 1.5);" class="inline-block">－</span>
          </button>
          <div class="text-lg font-medium w-1/2 pl-2">
            {{ qty * 30 }}
            <span class="inline-block text-xs" style="transform: translateY(-6px);">分</span>
          </div>
          <button
            class="h-full w-12 font-medium text-2xl w-1/3 hover:text-gray-900 focus:outline-none"
            @click="qty = qty >= 20 ? qty : qty + 1">
            <span style="transform: translateY(-2px);" class="inline-block">+</span>
          </button>
        </div>
        <span class="text-xs text-gray-600">＊最低時間單位為30分鐘，加長時間以30分鐘為一單位</span>
      </div>

      <h2 class="text-lg font-medium tracking-wider font-huninn">
        選擇時間
      </h2>

      <div class="px-0 mt-6 mb-8 lg:px-4">
        <client-only>
          <v-date-picker
            mode="single"
            v-model="selectedDate"
            is-inline
            is-expanded
            color="blue"
            :min-date="new Date()"
            :max-date="+new Date() + 1000*60*60*24*30"
            :attributes="attributes" />
        </client-only>
        <div class="relative inline-block w-40 mt-4">
          <select
            style="border-radius: 8px;"
            class="block appearance-none w-full bg-white border
            border-gray-600 hover:border-gray-700 px-4 py-2 pl-12
            shadow leading-tight focus:outline-none focus:shadow-outline
            font-medium tracking-widest"
            v-model="startTime">
            <option :value="null" disabled>
              00:00
            </option>
            <option :value="450 + item * 30" v-for="(item, index) in 29" :key="index">
              {{ 450 + item * 30 | timeConverter }}
            </option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 flex items-center px-2 text-gray-700"
            style="right: 5px;">
            <svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <span class="text-xs text-gray-600 ml-2">＊請選擇開始時間</span>
      </div>

      <h2 class="text-lg font-medium tracking-wider font-huninn">
        交談方式
      </h2>

      <div class="mb-6 px-2 lg:px-4 mt-4">
        <div class="mb-4 order__typeWrap select-none font-medium pl-2">
          <div class="flex items-center">
            <div class="mr-4">
              <input class="hidden" type="radio" id="meeting" value="meeting" v-model="startType">
              <label
                class="inline-block h-4 w-4 border border-gray-600 rounded-sm"
                style="transform: translate(-2px, 2px);"
                for="meeting" />
              <label for="meeting">面談</label>
            </div>
            <div class="mr-4">
              <input class="hidden" type="radio" id="video" value="video" v-model="startType">
              <label
                class="inline-block h-4 w-4 border border-gray-600 rounded-sm"
                style="transform: translate(-2px, 2px);"
                for="video" />
              <label for="video">視訊</label>
            </div>
          </div>

          <div class="flex items-center mt-2">
            <div class="mr-4">
              <input class="hidden" type="radio" id="phone" value="phone" v-model="startType">
              <label
                class="inline-block h-4 w-4 border border-gray-600 rounded-sm"
                style="transform: translate(-2px, 2px);"
                for="phone" />
              <label for="phone">電話</label>
            </div>
            <div>
              <input class="hidden" type="radio" id="chat" value="chat" v-model="startType">
              <label
                class="inline-block h-4 w-4 border border-gray-600 rounded-sm"
                style="transform: translate(-2px, 2px);"
                for="chat" />
              <label for="chat">聊天室
              </label>
            </div>
          </div>
        </div>

        <button
          class="bg-blue-500 hover:bg-blue-700 text-white rounded-lg mt-3 w-full
          py-2 font-medium text-lg tracking-wider shadow font-huninn"
          @click="$router.push(`/mail/${product.userId}`)">
          事先諮詢
        </button>
        <button
          class="bg-orange-400 hover:bg-orange-500 text-white rounded-lg mt-3 w-full
          py-2 font-medium text-lg tracking-wider shadow font-huninn"
          @click="order">
          申請預約
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductInfo',
  async asyncData({ $axios, route }) {
    try {
      const { data } = await $axios.get(`/api/product/${route.params.product_id}`);
      return { product: data.product };
    } catch ({ response }) {
      console.log(response);
      // error({ statusCode: response.status, message: response.data.message });
    }
  },
  layout: 'front',
  data() {
    return {
      product: '',
      attributes: [
        {
          key: 'today',
          dot: 'red',
          dates: new Date(),
        },
      ],
      selectedDate: null,
      startType: null,
      startTime: null,
      qty: 1,
    };
  },
  methods: {
    async order() {
      try {
        if (this.$store.state.userInfo.emailVerified == null) {
          this.$router.push('/login');
          return;
        }
        if (!this.$store.state.userInfo.emailVerified) {
          throw new Error('請至信箱驗證');
        }
        if (!this.selectedDate || !this.startTime) {
          throw new Error('請填寫日期與開始時間');
        }
        if (this.$store.state.userInfo.point - this.qty * this.product.price < 0) {
          throw new Error('點數不足，請至會員頁面儲值');
        }
        this.$router.push(`/order/${this.$route.params.product_id}?startTime=${
          +new Date(this.selectedDate) + Number(this.startTime) * 60000}&qty=${this.qty}&&type=${this.startType}`);
      } catch (err) {
        this.$swal.fire({
          icon: 'error',
          title: err.message,
        });
      }
    },
  },
  filters: {
    dateDisplay(value) {
      const dt = new Date(value);
      return `${dt.getFullYear()} / ${dt.getMonth() + 1} / ${dt.getDate()}`;
    },
    timeConverter(val) {
      return `${Math.floor(val / 60) < 10 ? `0${Math.floor(val / 60)}`
        : Math.floor(val / 60)}:${val % 60 === 0 ? '00' : val % 60}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.order__typeWrap{
  input[type="radio"]:checked + label {
    @apply bg-blue-2;
  }
  label{
    @apply cursor-pointer;
  }
}
.icon_location{
  background: url('~assets/icon_product_location.svg') center center / contain no-repeat;
}
.link:hover{
  border-bottom: 1px solid gray;
}
.side{
  max-width: 33%;
  min-width: 20rem;
}
@media (max-width: 767px) {
  .side{
    min-width: none;
    width: 90%;
    max-width: 90%;
    margin: 4rem auto 2rem;
  }
}
@media (max-width: 639px) {
  .side{
    width: 100%;
    max-width: 100%;
  }
}
</style>
