<template>
  <div class="lg:px-8 py-8 text-gray-800">
    <div
      class="bg-white shadow-md rounded px-2 lg:px-8 pt-6 pb-8 mb-4 flex flex-col
      w-11/12 lg:w-5/6 mx-auto border mt-5 justify-center text-gray-800">
      <h2 class="text-3xl font-bold tracking-wider text-center">
        上傳身份證
      </h2>
      <label
        class="w-2/3 h-64 border-2 border-gray-400 rounded-md flex items-center
            justify-center block mx-auto mt-12"
        @dragover.prevent
        @drop.prevent="upload">
        <h2
          class="text-3xl font-bold tracking-wider
            text-gray-500">
          拖曳上傳 / <br>點擊選取圖片
          <input type="file" class="hidden" @change="upload">
        </h2>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Identify',
  layout: 'front',
  data() {
    return {
      idCard: '',
    };
  },
  methods: {
    async upload(e) {
      const [file] = e.type === 'drop' ? e.dataTransfer.files : e.target.files;
      if (!file) { return; }
      console.log(file);
      const form = new FormData();
      form.append('image', file);
      // try {
      //   const { data } = await this.$axios.post('', form, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   });
      //   this.$swal.fire({
      //     icon: 'success',
      //     title: data.message,
      //   });
      // } catch ({ response }) {
      //   this.$swal.fire({
      //     icon: 'error',
      //     title: response.data.message,
      //   });
      // }
    },
  },
};
</script>

<style>

</style>
