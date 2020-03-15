<!--  eslint-disable  -->
<template>
  <div class="px-8 py-8 flex">
    <div class="main w-3/4">
      <div
        class="main__link border-2 h-16 flex items-center px-4 mr-4 text-gray-800
        rounded-lg">
        <nuxt-link class="mr-2" to="/">
          首頁
        </nuxt-link> /
        <nuxt-link class="mx-2" to="/products">
          探索
        </nuxt-link> /
        <nuxt-link class="ml-2" to="#">
          {{ product.title }}
        </nuxt-link>
      </div>

      <div class="main__item pr-4 pt-4">
        <div class="main__item__img relative">
          <img
            :src="product.coverImg ? `data:image/png;base64,${product.coverImg}`: 'http://alpha.backer.id/assets/images/bg/kucingmalas.jpeg'"
            class="rounded-md w-full object-cover"
            style="height: 18rem;">
          <div
            class="top-0 right-0 mt-8 rounded-l-full absolute text-center
            font-bold text-md text-white
            px-3 py-1 bg-orange-500 tracking-wider"
            v-if="product.identified">
            真人認證
          </div>
        </div>

        <div class="my-6 pb-10 mt-6 px-2">
          <h1 class="text-3xl font-bold tracking-wider text-center text-gray-800">
            {{ product.title }}
          </h1>
          <h2
            class="text-2xl font-bold my-4 border-t-2 pt-4 text-gray-800
            tracking-wider">
            販物資訊
            <span class="text-sm text-white bg-green-600 mx-2 px-2 inline-block">
              {{ product.category | category }}
            </span>
          </h2>
          <ul
            class="tracking-wider text-lg text-gray-900
            flex flex-col">
            <li class="flex items-center my-2">
              <div
                class="h-4 w-4 border border-gray-500 rounded-sm"
                :class="{'bg-green-400': product.type.includes('meeting')}" />
              <p class="mx-2">
                面談
              </p>
              <div
                class="h-4 w-4 border border-gray-500 rounded-sm"
                :class="{'bg-green-400': product.type.includes('video')}" />
              <p class="mx-2">
                視訊
              </p>
              <div
                class="h-4 w-4 border border-gray-500 rounded-sm"
                :class="{'bg-green-400': product.type.includes('phone')}" />
              <p class="mx-2">
                電話
              </p>
              <div
                class="h-4 w-4 border border-gray-500 rounded-sm"
                :class="{'bg-green-400': product.type.includes('chat')}" />
              <p class="mx-2">
                聊天室
              </p>
            </li>
            <li class="my-2">
              <i class="icon_location w-5 h-5 inline-block opacity-75" />
              地點：{{ product.meetingPlace }}
            </li>
            <li class="mt-2 self-end text-base">
              更新日期：{{ product.createTime | dateDisplay }}
            </li>
          </ul>
          <h2
            class="text-2xl font-bold my-4 border-t-2 pt-4 tracking-wider
            text-gray-800">
            販物介紹
          </h2>
          <div
            class="px-2 py-2 rounded-sm tracking-wider border border-gray-500"
            v-html="product.productDescription"
            v-if="product.productDescription" />
          <div
            v-else
            class="px-2 py-2 rounded-sm tracking-wider text-lg
          border border-gray-500 text-gray-800">
            尚無販物描述
          </div>
        </div>
      </div>
    </div>

    <div
      class="side w-1/4 px-3 pb-4 text-gray-800"
      style="min-width: 300px">
      <client-only>
        <v-date-picker mode="single"
        v-model="selectedDate"
        is-inline
        is-expanded
        color="blue"
        :min-date="new Date()"
        :max-date="+new Date() + 1000*60*60*24*30"
        :attributes='attributes'/>
      </client-only>
      <div
        class="bg-gray-200 my-4 px-2 py-4 rounded-md">
        <span class="text-xl font-bold text-center block">
          NT$ {{ product.price }} / {{ product.atLeast }} 分
        </span>
        <button class="bg-green-500 hover:bg-green-700 text-white rounded leading-9 mt-3 w-full">
          寄信詢問
        </button>
        <button class="bg-red-500 hover:bg-red-700 text-white rounded leading-9 mt-3 w-full"
        @click="order">
          預約
        </button>
      </div>
      <div class="hr border-t-2 border-gray-400 my-6" />
      <div class="bg-gray-400 text-center px-2 pt-4 pb-1 rounded-md">
        <img
          :src="product.img && !product.img.includes('http') ?
          `data:image/png;base64,${product.img}`: product.img ? product.img :
          'https://image.flaticon.com/icons/svg/149/149072.svg'"
          class="rounded-full border-4 object-center object-cover border-white h-20 w-20 mx-auto">
        <div class="text-xl font-bold text-center my-2">
          {{ product.name }}
        </div>

        <div
          class="text-xl text-center my-1 bg-gray-600 inline-block text-white
          px-4 py-1 leading-6 rounded-sm"
          v-if="product.slogan">
          {{ product.slogan }}
        </div>

        <div
          class="bg-white my-4 rounded-md py-2 px-2 text-sm">
          {{ product.userdescription || '此人尚無自我介紹' }}
        </div>
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
      qty: 1,
      type: 'video',
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
        if (!this.selectedDate) {
          throw new Error('請填寫日期');
        }
        if (this.$store.state.userInfo.point - this.qty * this.product.price < 0) {
          throw new Error('點數不足，請至會員頁面儲值');
        }
        this.$router.push(`/order/${this.$route.params.product_id}?startTime=${+new Date(this.selectedDate)
        }&qty=${this.qty}&&type=${this.type}`);
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
  },
};
</script>

<style>
/* .icon_location{
  background: url('~assets/icon_location.svg') center center / contain no-repeat;
  transform: translateY(3px);
}
.icon_error{
  background: url('~assets/icon_error.svg') center center / contain no-repeat;
  transform: translateY(3px);
} */
</style>
