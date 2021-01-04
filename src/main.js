import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ES6Promise from "es6-promise"
if(!window.Promise) {
  console.log(ES6Promise)
  ES6Promise.polyfill();
}

Vue.config.productionTip = false

/* vendor packages */
// vuescroll
import vuescroll from "vuescroll";
import VueDND from 'awe-dnd';
import "vuescroll/dist/vuescroll.css";
Vue.use(vuescroll);
Vue.use(VueDND);

// vue-treeselect
import treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import comlist from "@/components/common/commonList.vue";
Vue.component("treeselect", treeselect);
Vue.component("comlist", comlist);

// NProgress
import NProgress from "nprogress";
import "nprogress/nprogress.css";
Vue.prototype.$progress = NProgress;
import * as d3 from 'd3'
Vue.prototype.$d3 = d3
// import FlowChart from 'flowchart-vue';
// Vue.use(FlowChart);

// elementui component
import ElementUI from "element-ui";
//import "./assets/css/heyui.css";
//import heyui from 'heyui';
//import "./assets/css/element-variables.scss";
import "./assets/css/font.less";
//Vue.use(heyui);
Vue.use(ElementUI, { size: "small" });
//Vue.use(ElementUI);

// custom css
import "./assets/css/reset.css";
//import "./assets/css/them.css";
import "./assets/css/common.css";

// personal global components
// import zPagination from "@/components/z_pagination/z_pagination";
// import zAuthbtn from "@/components/z_authbtn/index";
// import dialogCover from "@/components/dialog/dialog-cover";
// Vue.component("zPagination", zPagination);
// Vue.component("zAuthbtn", zAuthbtn);
// Vue.component("dialogCover", dialogCover);

// http service
import { $http, author, unauth } from "@/service";
Vue.prototype.$http = $http
Vue.prototype.$http.author = author;
Vue.prototype.$http.unauth = unauth;

import {lbFormValidate} from "@/components/lbziyongFile/index.js";
Vue.prototype.lbFormValidate = lbFormValidate;

// static config
// import config from "@/config";
// Vue.prototype.$config = config;

// extentions
import util from "@/libs/util";
import { key, encrypt, decrypt } from "@/libs/AESUtil";
Vue.prototype.$util = util;
Vue.prototype.$crypt = {};
Vue.prototype.$crypt.key = key;
Vue.prototype.$crypt.encrypt = encrypt;
Vue.prototype.$crypt.decrypt = decrypt;

// event bus
// window.$bus = new Vue();
//引入视频插件
import VueVideoPlayer from 'vue-video-player'

// require videojs style
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)
import videojs from 'video.js'

// videojs plugin
const Plugin = videojs.getPlugin('plugin')
class ExamplePlugin extends Plugin {
  // something...
}
videojs.registerPlugin('examplePlugin', ExamplePlugin)

// videojs language
// videojs.addLanguage('es', {
//   Pause: 'Pausa',
//   // something...
// })
// filters
Vue.filter("dash", function (v) {
  return v ? v : "-";
});
Vue.filter("timeFormat", function (v) {
  return v ? new Date(v).Format('yyyy-MM-dd') : "";
});


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
