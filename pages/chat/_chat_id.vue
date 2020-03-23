<template>
  <div
    class="py-4 h-screen px-6 pb-16 bg">
    <h1
      class="text-xl text-white font-medium tracking-wider text-center mb-4
      font-huninn">
      線上即時聊天室
    </h1>
    <div
      class="rounded-lg bg-white w-full h-full shadow-xl flex
      px-4 py-4 justify-between">
      <div class="w-48 flex flex-col">
        <video
          class="myVideo border-2 border-gray-500 h-48 w-full"
          style="background: rgba(0, 0, 0, 0.1); transform: scaleX(-1);"
          autoplay
          id="myVideo"
          ref="myVideo"
          muted
          playsinline />
        <div class="text-center mt-2">
          <button
            class="mr-4 icon_camera focus:outline-none"
            @click="toggleTrack('video')"
            :class="{'icon_close' : !(videoTracks && videoTracks[0].enabled) }" />
          <button
            class="icon_mic focus:outline-none"
            @click="toggleTrack('audio')"
            :class="{'icon_close' : !(audioTracks && audioTracks[0].enabled) }" />
        </div>
        <div
          class="flex flex-wrap mt-auto w-full mx-auto px-5 justify-between
          text-gray-800">
          <p>
            進行時間
          </p>
          <span class="w-1/3">
            {{ time | timeConverter }}
          </span>
        </div>
        <button
          class="border-2 border-blue-600
          rounded py-1 px-8 font-medium my-3 mx-auto text-blue-700
          tracking-wider hover:bg-blue-600 hover:text-white"
          @click="$router.push('/account/myorder')">
          離開聊天室
        </button>
      </div>
      <div class="w-1/2">
        <video
          class="w-full border-2 border-gray-500 h-full"
          style="background: rgba(0, 0, 0, 0.1);"
          autoplay
          id="remoteVideo"
          ref="remoteVideo"
          playsinline />
      </div>
      <chat :msg="msg" @pass-message="sendText" style="width:30%" />
    </div>
  </div>
</template>

<script>
import chat from '~/components/chat.vue';

