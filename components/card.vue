<template>
  <div class="main__container flex flex-col sm:flex-row flex-wrap">
    <div
      class="main__container__item md:w-1/2 lg:w-1/3 py-4 px-4 md:px-6 cursor-pointer"
      v-for="(item, index) in products"
      :key="index"
      @click="$router.push(`/products/${item.productId}`)">
      <div
        class="bg-white relative shadow rounded-lg text-gray-800 hover:shadow-lg pb-5"
        style="border-radius: 15px;">
        <i
          class="icon_identify left-0 mt-3 absolute text-center font-bold
              text-xs text-white
              tracking-wider h-10 w-10 ml-3"
          v-if="item.identified" />
        <p
          class="text-sm text-white bg-blue-3 mx-2 px-3 py-1 absolute
              right-0 mt-4 rounded-lg font-medium tracking-wider shadow">
          {{ item.category | category }}
        </p>
        <img
          :src="item.coverImg ? `data:image/png;base64,${item.coverImg}`: 'http://alpha.backer.id/assets/images/bg/kucingmalas.jpeg'"
          class="h-40 rounded-t-lg w-full object-cover">
        <div class="flex justify-center">
          <img
            :src="item.img && !item.img.includes('http') ?
              `data:image/png;base64,${item.img}`: item.img ? item.img :
                'https://image.flaticon.com/icons/svg/545/545272.svg'"
            class="rounded-full -mt-10 border-4 object-center object-cover
                border-white mr-2 h-20 w-20">
        </div>
        <div
          class="py-2 px-2 text-center">
          <div class="font-bold text-center">
            {{ item.name }}
          </div>
        </div>
        <div class="px-2">
          <h3
            class="text-lg font-bold tracking-wider text-center px-2 item__title">
            {{ item.title }}
          </h3>
          <div class="flex items-center justify-center mt-3 text-gray-700">
            <p class="font-bold text-sm">
              <i
                class="w-4 h-4 inline-block icon_location"
                style="filter: opacity(0.6); transform: translateY(2px);"
                v-if="item.meetingPlace" />
              {{ item.meetingPlace }}
            </p>
            <p class="font-bold text-sm text-center pl-5">
              {{ item.price }}
              <span
                class="text-xs font-medium inline-block"
                style="transform: translateY(-5px);">點數</span>
              / 30 分
            </p>
          </div>
        </div>
        <div class="flex justify-around">
          <button
            class="bg-orange-400 hover:bg-orange-500 text-white mt-4 w-5/6 mx-1 py-1 font-medium
                tracking-wider font-huninn focus:outline-none"
            style="border-radius: 20px;"
            @click.stop="$route.query.myProducts ? $router.push(`/products/${item.productId}`)
              : $router.push(`/mail/${item.userId}`)">
            {{ $route.query.myProducts ? '檢視' : '立即聯繫' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    products: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  date() {
    return {

    };
  },
  methods: {

  },
};
</script>

<style>

</style>
