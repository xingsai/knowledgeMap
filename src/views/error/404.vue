<template>
  <div class="big-wrap">
    <div>
      <p class="font404">404</p>
      <p>您访问的页面不存在！</p>
      <p class="fonttip">对不起，您要访问的页面不存在，请点击返回上一级。</p>
      <el-button type="primary" @click="goback">返回上一页</el-button>
    </div>
    <div class="img-wrap">
      <img src="@/assets/image/nofound.png" alt="" class="img-style" />
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
    width: 486px;
    height:409px;
    margin-left:50px;
  
  }
}

</style>
