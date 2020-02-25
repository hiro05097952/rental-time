<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center"
    style="background: rgba(0, 0, 0, 0.5); z-index: 200"
    @scroll.prevent
    @mousewheel.prevent
    @touchmove.prevent
    @click.self="close">
    <div class="bg-white w-2/3 px-2 py-4 relative rounded-md">
      <button
        class="absolute top-0 right-0 mt-2 mr-6 text-xl font-light text-gray-600
        hover:text-gray-800"
        style="transform: scale(1.2, 1); outline: none;"
        @click="close">
        X
      </button>
      <h2 class="text-2xl font-bold text-center mb-4">
        更換密碼
      </h2>
      <ValidationObserver ref="changePasswordForm">
        <div class="md:flex mb-6">
          <div class="md:w-full px-3">
            <label
              class="block tracking-wide text-grey-darker font-bold mb-2"
              for="currentPassword">
              現在密碼
            </label>
            <ValidationProvider
              v-slot="{ errors, classes }"
              rules="required|min:12|max:16"
              name="現在密碼">
              <div :class="classes">
                <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-darker
                border border-grey-lighter rounded py-3 px-4"
                  id="currentPassword"
                  type="password"
                  placeholder="******************"
                  autocomplete="current-password"
                  v-model="currentPassword">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
        </div>

        <div class="md:flex mb-6">
          <div class="md:w-full px-3">
            <label
              class="block tracking-wide text-grey-darker font-bold mb-2"
              for="newPassword">
              新密碼
            </label>
            <ValidationProvider
              v-slot="{errors, classes}"
              rules="required|min:12|max:16"
              name="新密碼"
              vid="newPassword">
              <div :class="classes">
                <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-darker
                  border border-grey-lighter rounded py-3 px-4"
                  id="newPassword"
                  type="password"
                  autocomplete="new-password"
                  placeholder="******************"
                  v-model="newPassword">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
        </div>
        <div class="md:flex mb-6">
          <div class="md:w-full px-3">
            <label
              class="block tracking-wide text-grey-darker font-bold mb-2"
              for="passwordConfirmation">
              確認新密碼
            </label>
            <ValidationProvider
              v-slot="{errors, classes}"
              rules="required|confirmed:newPassword"
              name="確認密碼">
              <div :class="classes">
                <input
                  class="appearance-none block w-full bg-grey-lighter text-grey-darker
            border border-grey-lighter rounded py-3 px-4"
                  id="passwordConfirmation"
                  type="password"
                  placeholder="******************"
                  v-model="passwordConfirmation">
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </div>
        </div>
        <div class="flex justify-center mt-10">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white
          font-semibold w-2/3 md:w-1/3 rounded-sm tracking-wider text-lg h-10"
            @click="changePassword">
            確認
          </button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChangePassword',
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      passwordConfirmation: '',
    };
  },
  methods: {
    close() {
      this.$emit('pass-evt', false);
    },
    async changePassword() {
      try {
        await this.validate();
        const { data } = await this.$axios.post('/api/user/password', {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
          passwordConfirmation: this.passwordConfirmation,
        });
        this.$swal.fire({
          icon: 'success',
          title: data.message,
        });
        this.close();
      } catch ({ response, message }) {
        const title = response ? response.data.message : message;
        this.$swal.fire({
          icon: 'error',
          title,
        });
      }
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.changePasswordForm.validate().then((success) => {
          if (success) {
            resolve();
          } else {
            reject(new Error('請完成表單'));
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.is-invalid.is-invalid span{
  top: 15px;
}
</style>
