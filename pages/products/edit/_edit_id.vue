<template>
  <div
    class="lg:px-8 pt-12 pb-8 text-gray-800 relative"
    style="background: #61c5ff">
    <div class="linkWrap absolute text-white text-sm font-sans" style="top: 20px;">
      <nuxt-link to="/" class="link mr-1">
        首頁
      </nuxt-link>
      >
      <nuxt-link to="/products/edit" class="link mx-1" v-if="!$route.params.edit_id">
        我要販時
      </nuxt-link>

      <div v-else class="inline-block">
        <nuxt-link to="/products" class="link mx-1">
          尋找販時
        </nuxt-link>
        >
        <nuxt-link :to="`/products/${$route.params.edit_id}`" class="link mx-1">
          {{ product.title }}
        </nuxt-link>
        >
        <nuxt-link :to="$route.path" class="link mx-1">
          編輯
        </nuxt-link>
      </div>
    </div>

    <ValidationObserver
      class="bg-white shadow-md px-2 lg:px-8 pt-12 pb-8 mb-4 flex flex-col
      w-11/12 lg:w-5/6 mx-auto border border-gray-600 mt-5 font-huninn"
      style="border-radius: 20px;"
      ref="productForm">
      <div
        class="flex items-center mb-6 mx-auto w-full md:w-4/5 justify-around
        flex-col md:flex-row">
        <img
          :src="cacheImg"
          class="border object-center object-cover border-gray-300 md:w-3/5 h-56
          shadow rounded-lg w-11/12"
          v-if="cacheImg">
        <div
          class="border border-gray-300 w-11/12 md:w-3/5 h-56
          shadow text-center text-2xl font-bold text-gray-500 rounded-lg
          tracking-wider select-none"
          style="line-height: 14rem;"
          v-else>
          請上傳圖片
        </div>
        <label
          class="bg-blue-3 hover:bg-blue-2 text-white
          font-semibold px-12 h-10 rounded mt-6 tracking-wider
          text-lg inline-block py-2 select-none"
          for="coverImg">
          更換
          <button id="coverImg" class="hidden" @click="editImg = true" />
        </label>
      </div>

      <div class="w-full px-3 mb-12 flex justify-center flex-col md:flex-row">
        <div class="relative inline-block w-40 mr-5 md:mr-10 md:-ml-24 lg:-ml-56">
          <select
            style="border-radius: 25px;"
            class="block appearance-none w-full bg-white border h-10
            border-gray-500 hover:border-gray-600 px-4 pl-12
            shadow leading-tight focus:outline-none focus:shadow-outline font-medium
            cursor-pointer text-gray-600"
            v-model="product.meetingPlace">
            <option :value="null">
              地點
            </option>
            <option value="keelung">
              基隆市
            </option>
            <option value="taipei">
              台北市
            </option>
            <option value="newTaipei">
              新北市
            </option>
            <option value="taoyuan">
              桃園縣
            </option>
            <option value="hsinchuCity">
              新竹市
            </option>
            <option value="hsinchuCountry">
              新竹縣
            </option>
            <option value="miaoli">
              苗栗縣
            </option>
            <option value="taichung">
              台中市
            </option>
            <option value="changhua">
              彰化縣
            </option>
            <option value="nantou">
              南投縣
            </option>
            <option value="yunlin">
              雲林縣
            </option>
            <option value="chiayiCity">
              嘉義市
            </option>
            <option value="chiayiCountry">
              嘉義縣
            </option>
            <option value="tainan">
              台南市
            </option>
            <option value="kaohsiung">
              高雄市
            </option>
            <option value="pingtung">
              屏東縣
            </option>
            <option value="taitung">
              台東縣
            </option>
            <option value="hualien">
              花蓮縣
            </option>
            <option value="yilan">
              宜蘭縣
            </option>
            <option value="penghu">
              澎湖縣
            </option>
            <option value="kinmen">
              金門縣
            </option>
            <option value="lienchiang">
              連江縣
            </option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 flex items-center px-2 text-gray-700"
            style="right: 5px;">
            <svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
          <i
            class="icon_location absolute h-4 w-4 m-auto top-0 bottom-0 pointer-events-none
            opacity-50"
            style="left: 20px;" />
        </div>

        <ValidationProvider rules="required" name="分類" v-slot="{errors, classes}">
          <div class="relative inline-block w-64 mt-4 md:mt-0" :class="classes">
            <select
              style="border-radius: 25px;"
              class="block appearance-none w-full bg-white border h-10
              border-gray-500 hover:border-gray-600 px-4 pl-16
              shadow leading-tight focus:outline-none focus:shadow-outline font-medium
              cursor-pointer text-gray-600"
              id="category"
              v-model="product.category"
              :class="{'text-gray-500' : !product.category}">
              <option :value="null" disabled>
                標籤分類
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
              class="pointer-events-none absolute inset-y-0 flex items-center px-2 text-gray-700"
              style="right: 5px;">
              <svg class="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
            <i
              class="icon_tag absolute h-4 w-4 m-auto top-0 bottom-0 pointer-events-none
              opacity-75"
              style="left: 20px;" />
            <span class="selectInvalid">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
      </div>

      <div class="mb-8">
        <div class="flex pr-10 pl-4 md:items-center flex-col md:flex-row items-start">
          <label
            class="block tracking-wide font-medium md:w-1/5 w-2/3 md:text-center text-lg"
            for="title">
            販時名稱
          </label>
          <ValidationProvider
            rules="required|max:50"
            name="標題"
            v-slot="{errors, classes}"
            class="md:w-4/5 sm:w-2/3 w-full mt-4 md:mt-0">
            <div :class="classes">
              <input
                class="appearance-none block w-full
                border border-blue-1 py-3 px-4 h-12 font-sans"
                id="title"
                type="text"
                placeholder="請輸入販時名稱"
                v-model="product.title">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
      </div>

      <div class="mb-8">
        <div class="flex pr-10 pl-4 md:items-center flex-col md:flex-row items-start">
          <label
            class="block tracking-wide font-medium text-lg md:w-1/5 w-2/3 md:text-center">
            交談方式
          </label>
          <ValidationProvider
            rules="required"
            v-slot="{errors, classes}"
            name="接受類型"
            class="w-full sm:w-2/3 md:w-4/5 mt-4 md:mt-0">
            <ul :class="classes" class="flex flex-wrap select-none typeWrap pl-2">
              <li class="mr-8">
                <input
                  class="hidden"
                  type="checkbox"
                  id="meeting"
                  value="meeting"
                  v-model="product.type">
                <label
                  class="inline-block h-4 w-4 border border-gray-600 rounded-sm"
                  style="transform: translate(-2px, 2px);"
                  for="meeting" />
                <label for="meeting">面談</label>
              </li>
              <li class="mr-8">
                <input
                  class="hidden"
                  type="checkbox"
                  id="video"
                  value="video"
                  v-model="product.type">
                <label
                  class="inline-block h-4 w-4 border border-gray-600 rounded-sm"
                  style="transform: translate(-2px, 2px);"
                  for="video" />
                <label for="video">視訊</label>
              </li>
              <li class="mr-8">
                <input
                  class="hidden"
                  type="checkbox"
                  id="phone"
                  value="phone"
                  v-model="product.type">
                <label
                  class="inline-block h-4 w-4 border border-gray-600 rounded-sm"
                  style="transform: translate(-2px, 2px);"
                  for="phone" />
                <label for="phone">電話</label>
              </li>
              <li>
                <input
                  class="hidden"
                  type="checkbox"
                  id="chat"
                  value="chat"
                  v-model="product.type">
                <label
                  class="inline-block h-4 w-4 border border-gray-600 rounded-sm"
                  style="transform: translate(-2px, 2px);"
                  for="chat" />
                <label for="chat">聊天室</label>
              </li>
              <li>
                <span>{{ errors[0] }}</span>
              </li>
            </ul>
          </ValidationProvider>
        </div>
      </div>

      <div class="mb-6">
        <div
          class="flex pr-10 pl-4 md:items-center items-start flex-col md:flex-row
          relative">
          <label
            class="block tracking-wide font-medium md:text-center md:w-1/5 w-2/3 text-lg"
            for="price">
            販時價格
          </label>
          <ValidationProvider
            rules="required|integer|max_value:10000|min_value:0|"
            name="價格"
            v-slot="{errors, classes}"
            class="w-2/3 md:w-1/5 mt-4 md:mt-0">
            <div class="flex items-center" :class="classes">
              <input
                class="appearance-none inline-block w-full h-12
                border border-blue-1 px-4 font-sans"
                id="price"
                type="number"
                inputmode="numeric"
                placeholder="請輸入價格"
                v-model="product.price">
              <span class="priceInvalid">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <p
            class="text-xl font-medium tracking-wider ml-4 absolute md:static"
            style="top: 53px; right: 10%;">
            / 30
            <span
              class="text-xs inline-block"
              style="transform: translateY(-6px);">分</span>
          </p>
        </div>
        <span
          class="text-xs text-gray-600 mt-2 inline-block priceNotify font-sans">
          ＊購時者購買時間將以30分鐘為一單位，購時者可依需求選購時間單位量
        </span>
      </div>

      <div class="mb-2 mt-4">
        <div
          class="px-3 md:pr-10 px-6 editorWrap">
          <label class="block tracking-wide font-medium mb-3 text-lg">
            販物簡介
          </label>
          <client-only>
            <quill-editor
              v-model="product.productDescription"
              :options="editorOption" />
          </client-only>
        </div>
      </div>

      <div class="mt-12 text-center flex items-center justify-center flex-col md:flex-row">
        <button
          class="bg-teal-500 hover:bg-teal-600 text-white py-2 px-10
          font-medium rounded tracking-wider text-lg focus:outline-none
          md:ml-6 shadow select-none"
          @click="$router.go(-1)">
          回上一頁
        </button>
        <button
          class="bg-blue-3 hover:bg-blue-2 text-white py-2 px-10
          font-medium rounded tracking-wider text-lg focus:outline-none
          md:ml-6 shadow select-none mt-4 md:mt-0"
          @click="confirmation">
          {{ $route.params.edit_id ? '儲存變更' : '新增販時' }}
        </button>
      </div>
    </ValidationObserver>
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
  header() {
    return {
      title: '編輯販時 | 時販機',
    };
  },
  layout: 'front',
  components: {
    editImg,
  },
  data() {
    return {
      product: {},
      editImg: false,
      cacheImg: '',
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
      isEditMode: false,
    };
  },
  async asyncData({
    route, $axios, error,
  }) {
    try {
      if (route.params.edit_id) {
        const { data } = await $axios.get(`/api/product/${route.params.edit_id}`);
        return {
          product: data.product,
          cacheImg: data.product.coverImg,
          isEditMode: true,
        };
      }
      return {
        product: {
          title: '',
          category: null,
          productDescription: '',
          coverImg: '',
          type: [],
          meetingPlace: null,
          price: null,
        },
        cacheImg: '',
        isEditMode: false,
      };
    } catch ({ response }) {
      error({ statusCode: response.status, message: response.data.message });
    }
  },
  methods: {
    async confirmation() {
      try {
        const { value } = await this.$swalConfirm.fire({
          title: `<h2 class="text-xl">確定要${!this.isEditMode ? '新增' : '修改'}
          販物嗎?</h2>`,
          icon: 'warning',
        });
        if (!value) {
          return;
        }
        await this.validate();
        this.updateProduct();
      } catch ({ message }) {
        this.$swal.fire({
          icon: 'error',
          title: message,
        });
      }
    },
    async updateProduct() {
      try {
        const {
          title, category, type, meetingPlace, price, coverImg, productDescription,
        } = this.product;
        const form = new FormData();
        if (coverImg && typeof coverImg === 'object') {
          form.append('coverImg', coverImg);
        }
        form.append('title', title);
        form.append('category', category);
        form.append('description', productDescription);
        form.append('type', type);
        form.append('meetingPlace', meetingPlace);
        form.append('price', price);

        const { data } = await this.$axios[!this.isEditMode ? 'post' : 'put'](`/api/product${this.isEditMode ? `/${this.$route.params.edit_id}` : ''}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        this.$swal.fire({
          icon: 'success',
          title: data.message,
        });
        this.$router.push('/products');
      } catch ({ response }) {
        this.$swal.fire({
          icon: 'error',
          title: response.data.message && response.data.message.message,
        });
      }
    },
    changeImg(value) {
      this.product.coverImg = value;

      const converter = new FileReader();
      converter.onloadend = () => {
        this.cacheImg = converter.result;
      };
      converter.readAsDataURL(value);
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.productForm.validate().then((success) => {
          if (success) {
            resolve();
          } else {
            reject(new Error('請完整填寫表單'));
          }
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.is-invalid.is-invalid{
  span{
    top: 15px;
  }
  li span {
    top: 10px;
  }
  .selectInvalid{
    top: 5px;
  }
  .priceInvalid{
    top: 50px;
  }
}
.icon_location{
  background: url('~assets/icon_product_location.svg') center center / contain no-repeat;
}
.icon_tag{
  background: url('~assets/icon_puton_labelbar.svg') center center / contain no-repeat;
}
.typeWrap{
  input[type="checkbox"]:checked + label {
    @apply bg-blue-2;
  }
  label{
    @apply cursor-pointer;
  }
}
.link:hover{
  border-bottom: 1px solid white;
}
.priceNotify{
  margin-left: 5%;
}
.linkWrap{
  left: 30px;
}
.editorWrap{
  padding-left: 5%;
}
@media (min-width: 767px) {
  .priceNotify{
    margin-left: 20%;
  }
  .editorWrap{
    padding-left: 6.5%;
  }
  .is-invalid.is-invalid{
    li span {
      top: -7px;
    }
    .priceInvalid{
      top: 35px;
    }
  }
  .linkWrap{
    left: 140px
  }
}

</style>
