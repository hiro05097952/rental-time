<template>
  <div class="bg-blue-600 flex py-10 pt-16 justify-center box-border" style="height: 90vh;">
    <div class="rounded-lg bg-white w-5/6 px-4 py-4">
      <chat :msg="msg" @pass-message="sendMail" />
    </div>
  </div>
</template>

<script>
import chat from '~/components/chat.vue';

export default {
  name: 'MailRoom',
  layout: 'front',
  components: {
    chat,
  },
  data() {
    return {
      msg: [],
    };
  },
  async asyncData({ $axios, route }) {
    try {
      const { data } = await $axios.get(`/api/mail/${route.params.user_id}`);
      // console.log(data);
      return {
        msg: data.mail,
      };
    } catch ({ response }) {
      console.log(response.data.message);
    }
  },
  methods: {
    sendMail(config) {
      this.$socket.emit('mail', config);
    },
  },
  sockets: {
    mail(item) {
      this.msg.push(item);
    },
  },
};
</script>

<style>

</style>
