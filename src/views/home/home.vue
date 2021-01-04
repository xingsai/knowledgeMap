<template>
  <div id="el" class="firstPage minH100" style="position:relative;">
    <div class="telFunction" style="position:absolute;left:100px;bottom:50px;">
      <h1 style="margin-bottom:40px;font-size:32px;color:#666;">车联网全渠道服务支撑系统</h1>
      <!-- <p>用户名: 111</p>
      <p>上次登录时间: 2018-04-25,16:00:00</p>
      <p>可用内存: 1490MB</p>
      <p>操作系统名称: linux</p>
      <p>操作系统版本: Java HotSpot(TM) 64Bit</p> -->
      <!-- <button type="button" name="button" @click="button">button</button> -->
      <!-- <div @click="sendMessage" style="cursor:pointer;">向iframe发送信息</div> -->
    </div>
    <div class="">
      <!-- <iframe id="iframe" ref="iframe" src="../../../static/iframe.html#asd=1" width="800" height=""></iframe> -->
    </div>
    <!-- <div class="buttons" style="height:80px;border:1px solid #42c5be;margin-top:55px;background-color:#fff;padding:20px;">
      <div class="every">
        <el-button class="button" type="text" icon="el-icon-fa-user"></el-button>
        <p>签入</p>
      </div>
      <div class="every">
        <el-button class="button" type="text" icon="el-icon-fa-check-circle"></el-button>
        <p>就绪</p>
      </div>
      <div class="every">
        <el-button class="button" type="text" icon="el-icon-fa-file-alt"></el-button>
        <p>案头</p>
      </div>
      <div class="every">
        <el-button class="button" type="text" icon="el-icon-fa-hourglass-end"></el-button>
        <p>置忙</p>
      </div>
      <div class="every">
        <el-button class="button" type="text" icon="el-icon-fa-user-times"></el-button>
        <p>培训离席</p>
      </div>
      <div class="every">
        <el-button class="button" type="text" icon="el-icon-fa-coffee"></el-button>
        <p>小休离席</p>
      </div>
      <div class="every">
        <el-button class="button" type="text" icon="el-icon-fa-utensils"></el-button>
        <p>就餐离席</p>
      </div>
      <div class="every">
        <el-button class="button" type="text" icon="el-icon-fa-users"></el-button>
        <p>班务离席</p>
      </div>
      <div class="every every1">
        <el-button class="button" type="text" icon="el-icon-fa-sign-out-alt"></el-button>
        <p>签出</p>
      </div>
    </div> -->
    <!-- <search-a  :shiftData="{data:{queryKey:'NPSS_01'}}"></search-a> -->
  </div>
</template>

<script>
// import searchA from "@/views/SGHR_SYS/search_page/index.vue";
export default {
  name:'home',
  data () {
    return {
      iframeWin:{},
    }
  },
  // components:{
  //   // searchA
  // },
  mounted() {
    // 在外部vue的window上添加postMessage的监听，并且绑定处理函数handleMessage
    // window.addEventListener('message', this.handleMessage)
    // this.iframeWin = this.$refs.iframe.contentWindow
    // this.$store.commit('includeComp',this.$options.name)
  },
  methods: {
    button(){
      // let iframess = window.frames["iframe"];
      // alert(iframess.contentWindow.b)
      // console.log(iframess.contentWindow.dateing())
    },
    sendMessage () {
      // 外部vue向iframe内部传数据
      this.iframeWin.postMessage({
        cmd: 'getFormJson',
        params: {'a':'1',"b":'2'}
      }, '*')
    },
    handleMessage (event) {
    // 根据上面制定的结构来解析iframe内部发回来的数据
    const data = event.data
    console.log(data)
    switch (data.cmd) {
      case 'returnFormJson':
        // 业务逻辑
        break
      case 'returnHeight':
        // 业务逻辑
        break
    }
  }
  },
}
</script>

<style>
.firstPage {
  width: 100%;
  height: 100%;
  /* background: url(../../../static/images/mainPage.png) no-repeat; */
  overflow:hidden;
  background-position: center;
  background-size: cover;
  padding: 20px;
}
.telFunction p{
  margin-top:20px;
  font-size: 14px;
  color: #666;
}
.every{
  font-size:16px;
  color:#42c5be;
  width:11%;
  height:100%;
  float:left;
  text-align:center;
  border-right:1px solid #42c5be;
  /* margin-left: 85px; */
  /* margin-right:85px; */
}
.every .button{
  font-size:24px;
  margin-top:16px;
}
.every p{
  font-size: 14px;
}
.every1{
  border: 0 none;
}
</style>
