<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件 -->
    </router-view>

  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #666;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    min-width: 1024px;
}
a {
  color: inherit;
}
 /* 防止错位 */
 body .el-table th.gutter{
    display: table-cell!important;
  }
  /* table tip 宽度设置 */
  .el-tooltip__popper{font-size: 14px; max-width:400px; } 
</style>
