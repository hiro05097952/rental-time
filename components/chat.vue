<template>
  <div class="flex flex-col justify-between h-full">
    <div style="height: 78%;" class="overflow-auto" ref="content">
      <ul
        class="px-2 pr-4 flex flex-col tracking-wider"
        v-if="$route.path.includes('chat')">
        <li
          class="px-2 rounded-lg my-2 break-all relative"
          :class="{'self-end myMessage': item.type === 'message'
                     && item.userId === $store.state.userInfo.userId,
                   'bg-gray-300 w-1/2 py-2 my-4' : item.type === 'message',
                   'self-center text-xs': item.type === 'notice'}"
          v-for="(item, index) in msg"
          :key="index">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-html="item.content" />
          <span
            class="absolute"
            style="bottom: -18px; right: 8px; font-size: 10px"
            v-if="item.createTime">{{ item.createTime | dateConverter }}</span>
        </li>
      </ul>
      <!-- <ul class="px-2 pr-4 flex flex-col tracking-wider"
      v-if="$route.path.includes('mail')">
        <li
          class="px-2 rounded-lg my-2 break-all"
          :class="{'self-end': item.type === 'message'
                     && item.userId === $store.state.userInfo.userId,
                   'bg-gray-300 w-1/2 py-2' : item.type === 'message',
                   'self-center text-xs': item.type === 'notice'}"
          v-for="(item, index) in msg"
          :key="index"
          v-html="item.content" />
      </ul> -->
    </div>
    <div class="relative" style="height: 20%;">
      <textarea
        class="h-full border-gray-500 border-2 px-2 py-1
            w-full"
        style="outline: none; resize: none;"
        v-model="text"
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
  },
  data() {
    return {
      text: '',
    };
  },
  methods: {
    sendText(e) {
      if (!this.text.trim() || e.shiftKey) {
        return;
      }
      this.$emit('pass-message', {
        content: this.text,
        userId: this.$store.state.userInfo.userId,
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
      return String(val.split('T')[1]).substring(0, 5);
    },
  },
};
</script>

<style>
.myMessage span {
  left: 8px;
}
</style>