export default {
  name: 'Chat',
  middleware: 'chat',
  components: {
    chat,
  },
  data() {
    return {
      localstream: null,
      pc: null,
      videoTracks: null,
      audioTracks: null,
      configuration: {
        iceServers: [{
          urls: 'stun:stun.l.google.com:19302', // Google's public STUN server
        }],
      },
      signalOption: {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      },
      offer: null,
      countId: null,
      time: 0,
      msg: [],
    };
  },
  mounted() {
    this.joinRoom();
    this.initPeerConnection();
    this.countId = window.setInterval(() => {
      this.time += 1;
    }, 1000);
  },
  methods: {
    async initPeerConnection() {
      try {
        await this.createMedia();
        this.getAudioVideo();
        this.createPeerConnection();
        this.addLocalStream();
        this.onIceCandidates();
        // this.onIceconnectionStateChange();
        this.onAddStream();
        this.createSignal(true);
      } catch (err) {
        // console.log(err);
      }
    },
    async createMedia() {
      // 儲存本地流到全域
      this.localstream = await window.navigator
        .mediaDevices.getUserMedia({ audio: true, video: true });

      this.$refs.myVideo.srcObject = this.localstream;
    },
    // 取得裝置名稱
    getAudioVideo() {
      this.videoTracks = this.localstream.getVideoTracks();
      this.audioTracks = this.localstream.getAudioTracks();
      this.toggleTrack('video');
      this.toggleTrack('audio');
      // if (this.videoTracks.length > 0) {
      //   console.log(`影像配置: ${this.videoTracks[0].label}`);
      // }
      // if (this.audioTracks.length > 0) {
      //   console.log(`聲音配置: ${this.audioTracks[0].label}`);
      // }
    },
    createPeerConnection() {
      // 建立 P2P 連接
      this.pc = new RTCPeerConnection(this.configuration);
      // console.log('建立 peer connection');
    },
    addLocalStream() {
      // 增加本地流
      this.pc.addStream(this.localstream);
    },
    onIceCandidates() {
      // 監聽 Ice Server
      // 找尋到 ICE 候選位置後，送去 server 與另一位配對
      this.pc.onicecandidate = ({ candidate }) => {
        if (!candidate) { return; }
        // console.log('onIceCandidate => ', candidate);
        this.$socket.emit('peerconnectSignaling', {
          candidate,
        });
      };
    },
    onIceconnectionStateChange() {
      // 監聽 Ice 連接狀態
      this.pc.oniceconnectionstatechange = (evt) => {
        console.log('ICE 伺服器狀態變更 => ', evt.target.iceConnectionState);
      };
    },
    onAddStream() {
      // 監聽是否有流傳入，如果有的話就顯示影像
      this.pc.onaddstream = (event) => {
        if (!this.$refs.remoteVideo.srcObject && event.stream) {
          this.$refs.remoteVideo.srcObject = event.stream;
          // console.log('接收流並顯示於遠端視訊！', event);
        }
      };
    },
    // send SDP
    // eslint-disable-next-line no-unused-vars
    sendSignalingMessage(desc, offer) {
      // const isOffer = offer ? 'offer' : 'answer';
      // console.log(`寄出 ${isOffer}`);
      this.$socket.emit('peerconnectSignaling', {
        desc,
      });
    },
    async createSignal(isOffer) {
      try {
        if (!this.pc) {
          throw new Error('尚未開啟視訊');
        }
        this.offer = await this.pc[`create${isOffer ? 'Offer' : 'Answer'}`](this.signalOption);

        await this.pc.setLocalDescription(this.offer);
        this.sendSignalingMessage(this.pc.localDescription, !!isOffer);
      } catch (err) {
        // console.log(err);
      }
    },
    toggleTrack(trackName) {
      // console.log(this.videoTracks);
      if (!this[`${trackName}Tracks`]) {
        return;
      }
      this[`${trackName}Tracks`][0].enabled = !this[`${trackName}Tracks`][0].enabled;
      this[`${trackName}Tracks`] = this.localstream[trackName === 'video' ? 'getVideoTracks' : 'getAudioTracks']();
    },
    // chat
    joinRoom() {
      this.$socket.emit('joinRoom', this.$route.params.chat_id);
    },
    sendText(config) {
      this.$socket.emit('message', config);
    },
  },
  sockets: {
    async peerconnectSignaling({ desc, candidate }) {
      const vm = this;
      if (desc && !vm.pc.currentRemoteDescription) {
        // console.log('desc => ', desc);
        await vm.pc.setRemoteDescription(new RTCSessionDescription(desc));
        await vm.createSignal(desc.type === 'answer');
      } else if (candidate) {
        // console.log('candidate =>', candidate);
        vm.pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    },
    message(message) {
      // console.log('房間接收 => ', message);
      this.msg.push(message);
    },
  },
  filters: {
    timeConverter(val) {
      return `${val / 60 < 10 ? `0${Math.floor(val / 60)}` : Math.floor(val / 60)} :
      ${val % 60 < 10 ? `0${val % 60}` : val % 60}`;
    },
  },
  beforeDestroy() {
    window.clearInterval(this.countId);
    this.videoTracks[0].stop();
    this.audioTracks[0].stop();
  },
};
</script>

<style lang="scss" scoped>
.bg{
  background: transparent linear-gradient(180deg,
  #0068BF 0%, #0068BFFB 29%, #0068BFA0 100%, #0068BF00 100%)
  0% 0% no-repeat padding-box;
}
.icon_camera{
  width: 28px;
  height: 28px;
  background: url('~assets/icon_chat_cam_on.svg') center center / contain no-repeat;
}
.icon_mic{
  width: 28px;
  height: 28px;
  background: url('~assets/icon_chat_microphone_on.svg') center center / contain no-repeat;
}
.icon_close{
  position: relative;
  &::before{
    content: '';
    position: absolute;
    top: 13px;
    left: -4px;
    display: inline-block;
    width: 35px;
    height: 2px;
    background: rgba(226, 67, 67, 0.884);
    transform: rotate(45deg);
  }
}
</style>
