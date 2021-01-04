<template>
  <ul>
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: "sideMenu",
  data() {
    return {
      overflow: true,
      wrapHeight: 0,
      innerHeight: 0,
      toTop: true,
      toBtm: true,
      downNum: 0
    };
  },
  mounted() {
    this.$on("menu-item-selected", ctx => {
      this.$children.forEach(item => {
        item.isActive == true && (item.isActive = false);
        return;
      });
      ctx.isActive = true;
    });
  }
};
</script>

<style>
.more {
  text-align: center;
}
.more .icon {
  position: relative;
  color: #fff;
  font-size: 18px;
}
.more-btn:hover .icon {
  color: #42c5be;
}
.more-btn:active .icon {
  top: 2px;
  left: 1px;
}
.more-btn:focus {
  box-shadow: 0 0 0 0;
}
.side-menu-wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 100px 0 50px;
  position: absolute;
  top: 0;
  left: 0;
}
.side-menu-wrap .ivu-icon {
  font-size: 24px;
}
.side-menu-item {
  color: #fff;
  box-sizing: border-box;
  width: 100%;
  height: 75px;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
}
.side-menu-item .slot {
  cursor: pointer;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
.side-menu-item:hover {
  background-color: #4cddd4;
}
.side-menu-item.active {
  background-color: #42c5be;
}
.side-menu-item .item-wrap {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
.side-menu-item .item-wrap a {
  color: #fff;
}
</style>
