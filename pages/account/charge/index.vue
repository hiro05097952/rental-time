<template>
  <div>
    <div class="w-full py-12 flex items-center border-b-2 border-gray-500">
      <h2 class="w-5/12">
        剩餘點數
      </h2>
      <p class="text-3xl font-bold tracking-widest">
        1000
      </p>
      <span class="text-sm mb-4 ml-2 font-bold">點數</span>
    </div>

    <div class="py-8 pb-4">
      <h2 class="inline-block">
        點數選購
      </h2>
      <p class="text-sm inline-block ml-4 font-light">
        選擇要購買的方案
      </p>
      <ul class="flex flex-wrap mt-6 justify-between px-8">
        <li
          v-for="(item, index) in points"
          :key="index"
          class="w-full border border-gray-400 mb-4 flex items-center
              justify-around px-2 py-3 cursor-pointer hover:bg-gray-200"
          style="width: 48%; border-radius: 10px"
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

    <div class="mb-10">
      <h2>付款方式</h2>
      <ul class="mt-4 px-8">
        <li
          class="h-12 border border-gray-400 rounded-lg mb-4
            font-bold flex items-center justify-center cursor-pointer hover:bg-gray-200"
          style="width: 48%;"
          :class="{'bg-gray-200' : selected.payment === 'credit'}">
          信用卡
        </li>
      </ul>
    </div>

    <button
      class="border-blue-700 rounded w-1/3
        py-1 text-blue-700 font-bold tracking-wider block mx-auto
        hover:bg-blue-700 hover:text-white"
      style="border: 3px solid"
      @click="charge">
      前往結帳
    </button>
  </div>
</template>

<script>
export default {
  name: 'ChargeSelect',
  layout: 'front',
  data() {
    return {
      points: '',
      selected: {
        pointId: '',
        payment: 'credit',
      },
    };
  },
  async asyncData({ $axios, error }) {
    try {
      const { data } = await $axios.get('/api/points');
      return {
        points: data.points,
      };
    } catch ({ response }) {
      error({ statusCode: response.status, message: response.data.message });
    }
  },
  methods: {
    charge() {
      const valid = this.points.some((item) => item.pointId === this.selected.pointId);
      if (!valid) {
        this.$swal.fire({
          icon: 'error',
          title: '請正確選擇點數',
        });
        return;
      }
      this.$router.push(`/account/charge/${this.selected.pointId}?name=${valid.name}&price=${valid.price}`);
    },
  },
};
</script>

<style>

</style>
