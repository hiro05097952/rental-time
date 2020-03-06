<template>
  <div class="bg-blue-500 flex py-16 justify-center text-gray-800">
    <div
      class="h-56 w-56 bg-gray-200 hidden md:block shadow-xl
      border-2 border-gray-500"
      style="border-radius: 35px;" />

    <div
      class="bg-white md:w-2/3 lg:w-1/2 w-5/6 md:ml-10 px-10 py-2 pb-8 shadow-xl
      border-2 border-gray-500"
      style="border-radius: 50px;">
      <nuxt-child />
    </div>
    <div class="hidden" ref="ecpay" />
  </div>
</template>

<script>
export default {
  name: 'Charge',
  layout: 'front',
  data() {
    return {
    };
  },
};
</script>

<style>

</style>
