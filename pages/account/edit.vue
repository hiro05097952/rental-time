<template>
  <div class="lg:px-8 py-8 text-gray-800">
    <div
      class="bg-white shadow-md rounded px-2 lg:px-8 pt-6 pb-8 mb-4 flex flex-col
      w-11/12 lg:w-5/6 mx-auto border mt-5">
      <div class="flex items-center justify-around mb-10 mx-auto w-full md:w-2/3 lg:w-1/2">
        <img
          :src="user.img ? `data:image/png;base64,${user.img}` : 'http://alpha.backer.id//assets/images/bg/avatar-default3.jpg'"
          class="rounded-full border-2 object-center object-cover border-gray-300 h-40 w-40
          shadow-lg">
        <label
          class="bg-blue-500 hover:bg-blue-700 text-white
          font-semibold px-12 h-10 rounded-sm mt-6 tracking-wider
          text-lg inline-block py-2"
          for="userImg">
          更換
          <button id="userImg" class="hidden" @click="editImg = true" />
        </label>
      </div>

      <div class="md:flex mb-6">
        <div class="w-full px-3">
          <label
            class="block tracking-wide text-grey-darker font-bold mb-2"
            for="name">
            姓名
          </label>
          <ValidationProvider rules="required|max:10" name="姓名" v-slot="{errors, classes}">
            <div :class="classes">
              <input
                class="appearance-none block w-full bg-grey-lighter
            text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="name"
                type="text"
                placeholder="Name"
                v-model="user.name">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
      </div>

      <div class="md:flex mb-6">
        <div class="md:w-full px-3">
          <label
            class="block tracking-wide text-grey-darker font-bold mb-2"
            for="email">
            EMAIL
          </label>
          <div class="flex items-center">
            <input
              class="appearance-none inline-block w-2/3 lg:w-5/6 bg-grey-lighter
              text-grey-darker border border-grey-lighter rounded py-3 px-4 cursor-not-allowed
              bg-gray-200"
              id="email"
              type="email"
              inputmode="email"
              autocomplete="email"
              placeholder="Email"
              v-model="user.email"
              disabled>
            <button
              class="text-white
              font-semibold w-1/3 lg:w-1/6 items-center rounded-sm tracking-wider h-12
              ml-6"
              :class="user.emailVerified ? 'emailValid' : 'emailInValid'"
              :disabled="user.emailVerified">
              {{ user.emailVerified ? '已驗證':'重寄驗證信' }}
            </button>
          </div>
        </div>
      </div>

      <div class="md:flex mb-6">
        <div class="md:w-full px-3">
          <label
            class="block tracking-wide text-grey-darker font-bold mb-2"
            for="password">
            密碼
          </label>
          <div class="flex items-center">
            <input
              class="appearance-none inline-block w-2/3 lg:w-5/6 bg-grey-lighter text-grey-darker
            border border-grey-lighter rounded py-3 px-4 cursor-not-allowed bg-gray-200"
              id="password"
              type="password"
              placeholder="******************"
              disabled>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white
              font-semibold w-1/3 lg:w-1/6 rounded-sm tracking-wider h-12
              ml-6"
              @click="editPassword = true">
              更改密碼
            </button>
          </div>
        </div>
      </div>

      <div class="md:flex mb-6">
        <div class="md:w-full px-3">
          <label
            class="block tracking-wide text-grey-darker font-bold mb-2"
            for="address">
            地址
          </label>
          <ValidationProvider rules="max:50" name="地址" v-slot="{errors, classes}">
            <div :class="classes">
              <input
                class="appearance-none block w-full bg-grey-lighter
            text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="address"
                type="text"
                placeholder="請輸入地址"
                v-model="user.address">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
      </div>

      <div class="md:flex mb-6">
        <div class="md:w-full px-3">
          <label
            class="block tracking-wide text-grey-darker font-bold mb-2"
            for="slogan">
            人生名言
          </label>
          <ValidationProvider rules="max:50" name="名言" v-slot="{errors, classes}">
            <div :class="classes">
              <input
                class="appearance-none block w-full bg-grey-lighter
                text-grey-darker border border-grey-lighter rounded py-3 px-4"
                id="slogan"
                type="text"
                placeholder="請輸入能代表你人生的一句名言"
                v-model="user.slogan">
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
      </div>

      <div class="md:flex mb-2">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label class="block tracking-wide text-grey-darker font-bold mb-2" for="description">
            自我介紹
          </label>
          <client-only>
            <quill-editor
              v-model="user.description"
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
    <changePassword v-if="editPassword" @pass-evt="editPassword = !editPassword" />
    <editImg
      v-if="editImg"
      @pass-evt="editImg = !editImg"
      @pass-change-img="changeImg" />
  </div>
</template>

<script>
import Vue from 'vue';
import changePassword from '~/components/changePassword.vue';
import editImg from '~/components/editImg.vue';

if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  const { quillEditor } = require('vue-quill-editor');
  Vue.component('quillEditor', quillEditor);
}

export default {
  name: 'EditUser',
  layout: 'front',
  components: {
    changePassword,
    editImg,
  },
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.get('/api/user');
      return { user: data.user };
    } catch ({ response }) {
      console.log(response);
    }
  },
  data() {
    return {
      user: '',
      editPassword: false,
      editImg: false,
      editorOption: {
        placeholder: '請輸入自我介紹',
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
        title: '<h2 class="text-xl">確定要更改資料嗎?</h2>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確證',
        cancelButtonText: '取消',
        toast: false,
        position: 'center',
        showConfirmButton: true,
        timer: false,
      }).then(({ value }) => {
        // success
        if (value) {
          this.editUserData();
        }
      });
    },
    async editUserData() {
      try {
        const { data } = await this.$axios.put('/api/user', {
          name: this.user.name,
          address: this.user.address,
          description: this.user.description,
          slogan: this.user.slogan,
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
  },
  computed: {
  },
};
</script>

<style>
.emailValid{
  @apply bg-gray-500 cursor-not-allowed;
}
.emailInValid{
  @apply bg-blue-500;
  &:hover{
    @apply bg-blue-700;
  }
}
</style>
