<template>
  <div>
    <ul
      class="flex justify-around items-center border-b border-gray-400
      pb-2 tracking-wider mb-4 text-center font-medium font-huninn text-gray-800 text-lg">
      <li class="w-2/12 lg:w-1/12">
        {{ isSeller? '購時者' : '販時者' }}
      </li>
      <li class="w-3/12">
        項目
      </li>
      <li class="w-3/12 lg:w-2/12">
        開始日期
      </li>
      <li class="w-2/12 hidden lg:inline-block">
        時段
      </li>
      <li class="w-2/12 hidden md:inline-block">
        交談方式
      </li>
      <li class="w-2/12">
        訂單狀態
      </li>
      <li class="w-2/12 lg:w-1/12">
        詳情
      </li>
    </ul>
    <ul
      class="flex justify-around items-center text-sm sm:text-base text-center py-2
        tracking-wider text-gray-900 font-huninn"
      v-for="(item, index) in orders"
      :key="index">
      <li class="w-2/12 lg:w-1/12 font-sans">
        {{ item.name }}
      </li>
      <li class="w-3/12 font-sans">
        {{ item.title }}
      </li>
      <li class="w-3/12 lg:w-2/12">
        {{ item.startTime | dateDisplay }}
      </li>
      <li class="w-2/12 hidden lg:inline-block">
        {{ period(item) }}
      </li>
      <li class="w-2/12 hidden md:inline-block font-sans">
        {{ item.type | typeDisplay }}
      </li>
      <li class="w-2/12 font-sans">
        {{ item.status | statusDisplay }}
      </li>
      <li class="w-2/12 lg:w-1/12">
        <button
          class="px-4 py-1 bg-blue-2 rounded-md text-white text-sm
            hover:bg-blue-3"
          @click="checkInfo(item)">
          查看
        </button>
      </li>
    </ul>
    <div
      v-if="!orders.length"
      class="text-2xl text-gray-800 font-medium ml-10 mt-8 font-huninn tracking-wide">
      目前暫無訂單資料
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderList',
  data() {
    return {
      orders: {},
    };
  },
  props: {
    isSeller: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      try {
        const { data } = await this.$axios.get(`/api/orders${this.isSeller ? '?isSeller="true"' : ''}`);
        this.orders = data.orders;
      } catch ({ response }) {
        console.log(response.data.message);
      }
    },
    timeConverter(value) {
      if (Number(value) < 10) {
        return `0${value}`;
      }
      return value;
    },
    checkInfo(item) {
      this.$emit('pass-check-info', item, true);
    },
  },
  watch: {
    async isSeller() {
      await this.getOrders();
    },
  },
  computed: {
    period() {
      return (item) => {
        const dt = new Date(item.startTime);
        const dueTime = new Date(+dt + 30 * 60 * 1000 * item.qty);
        return `${this.timeConverter(dt.getHours())}:${this.timeConverter(dt.getMinutes())} ~
        ${this.timeConverter(dueTime.getHours())}:${this.timeConverter(dueTime.getMinutes())}`;
      };
    },
  },
  filters: {
    dateDisplay(val) {
      return new Date(val).toLocaleString('zh-TW', { hour12: false }).split(' ')[0];
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
    statusDisplay(value) {
      switch (value) {
        case 'pending':
          return '等待確認';
        case 'access':
          return '已確認';
        case 'finish':
          return '已完成';
        case 'cancel':
          return '已取消';
        default:
          break;
      }
    },
  },
};
</script>

<style>

</style>
