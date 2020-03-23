<template>
  <div
    class="px-4 py-8 flex flex-col md:flex-row bg-blue-1 pt-24 relative text-gray-900
    md:px-8 items-start">
    <div class="main w-full md:w-3/4 flex-shrink">
      <div class="absolute text-gray-700 text-sm" style="top: 20px; left: 33px;">
        <nuxt-link to="/" class="link mr-1">
          首頁
        </nuxt-link>
        >
        <nuxt-link to="/products" class="link mx-1">
          尋找販時者
        </nuxt-link>
        >
        <nuxt-link class="link mx-1" :to="$route.path">
          {{ product.title }}
        </nuxt-link>
      </div>
      <h2
        class="text-xl font-medium tracking-wider -mt-10 mb-3
        text-gray-900 font-huninn">
        販時資訊
      </h2>
      <div class="main__item pr-0 md:pr-4">
        <img
          :src="product.coverImg ? `data:image/png;base64,${product.coverImg}`: 'https://fakeimg.pl/830x320/282828/EAE0D0/?text=Default'"
          class="rounded-md w-full object-cover shadow coverImg">

        <div class="my-6 pb-2 mt-6 mx-2 border-b border-gray-600 ql-snow">
          <div class="flex items-start mb-5 text-gray-900 flex-wrap font-huninn">
            <h1 class="text-2xl font-medium tracking-widest pl-2 mr-auto font-sans">
              {{ product.title }}
            </h1>
            <p class="font-medium pt-1 mr-3 text-lg" v-if="product.meetingPlace">
              <i
                class="w-5 h-5 inline-block icon_location opacity-75"
                style="transform: translateY(2px);" />
              {{ product.meetingPlace | countryFilter }}
            </p>
            <p
              class="text-white bg-blue-700 mx-2 px-4 py-1
              inline-block rounded font-medium tracking-wider cursor-pointer"
              @click="$router.push(`/products?category=${product.category}`)">
              {{ product.category | category }}
            </p>
          </div>

          <div class="typeWrap mb-4 px-2 font-huninn flex items-center">
            <h2 class="font-medium tracking-wider">
              交談形式：
            </h2>
            <p class="ml-2 mr-4 text-gray-800">
              {{ acceptType }}
            </p>
          </div>

          <!-- eslint-disable-next-line -->
          <div v-html="product.productDescription"
               class="px-3 py-2 tracking-wider ql-editor"
               v-if="product.productDescription" />
          <div
            v-else
            class="px-3 py-2 tracking-wider text-lg text-gray-800">
            尚無販物描述
          </div>
          <span class="text-sm tracking-wider block text-right mt-6">
            販時起始日： {{ product.createTime | dateDisplay }}
          </span>
        </div>
        <div class="px-2">
          <h2
            class="text-xl font-medium tracking-wider
            text-gray-900 font-huninn">
            販時者資訊
          </h2>
          <div class="mt-8 px-2 flex flex-col sm:flex-row">
            <img
              :src="product.img && !product.img.includes('http') ?
                `data:image/png;base64,${product.img}`: product.img ? product.img :
                  'https://fakeimg.pl/192x192/282828/EAE0D0/?text=Icon'"
              class="rounded-lg shadow object-center object-cover h-48 w-48">
            <div class="mt-4 sm:mt-0 ml-2 sm:ml-8 w-full tracking-wider">
              <h3 class="text-xl font-medium text-gray-900 tracking-widest">
                {{ product.name }}
              </h3>
              <p
                class="text-lg mt-4 font-medium bg-blue-3 text-white
                inline-block px-2 rounded font-huninn"
                v-if="product.slogan">
                {{ product.slogan }}
              </p>
              <p class="mt-4">
                {{ product.userdescription || '此人尚無自我介紹' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="side px-4 lg:px-8 sm:ml-4 text-gray-800 bg-white rounded-lg pt-8 pb-4
      border border-gray-700 shadow md:flex-shrink-0">
      <h2 class="text-lg font-medium tracking-wider font-huninn">
        時間價格
      </h2>
      <div class="mt-6 mb-10">
        <h3 class="text-2xl font-bold text-center font-huninn">
          {{ product.price }}
          <span class="text-sm inline-block" style="transform: translateY(-10px);">點數</span>
          / 30
          <span class="text-sm inline-block" style="transform: translateY(-10px);">分</span>
        </h3>
        <div
          class="flex border border-gray-600 rounded-lg
          text-center w-1/2 mx-auto items-center h-8
          justify-center mt-6 mb-2 font-huninn hover:border-gray-700 shadow">
          <button
            class="h-full w-12 font-medium text-2xl w-1/3 hover:text-gray-900 focus:outline-none"
            @click="qty = qty <= 1 ? qty : qty - 1">
            <span style="transform: translateY(-2px) scale(1, 1.5);" class="inline-block">－</span>
          </button>
          <div class="text-lg font-medium w-1/2 pl-2">
            {{ qty * 30 }}
            <span class="inline-block text-xs" style="transform: translateY(-6px);">分</span>
          </div>
          <button
            class="h-full w-12 font-medium text-2xl w-1/3 hover:text-gray-900 focus:outline-none"
            @click="qty = qty >= 20 ? qty : qty + 1">
            <span style="transform: translateY(-2px);" class="inline-block">+</span>
          </button>
        </div>
        <span class="text-xs text-gray-600">＊最低時間單位為30分鐘，加長時間以30分鐘為一單位</span>
      </div>

      <h2
        class="text-lg font-medium tracking-wider font-huninn"
        v-if="$store.state.userInfo && $store.state.userInfo.userId !== product.userId">
        選擇時間
      </h2>

      <div
        class="px-0 mt-6 mb-8 lg:px-4"
        v-if="$store.state.userInfo && $store.state.userInfo.userId !== product.userId">
        <client-only>
          <v-date-picker
            mode="single"
            v-model="selectedDate"
            is-inline
            is-expanded
            color="blue"
            :min-date="new Date()"
            :max-date="+new Date() + 1000*60*60*24*30"
            :attributes="attributes" />
        </client-only>
        <div class="relative inline-block w-40 mt-4">
          <select
            style="border-radius: 8px;"
            class="block appearance-none w-full bg-white border
            border-gray-600 hover:border-gray-700 px-4 py-2 pl-12
            shadow leading-tight focus:outline-none focus:shadow-outline
            font-medium tracking-widest"
            v-model="startTime">
            <option :value="null" disabled>
              請選擇
            </option>
            <option :value="450 + item * 30" v-for="(item, index) in 29" :key="index">
              {{ 450 + item * 30 | timeConverter }}
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
        </div>
        <span class="text-xs text-gray-600 ml-2">＊請選擇開始時間</span>
      </div>

      <h2
        class="text-lg font-medium tracking-wider font-huninn"
        v-if="$store.state.userInfo && $store.state.userInfo.userId !== product.userId">
        交談方式
      </h2>

      <div
        class="mb-6 px-2 lg:px-4 mt-4">
        <div
          class="mb-4 order__typeWrap select-none font-medium pl-2"
          v-if="$store.state.userInfo && $store.state.userInfo.userId !== product.userId">
          <div class="flex items-center">
            <div
              class="mr-4"
              v-if="product.type.includes('meeting')">
              <input
                class="hidden"
                type="radio"
                id="meeting"
                value="meeting"
                v-model="startType">
              <label
                class="inline-block h-4 w-4 border border-gray-600 rounded-sm"
                style="transform: translate(-2px, 2px);"
                for="meeting" />
              <label for="meeting">面談</label>
            </div>
            <div
              class="mr-4"
              v-if="product.type.includes('video')">
              <input
                class="hidden"
                type="radio"
                id="video"
                value="video"
                v-model="startType">
              <label
                class="inline-block h-4 w-4 border border-gray-600 rounded-sm"
                style="transform: translate(-2px, 2px);"
                for="video" />
              <label for="video">視訊</label>
            </div>
          </div>

          <div class="flex items-center mt-2">
            <div
              class="mr-4"
              v-if="product.type.includes('phone')">
              <input
                class="hidden"
                type="radio"
                id="phone"
                value="phone"
                v-model="startType">
              <label
                class="inline-block h-4 w-4 border border-gray-600 rounded-sm"
                style="transform: translate(-2px, 2px);"
                for="phone" />
              <label for="phone">電話</label>
            </div>
            <div v-if="product.type.includes('chat')">
              <input
                class="hidden"
                type="radio"
                id="chat"
                value="chat"
                v-model="startType">
              <label
                class="inline-block h-4 w-4 border border-gray-600 rounded-sm"
                style="transform: translate(-2px, 2px);"
                for="chat" />
              <label for="chat">聊天室
              </label>
            </div>
          </div>
        </div>

        <div
          v-if="$store.state.userInfo && $store.state.userInfo.userId !== product.userId">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white rounded-lg mt-3 w-full
          py-2 font-medium text-lg tracking-wider shadow font-huninn focus:outline-none
          select-none"
            @click="connect">
            事先諮詢
          </button>
          <button
            class="bg-orange-400 hover:bg-orange-500 text-white rounded-lg mt-3 w-full
          py-2 font-medium text-lg tracking-wider shadow font-huninn focus:outline-none select-none"
            @click="order">
            申請預約
          </button>
        </div>
        <div
          v-if="$store.state.userInfo.userId
            && $store.state.userInfo.userId === product.userId">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white rounded-lg mt-3 w-full
          py-2 font-medium text-lg tracking-wider shadow font-huninn focus:outline-none select-none"
            @click="$router.push(`/products/edit/${product.productId}`)">
            編輯
          </button>
          <button
            class="bg-red-400 hover:bg-red-500 text-white rounded-lg mt-3 w-full
          py-2 font-medium text-lg tracking-wider shadow font-huninn focus:outline-none select-none"
            @click="remove">
            刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductInfo',
  async asyncData({ $axios, route }) {
    try {
      const { data } = await $axios.get(`/api/product/${route.params.product_id}`);
      return { product: data.product };
    } catch ({ response }) {
      // console.log(response);
      // error({ statusCode: response.status, message: response.data.message });
    }
  },
  layout: 'front',
  data() {
    return {
      product: '',
      attributes: [
        {
          key: 'today',
          dot: 'red',
          dates: new Date(),
        },
      ],
      selectedDate: null,
      startType: null,
      startTime: null,
      qty: 1,
    };
  },
  methods: {
    async order() {
      try {
        const valid = await this.checkLogin();
        if (valid) {
          if (!this.selectedDate || !this.startTime) {
            throw new Error('請填寫日期與開始時間');
          }
          if (this.$store.state.userInfo.point - this.qty * this.product.price < 0) {
            throw new Error('點數不足，請至會員頁面儲值');
          }
          const date = new Date(this.selectedDate);
          const now = new Date();
          if (+date + this.startTime * 60000 < +now) {
            throw new Error('請填寫大於目前時間');
          }
          this.$router.push(`/order/${this.$route.params.product_id}?startTime=${
            +date + Number(this.startTime) * 60000}&qty=${this.qty}&&type=${this.startType}`);
        }
      } catch (err) {
        this.$swal.fire({
          icon: 'error',
          title: err.message,
        });
      }
    },
    async remove() {
      try {
        const { value } = await this.$swalConfirm.fire({
          title: '<h2 class="text-xl">確定要刪除販時嗎?</h2>',
          icon: 'warning',
        });
        if (!value) {
          return;
        }
        const { data } = await this.$axios.delete(`/api/product/${this.product.productId}`);
        this.$swal.fire({
          icon: 'success',
          title: data.message,
        });
        this.$router.push('/products');
      } catch ({ response }) {
        this.$swal.fire({
          icon: 'error',
          title: response.data.message,
        });
      }
    },
    async connect() {
      const valid = await this.checkLogin();
      if (valid) {
        this.$router.push(`/mail/${this.product.userId}`);
      }
    },
    goLoginConfirm(text) {
      return this.$swalConfirm.fire({
        title: '<h2 class="text-xl font-huninn tracking-wider">確定繼續嗎？</h2>',
        html: `<p class="text-base font-huninn">${text}</p>`,
        icon: 'warning',
      });
    },
    async checkLogin() {
      let status = 'valid';
      if (!this.$store.state.userInfo.emailVerified) {
        status = 'invalid';
      }
      if (!this.$store.state.userInfo.userId) {
        status = 'register';
      }
      if (status !== 'valid') {
        const { value } = await this.goLoginConfirm(status === 'register'
          ? '將前往至登入頁面開始註冊流程！' : '將前往至會員頁面繼續驗證流程！');
        if (!value) {
          return false;
        }
        this.$router.push(status === 'register' ? '/login' : '/account/edit');
      } else {
        return true;
      }
    },
  },
  filters: {
    dateDisplay(value) {
      const dt = new Date(value);
      return `${dt.getFullYear()} / ${dt.getMonth() + 1} / ${dt.getDate()}`;
    },
    timeConverter(val) {
      return `${Math.floor(val / 60) < 10 ? `0${Math.floor(val / 60)}`
        : Math.floor(val / 60)}:${val % 60 === 0 ? '00' : val % 60}`;
    },
    countryFilter(str) {
      switch (str) {
        case 'keelung':
          return '基隆市';
        case 'taipei':
          return '台北市';
        case 'newTaipei':
          return '新北市';
        case 'taoyuan':
          return '桃園縣';
        case 'hsinchuCity':
          return '新竹市';
        case 'hsinchuCountry':
          return '新竹縣';
        case 'miaoli':
          return '苗栗縣';
        case 'taichung':
          return '台中市';
        case 'changhua':
          return '彰化縣';
        case 'nantou':
          return '南投縣';
        case 'yunlin':
          return '雲林縣';
        case 'chiayiCity':
          return '嘉義市';
        case 'chiayiCountry':
          return '嘉義縣';
        case 'tainan':
          return '台南市';
        case 'kaohsiung':
          return '高雄市';
        case 'pingtung':
          return '屏東縣';
        case 'taitung':
          return '台東縣';
        case 'hualien':
          return '花蓮縣';
        case 'yilan':
          return '宜蘭縣';
        case 'penghu':
          return '澎湖縣';
        case 'kinmen':
          return '金門縣';
        case 'lienchiang':
          return '連江縣';
        default:
          break;
      }
    },
  },
  computed: {
    acceptType() {
      return this.product.type.join(' / ').replace('meeting', '面談').replace('video', '視訊').replace('phone', '電話')
        .replace('chat', '聊天室');
    },
  },
};
</script>

<style lang="scss" scoped>
.order__typeWrap{
  input[type="radio"]:checked + label {
    @apply bg-blue-2;
  }
  label{
    @apply cursor-pointer;
  }
}
.icon_location{
  background: url('~assets/icon_product_location.svg') center center / contain no-repeat;
}
.link:hover{
  border-bottom: 1px solid gray;
}
.side{
  max-width: 33%;
  min-width: 20rem;
}
.coverImg{
  height: 20rem;
}
@media (max-width: 767px) {
  .side{
    min-width: 0;
    width: 90%;
    max-width: 90%;
    margin: 4rem auto 2rem;
  }
}
@media (max-width: 639px) {
  .side{
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }
  .coverImg{
    height: 14rem;
  }
}
</style>
