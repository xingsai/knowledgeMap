/*
 * @Author: w.zeratul 
 * @Date: 2018-08-06 10:51:58 
 * @Last Modified by: w.zeratul
 * @Last Modified time: 2019-01-07 15:25:09
 */
<template>
  <li class="side-menu-item" :class="{active:isActive}" @click.capture="handleSubClick">
    <div class="item-wrap">
      <slot></slot>
    </div>
  </li>
</template>

<script>
export default {
  name: "sideSubmenu",
  props: {
    submenu: {
      type: Array,
      default: [],
      required: true
    },
    name: String,
    menuCode: String
  },
  data() {
    return {
      isActive: false
    };
  },
  computed: {
    sideSubmenuOpened() {
      return this.$store.getters.sideSubmenuOpened;
    }
  },
  mounted() {
    this.isActive = this.routeActive(this.menuCode, this.$route.matched)
      ? true
      : false;
  },
  methods: {
    handleSubClick(evt) {
      this.$emit("click", evt);
      function getParentByName(comp, name) {
        return comp.$parent.$options.name === name
          ? comp.$parent
          : getParentByName(comp.$parent);
      }
      let parent = getParentByName(this, "sideMenu");

      // 如果当前二级菜单打开并且二级菜单的父级按钮未激活
      if (this.$store.state.app.sideSubmenuOpened && !this.isActive) {
        parent.$emit("menu-item-selected", this);
        this.$store.commit("closeSubmenu");
        setTimeout(() => {
          this.$store.commit("openSubmenu", { submenu: this.submenu });
          this.$store.commit("setMenuNameL1", { menuNameL1: this.name });
        }, 200);
        return;
      }
      // 如果当前二级菜单关闭并且二级菜单的父级按钮激活
      if (!this.$store.state.app.sideSubmenuOpened && this.isActive) {
        this.$store.commit("openSubmenu", { submenu: this.submenu });
        this.$store.commit("setMenuNameL1", { menuNameL1: this.name });
        return;
      }
      // 如果当前二级菜单关闭
      if (!this.$store.state.app.sideSubmenuOpened) {
        parent.$emit("menu-item-selected", this);
        this.$store.commit("openSubmenu", { submenu: this.submenu });
        this.$store.commit("setMenuNameL1", { menuNameL1: this.name });
        return;
      }
    },
    routeActive(id, matched) {
      var r = false;
      matched.forEach(item => {
        if (item.name == id) {
          r = true;
          return;
        }
      });
      return r;
    }
  },
  watch: {
    $route(to, from) {
      this.isActive = this.routeActive(this.menuCode, to.matched)
        ? true
        : false;
    },
    sideSubmenuOpened() {
      setTimeout(() => {
        if (!this.sideSubmenuOpened) {
          this.isActive = this.routeActive(this.menuCode, this.$route.matched)
            ? true
            : false;
        }
      }, 220);
    }
  }
};
</script>

<style>
</style>
