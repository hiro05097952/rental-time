<template>
  <div class="lg:px-8 py-8 text-gray-800">
    <div
      class="bg-white shadow-md rounded px-2 lg:px-8 pt-6 pb-8 mb-4 flex flex-col
      w-11/12 lg:w-5/6 mx-auto border mt-5">
      <div class="flex flex-col items-center justify-around mb-10 mx-auto w-full md:w-2/3">
        <img
          :src="product.coverImg"
          class="border-2 object-center object-cover border-gray-300 w-full h-48
          shadow-lg rounded"
          v-if="product.coverImg">
        <div
          class="border-2 border-gray-300 w-full h-48
          shadow-lg text-center text-2xl font-bold py-20 text-gray-500
          tracking-wider"
          v-else>
          請上傳圖片
        </div>
        <label
          class="bg-blue-500 hover:bg-blue-700 text-white
          font-semibold px-12 h-10 rounded-sm mt-6 tracking-wider
          text-lg inline-block py-2"
          for="coverImg">
          更換
          <button id="coverImg" class="hidden" @click="editImg = true" />
        </label>
      </div>

      <div class="md:flex mb-6">
        <div class="w-full px-3">
          <label
            class="block tracking-wide font-bold mb-2"
            for="title">
            標題
          </label>
          <ValidationProvider rules="required|max:50" name="標題" v-slot="{errors, classes}">
            <div :class="classes">
              <input
                class="appearance-none block w-full
                border border-grey-lighter rounded py-3 px-4"
                id="title"
                type="text"
                placeholder="請輸入標題"
                v-model="product.title">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
      </div>

      <div class="w-full px-3 mb-6">
        <label
          class="block tracking-wide font-bold mb-2"
          for="category">
          分類
        </label>
        <ValidationProvider rules="required" name="分類" v-slot="{errors, classes}">
          <div class="relative" :class="classes">
            <select
              class="block appearance-none w-full border bg-white
              border-grey-lighter py-3 px-4 pr-8 rounded"
              id="category"
              v-model="product.category"
              :class="{'text-gray-500' : !product.category}">
              <option value="undefined" disabled>
                請選擇
              </option>
              <option value="entrepreneurship">
                創業 / 副業
              </option>
              <option value="marking">
                行銷
              </option>
              <option value="chat">
                聊天
              </option>
              <option value="music">
                音樂 / 樂器
              </option>
              <option value="businessCommunication">
                職場溝通 / 諮詢
              </option>
              <option value="cook">
                料理
              </option>
              <option value="picture">
                攝影
              </option>
              <option value="lifePlan">
                人生規劃
              </option>
              <option value="divination">
                占卜
              </option>
              <option value="love">
                戀愛諮詢
              </option>
              <option value="diet">
                飲食調理 / 減肥
              </option>
              <option value="makeup">
                化妝 / 保養
              </option>
              <option value="family">
                家庭 / 教育
              </option>
              <option value="sports">
                健身 / 運動
              </option>
              <option value="animation">
                動畫製作
              </option>
              <option value="other">
                其他
              </option>
            </select>
            <div
              class="pointer-events-none absolute top-0 right-0 flex items-center bottom-0
            px-4">
              <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
            <span>{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
      </div>

      <div class="md:flex mb-6">
        <div class="md:w-full px-3">
          <label
            class="block tracking-wide font-bold mb-2">
            可接受類型
          </label>
          <div class="flex items-center">
            <label class="mx-2" for="meeting">
              <input type="checkbox" v-model="product.type" value="meeting" id="meeting">
              現場面談
            </label>
            <label class="mx-2" for="video">
              <input type="checkbox" v-model="product.type" value="video" id="video">
              視訊
            </label>
            <label class="mx-2" for="phone">
              <input type="checkbox" v-model="product.type" value="phone" id="phone">
              電話
            </label>
            <label class="mx-2" for="chat">
              <input type="checkbox" v-model="product.type" value="chat" id="chat">
              聊天室
            </label>
          </div>
        </div>
      </div>

      <div class="md:flex mb-6">
        <div class="md:w-full px-3">
          <label
            class="block tracking-wide font-bold mb-2"
            for="meetingPlace">
            會面地點
          </label>
          <div class="flex items-center">
            <input
              class="appearance-none inline-block w-full
             border border-grey-lighter rounded py-3 px-4"
              id="meetingPlace"
              type="text"
              placeholder="請輸入會面地點">
          </div>
        </div>
      </div>

      <div class="w-full px-3 mb-6 flex flex-col md:flex-row">
        <div class="w-full md:w-1/2 md:mr-4">
          <label
            class="block tracking-wide font-bold mb-2"
            for="email">
            會面地點
          </label>
          <div class="flex items-center">
            <input
              class="appearance-none inline-block w-full
             border border-grey-lighter rounded py-3 px-4"
              id="email"
              type="email"
              placeholder="Email">
          </div>
        </div>
        <div class="w-full md:w-1/2 mt-6 md:mt-0">
          <label
            class="block tracking-wide font-bold mb-2"
            for="category">
            最低限數
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full border bg-white
            border-grey-lighter py-3 px-4 pr-8 rounded"
              id="category">
              <option value="30">
                30
              </option>
            </select>
            <div
              class="pointer-events-none absolute top-0 right-0 flex items-center bottom-0
            px-4">
              <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>
      </div>

      <div class="md:flex mb-2 mt-10">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label class="block tracking-wide font-bold mb-2">
            販物簡介
          </label>
          <client-only>
            <quill-editor
              v-model="product.description"
              :options="editorOption" />
          </client-only>
        </div>
      </div>

      <div class="mt-6 text-center flex items-center justify-center">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white
          font-semibold w-1/3 md:w-1/6 rounded-sm tracking-wider text-lg h-12
          ml-6"
          @click="confirmation">
          儲存
        </button>
        <nuxt-link
          class="bg-green-500 hover:bg-green-700 text-white
          font-semibold w-1/3 md:w-1/6 rounded-sm tracking-wider text-lg h-12
          ml-6 inline-block py-3"
          to="/account/identify">
          身份驗證
        </nuxt-link>
      </div>
    </div>
    <editImg
      v-if="editImg"
      @pass-evt="editImg = !editImg"
      @pass-change-img="changeImg" />
  </div>
</template>

<script>
import Vue from 'vue';
import editImg from '~/components/editImg.vue';

if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  const { quillEditor } = require('vue-quill-editor');
  Vue.component('quillEditor', quillEditor);
}

export default {
  name: 'EditProduct',
  layout: 'front',
  components: {
    editImg,
  },
  data() {
    return {
      product: {
        title: '',
        category: '',
        description: '',
        coverImg: '',
        type: [],
        meetingPlace: '',
        tag: '',
        NGDate: '',
        atLeast: '',
        price: '',
      },
      editImg: false,
      editorOption: {
        placeholder: '請輸入販物簡介',
        modules: {
          toolbar: [
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
            ['link'],
          ],
        },
      },
    };
  },
  methods: {
    confirmation() {
      this.$swal.fire({
        title: `<h2 class="text-xl">確定要${this.$route.name ? '新增' : '修改'}
        販物嗎?</h2>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        toast: false,
        position: 'center',
        showConfirmButton: true,
        timer: false,
      }).then(({ value }) => {
        // success
        if (value) {
          this.updateProduct();
        }
      });
    },
    async updateProduct(method) {
      try {
        const { data } = await this.$axios[method === 'post' ? 'POST' : 'PUT']('/api/product', this.product);
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
    changeImg(value) {
      this.product.coverImg = value;
    },
  },
};
</script>

<style scoped lang="scss">
.is-invalid.is-invalid{
  span{
    top: 15px;
  }
}
</style>
