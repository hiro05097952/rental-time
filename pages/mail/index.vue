<template>
  <div class="bg-blue-600 flex py-16 justify-center">
    <div class="rounded-lg bg-white w-5/6 px-4 py-4">
      <h2 class="text-2xl text-center mb-6 text-gray-800 font-medium tracking-wider">
        信箱
      </h2>
      <ul
        class="border-b border-gray-600 flex justify-between px-2 pb-1
        text-center">
        <li class="w-1/12">
          選取
        </li>
        <li class="w-1/12">
          標記
        </li>
        <li class="w-1/6">
          照片
        </li>
        <li class="w-1/6">
          名稱
        </li>
        <li class="w-1/5">
          時間
        </li>
        <li class="w-1/3">
          主旨
        </li>
      </ul>
      <ul
        class="flex justify-between items-center py-2 my-2 text-center px-2 cursor-pointer
        hover:bg-gray-100 hover:shadow-md"
        v-for="(item, index) in mailList"
        :key="index"
        @click="$router.push(`/mail/${item.anotherUserId}`)">
        <li class="w-1/12">
          <input type="checkbox" name="" id="">
        </li>
        <li class="w-1/12">
          星
        </li>
        <li class="w-1/6">
          <img
            :src="item.anotherUserImg && !item.anotherUserImg.includes('http') ?
              `data:image/png;base64,${item.anotherUserImg}` :
              item.anotherUserImg ? item.anotherUserImg :
              'https://image.flaticon.com/icons/svg/149/149072.svg'"
            class="bg-indigo-200 w-20 h-20 rounded mx-auto">
        </li>
        <li class="w-1/6">
          {{ item.anotherUserName }}
        </li>
        <li class="w-1/5 tracking-wider text-sm">
          {{ item.createTime | timeConverter }}
        </li>
        <li class="w-1/3 text-center">
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
  layout: 'front',
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.get('/api/mails?isNew="true"');
      // console.log(data);
      return {
        mails: data.mails,
      };
    } catch ({ response }) {
      console.log(response.data.message);
    }
  },
  data() {
    return {
      mails: {},
    };
  },
  methods: {

  },
  filters: {
    timeConverter(val) {
      const splitArr = new Date(val).toLocaleString('zh-TW', { hour12: false }).split(' ');
      const date = splitArr[0];
      const time = splitArr[1].substring(0, 5);
      return `${date} ${time}`;
    },
    contentFilter(str) {
      return str.replace(/<br \/>/g, '  ').substring(0, 10);
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

<style>

</style>
