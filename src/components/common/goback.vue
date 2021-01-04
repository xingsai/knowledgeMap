<template>
  <div class="goback-wrap">
      <div> 
          <i class="el-icon-arrow-left arrow"></i>
      </div>
    <div class="goback-btn" @click="goback">返回</div>
    <div>
      {{title}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  props: {
    title: [String, Number],
    options: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return {};
      },
    },
  },
  watch: {
    options: function (newQuestion, oldQuestion) {},
  },
  computed: {},
  mounted() {
      
  },
  methods: {
      goback(){
          this.$router.go(-1)
      }
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/color.less";
.goback-wrap{
    padding:10px 0;
    display: flex;
    align-items: center;
}
.arrow{
    color:@blue;
    cursor: pointer;
}
.goback-btn{
    color:@blue;
    margin-right: 10px;
    cursor: pointer;
}
</style>