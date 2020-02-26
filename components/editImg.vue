<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center
    text-white"
    style="background: rgba(0, 0, 0, 0.5); z-index: 200"
    @scroll.prevent
    @mousewheel.prevent
    @touchmove.prevent
    @click.self="close">
    <div
      class="bg-white px-12 py-10 relative rounded-md flex flex-col items-center relative">
      <button
        class="absolute top-0 right-0 mt-2 mr-4 text-xl font-light text-gray-600
        hover:text-gray-800"
        style="transform: scale(1.2, 1); outline: none;"
        @click="close">
        X
      </button>
      <client-only>
        <div
          style="height: 16rem; width: 16rem;">
          <vue-croppie
            ref="croppieRef"
            :enable-orientation="true"
            :enable-resize="false"
            :viewport="{ width: 200, height: 200, type: 'circle' }"
            @result="uploadUserImg"
            v-show="getImg" />
          <label
            class="w-full h-full border-2 border-gray-400 rounded-md flex items-center
            justify-center"
            @dragover.prevent
            @drop.prevent="uploadEdit"
            v-show="!getImg">
            <h2
              class="text-3xl font-bold tracking-wider
            text-gray-500">
              拖曳上傳
              <input type="file" class="hidden" @change="uploadEdit">
            </h2>
          </label>
        </div>
      </client-only>
      <div class="flex mt-12 w-full">
        <button
          class="bg-blue-500 py-2 w-1/2 mr-4 rounded-sm font-bold tracking-wider"
          @click="rotate('-90')">
          向左
        </button>
        <button
          class="bg-blue-500 py-2 w-1/2 rounded-sm font-bold tracking-wider"
          @click="rotate('90')">
          向右
        </button>
      </div>
      <button
        class="bg-green-500 mt-4 py-2 px-10 w-full rounded-sm font-bold tracking-wider"
        @click.prevent="cropViaEvent">
        確認上傳
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import Vue from 'vue';

if (typeof window !== 'undefined') {
  const VueCroppie = require('vue-croppie').default;
  Vue.use(VueCroppie);
}

export default {
  name: 'EditImg',
  data() {
    return {
      getImg: false,
    };
  },
  methods: {
    close() {
      this.$emit('pass-evt', false);
    },
    uploadEdit(e) {
      const files = e.type === 'drop' ? e.dataTransfer.files : e.target.files;
      if (!files.length) { return; }

      const converter = new FileReader();
      converter.onloadend = () => {
        this.$refs.croppieRef.bind({
          url: converter.result,
        });
        this.getImg = true;
      };
      converter.readAsDataURL(files[0]);
    },
    async uploadUserImg(blob) {
      try {
        const form = new FormData();
        form.append('image', blob);
        const { data } = await this.$axios.post('/api/upload', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.$emit('pass-change-img', data.img);
        this.close();
        this.$swal.fire({
          icon: 'success',
          title: data.message,
        });
      } catch ({ response }) {
        this.$swal.fire({
          icon: 'error',
          title: response.data.message,
        });
      }
    },
    cropViaEvent() {
      this.$refs.croppieRef.result({
        type: 'blob',
        size: 'original',
      });
    },
    rotate(rotationAngle) {
      this.$refs.croppieRef.rotate(rotationAngle);
    },
  },
};
</script>

<style>
</style>
