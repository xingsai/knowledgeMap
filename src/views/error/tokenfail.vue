<template>
  <div class="big-wrap">
    <div>
      <p class="font404">token失败</p>
      <p>验证token失败，请尝试重新登录!</p>
      <p class="fonttip">对不起，服务器没有正确响应token验证，正在努力修复中</p>
      <el-button type="primary" @click="goback">返回上一页</el-button>
    </div>
    <div class="img-wrap">
      <img src="@/assets/image/tokenfail.png" alt="" class="img-style" />
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    goback(){
      window.history.back()
    }
  }
};
</script>

<style lang="less" scoped>
.big-wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  height:100%;
  width:100%;
  .font404{
    font-size:54px;
    color:#ccc;
    margin-bottom:20px;
    font-weight: 700;
  }
  .fonttip{
    font-size:12px;
    color:#ccc;
    margin-top:10px;
     margin-bottom:20px;
  }
  .img-wrap{
    width: 430px;
    height:290px;
    margin-left:50px;
  
  }
}

</style>
