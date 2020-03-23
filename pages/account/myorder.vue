<template>
  <div
    class="flex py-16 justify-center pt-24 px-2 lg:px-0">
    <div
      class="shadow-xl
        rounded-lg w-full sm:w-11/12 lg:w-5/6 mx-auto bg-white px-2 lg:px-10 pt-12 pb-8 relative">
      <div class="btnWrap absolute flex font-huninn" style="top: -40px; left: 40px;">
        <button
          class="px-6 py-2 text-gray-800 font-bold tracking-wider"
          :class="[isSeller ? 'activeBtn': 'navBtn']"
          style="border-radius: 23px 23px 0 0; outline: none;"
          @click="isSeller = true">
          我的販時
        </button>
        <button
          class="px-6 py-2 text-gray-800 font-bold tracking-wider"
          :class="[!isSeller ? 'activeBtn': 'navBtn']"
          style="border-radius: 23px 23px 0 0; outline: none;"
          @click="isSeller = false">
          我的購時
        </button>
      </div>
      <orderList
        :is-seller="isSeller"
        @pass-check-info="updateInfo"
        ref="orderListChild" />
      <orderInfo
        v-if="openOrderInfo"
        :order-info="orderInfo"
        :is-seller="isSeller"
        @pass-close="updateInfo"
        @pass-get-orders="getOrders" />
    </div>
  </div>
</template>

<script>
import orderList from '~/components/orderList.vue';
import orderInfo from '~/components/orderInfo.vue';

export default {
  name: 'MyOrder',
  header() {
    return {
      title: '我的販時＆購時 | 時販機',
    };
  },
  layout: 'front',
  components: {
    orderList,
    orderInfo,
  },
  data() {
    return {
      isSeller: true,
      openOrderInfo: false,
      orderInfo: {},
    };
  },
  asyncData({ route }) {
    if (route.query.type === 'buyer') {
      return {
        isSeller: false,
      };
    }
  },
  methods: {
    updateInfo(item, isOpen) {
      this.orderInfo = item;
      this.openOrderInfo = isOpen;
      this.$store.commit('TOGGLE_SCREEN', isOpen);
    },
    getOrders() {
      this.$refs.orderListChild.getOrders();
    },
  },
};
</script>

<style lang="scss" scoped>
.navBtn{
  @apply bg-indigo-200;
  box-shadow: inset 0 0 5px #BDBDBD;
  &:hover{
    @apply bg-indigo-300;
  }
}
.activeBtn{
  background: white;
  box-shadow: none;
}
.modalOpen{
  height: 100vh !important;
  overflow: hidden;
}
</style>
