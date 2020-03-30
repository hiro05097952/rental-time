<template>
  <div
    class="md:px-6 lg:px-16 py-16 text-gray-800 flex relative
    flex-col md:flex-row font-huninn">
    <div class="absolute text-white text-sm font-sans" style="top: 20px; left: 100px;">
      <nuxt-link to="/" class="link mr-1">
        首頁
      </nuxt-link>
      >
      <nuxt-link to="/account/edit" class="link mx-1">
        會員資料
      </nuxt-link>
    </div>

    <div
      class="side imgWrap w-11/12 md:w-1/4 flex md:flex-col
      items-center md:mr-6 xs:flex-row flex-col
      justify-center md:justify-start mx-auto py-8 md:py-0"
      style="border-radius: 20px;">
      <img
        :src="user.img ? user.img :
          'https://fakeimg.pl/192x192/282828/EAE0D0/?text=Icon'"
        class="object-center object-cover h-56 w-56
        shadow-lg border border-gray-500"
        style="border-radius: 18px;">
      <label
        class="bg-white text-blue-3 shadow hover:bg-gray-100
        font-semibold px-8 md:px-12 rounded mt-6 tracking-wider border border-gray-600
        hover:border-gray-700 text-lg inline-block py-1
        xs:ml-8 md:ml-0"
        for="userImg">
        更換
        <button id="userImg" class="hidden" @click="editImg = true" />
      </label>
    </div>

    <ValidationObserver
      class="main bg-white shadow-md px-2 lg:px-8 pt-12 pb-8 mb-4 flex flex-col
      w-full xs:w-11/12 md:w-3/4 mx-auto border containWrap"
      ref="userDataForm">
      <div class="mb-6">
        <div class="w-full px-1 xs:px-3 flex">
          <label
            class="block tracking-wide font-bold
            w-1/5 bg-blue-1 h-12 text-center sm:py-3 py-4 sm:text-base text-sm"
            for="name">
            姓名
          </label>
          <ValidationProvider
            rules="required|max:10"
            name="姓名"
            v-slot="{errors, classes}"
            class="w-4/5">
            <div :class="classes" class="flex items-center">
              <input
                class="appearance-none block w-3/5 md:w-4/5 border border-blue-1
                py-3 px-4 h-12 focus:outline-none"
                id="name"
                type="text"
                placeholder="Name"
                v-model="user.name">
              <span>{{ errors[0] }}</span>
              <button
                class="text-white
              font-medium w-2/5 md:w-1/5 items-center rounded-lg tracking-wider h-10
              ml-3 xs:ml-6 shadow focus:outline-none select-none text-sm xs:text-base"
                :class="user.identified ? 'bg-gray-200 cursor-not-allowed'
                  : 'bg-blue-3 hover:bg-blue-2'"
                @click.prevent="errorNotify">
                身份驗證
              </button>
            </div>
          </ValidationProvider>
        </div>
      </div>

      <div class="mb-6">
        <div class="px-1 xs:px-3 flex">
          <label
            class="block tracking-wide font-bold
            w-1/5 bg-blue-1 h-12 text-center py-4 sm:py-3 sm:text-base text-sm"
            for="email">
            EMAIL
          </label>
          <div class="flex items-center w-4/5">
            <input
              class="appearance-none w-3/5 md:w-4/5 h-12 border-blue-1
              border px-4 cursor-not-allowed bg-gray-200 focus:outline-none"
              id="email"
              type="email"
              inputmode="email"
              autocomplete="email"
              placeholder="Email"
              v-model="user.email"
              disabled>
            <button
              class="text-white
              font-medium w-2/5 md:w-1/5 items-center rounded-lg tracking-wider h-10
              shadow focus:outline-none select-none
              ml-3 xs:ml-6 text-sm xs:text-base"
              :class="user.emailVerified !== 0
                ? 'btnDisabled' : 'btnEnabled'"
              @click="sendEmailVerified">
              {{ user.emailVerified === 2 ? `已送出${countDown}`
                : user.emailVerified ? '已驗證' : '重新驗證' }}
            </button>
          </div>
        </div>
      </div>

      <div class="mb-6" v-if="user.signInType !== 'third'">
        <div class="flex px-1 xs:px-3">
          <label
            class="block tracking-wide font-bold
            w-1/5 bg-blue-1 h-12 text-center sm:py-3 py-4 sm:text-base text-sm"
            for="password">
            密碼
          </label>
          <div class="flex items-center w-4/5">
            <input
              class="appearance-none inline-block w-3/5 md:w-4/5 h-12 focus:outline-none
              border border-blue-1 py-3 px-4 cursor-not-allowed bg-gray-200"
              id="password"
              type="password"
              placeholder="******************"
              disabled>
            <button
              class="bg-blue-3 hover:bg-blue-2 text-white
              font-medium w-2/5 md:w-1/5 rounded-lg tracking-wider h-10
              shadow ml-3 xs:ml-6 shadow focus:outline-none select-none text-sm xs:text-base"
              @click="editPassword = true">
              更改密碼
            </button>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex px-1 xs:px-3">
          <label
            class="block tracking-wide font-bold
            w-1/5 bg-blue-1 h-12 text-center sm:py-3 py-4 sm:text-base text-sm"
            for="address">
            地址
          </label>
          <ValidationProvider
            rules="max:50"
            name="地址"
            v-slot="{errors, classes}"
            class="w-4/5">
            <div :class="classes">
              <input
                class="appearance-none block w-full
                border border-blue-1 py-3 px-4 h-12 focus:outline-none"
                id="address"
                type="text"
                placeholder="請輸入地址"
                v-model="user.address">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex px-1 xs:px-3">
          <label
            class="block tracking-wide font-bold
            w-1/5 bg-blue-1 h-12 text-center sm:py-3 py-4 sm:text-base text-sm"
            for="slogan">
            人生名言
          </label>
          <ValidationProvider
            rules="max:50"
            name="名言"
            v-slot="{errors, classes}"
            class="w-4/5">
            <div :class="classes">
              <input
                class="appearance-none block w-full
                h-12 border border-blue-1 py-3 px-4 focus:outline-none"
                id="slogan"
                type="text"
                placeholder="請輸入能代表你人生的一句名言"
                v-model="user.slogan">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
      </div>

      <div class="mb-2">
        <div class="w-full px-1 xs:px-3 mb-6 md:mb-0 flex">
          <label
            class="tracking-wide font-bold
            w-1/5 bg-blue-1 text-center flex items-center justify-center
            text-sm xs:text-base"
            for="description">
            自我介紹
          </label>
          <textarea
            class="appearance-none block w-4/5
            border border-blue-1 py-3 px-4 h-64 focus:outline-none"
            style="min-height: 16rem;"
            id="description"
            type="text"
            placeholder="請輸入自我介紹"
            v-model="user.description" />
        </div>
      </div>

      <div class="mt-6 text-center flex items-center justify-center">
        <button
          class="bg-teal-500 hover:bg-teal-600 text-white rounded-lg
          font-semibold px-8 rounded-sm tracking-wider text-lg h-10
          xs:ml-6 inline-block">
          取消
        </button>
        <button
          class="bg-blue-3 hover:bg-blue-2 text-white rounded-lg
          font-semibold px-8 rounded-sm tracking-wider text-lg h-10
          ml-3 xs:ml-6"
          @click="confirmation">
          儲存變更
        </button>
      </div>
    </ValidationObserver>
    <changePassword v-if="editPassword" @pass-evt="editPassword = !editPassword" />
    <editImg
      class="font-sans"
      v-if="editImg"
      @pass-evt="editImg = !editImg"
      @pass-change-img="changeImg" />
  </div>
