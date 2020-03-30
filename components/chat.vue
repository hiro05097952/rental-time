<template>
  <div
    class="flex flex-col justify-between h-full relative"
    :class="{'mailChat' : $route.path.includes('mail')}">
    <div
      style="height: 78%;"
      class="overflow-auto flex mt-24 md:mt-0 mb-2 md:mb-0"
      ref="content">
      <div
        class="w-full md:w-1/4 absolute flex flex-row md:flex-col
        items-center mailImgWrap"
        v-if="$route.path.includes('mail')">
        <img
          :src="userInfo.img ? userInfo.img :
            'https://fakeimg.pl/192x192/282828/EAE0D0/?text=Icon'"
          class="bg-teal-200 w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded mr-4 md:mr-0">
        <p
          class="text-center my-1 tracking-wider text-gray-900">
          {{ userInfo.name }}
        </p>
      </div>
      <ul
        class="px-2 pr-4 tracking-wider w-full"
        :class="{'mailContent': $route.path.includes('mail')}">
        <li
          class="relative flex flex-col my-2"
          v-for="(item, index) in msg"
          :key="index">
          <!-- eslint-disable-next-line -->
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
            {{ time(item.createTime) }}
          </span>
        </li>
      </ul>
    </div>
    <div
      class="relative flex w-full items-center"
      style="height: 20%;">
      <div
        class="w-1/5 items-end h-full hidden md:flex"
        v-if="$route.path.includes('mail')">
        <button
          class="px-6 py-1 bg-blue-500 rounded
          text-white font-medium hover:bg-blue-600 ml-2"
          @click="$router.go(-1)">
          回前頁
        </button>
      </div>
      <textarea
        class="h-full border-gray-500 border-2 px-2 py-1
            text-sm tracking-wider"
        style="outline: none; resize: none;"
        :class="[$route.path.includes('mail')? 'w-full md:w-4/5' : 'w-full']"
        v-model="text"
        placeholder="請輸入訊息..."
        @keypress.enter="sendText" />
      <button
        class="px-2 bg-blue-500 rounded text-white
        absolute my-auto hover:bg-blue-400 select-none focus:outline-none font-huninn"
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
  computed: {
    time() {
      return (val) => {
        const dtArr = new Date(val).toLocaleString('zh-TW', { hour12: false }).split(' ');
        const date = dtArr[0];
        const time = dtArr[1].substr(0, 5);
        if (this.$route.path.includes('mail')) {
          return `${date} ${time}`;
        }
        return time;
      };
    },
  },
};
</script>

<style scoped lang="scss">
.mailChat{
  .myMessage + span {
    margin-left: 105px;
    margin-right: 0;
  }
  li span{
    margin-right: 105px;
    margin-top: 2px;
  }
}
.mailContent.mailContent{
  @apply w-4/5 ml-auto;
}
.mailImgWrap.mailImgWrap{
  top: -5px;
  left: 10px;
}
@media (min-width: 767px) {
  .mailImgWrap.mailImgWrap{
    top: 0;
    left: -4%;
  }
}
@media (max-width: 767px) {
  .mailContent.mailContent{
    @apply w-full;
  }
}
</style>
