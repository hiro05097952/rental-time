<template>
  <div
    class="relative
    bg-blue-600 flex py-10 pt-16 justify-center box-border"
    style="height: 100vh;">
    <div class="absolute text-white text-sm" style="top: 25px; left: 100px;">
      <nuxt-link to="/" class=" link mr-1">
        首頁
      </nuxt-link>
      >
      <nuxt-link to="/mail" class="link mx-1">
        我的訊息
      </nuxt-link>
      >
      <nuxt-link :to="$route.path" class="mx-1">
        訊息內容
      </nuxt-link>
    </div>
    <div class="rounded-lg bg-white w-5/6 px-4 py-4">
      <chat
        :msg="msg"
        @pass-message="sendMail"
        :user-info="userInfo" />
    </div>
  </div>
</template>

<script>
import chat from '~/components/chat.vue';

export default {
  name: 'MailRoom',
  // layout: 'front',
  components: {
    chat,
  },
  data() {
    return {
      room: null,
      msg: [],
      userInfo: {},
    };
  },
  mounted() {
    this.room = [this.$store.state.userInfo.userId, this.$route.params.user_id].sort().join('');
    this.sockets.subscribe(this.room, (item) => {
      this.msg.push(item);
    });
  },
  async asyncData({ $axios, route }) {
    try {
      const { data } = await $axios.get(`/api/mail/${route.params.user_id}`);
      return {
        msg: data.mail,
        userInfo: data.userInfo,
      };
    } catch ({ response }) {
      console.log(response.data.message);
    }
  },
  methods: {
    sendMail(config) {
      this.$socket.emit('mail', {
        ...config,
        toUserId: this.$route.params.user_id,
      });
    },
  },
  beforeDestroy() {
    this.sockets.unsubscribe(this.room);
  },
};
</script>

<style>
.link:hover{
  border-bottom: 1px solid white;
}
</style>
