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
      class="bg-white px-6 md:px-12 pt-12 pb-10 relative rounded-md
      flex flex-col items-center relative
      w-11/12 xs:w-auto">
      <button
        class="absolute top-0 right-0 mt-3 mr-4 text-xl font-light text-gray-600
        hover:text-gray-800 icon_close w-6 h-6 hover:opacity-75"
        style="outline: none;"
        @click="close" />
      <client-only>
        <div
          :class="[!isProduct ? 'userImg' : 'coverImg']">
          <vue-croppie
            ref="croppieRef"
            :enable-orientation="true"
            :enable-resize="false"
            :viewport="viewport"
            @result="checkRouter"
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
      viewport: {
        width: 200,
        height: 200,
      },
      isProduct: false,
    };
  },
  mounted() {
    if (this.$route.path.includes('products')) {
      this.viewport.width = 400;
      this.viewport.type = 'square';
      this.isProduct = true;
    }
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
    checkRouter(blob) {
      if (this.isProduct) {
        this.passCoverImg(blob);
        return;
      }
      this.uploadUserImg(blob);
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
    async passCoverImg(blob) {
      this.$emit('pass-change-img', blob);
      this.close();
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

<style scoped>
.icon_close{
  background: url('~assets/icon_cross.svg') center center / contain no-repeat;
}
.userImg{
  height: 16rem;
  width: 16rem;
}
.coverImg{
  height: 16rem;
  width: 28rem;
}
@media (max-width: 767px) {
  .coverImg{
    height: 12rem;
    width: 20rem;
  }
}
@media (max-width: 424px) {
  .coverImg{
    height: 8rem;
    width: 16rem;
  }
}
</style>
