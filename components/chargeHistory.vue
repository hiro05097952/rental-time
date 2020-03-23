<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center"
    style="background: rgba(0, 0, 0, 0.5); z-index: 200"
    @scroll.prevent
    @mousewheel.prevent
    @touchmove.prevent
    @click.self="close">
    <div class="bg-white w-11/12 md:w-2/3 lg:w-1/2 px-4 md:px-8 py-4 relative rounded-md">
      <button
        class="absolute top-0 right-0 mt-3 mr-4 text-xl font-light text-gray-600
        hover:text-gray-800 icon_close w-8 h-8 hover:opacity-75"
        style="outline: none;"
        @click="close" />
      <h2 class="text-xl font-bold text-center mb-4">
        儲值點數紀錄
      </h2>
      <div class="border border-gray-600 rounded-lg px-4 py-4">
        <ul class="border-b border-gray-600 py-1 flex justify-between text-center">
          <li class="w-2/5">
            日期
          </li>
          <li class="w-1/4">
            時間
          </li>
          <li class="w-1/5 xs:w-2/5">
            項目
          </li>
        </ul>
        <div class="mt-2">
          <ul
            class="flex justify-between text-center py-2 items-center font-huninn
            tracking-wide"
            v-for="(item, index) in charges"
            :key="index">
            <li class="w-2/5 tracking-wider">
              {{ item.createTime | date }}
            </li>
            <li class="w-1/5">
              {{ item.createTime | time }}
            </li>
            <li class="w-1/5 xs:w-2/5 md:pl-3">
              {{ item.name }}
              <span
                class="text-xs font-medium inline-block"
                style="transform: translateY(-5px);">
                點數
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChargeHistory',
  data() {
    return {
      charges: [],
    };
  },
  async mounted() {
    try {
      const { data } = await this.$axios.get('/api/charges');
      this.charges = data.charges;
    } catch ({ response }) {
      // console.log(response.data.message);
    }
  },
  methods: {
    close() {
      this.$emit('pass-close', false);
    },
  },
  filters: {
    date(val) {
      return new Date(val).toLocaleString('zh-TW', { hour12: false }).split(' ')[0];
    },
    time(val) {
      return new Date(val).toLocaleString('zh-TW', { hour12: false }).split(' ')[1].substr(0, 5);
    },
  },
};
</script>

<style scoped>
.icon_close{
  background: url('~assets/icon_cross.svg') center center / contain no-repeat;
}
</style>
