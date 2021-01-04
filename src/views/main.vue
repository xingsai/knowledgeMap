<template>
  <div class="container" ref="container" style="position:relative;">
    <div class="sidebar" width="100px">
      <div class="logo">
        <img
          src="../assets/image/logo_s.png"
          alt="logo"
          style="width:60px;height:60px;vertical-align:middle;"
        >
      </div>
      <div class="side-menu-wrap">
        <vue-scroll :ops="submenuScrollOps">
          <!-- 一级菜单 -->
          <side-menu class="side-menu">
            <side-menu-item :to="{name:'home'}" :name="'首页'" :menuCode="'home'">
              <i class="item-icon el-icon-fa-home"></i>
              <p>首页</p>
            </side-menu-item>
            <template v-for="menuItem in menuList">
              <side-menu-item
                v-if="!menuItem.children||menuItem.children.length<1"
                :to="{name:menuItem.menuCode}"
                :name="menuItem.menuName"
                :menuCode="menuItem.menuCode"
                :key="menuItem.menuCode"
              >
                <i :class="menuItem.menuCode | getIconClass" class="item-icon"></i>
                <p>{{menuItem.menuName}}</p>
              </side-menu-item>
              <side-submenu
                v-if="menuItem.children.length>0&&menuItem.menuCode!='NPSS_WK'"
                :submenu="menuItem.children"
                :key="menuItem.menuCode"
                :name="menuItem.menuName"
                :menuCode="menuItem.menuCode"
              >
                <i :class="menuItem.menuCode | getIconClass" class="item-icon"></i>
                <p>{{menuItem.menuName}}</p>
              </side-submenu>
              <side-submenu
                v-if="menuItem.children.length>0&&menuItem.menuCode=='NPSS_WK'"
                :submenu="menuItem.children"
                :key="menuItem.menuCode"
                :name="menuItem.menuName"
                :menuCode="menuItem.menuCode"
              >
              <!-- @click="menuCodeTotal(menuItem.menuCode)" -->
                <el-badge :value="wkNum?'···':''" class="menuBadge">
                  <i :class="menuItem.menuCode | getIconClass" class="item-icon"></i>
                  <p>{{menuItem.menuName}}</p>
                </el-badge>
              </side-submenu>
            </template>
          </side-menu>
        </vue-scroll>
      </div>
      <!-- 左侧菜单栏底部消息和登出 -->
      <!-- <div class="user-panel">
        <el-button-group style="width:100%;">
          <el-dropdown
            @command="handleCommand"
            trigger="click"
            style="width:50%;background-color: rgba(255, 255, 255, 0.1);height:50px;"
          >
            <span class="el-dropdown-link">
              <i
                class="el-icon-fa-retweet"
                style="font-size:18px;color:#fff;margin-top:15px;margin-left:15px;"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item,index) in projectList"
                :key="index"
                :command="item.projectId"
              >{{item.projectName}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            @click="logout"
            style="width:50%;float:right;"
            type="text"
            icon="el-icon-fa-power-off"
          ></el-button>
        </el-button-group>
      </div> -->
    </div>
    <div
      :style="{width:(sideSubmenuOpened?'200px':0)}"
      class="submenuBar"
      tabindex="-1"
      @blur.native="sideSubmenuShrink"
    >
      <vue-scroll :ops="submenuScrollOps">
        <!-- <p style="white-space:nowrap;font-size:16px;color:#fff;padding:20px;">{{selectedMenuNameL1}}</p> -->
        <!-- 二级菜单 -->
        <el-menu mode="vertical" style="width:200px;" unique-opened>
          <template v-for="(submenuItem,index) in selectedSubmenu">
            <!-- 有三级菜单的情况 -->
            <el-submenu
              v-if="submenuItem.children.length>0"
              style="width:100%;"
              :key="submenuItem.menuCode"
              :index="submenuItem.menuCode"
              :name="index"
            >
              <template slot="title">{{submenuItem.menuName}}</template>
              <router-link
                v-for="thrmenuItem in submenuItem.children"
                :key="thrmenuItem.menuCode"
                :to="{name:thrmenuItem.menuCode}"
              >
                <el-menu-item
                  :name="thrmenuItem.menuName"
                  style="width:100%;padding-left:34px;"
                  :index="thrmenuItem.menuCode"
                  @click="menuCodeTotal(thrmenuItem.menuCode)"
                >{{thrmenuItem.menuName}}</el-menu-item>
              </router-link>
            </el-submenu>
            <!-- 没有三级菜单并且不是待办任务 -->
            <router-link
              v-if="submenuItem.children.length == 0 && submenuItem.menuCode != 'NPSS_WK_01'"
              :key="submenuItem.menuCode"
              :to="{name:submenuItem.menuCode}"
            >
              <el-menu-item @click="menuCodeTotal(submenuItem.menuCode)" :index="submenuItem.menuCode">{{submenuItem.menuName}}</el-menu-item>
            </router-link>
            <!-- 没有三级菜单并且是待办任务 -->
            <router-link
              v-if="submenuItem.children.length == 0 && submenuItem.menuCode == 'NPSS_WK_01'"
              :key="submenuItem.menuCode"
              :to="{name:submenuItem.menuCode}"
            >
              <el-menu-item :index="submenuItem.menuCode" @click="menuCodeTotal(submenuItem.menuCode)">
                {{submenuItem.menuName}}
                <span class="inlineBadge">{{wkNum}}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-menu>
      </vue-scroll>
      <div class="shrink" @click="shrink">
        <i class="el-icon-fa-angle-double-left"></i>
      </div>
    </div>
    <div
      class="main"
      @click="sideSubmenuShrink"
      :style="{marginLeft:(sideSubmenuOpened?'300px':'100px')}"
    >
      <el-row class="mainHeader">
        <tags-opened :pageTagsList="$store.state.app.tagList"></tags-opened>
        <div class="proSelect">
          <span>
            <!-- 欢迎 -->
            <!-- <span style="color:#666;">{{loginedUserName}}</span> -->
            国网客服中心人资系统!
          </span>
          <!-- <div> -->
            <i class="el-icon-fa-bell" style="position:relative;margin-left:20px;margin-right:16px;color:#42c5be;cursor:pointer">
              <span @click="goMsgRoute" class="i-msg" v-if="msgNumber > 0 ? true : false"></span>
            </i>
            
            <el-dropdown @command="logout">
              <span class="el-dropdown-link">
                {{loginedUserName}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='out'>退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          <!-- </div> -->
          <!-- <span style="margin-right:20px;color:#42c5be;">{{huawu}}</span> -->
        </div>
      </el-row>
      <div style="min-width:1140px;height:calc(100% - 30px);background:#f2f2f2">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
    </div>
    <transition name="bounce">
    <div class="msg-offline" v-if="showMsg" v-show="msgNumber > 0 ? true : false">
      <div class="cursor" @click="goMsgRoute">
        <i class="icon-color el-icon-fa-bell"></i>
        您还有<span class="red-line">{{msgNumber}}</span>条离线消息
        <i class="icon-color el-icon-fa-angle-double-right"></i>
      </div>
      <div @click="closeMsg" class="check-detils"><i class="icon-color el-icon-fa-times"></i></div>
    </div>
    </transition>
  </div>
</template>

<script>
// import { sideMenu, sideMenuItem, sideSubmenu } from "@/components/z_side_menu";
import { author } from "@/service";
import { iconName } from "@/config/config.js";
// import tagsOpened from "@/components/z_opened_page/tags_opened";
import store from "@/store";

// 扁平化menuList
function flatMenuList(menuList) {
  var arr = [];
  function menuListLoop(menuList) {
    menuList.forEach(item => {
      arr.push(item.menuCode);
      item.children.length > 0 && menuListLoop(item.children);
    });
  }
  menuListLoop(menuList);
  return arr;
}

export default {
  // components: {
  //   sideMenu,
  //   sideMenuItem,
  //   sideSubmenu,
  //   tagsOpened,
  // },
  data() {
    return {
      notify:{
        message:'',// 推送消息
        title:"",
      },
      showMsg:false,
      msgNumber:0,
      menuList: [],
      activeProject: this.$store.getters.getProjectId,
      oldProject: "",
      submenuScrollOps: {
        vuescroll: {
          mode: "native"
        },
        scrollPanel: {
          scrollingX: false
        },
        bar: {
          keepShow: false,
          background: "rgba(255,255,255,.3)",
          hoverStyle: { opacity: 1 }
        }
      },
      L1MenuName: "",
      canChangeProject: false,
    };
  },
  computed: {
    projectList() {
      return this.$store.getters.getProjectList;
    },
    selectedSubmenu() {
      return this.$store.getters.getSubmenu;
    },
    selectedMenuNameL1() {
      return this.$store.getters.getMenuNameL1;
    },
    sideSubmenuOpened() {
      return this.$store.getters.sideSubmenuOpened;
    },
    wkNum() {
      return this.$store.getters.getwkNum;
    },
    loginedUserName() {
      return this.$store.getters.getUserName;
    },
    keepAlive() {
      var list = [];
      this.$store.state.app.tagList.forEach(i => {
        list.push(i.name);
      });
      
      return list;
    },
  },
  beforeRouteEnter(to, from, next) {
    const token = store.state.user.token,
      fetchMenuList = () =>
        author.post("/system/loginCtrl/getMenu");
    var menuList;
    if (
      !token
      // || !store.state.user.userInfo      // TODO: uncommon before build
      // || !store.state.user.projectList
    ) {
      next("/login");
    } else {
      fetchMenuList()
        .then(({ data }) => {
          if (data.meta.code === "100") {
            menuList = data.data.list;
            store.commit("setMenuList", { menuList });
            var unAuthRoute = ["home", "homez", "test"];
            if (unAuthRoute.includes(to.name)) {
              // 非权限路由
              next(vm => {
                vm.menuList = menuList;
              });
            } else {
              // 权限路由
              var fml = flatMenuList(menuList);
              if (fml.indexOf(to.name) > -1) {
                next(vm => {
                  vm.menuList = menuList;
                });
              } else if (to.meta.menuCode === undefined) {
                next(vm => {
                  vm.menuList = menuList;
                });
              } else {
                next(false);
                console.error("403 forbidden");
              }
            }
          } else {
            throw new Error(data.meta.message);
          }
        })
        .catch(err => {
          console.error(err);
          next({ name: "login" });
        });
    }
  },
  beforeRouteUpdate(to, from, next) {
    var menuList = this.$store.state.user.menuList;
    var unAuthRoute = ["home", "homez", "test"];
    if (this.$store.state.user.token) {
      if (unAuthRoute.includes(to.name)) {
        // 非权限路由
        next();
      } else {
        // 权限路由
        var fml = flatMenuList(menuList);
        if (fml.indexOf(to.name) > -1) {
          next();
        } else if (to.meta.menuCode === undefined) {
          next();
        } else {
          next(false);
          console.error("403 forbidden");
        }
      }
    } else {
      next("/login");
    }
    this.addTag(to);
    this.sideSubmenuShrink();
  },
  filters: {
    getIconClass(v) {
      return `el-icon-fa-${iconName[v]}`;
    }
  },
  methods: {
    sideMenuClick(n) {
      this.L1MenuName = n;
    },
    shrink() {
      this.$store.commit("closeSubmenu");
    },
    sideSubmenuShrink(e) {
      // this.$store.commit("closeSubmenu");
    },
    handleCommand(command) {
      this.$http.author
        .post("/system/loginCtrl/changeProject", {
          projectId: command
        })
        .then(({ data }) => {
          this.$store.commit("login", {
            token: data.data.accessToken,
            projectList: data.data.projectList
          });
          location.href = location.pathname;
        })
        .catch(err => {
          this.activeProject = this.oldProject;
          this.$message.error("项目切换失败，请联系管理员");
          this.console.error(err);
        });
    },
    addTag(route) {
      var matched = route.matched,
        length = matched.length;
      if (!route.meta.menuName) {
        return;
      }
      this.$store.commit("setTagList", route);
    },
    logout(out) {
      if(out=='out'){
        this.$http.author.post(
          "/system/loginCtrl/loginOut"
        );
        setTimeout(() => {
          console.log(window.$bus_s)
          // window.$bus_s.$emit('logout_listen',1);
          this.$store.commit("logout");
          this.$store.commit("clearClients");
          this.$router.replace({ name: "login" });
        }, 100);
      }
    },
    getAllbutton() {
      this.$http.author
        .post("/system/roleCtrl/getAllButton")
        .then(res => {
          let needData = res.data;
          if (needData.meta.code === "100") {
            this.$store.commit("setBtnStatus", { btnStatus: needData.data });
          } else {
            this.$message.error("获取用户权限失败");
          }
        });
    },
    // 获取离线消息条数
    getMsgNumber(){
      this.$http.author.post('/system/messageCtrl/getOffLineNum')
      .then(res => {
        let needData = res.data;
        if(needData.meta.code === "100"){
          this.msgNumber = needData.data;
          this.showMsg = true;
          setTimeout(()=> {
            this.showMsg = false;
          },3000)
        }
      })
    },
    // 点击离线消息进入未读消息列表
    goMsgRoute(){
      this.$router.push({name:'SGHR_SYS_08'});
      this.msgNumber = 0;
    },
    // 关闭离线消息弹窗
    closeMsg(){
      this.showMsg = false;
    },
    // 计算点击菜单次数
    menuCodeTotal(menuCode){
      this.$http.author.post('/system/loginCtrl/addMenuClickNum',{
        menuCode,
        staffId:this.$store.state.user.userInfo.staffId
      }) 
    },
    // 打开WebScoket连接
    openWebScoket(){
      let staffId = this.$store.state.user.userInfo.staffId;
      let that = this;
      let ws = new WebSocket(`ws://192.168.0.220:18092/message/websocket?userID=${staffId}`);
      ws.onopen = function(event) {
        console.log("WebSocket is open now.");
      };
      ws.onmessage = function(event) {
        let data = JSON.parse(event.data)
        if(data.type && data.type == 'online_message'){
          that.notify.message = data.msgTitle;
          that.notify.title = data.msgContent;
          that.openNotify();
        }
      };
    },
    // 打开消息提醒
    openNotify(){
      this.$notify({
        title: this.notify.title,
        message: this.notify.message,
        customClass:'wxc-notify',
        iconClass:'el-icon-fa-bell',
        position: 'bottom-right',
        duration: 3000  // 弹出消失时间 
      });
    },
  },
  watch: {
    activeProject(nv, ov) {
      this.oldProject = ov;
    },
    onlineNowStauts(val, oldval) {
      if ( !this.isLock) {
        this.$store.state.Status.status.forEach(s => {
          if (s.type == val) this.huawu = s.title;
        });
      }
    }
  },
  created() {
    this.$store.commit("setTagList", this.$router.match({ name: "home" }));
    if (this.$route.name == "homez") {
      this.$router.replace({ name: "home" });
      setTimeout(() => {
        window.location.reload();
      });
    } else {
      // var menuList = this.$store.state.user.menuList,
      //   projectList = this.$store.state.user.projectList;
      // if (projectList.length > 0) {
      //   this.canChangeProject = true;
      // }
      this.addTag(this.$route);
      this.getMsgNumber();
      // this.$http.author
      //   .post("/UTRY/business_np/rest/workListCtrl/getOrderDealTotal")
      //   .then(({ data }) => {
      //     if (data.data.total === "1") {
      //       this.$store.commit("setwkNum", {
      //         wkNum: data.data.totalCount
      //       });
      //     } else {
      //       this.$store.commit("setwkNum", {
      //         wkNum: ""
      //       });
      //     }
      //   });
    }
  //  this.openWebScoket();
  },
  mounted() {
    // this.getAllbutton();
  }
};
</script>

<style>
.container {
  height: 100%;
}
.main {
  height: 100%;
  overflow: auto;
  transition: 0.2s;
}
.logo {
  width: 100%;
  text-align: center;
  padding: 20px 0;
}
.sidebar {
  background-image: linear-gradient(#2c6c6b, #173045);
  position: relative;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100px;
  height: 100%;
}
.sidebar .user-panel {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}

.sidebar .user-panel .el-button {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0;
  height: 50px;
  padding-right: 5px;
}
.sidebar .user-panel .el-button-group .el-button:not(:last-child) {
  margin-right: 0;
  padding-left: 5px;
  padding-right: 0;
}
.sidebar .user-panel .el-button i {
  color: #fff;
  font-size: 18px;
}
.side-menu i {
  color: #fff;
}
.side-menu-item {
  position: relative;
}

i.item-icon {
  margin: 0 0 10px;
  font-size: 22px;
}
.__vuescroll .__view {
  min-height: 99%;
}
.submenuBar {
  background-image: linear-gradient(#42c5be, #1272a7);
  overflow: hidden;
  position: fixed;
  left: 100px;
  top: 0;
  width: 200px;
  height: 100%;
  transition: width 0.2s;
  /* box-shadow: 2px 0 10px #a6a6a6; */
  z-index: 99;
}
.submenuBar .el-menu {
  background-color: transparent;
  border-right: none;
}
.submenuBar .el-menu-item,
.submenuBar .el-submenu__title,
.submenuBar .el-submenu__title i,
.submenuBar .el-menu-item.is-active {
  color: #fff;
}
.submenuBar .el-submenu .el-menu-item {
  padding-left: 20px !important;
}
.submenuBar .el-submenu .el-menu {
  background: rgba(51, 51, 51, 0.15);
  /* padding: 10px 0; */
}
.submenuBar .el-menu-item:focus,
.submenuBar .el-menu-item:hover,
.submenuBar .el-submenu__title:focus,
.submenuBar .el-submenu__title:hover {
  background-color: #43d8d0;
}
.submenuBar .shrink {
  position: absolute;
  bottom: 13px;
  right: 10px;
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  border: 1px solid #fff;
  border-radius: 2px;
  font-size: 18px;
  line-height: 24px;
  cursor: pointer;
  text-align: center;
}
.submenuBar .shrink i {
  color: #fff;
}
.submenuBar .scrollPanel {
  height: 93%;
  overflow: hidden;
}
.submenuBar .scrollWrap {
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
.mainHeader {
  position: relative;
  text-align: left;
  background: #f2f2f2;
  height: 30px;
  min-width: 1140px;
  overflow: hidden;
}
.proSelect {
  /* font-weight: bold; */
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  height: 30px;
  padding: 0 10px 0 0;
  line-height: 30px;
}
.proSelect input.el-input__inner {
  /* font-weight: bold; */
  font-size: 14px;
  border: none;
  background: transparent;
  color: #42c5be;
}
.proSelect .el-select .el-input .el-select__caret {
  color: #42c5be;
}
.projDropDown .el-select-dropdown__item.hover,
.projDropDown .el-select-dropdown__item:hover {
  background-color: #f2f2f2;
}
.side-menu-wrap:hover .__bar-is-vertical {
  opacity: 1 !important;
}
.proSelect .el-select .el-input__inner {
  padding-left: 2px;
}
.el-badge.zbadge {
  display: block;
}
.zbadge .el-badge__content.is-fixed {
  right: 75px;
  top: 15px;
  border-color: #304759;
  z-index: 10;
}
.menuBadge .el-badge__content.is-fixed {
  right: 25px;
  z-index: 10;
  border-color: transparent;
  padding: 0 3px;
}
.inlineBadge {
  float: right;
  top: -2px;
}
.inlineBadge .el-badge__content {
  background-color: transparent;
}
.i-msg{
  position: absolute;
  right: -2px;
  top: -4px;
  display: block;
  width: 8px;
  height: 8px;
  background: #ff7171;
  border-radius: 50%;
}
.msg-offline{
  z-index: 99;
  background: #ffffff;
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 310px;
  box-sizing: border-box;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  box-shadow: 5px -5px 10px #eee;
  display: flex;
  justify-content:space-between;
  color: #42c5be;
}
.icon-color{
  color: #42c5be
}
.check-detils{
  cursor: pointer;
}
.check-detils i{
  margin-left: 5px;
}
.red-line{
  color: #ff7171;
}
/* 动态效果 */
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.cursor{
  cursor: pointer;
}
/* .icon-yuan{
  display: inline-block;
  width: 5px;
  height: 5px;
  background: #fff;
  border-radius: 
} */
</style>
