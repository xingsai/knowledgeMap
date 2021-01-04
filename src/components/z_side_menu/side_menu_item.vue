/*
 * @Author: w.zeratul 
 * @Date: 2018-08-06 10:51:54 
 * @Last Modified by: w.zeratul
 * @Last Modified time: 2018-12-24 10:38:11
 */
<template>
  <li class="side-menu-item" :class="{active:isActive}" @click="handleSubClick">
    <div class="item-wrap">
      <slot></slot>
    </div>
  </li>
</template>

<script>
export default {
  name: "side-menu-item",
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
  props: {
    to: [String, Object],
    name: String,
    menuCode: String
  },
  mounted() {
    // let parent = this.$parent;
    // parent.$emit("childMounted", this);
    this.menuCode == this.$route.meta.menuCode
      ? (this.isActive = true)
      : (this.isActive = false);
  },
  methods: {
    handleSubClick() {
      this.$router.push(this.to);
      if (this.$route.name == this.to.name) {
        this.$router.go(0);
      }
      let parent = this.$parent;
      parent.$emit("menu-item-selected", this);
      this.$store.commit("closeSubmenu");
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
      this.menuCode == this.$route.meta.menuCode
        ? (this.isActive = true)
        : (this.isActive = false);
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
// #42c5be
</script>

<style>
</style>
