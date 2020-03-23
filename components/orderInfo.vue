<template>
  <div
    class="fixed inset-0 flex justify-center items-center overflow-y-scroll"
    style="background: rgba(0, 0, 0, 0.5); z-index: 50;"
    @click.self="close">
    <div
      class="bg-gray-100 md:w-3/4 lg:w-1/2 sm:w-4/5 w-11/12 shadow-xl rounded-lg border-2
      border-gray-700 px-4 md:px-12 pt-16 md:pt-10 pb-8 relative overflow-y-scroll"
      style="max-height: 80vh;">
      <button
        class="absolute top-0 right-0 mt-3 mr-4 text-xl font-light text-gray-600
        hover:text-gray-800 icon_close w-8 h-8 hover:opacity-75"
        style="outline: none;"
        @click="close" />
      <div class="flex flex-col-reverse sm:flex-row">
        <ul
          class="flex flex-col pb-2 tracking-wider text-lg sm:w-8/12
          w-full mt-6 sm:mt-0">
          <li class="mb-5 text-base flex items-center">
            <h3
              class="text-gray-800 w-1/3 text-gray-900 mr-6 ml-2 text-right
              font-huninn text-base">
              服務名稱
            </h3>
            <p class="font-medium">
              {{ orderInfo.title }}
            </p>
          </li>
          <li class="mb-5 text-base flex items-center">
            <h3
              class="text-gray-800 w-1/3 text-gray-900 mr-6 ml-2 text-right
              font-huninn text-base">
              時間價格
            </h3>
            <p class="font-medium font-huninn">
              {{ orderInfo.price }}
              <span class="text-xs inline-block" style="transform: translateY(-5px);">點數</span>
              / 30
              <span class="text-xs inline-block" style="transform: translateY(-5px);">分</span>
            </p>
          </li>
          <li class="mb-5 text-base flex items-center">
            <h3
              class="text-gray-800 w-1/3 text-gray-900 mr-6 ml-2 text-right
              font-huninn text-base">
              開始日期
            </h3>
            <p class="font-medium tracking-widest font-huninn">
              {{ time(orderInfo.startTime, true) }}
            </p>
          </li>
          <li class="mb-5 text-base flex items-center">
            <h3
              class="text-gray-800 w-1/3 text-gray-900 mr-6 ml-2 text-right
              font-huninn text-base">
              時段
            </h3>
            <p class="font-medium font-huninn">
              {{ period }}
            </p>
          </li>
          <li class="mb-5 text-base flex items-center">
            <h3
              class="text-gray-800 w-1/3 text-gray-900 mr-6 ml-2 text-right
              font-huninn text-base">
              交談方式
            </h3>
            <p class="font-medium">
              {{ orderInfo.type | typeDisplay }}
            </p>
          </li>
          <li class="mb-5 text-base flex items-center">
            <h3
              class="text-gray-800 w-1/3 text-gray-900 mr-6 ml-2 text-right
              font-huninn text-base">
              訂單狀態
            </h3>
            <p class="font-medium">
              {{ orderInfo.status | statusDisplay }}
            </p>
          </li>
          <li class="mb-5 text-base flex items-center">
            <h3
              class="text-gray-800 w-1/3 text-gray-900 mr-6 ml-2 text-right
              font-huninn text-base">
              訂單建立時間
            </h3>
            <p class="font-medium tracking-widest font-huninn">
              {{ time(orderInfo.createTime, false) }}
            </p>
          </li>
        </ul>

        <div class="w-40 mx-auto sm:mx-0">
          <div
            class="w-full">
            <img
              :src="orderInfo.img && !orderInfo.img.includes('http') ?
                `data:image/png;base64,${orderInfo.img}`: orderInfo.img ? orderInfo.img :
                  'https://fakeimg.pl/192x192/282828/EAE0D0/?text=Icon'"
              class="rounded-lg shadow object-center object-cover h-40 w-40">
            <h3
              class="text-sm text-center tracking-wider mt-1">
              {{ orderInfo.name }}
            </h3>
          </div>
          <button
            class="py-1 w-full text-sm rounded bg-white border-2 border-gray-500
            mt-3 hover:bg-gray-500 hover:text-white font-medium tracking-wider text-gray-800
            font-huninn"
            @click="$router.push(`/mail/${orderInfo.userId}`)">
            前往訊息
          </button>
          <button
            class="py-1 w-full text-sm rounded bg-white border-2 border-gray-500
          mt-2 hover:bg-gray-500 hover:text-white font-medium tracking-wider text-gray-800
          font-huninn"
            v-if="orderInfo.status === 'access'"
            @click="goVideoChat">
            開始視訊
          </button>
        </div>
      </div>
      <div
        class="flex justify-center px-8 pt-6 border-t border-gray-500"
        v-if="orderInfo.status === 'pending'">
        <button
          class="px-12 py-2 rounded bg-blue-2 mr-6
          text-white font-medium tracking-wider hover:bg-blue-3 font-huninn"
          v-if="isSeller"
          @click="updateOrder('access')">
          接受預約
        </button>
        <button
          class="px-12 py-2 rounded bg-red-500
          text-white font-medium tracking-wider hover:bg-red-600 font-huninn"
          @click="CancelConfirm(false)">
          {{ isSeller ? '婉拒' : '取消送出' }}
        </button>
      </div>
      <div
        class="flex justify-center px-8 pt-6 border-t border-gray-500"
        v-if="orderInfo.status === 'access'">
        <button
          class="px-12 py-2 rounded bg-blue-2 mr-6
          text-white font-medium tracking-wider hover:bg-blue-3"
          v-if="isSeller"
          @click="updateOrder('finish')">
          完成販時
        </button>
        <button
          class="px-12 py-2 rounded bg-red-500
          text-white font-medium tracking-wider hover:bg-red-600"
          @click="CancelConfirm(true)">
          {{ isSeller ? '取消販時' : '取消買時' }}
        </button>
      </div>
      <div
        class="flex justify-center px-8 pt-6 border-t border-gray-500"
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
        this.$swal.fire({
          icon: 'error',
          title: response.data.message,
        });
      }
    },
    async CancelConfirm(isAccess) {
      try {
        const { value } = await this.$swalConfirm.fire({
          title: '<h2 class="text-xl font-huninn">確定要取消訂單嗎</h2>',
          html: isAccess ? '<p class="text-sm font-huninn">因為販物已通過審核，現在取消的話將返回原本點數並扣除 25 %</p>' : '',
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
    async goVideoChat() {
      const { value } = await this.$swalConfirm.fire({
        title: '<h2 class="text-xl font-huninn">確定繼續嗎？</h2>',
        html: '<p class="text-sm font-huninn">將前往聊天室並開啟視訊',
        icon: 'warning',
      });
      if (!value) {
        return;
      }
      this.$store.commit('TOGGLE_SCREEN', false);
      this.$router.push(`/chat/${this.orderInfo.orderId}`);
    },
  },
  computed: {
    period() {
      const dt = new Date(this.orderInfo.startTime);
      const dueTime = new Date(+dt + 30 * 60 * 1000 * this.orderInfo.qty);
      return `${this.timeConverter(dt.getHours())}:${this.timeConverter(dt.getMinutes())} ~
      ${this.timeConverter(dueTime.getHours())}:${this.timeConverter(dueTime.getMinutes())}`;
    },
    time() {
      return (val, onlyDate) => {
        const dt = new Date(val).toLocaleString('zh-TW', { hour12: false });
        return onlyDate ? dt.split(' ')[0] : dt;
      };
    },
  },
  filters: {
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

<style scoped>
.icon_close{
  background: url('~assets/icon_cross.svg') center center / contain no-repeat;
}
</style>