</template>

<script>
import changePassword from '~/components/changePassword.vue';
import editImg from '~/components/editImg.vue';

export default {
  name: 'EditUser',
  header() {
    return {
      title: '編輯個人資訊 | 時販機',
    };
  },
  layout: 'front',
  components: {
    changePassword,
    editImg,
  },
  async asyncData({
    $axios,
  }) {
    try {
      const { data } = await $axios.get('/api/user');
      return { user: data.user };
    } catch ({ response }) {
      // console.log(response.data);
      // redirect('/');
      // error({ statusCode: response.status, message: response.data.message });
    }
  },
  data() {
    return {
      user: '',
      editPassword: false,
      editImg: false,
      countDown: 30,
    };
  },
  methods: {
    async confirmation() {
      try {
        const { value } = await this.$swalConfirm.fire({
          title: '<h2 class="text-xl">確定要更改資料嗎?</h2>',
          icon: 'warning',
        });
        if (!value) {
          return;
        }
        await this.validate();
        this.editUserData();
      } catch ({ message }) {
        this.$swal.fire({
          icon: 'error',
          title: message,
        });
      }
    },
    async editUserData() {
      try {
        const { data } = await this.$axios.put('/api/user', {
          name: this.user.name,
          address: this.user.address || '',
          description: this.user.description || '',
          slogan: this.user.slogan || '',
        });
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
      this.user.img = value;
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.userDataForm.validate().then((success) => {
          if (success) {
            resolve();
          } else {
            reject(new Error('請填寫正確'));
          }
        });
      });
    },
    async sendEmailVerified() {
      try {
        if (this.user.emailVerified) {
          return;
        }
        const { data } = await this.$axios.post('/api/user/emailverify');
        this.$swal.fire({
          icon: 'success',
          title: data.message,
        });

        // countDown
        this.user.emailVerified = 2;
        const intervalId = setInterval(() => {
          this.countDown -= 1;
          if (this.countDown === 0) {
            clearInterval(intervalId);
            this.countDown = 30;
            this.user.emailVerified = 0;
          }
        }, 1000);
      } catch ({ response }) {
        this.$swal.fire({
          icon: 'error',
          title: response.data.message,
        });
      }
    },
    errorNotify() {
      this.$swal.fire({
        icon: 'error',
        title: '此功能尚未開發哦',
      });
    },
  },
};
</script>

<style scoped lang="scss">
.btnDisabled{
  @apply bg-gray-500 cursor-not-allowed;
}
.btnEnabled{
  @apply bg-blue-3;
  &:hover{
    @apply bg-blue-2;
  }
}
.is-invalid.is-invalid{
  span{
    top: 15px;
  }
}
.link:hover{
  border-bottom: 1px solid white;
}
input{
  line-height: 3rem;
}
.containWrap{
  border-radius: 20px;
}
@media (max-width: 374px) {
  .containWrap{
    border-radius: 0;
  }
}
</style>
