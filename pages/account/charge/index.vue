<template>
  <div>
    <div
      class="w-full pt-8 pb-6 md:py-12 flex md:items-center border-b-2 border-gray-500
      font-huninn flex-col md:flex-row px-2 md:px-0">
      <div
        class="flex justify-between items-center w-11/12 md:w-7/12 mr-auto">
        <h2 class="text-lg">
          剩餘點數
        </h2>
        <p
          class="text-3xl font-bold tracking-widest">
          {{ $store.state.userInfo.point }}
          <span
            class="text-sm font-bold inline-block tracking-wide"
            style="transform: translate(-4px, -12px);">點數</span>
        </p>
      </div>
      <div class="md:text-center">
        <button
          class="py-2 px-4 bg-blue-1 hover:bg-blue-2 text-sm
          rounded shadow focus:outline-none select-none
          mt-4 md:mt-0"
          @click="historyOpen = true">
          查看儲值紀錄
        </button>
      </div>
    </div>

    <div class="py-8 pb-4 font-huninn">
      <h2 class="inline-block text-lg">
        點數選購
      </h2>
      <p class="text-sm inline-block ml-4 font-light font-sans">
        選擇要購買的方案
      </p>
      <ul
        class="flex flex-wrap mt-6 justify-between flex-col sm:flex-row md:px-8
        items-center">
        <li
          v-for="(item, index) in points"
          :key="index"
          class="w-full border border-gray-400 mb-4 flex items-center
              justify-around px-2 py-3 cursor-pointer hover:bg-gray-200
              tag"
          @click="selected.pointId = item.pointId"
          :class="{'bg-gray-200' : selected.pointId === item.pointId}">
          <h3 class="text-xl font-bold">
            {{ item.name }}
            <span
              class="text-xs relative"
              style="top: -7px">點數</span>
          </h3>
          <span class="font-thin text-xl">/</span>
          <p class="text-xs">
            NT$ {{ item.price }}
          </p>
        </li>
      </ul>
    </div>

    <div class="mb-10 font-huninn">
      <h2 class="text-lg">
        付款方式
      </h2>
      <ul class="mt-4 md:px-8">
        <li
          class="h-12 border border-gray-400 rounded-lg mb-4 tag mx-auto sm:mx-0
            font-bold flex items-center justify-center cursor-pointer hover:bg-gray-200"
          :class="{'bg-gray-200' : selected.payment === 'credit'}">
          信用卡
        </li>
      </ul>
    </div>

    <button
      class="border-blue-700 rounded-lg w-2/3 sm:w-1/3 text-lg
        py-2 text-blue-700 font-bold tracking-wider block mx-auto
        hover:bg-blue-700 hover:text-white focus:outline-none select-none font-huninn"
      style="border: 3px solid"
      @click="charge">
      前往結帳
    </button>

    <history v-if="historyOpen" @pass-close="closeHistory" />
  </div>
</template>

<script>
import history from '~/components/chargeHistory.vue';

export default {
  name: 'ChargeSelect',
  layout: 'front',
  components: {
    history,
  },
  data() {
    return {
      points: '',
      selected: {
        pointId: '',
        payment: 'credit',
      },
      historyOpen: false,
    };
  },
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.get('/api/points');
      return {
        points: data.points,
      };
    } catch ({ response }) {
      // error({ statusCode: response.status, message: response.data.message });
    }
  },
  methods: {
    charge() {
      const [valid] = this.points.filter((item) => item.pointId === this.selected.pointId);
      if (!valid) {
        this.$swal.fire({
          icon: 'error',
          title: '請正確選擇點數',
        });
        return;
      }
      this.$router.push(`/account/charge/${this.selected.pointId}?name=${valid.name}&price=${valid.price}`);
    },
    closeHistory(isOpen) {
      this.historyOpen = isOpen;
    },
  },
};
</script>

<style>
.tag{
  width: 48%;
  border-radius: 10px;
}
@media (max-width: 639px) {
  .tag{
    width: 90%;
    border-radius: 10px;
  }
}
</style>
