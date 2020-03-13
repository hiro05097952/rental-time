<template>
  <div
    class="fixed inset-0 flex justify-center items-center"
    style="background: rgba(0, 0, 0, 0.5); z-index: 50;"
    @scroll.prevent
    @mousewheel.prevent
    @touchmove.prevent
    @click.self="close">
    <div
      class="bg-gray-100 w-2/3 shadow-xl rounded-lg border-2
      border-gray-700 px-12 pt-10 pb-8 relative">
      <button
        class="absolute top-0 rounded-full w-6 h-6 border-2 border-gray-500
        text-gray-500 hover:text-gray-600 hover:border-gray-600"
        style="right: 15px; top: 10px; outline: none;"
        @click="close">
        <p style="transform: scale(1.2, 1) translate(0, -2px);">
          X
        </p>
      </button>
      <div class="flex">
        <ul
          class="flex flex-col pb-2 tracking-wider text-lg w-8/12">
          <li class="mb-5 text-sm flex items-center">
            <h3 class="text-gray-800 w-1/3 text-gray-900 mr-10 text-right">
              服務名稱
            </h3>
            <p class="font-medium">
              {{ orderInfo.title }}
            </p>
          </li>
          <li class="mb-5 text-sm flex items-center">
            <h3 class="text-gray-800 w-1/3 text-gray-900 mr-10 text-right">
              時間價格
            </h3>
            <p class="font-medium">
              {{ orderInfo.price }}點數 / {{ orderInfo.atLeast }} 分
            </p>
          </li>
          <li class="mb-5 text-sm flex items-center">
            <h3 class="text-gray-800 w-1/3 text-gray-900 mr-10 text-right">
              開始日期
            </h3>
            <p class="font-medium">
              {{ orderInfo.startTime| dateDisplay }}
            </p>
          </li>
          <li class="mb-5 text-sm flex items-center">
            <h3 class="text-gray-800 w-1/3 text-gray-900 mr-10 text-right">
              時段
            </h3>
            <p class="font-medium">
              {{ period }}
            </p>
          </li>
          <li class="mb-5 text-sm flex items-center">
            <h3 class="text-gray-800 w-1/3 text-gray-900 mr-10 text-right">
              交談方式
            </h3>
            <p class="font-medium">
              {{ orderInfo.type | typeDisplay }}
            </p>
          </li>
          <li class="mb-5 text-sm flex items-center">
            <h3 class="text-gray-800 w-1/3 text-gray-900 mr-10 text-right">
              訂單狀態
            </h3>
            <p class="font-medium">
              {{ orderInfo.status | statusDisplay }}
            </p>
          </li>
          <li class="mb-5 text-sm flex items-center">
            <h3 class="text-gray-800 w-1/3 text-gray-900 mr-10 text-right">
              訂單建立時間
            </h3>
            <p class="font-medium">
              {{ orderInfo.createTime | dateDisplay }}
            </p>
          </li>
        </ul>

        <div class="w-40">
          <div
            class="bg-teal-300 rounded relative w-full h-40 border border-red-500">
            <h3
              class="absolute text-sm text-center tracking-wider"
              style="bottom: -25px; left:0; right:0;">
              {{ orderInfo.name }}
            </h3>
          </div>
          <button
            class="py-1 w-full text-xs rounded bg-white border-2 border-gray-500
          mt-10 hover:bg-gray-500 hover:text-white font-medium tracking-wider">
            前往訊息
          </button>
          <button
            class="py-1 w-full text-xs rounded bg-white border-2 border-gray-500
          mt-2 hover:bg-gray-500 hover:text-white font-medium tracking-wider"
            v-if="orderInfo.status === 'access'"
            @click="$router.push(`/chat/${orderInfo.orderId}`)">
            前往聊天室
          </button>
        </div>
      </div>
      <div
        class="flex justify-around px-8 pt-6 border-t border-gray-500"
        v-if="orderInfo.status === 'pending'">
        <button
          class="px-4 py-2 rounded bg-yellow-500
          text-white font-medium tracking-wider hover:bg-yellow-600"
          style="width: 45%;"
          v-if="isSeller"
          @click="updateOrder('access')">
          接受預約
        </button>
        <button
          class="px-4 py-2 rounded bg-red-500
          text-white font-medium tracking-wider hover:bg-red-600"
          style="width: 45%;"
          @click="CancelConfirm(false)">
          {{ isSeller ? '婉拒' : '取消送出' }}
        </button>
      </div>
      <div
        class="flex justify-around px-8 pt-6 border-t border-gray-500"
        v-if="orderInfo.status === 'access'">
        <button
          class="px-4 py-2 rounded bg-yellow-500
          text-white font-medium tracking-wider hover:bg-yellow-600"
          style="width: 45%;"
          v-if="isSeller"
          @click="updateOrder('finish')">
          完成販時
        </button>
        <button
          class="px-4 py-2 rounded bg-red-500
          text-white font-medium tracking-wider hover:bg-red-600"
          style="width: 45%;"
          @click="CancelConfirm(true)">
          {{ isSeller ? '取消販時' : '取消買時' }}
        </button>
      </div>
      <div
        class="flex justify-around px-8 pt-6 border-t border-gray-500"
        v-if="orderInfo.status === 'finish'">
        <h4
          class="text-xl font-medium tracking-widest text-gray-800">
          已完成
        </h4>
      </div>
      <div
        class="flex justify-around px-8 pt-6 border-t border-gray-500"
        v-if="orderInfo.status === 'cancel'">
        <h4
          class="text-xl font-medium tracking-widest text-gray-800">
          已取消
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderInfo',
  props: {
    orderInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    isSeller: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    close() {
      this.$emit('pass-close', {}, false);
    },
    timeConverter(value) {
      if (Number(value) < 10) {
        return `0${value}`;
      }
      return value;
    },
    async updateOrder(method) {
      try {
        const { data } = await this.$axios.post(`/api/order/${method}`, {
          orderId: this.orderInfo.orderId,
        });
        this.$swal.fire({
          icon: 'success',
          title: data.message,
        });
        this.close();
        this.$emit('pass-get-orders');
      } catch ({ response }) {
        console.log(response.data);
        this.$swal.fire({
          icon: 'error',
          title: response.data.message,
        });
      }
    },
    async CancelConfirm(isAccess) {
      try {
        const { value } = await this.$swalConfirm.fire({
          title: '<h2 class="text-xl">確定要取消訂單嗎</h2>',
          html: isAccess ? '<p class="text-sm">因為販物已通過審核，現在取消的話將返回原本點數並扣除 25 %</p>' : '',
          icon: 'warning',
        });
        if (!value) {
          return;
        }
        this.updateOrder('cancel');
      } catch ({ message }) {
        this.$swal.fire({
          icon: 'error',
          title: message,
        });
      }
    },
  },
  computed: {
    period() {
      const dt = new Date(this.orderInfo.startTime);
      const dueTime = new Date(+dt + 30 * 60 * 1000 * this.orderInfo.qty);
      return `${this.timeConverter(dt.getHours())}:${this.timeConverter(dt.getMinutes())} ~
      ${this.timeConverter(dueTime.getHours())}:${this.timeConverter(dueTime.getMinutes())}`;
    },
  },
  filters: {
    dateDisplay(value) {
      return String(value).split('T')[0].replace(/-/g, ' / ');
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
