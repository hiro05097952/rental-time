<template>
  <div class="bg-blue-300 flex py-16 justify-center">
    <div
      class="border-2 border-gray-600 shadow-xl
        rounded-lg w-11/12 md:w-5/6 lg:w-2/3 mx-auto bg-white px-4 lg:px-12 py-12
        relative pb-8">
      <div class="absolute mt-10 mr-10 md:mr-24 top-0 right-0">
        <img
          :src="product.img && !product.img.includes('http') ?
            `data:image/png;base64,${product.img}`: product.img ? product.img :
              'https://fakeimg.pl/192x192/282828/EAE0D0/?text=Icon'"
          class="rounded-lg shadow object-center object-cover md:h-32 md:w-32
          w-24 h-24 lg:h-48 lg:w-48">
        <p class="text-center mt-2 text-gray-800">
          {{ product.name }}
        </p>
      </div>
      <ul class="tracking-wider text-gray-800">
        <li class="flex mb-6 items-center">
          <h2 class="md:text-xl w-1/4 md:w-1/6 text-right font-medium font-huninn">
            服務名稱
          </h2>
          <p class="text-base md:text-lg ml-10 text-gray-900 w-1/3 md:w-2/5">
            {{ product.title }}
          </p>
        </li>
        <li class="flex mb-6 items-center">
          <h2 class="md:text-xl w-1/4 md:w-1/6 text-right font-medium font-huninn">
            時間價格
          </h2>
          <p class="md:text-xl ml-10 text-gray-900 font-huninn">
            {{ product.price }}
            <span
              class="text-sm font-medium inline-block"
              style="transform: translateY(-7px)">點數</span>
            /
            30
            <span
              class="text-sm font-medium inline-block"
              style="transform: translateY(-7px)">分</span>
          </p>
        </li>
        <li class="flex mb-6 items-center">
          <h2 class="md:text-xl w-1/4 md:w-1/6 text-right font-medium font-huninn">
            日期
          </h2>
          <p class="text-base md:text-lg ml-10 text-gray-900 font-huninn">
            {{ time($route.query.startTime, true) }}
          </p>
        </li>
        <li class="flex mb-6 items-center">
          <h2 class="md:text-xl w-1/4 md:w-1/6 text-right font-medium font-huninn">
            時段
          </h2>
          <p class="text-base md:text-lg ml-10 text-gray-900">
            {{ time($route.query.startTime, false) }}
          </p>
        </li>
        <li class="flex mb-8 items-center">
          <h2 class="md:text-xl w-1/4 md:w-1/6 text-right font-medium font-huninn">
            交談方式
          </h2>
          <p class="text-base md:text-lg ml-10 text-gray-900">
            {{ $route.query.type | typeDisplay }}
          </p>
        </li>
        <li class="flex mb-6 items-center">
          <h2 class="md:text-xl w-1/4 md:w-1/6 text-right font-medium font-huninn">
            備註留言
          </h2>
          <textarea
            rows="5"
            class="border-2 rounded text-base md:text-lg px-2 py-1 w-1/2 ml-10 md:w-4/6"
            style="min-height: 5rem; max-height: 20rem;"
            v-model="remark" />
        </li>
      </ul>

      <div
        class="text-xl border-b border-gray-500 mt-12 pb-1 flex justify-end
        text-gray-800">
        <div class="font-huninn">
          <span class="text-base mr-2">本次扣除</span>
          {{ product.price * $route.query.qty }}
          <span
            class="text-sm font-medium inline-block ml-2"
            style="transform: translateY(-7px)">點數
          </span>
        </div>
        <div class="ml-10 font-huninn">
          <span class="text-base mr-2">購買後剩餘</span>
          {{ $store.state.userInfo.point - product.price * $route.query.qty }}
          <span
            class="text-sm font-medium inline-block ml-2"
            style="transform: translateY(-7px)">點數
          </span>
        </div>
      </div>

      <div class="flex justify-center mt-16 font-huninn md:text-lg">
        <button
          class="bg-teal-500 py-2 px-8 rounded
          font-medium text-white hover:bg-teal-600 mr-10"
          @click="$router.go(-1)">
          上一步
        </button>
        <button
          class="rounded bg-blue-3 px-8 py-2
          font-medium text-white hover:bg-blue-2"
          @click="order">
          確認送出
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderConfirmation',
  layout: 'front',
  data() {
    return {
      product: {},
      remark: null,
    };
  },
  middleware: 'order',
  async asyncData({ $axios, route }) {
    try {
      const { data } = await $axios.get(`/api/product/${route.params.product_id}`);
      return {
        product: data.product,
      };
    } catch ({ response }) {
      console.log(response.data.message);
    }
  },
  methods: {
    async order() {
      try {
        const { data } = await this.$axios.post('/api/order', {
          productId: this.$route.params.product_id,
          qty: this.$route.query.qty,
          startTime: this.$route.query.startTime,
          type: this.$route.query.type,
        });
        this.$swal.fire({
          icon: 'success',
          title: data.message,
        });
        this.$router.replace('/account/myorder?type=buyer');
        // => 導去會員訂單頁面
      } catch ({ response }) {
        this.$swal.fire({
          icon: 'error',
          title: response.data.message,
        });
      }
    },
  },
  computed: {
    time() {
      return (val, isDate) => {
        const dt = new Date(Number(val));
        const dueDt = new Date(Number(val) + 30 * 60000 * this.$route.query.qty);
        return isDate ? `${dt.getFullYear()} / ${dt.getMonth() + 1} / ${dt.getDate()}`
          : `${dt.getHours() < 10 ? `0${dt.getHours()}` : dt.getHours()}
          : ${dt.getSeconds() < 10 ? `0${dt.getSeconds()}` : dt.getSeconds()} ~ 
          ${dueDt.getHours() < 10 ? `0${dueDt.getHours()}` : dueDt.getHours()}
          : ${dueDt.getSeconds() < 10 ? `0${dueDt.getSeconds()}` : dueDt.getSeconds()}`;
      };
    },
  },
  filters: {
    timeDisplay(value) {
      const dt = new Date(Number(value));
      return `${dt.getFullYear()} / ${dt.getMonth() + 1} / ${dt.getDate()}`;
    },
    typeDisplay(value) {
      switch (value) {
        case 'video':
          return '視訊';
        case 'phone':
          return '通話';
        case 'chat':
          return '聊天室';
        case 'meeting':
          return '面談';
        default:
          break;
      }
    },
  },
};
</script>

<style>
</style>
