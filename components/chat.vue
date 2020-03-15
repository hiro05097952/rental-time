<template>
  <div class="flex flex-col justify-between h-full">
    <div
      style="height: 78%;"
      class="overflow-auto flex"
      ref="content">
      <div class="w-1/3 border border-red-500" v-if="$route.path.includes('mail')">
        <img
          :src="userInfo.img && !userInfo.img.includes('http') ?
            `data:image/png;base64,${userInfo.img}`: userInfo.img ? userInfo.img :
              'https://image.flaticon.com/icons/svg/149/149072.svg'"
          class="bg-teal-200">
        <p class="text-center my-1 tracking-wider">
          {{ userInfo.name }}
        </p>
      </div>
      <ul
        class="px-2 pr-4 tracking-wider w-full"
        :class="{'w-2/3 border border-teal-500': $route.path.includes('mail')}">
        <li
          class="relative flex flex-col my-2"
          v-for="(item, index) in msg"
          :key="index">
          <!-- eslint-disable-next-line vue/no-v-html vue/max-attributes-per-line -->
          <p v-html="item.content"
             class="px-2 rounded-lg break-all"
             :class="{
               'bg-gray-300 w-1/2 py-2 mt-2 text-sm':item.fromUserId && item.fromUserId !== 'admin',
               'self-center text-xs': item.fromUserId === 'admin',
               'self-end myMessage text-sm': item.fromUserId === $store.state.userInfo.userId}" />
          <span
            class="self-center"
            style="font-size: 8px"
            v-if="item.createTime">
            {{ item.createTime | dateConverter }}
          </span>
        </li>
      </ul>
    </div>
    <div
      class="relative flex w-full items-center"
      style="height: 20%;">
      <div
        class="w-1/4 flex items-end h-full"
        v-if="$route.path.includes('mail')">
        <button
          class="px-6 py-1 bg-blue-500 rounded
          text-white font-medium hover:bg-blue-600 ml-2 mb-1"
          @click="$router.go(-1)">
          回前頁
        </button>
      </div>
      <textarea
        class="h-full border-gray-500 border-2 px-2 py-1
            text-sm tracking-wider"
        style="outline: none; resize: none;"
        :class="[$route.path.includes('mail')? 'w-3/4' : 'w-full']"
        v-model="text"
        placeholder="請輸入訊息..."
        @keypress.enter="sendText" />
      <button
        class="px-2 bg-blue-500 rounded text-white
            absolute my-auto"
        style="height: 90%; top: 0; bottom: 0; right: 5px;"
        @click="sendText">
        送出
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatComponent',
  props: {
    msg: {
      type: Array,
      default() {
        return [];
      },
    },
    userInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      text: '',
    };
  },
  mounted() {
    this.$refs.content.scrollTop = this.$refs.content.scrollHeight;
  },
  methods: {
    sendText(e) {
      if (!this.text.trim() || e.shiftKey) {
        return;
      }
      this.$emit('pass-message', {
        content: this.text,
        fromUserId: this.$store.state.userInfo.userId,
        createTime: new Date(),
      });
      setTimeout(() => {
        this.text = '';
      }, 100);
    },
  },
  watch: {
    msg() {
      this.$nextTick(() => {
        this.$refs.content.scrollTop = this.$refs.content.scrollHeight;
      });
    },
  },
  filters: {
    dateConverter(val) {
      return new Date(val).toLocaleString('zh-TW', { hour12: false }).split(' ')[1].substr(0, 5);
    },
  },
};
</script>

<style>
.myMessage + span {
  margin-left: 55px;
  margin-right: 0;
}
li span{
  margin-right: 55px;
  margin-top: 2px;
}
</style>
