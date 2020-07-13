<template>
  <div class="bg-blue-600 flex py-16 justify-center relative">
    <div class="absolute text-white text-sm" style="top: 20px; left: 9%;">
      <nuxt-link to="/" class="link mr-1">
        首頁
      </nuxt-link>
      >
      <nuxt-link :to="$route.path" class="link mx-1">
        信箱
      </nuxt-link>
    </div>

    <div class="rounded-lg bg-white md:w-5/6 w-11/12 px-2 md:px-4 py-4">
      <h2
        class="text-2xl text-center mb-6 text-gray-800 font-medium tracking-wider
        font-huninn">
        信箱
      </h2>
      <ul
        class="border-b border-gray-600 flex justify-between px-2 pb-1
        text-center font-huninn">
        <li class="w-1/12 hidden md:block">
          選取
        </li>
        <li class="w-1/12 hidden md:block">
          標記
        </li>
        <li class="w-1/4 md:w-1/6">
          照片
        </li>
        <li class="w-1/4 md:w-1/6">
          名稱
        </li>
        <li class="w-1/4 md:w-1/5">
          時間
        </li>
        <li class="w-1/4 md:w-1/3">
          主旨
        </li>
      </ul>
      <ul
        class="flex justify-between items-center py-2 my-2 text-center px-2 cursor-pointer
        hover:bg-gray-100 hover:shadow-md"
        v-for="(item, index) in mailList"
        :key="index"
        @click="$router.push(`/mail/${item.anotherUserId}`)">
        <li
          class="w-1/12 hidden md:block"
          @click.stop>
          <input type="checkbox" name="selectMail" id="selectMail" class="hidden">
          <label
            for="selectMail"
            class="checkbox h-5 w-5 rounded-sm border
            border-gray-600 block shadow-sm text-center mx-auto
            hover:border-gray-700 hover:bg-blue-1"
            @click="errorNotify" />
        </li>
        <li class="w-1/12 hidden md:block">
          <button
            @click.stop="errorNotify"
            class="w-5 h-5 icon_star_normal opacity-50 focus:outline-none"
            style="transform: translateY(3px);" />
        </li>
        <li class="w-1/4 md:w-1/6">
          <img
            :src="item.anotherUserImg ||
              'https://fakeimg.pl/192x192/282828/EAE0D0/?text=Icon'"
            @error="defautImage($event, 'https://fakeimg.pl/192x192/282828/EAE0D0/?text=Default')"
            class="bg-indigo-200 w-20 h-20 rounded mx-auto">
        </li>
        <li class="w-1/4 md:w-1/6">
          {{ item.anotherUserName }}
        </li>
        <li class="w-1/4 md:w-1/5 tracking-wider text-sm">
          {{ item.createTime | timeConverter }}
        </li>
        <li class="w-1/4 md:w-1/3 text-center">
          {{ item.content | contentFilter }}
        </li>
      </ul>

      <!-- <div class="flex justify-center mt-16">
        <button class="border border-gray-800 ml-4 hover:bg-gray-800 hover:text-white">
          刪除
        </button>
        <ul
          class="border border-gray-500 rounded-lg py-2 px-4 mx-auto flex
          text-center text-sm">
          <li class="px-3">
            <a href="#">最前</a>
          </li>
          <li class="px-3">
            <a href="#">上一頁</a>
          </li>
          <li class="px-3">
            <a href="#">1</a>
          </li>
          <li class="px-3">
            <a href="#">2</a>
          </li>
          <li class="px-3">
            <a href="#">3</a>
          </li>
          <li class="px-3">
            <a href="#">4</a>
          </li>
          <li class="px-3">
            <a href="#">5</a>
          </li>
          <li class="px-3">
            <a href="#">下一頁</a>
          </li>
          <li class="px-3">
            <a href="#">最後</a>
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'MailList',
  header() {
    return {
      title: '我的訊息 | 時販機',
    };
  },
  layout: 'front',
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.get('/api/mails?isNew=true');
      return {
        mails: data.mails,
      };
    } catch ({ response }) {
      // console.log(response.data.message);
    }
  },
  data() {
    return {
      mails: {},
    };
  },
  methods: {
    errorNotify() {
      this.$swal.fire({
        icon: 'error',
        title: '此功能尚未開發哦',
      });
    },
    defautImage(e, imgUrl) {
      e.target.src = imgUrl;
    },
  },
  filters: {
    timeConverter(val) {
      const splitArr = new Date(val).toLocaleString('zh-TW', { hour12: false }).split(' ');
      const date = splitArr[0];
      const time = splitArr[1].substring(0, 5);
      return `${date} ${time}`;
    },
    contentFilter(str) {
      return str.replace(/<br \/>/g, '  ').substring(0, 20);
    },
  },
  computed: {
    mailList() {
      const myUserId = this.$store.state.userInfo.userId;
      const newArr = this.mails.map((item, index) => ({
        anotherUserId: item[myUserId === item.toUserId ? 'fromUserId' : 'toUserId'],
        createTime: item.createTime,
        index,
      }));
      const set = new Set();
      return newArr.filter((item) => (set.has(item.anotherUserId) ? false
        : set.add(item.anotherUserId)))
        .map((item) => this.mails[item.index])
        .map((item) => ({
          ...item,
          anotherUserId: item.toUserId === myUserId ? item.fromUserId : item.toUserId,
          anotherUserName: item.toUserId === myUserId ? item.fromUserName : item.toUserName,
          anotherUserImg: item.toUserId === myUserId ? item.fromUserImg : item.toUserImg,
        }));
    },
  },
};
</script>

<style lang="scss" scoped>
.icon_star_normal{
  background: url(~assets/icon_star_black.svg) center center / contain no-repeat;
  &:hover{
    background: url(~assets/icon_star_yellow.svg) center center / contain no-repeat;
    opacity: 1;
  }
}
.icon_star_fill{
  background: url(~assets/icon_star_yellow.svg) center center / contain no-repeat;
}
.link:hover{
  border-bottom: 1px solid white;
}
</style>
