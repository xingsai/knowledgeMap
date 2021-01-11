import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import util from "@/libs/util";
import NProgress from "nprogress";
import {
  $http,
  author,
  unauth
} from "@/service";
// import abstractRoute from "@/components/abstract_route/abstract_route";
//
const tokenfail = r => require.ensure([], () => r(require('@/views/error/tokenfail')))

//测试页面
const demovideo = (r) =>require.ensure([], () => r(require('@/views/demo/demovideo')))
  //测试页面
const knowledge = (r) =>require.ensure([], () => r(require('@/views/demo/knowledge')))
  //测试页面
const knowledgedemo = (r) =>require.ensure([], () => r(require('@/views/demo/knowledgedemo')))
  //测试页面
const flowchartDemo = (r) =>require.ensure([], () => r(require('@/views/demo/flowchartDemo')))
 
Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: {
        name: 'login',
      },
    },
    {
      path: '/videoInfo',
      name: 'demovideo',
      component: demovideo,
      meta: {
        menuName: '',
      },
    },
    {
      path: '/knowledge',
      name: 'knowledge',
      component: knowledge,
      meta: {
        menuName: '',
      },
    },
    {
      path: '/knowledgedemo',
      name: 'knowledgedemo',
      component: knowledgedemo,
      meta: {
        menuName: '',
      },
    },
    {
      path: '/flowchartDemo',
      name: 'flowchartDemo',
      component: flowchartDemo,
      meta: {
        menuName: '',
      },
    },
    
    
 
  

    {
      path: '/tokenfail',
      name: 'tokenfail',
      component: tokenfail,
      meta: {
        menuName: 'token失效',
      },
    },

    {
      path: '/404',
      name: '404',
      meta: {
        menuName: '404-页面不存在',
      },
      component: () =>
        import( /* webpackChunkName: "n404" */ '@/views/error/404.vue'),
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
})

router.beforeEach((to, from, next) => {
  function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let search = to.fullPath.split('?')[1]
    var r = search ? search.match(reg) : null;
    console.log('r', r)
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }
  //获取url 问号后边的一个参数
function getIframeParentQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let url=getParentUrl()
  console.log(url)
  var r =url&&url.split('?')&&url.split('?')[1]? url.split('?')[1].match(reg):null;
  if (r != null) {
  return unescape(r[2]);
  }
  return null;
  }
   function getParentUrl() { 
    var url = null;
    console.log(window.parent)
    console.log(document.referrer)
    if (parent !== window) { 
        try {
           url = parent.location.href; 
        }catch (e) {         
           url = document.referrer; 
          console.log( 1) 
        } 
     }
     return url//'http://localhost:8080/ceshi/index.html?tokenInfo=1002';
}
  NProgress.start();
  if (to.meta && to.meta.needTokenCheck) { //getIframeParentQueryString('tokenInfo')//(getIframeParentQueryString('tokenInfo')?getIframeParentQueryString('tokenInfo'):
    let token = getQueryString('tokenInfo') ? getQueryString('tokenInfo') : ''
    console.log(token)
    if(token&&token!=null&&token!=''){
      let tokenEncode=encodeURIComponent(token)
      //let tokenEncode=(token)
      //当地址后有token  需要校验token 是否有效
      unauth.post(`/uagent/sso`, {
        token:token
      })
      .then(({
        data
      }) => {
        if (data.success === true) {
          window.sessionStorage.setItem("token", token)
          next();
        } else {
          console.log("接口调用出错");
          next({ name: 'tokenfail' })
        }
      }).catch(() => {
        alert("接口调用出错");
      })

    }else{  
      ////当地址后没有有token  需要判断本地是否存储token
      if( window.sessionStorage.getItem("token")){
        next();
      }else{
        console.log('token丢失');
        next({ name: 'tokenfail' })
      }
    }
  } else {
    next();
  }




});
router.afterEach(route => {
  NProgress.done();
});

export default router