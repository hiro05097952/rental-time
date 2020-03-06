<template>
  <div>
    <div class="w-full pt-10 flex flex-col border-b-2 border-gray-500">
      <h2 class="text-2xl font-bold">
        確認購買方案
      </h2>
      <ul class="pt-8 pb-2">
        <li class="flex items-center mb-3">
          <h3 class="text-right w-1/4">
            購買點數
          </h3>
          <p class="text-3xl font-bold tracking-widest w-1/2 text-right">
            {{ $route.query.name }}
            <span class="point_upper text-sm mb-4 ml-2 font-bold">點數</span>
          </p>
        </li>
        <li class="flex items-center mb-3">
          <h3 class="text-right w-1/4">
            金額
          </h3>
          <p
            class="text-3xl font-bold tracking-widest w-1/2 text-right mr-2"
            style="transform: translate(4px, 0);">
            {{ $route.query.price }}
            <span class="point_upper text-sm mb-4 ml-2 font-bold">NTD</span>
          </p>
        </li>
        <li class="flex items-center justify-end mt-10">
          <h3 class="mt-4">
            購買後點數剩餘
          </h3>
          <p class="text-3xl font-bold tracking-widest w-1/2 lg:w-1/3 text-right">
            1100
            <span class="point_upper text-sm mb-4 ml-2 font-bold">點數</span>
          </p>
        </li>
      </ul>
    </div>

    <button
      class="border-blue-700 rounded w-1/3
        py-1 text-blue-700 font-bold tracking-wider block mx-auto
        hover:bg-blue-700 hover:text-white mt-10"
      style="border: 3px solid"
      @click="charge">
      確認送出
    </button>
    <div class="hidden" ref="ecpay" />
  </div>
</template>

<script>
export default {
  name: 'ChargeCheck',
  layout: 'front',
  data() {
    return {
    };
  },
  methods: {
    async charge() {
      try {
        const { data } = await this.$axios.post('/api/charge', {
          pointId: this.$route.params.point_id,
        });
        this.$refs.ecpay.innerHTML = data;
        document.getElementById('_form_aiochk').submit();
      } catch ({ response }) {
        this.$swal.fire({
          icon: 'error',
          title: response.data.message,
        });
      }
    },
  },
};
</script>

<style scoped>
.point_upper{
  position: relative;
  top: -15px;
}
</style>
