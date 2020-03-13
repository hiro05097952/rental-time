<template>
  <div class="bg-blue-300 flex py-16 justify-center">
    <div
      class="border-2 border-gray-600 shadow-xl
        rounded-lg w-11/12 md:w-5/6 lg:w-2/3 mx-auto bg-white px-4 lg:px-12 py-12">
      <ul class="tracking-wider">
        <li class="flex mb-6 items-center">
          <h2 class="text-lg w-1/4 md:w-1/6 text-right">
            服務名稱
          </h2>
          <p class="text-xl ml-10">
            {{ product.title }}
          </p>
        </li>
        <li class="flex mb-6 items-center">
          <h2 class="text-lg w-1/4 md:w-1/6 text-right">
            時間價格
          </h2>
          <p class="text-xl ml-10">
            NT$ {{ product.price }} / {{ product.atLeast }} 分
          </p>
        </li>
        <li class="flex mb-6 items-center">
          <h2 class="text-lg w-1/4 md:w-1/6 text-right">
            日期
          </h2>
          <p class="text-xl ml-10">
            {{ $route.query.startTime | timeDisplay }}
          </p>
        </li>
        <li class="flex mb-6 items-center">
          <h2 class="text-lg w-1/4 md:w-1/6 text-right">
            時段
          </h2>
          <p class="text-xl ml-10">
            test
          </p>
        </li>
        <li class="flex mb-8 items-center">
          <h2 class="text-lg w-1/4 md:w-1/6 text-right">
            交談方式
          </h2>
          <p class="text-xl ml-10">
            {{ $route.query.type | typeDisplay }}
          </p>
        </li>
        <li class="flex mb-6 items-center">
          <h2 class="text-lg w-1/4 md:w-1/6 text-right">
            備註留言
          </h2>
          <textarea
            rows="5"
            class="border-2 rounded text-lg px-2 py-1 w-1/2 ml-10 md:w-4/6"
            v-model="remark" />
        </li>
      </ul>
      <div class="flex justify-around mt-12">
        <button
          class="border-2 border-blue-700 py-1 px-4 rounded
          font-bold text-blue-700 hover:bg-blue-700 hover:text-white">
          上一步
        </button>
        <button
          class="rounded bg-yellow-500 px-4 py-1
          text-bold text-white hover:bg-yellow-600"
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
        this.$router.replace('/account/myorder');
        // => 導去會員訂單頁面
      } catch ({ response }) {
        this.$swal.fire({
          icon: 'error',
          title: response.data.message,
        });
      }
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
