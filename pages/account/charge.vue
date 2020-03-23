<template>
  <div class="flex py-16 justify-center text-gray-800 relative">
    <div class="absolute text-white text-sm font-sans" style="top: 20px; left: 8%;">
      <nuxt-link to="/" class="link mr-1">
        首頁
      </nuxt-link>
      >
      <nuxt-link to="/account/edit" class="link mx-1">
        儲值點數
      </nuxt-link>
    </div>

    <div
      class="bg-white md:w-2/3 w-11/12 sm:w-5/6 md:ml-10 px-4 md:px-10 py-2 pb-8 shadow-xl
      border-2 border-gray-500 containWrap">
      <nuxt-child />
    </div>
    <div class="hidden" ref="ecpay" />
  </div>
</template>

<script>
export default {
  name: 'Charge',
  header() {
    return {
      title: '儲值點數 | 時販機',
    };
  },
  layout: 'front',
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.link:hover{
  border-bottom: 1px solid white;
}
.containWrap{
  border-radius: 50px;
}
@media (max-width: 639px) {
  .containWrap{
    border-radius: 20px;
  }
}
</style>
