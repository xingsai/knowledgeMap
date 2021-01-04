<template>
  <video-player
    class="video-player-box"
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="false"
    customEventName="customstatechangedeventname"
    @play="onPlayerPlay($event)"
    @pause="onPlayerPause($event)"
    @ended="onPlayerEnded($event)"
    @waiting="onPlayerWaiting($event)"
    @playing="onPlayerPlaying($event)"
    @loadeddata="onPlayerLoadeddata($event)"
    @timeupdate="onPlayerTimeupdate($event)"
    @canplay="onPlayerCanplay($event)"
    @canplaythrough="onPlayerCanplaythrough($event)"
    @statechanged="playerStateChanged($event)"
    @ready="playerReadied"
  ></video-player>
</template>

<script>
// Similarly, you can also introduce the plugin resource pack you want to use within the component
// import 'some-videojs-plugin'
export default {
  data() {
    return {
      videos: "",
      playerOptions: {
        // height: 400,
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        // sources: [
        //   {
        //     type: "video/mp4", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
        //     src: require("@/assets/vedio.mp4") // url地址
        //   }
        // ],
        // poster: require("@/assets/poster.png"), // 你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          fullscreenToggle: true, // 全屏按钮显示隐藏设置
          playbackRateMenuButton: false, //播放速率显示隐藏设置
        },
      },
    };
  },
  mounted() {
    console.log("this is current player instance object", this.player);
  },
  props: {
    options: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return {};
      },
    },
  },
  watch: {
    options: function (newQuestion, oldQuestion) {
      this.playerOptions = Object.assign({}, this.playerOptions, newQuestion);
      console.log(this.playerOptions, 1);
      console.log(this.player);
      //        this.$nextTick(()=>{
      //     this.player.controlBar.progressControl.seekBar.off("mousedown");
      //     this.player.controlBar.progressControl.seekBar.off("mouseup");
      //     this.player.controlBar.progressControl.seekBar.off("touchstart");
      //     this.player.controlBar.progressControl.seekBar.off("touchend");
      //     this.player.controlBar.progressControl.seekBar.off("click");
      //      this.player.controlBar.progressControl.seekBar.disable();
      //      console.log(111)
      //    })
    },
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
  mounted() {
    //console.log(this.player.controlBar.progressControl.seekBar.off);
    //this.player.controlBar.progressControl.disable()
    //this.player.disableProgress();
  },
  methods: {
    //暂停所有的其他的视频
    pauseAll(index) {
      this.videos = document.getElementsByTagName("video"); //获取所有video
      for (var j = this.videos.length - 1; j >= 0; j--) {
        if (this.videos[j].id != index) {
          this.videos[j].pause();
          this.videos[j].load();
        }
      }
    },
    // 开始播放
    onPlayerPlay(player) {
      this.pauseAll(player.children()[0].id);
      console.log("player play!", player);
    },
    // 播放暂停
    onPlayerPause(player) {
      console.log("player pause!", player);
    },
    // 正在播放
    onPlayerPlaying(player) {
      console.log("onPlayerPlaying", player);
    },
    //播放结束
    onPlayerEnded(player) {
      console.log("onPlayerEnded", player);
    },

    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log("playerStateChanged", playerCurrentState);
    },
    // or listen state event  加载完成
    onPlayerLoadeddata(playerCurrentState) {
      console.log("onPlayerLoadeddata", playerCurrentState);
    },
    // or listen state event 时间变化
    onPlayerTimeupdate(playerCurrentState) {
      //console.log("onPlayerTimeupdate", playerCurrentState);
    },

    onPlayerCanplay(playerCurrentState) {
      console.log("onPlayerCanplay", playerCurrentState);
    },
    //加载资源，等待播放
    onPlayerWaiting(playerCurrentState) {
      console.log("onPlayerWaiting", playerCurrentState);
    },
    onPlayerCanplaythrough(playerCurrentState) {
      console.log("onPlayerCanplaythrough", playerCurrentState);
    },
    // player is ready
    playerReadied(player) {
      console.log("the player is readied", player);
      // you can use it to do something...
      // player.[methods]
      this.$nextTick(() => {
        //禁用拖动 disableProgress
        this.player.controlBar.progressControl.disable();
        //开启拖动
        //this.player.controlBar.progressControl.enable()
      });
    },
  },
};
</script>
<style lang="less" scoped>
.video-player-box /deep/ .vjs-big-play-button {
  margin-left: -1.5em;
  top: 50%;
  left: 50%;
  margin-top: -1em;
}
</style>