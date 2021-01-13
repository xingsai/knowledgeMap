import axios from 'axios'
import store from '@/store'
import router from '@/router'
import NProgress from 'nprogress'
import Message from 'element-ui/lib/message'
import Notification from 'element-ui/lib/notification'
import { log } from 'util'

var $http = axios
//http://192.168.0.213:8887
const baseURL =
  process.env.NODE_ENV === 'development'
    ? '/apiV1'
    : 'http://192.168.0.213:8887'

axios.defaults.withCredentials = true
const author = axios.create({
  baseURL,
})
author.interceptors.request.use(
  (config) => {
    NProgress.start()
    const token = window.sessionStorage.getItem("token") // store.state.user.token;
    console.log(token)
    if (!token) {
      //router.replace("/login");
      Message.error('未登录！')
      return config;
      //return Promise.reject("unauthorization");
    }
    if (!config.data) {
      config.data = {}
    }
    config.headers['X-Token'] = `${token}`
    // if(router.app._route.meta.menuCode){
    //   config.headers["menuCode"] = router.app._route.meta.menuCode;
    // }
    return config
  },
  (error) => {
    NProgress.done()
    return Promise.reject(error)
  }
)
author.interceptors.response.use(
  (response) => {
    NProgress.done()
    console.log(response)
    if (Number(response.status) > 299 || Number(response.status) < 200) {
      //router.replace({ name: "login" });
      Message.warning('请重新登录！')
    }
    var data = response.data
    if (!data || !String(data.code)) {
      let err = new Error('模块异常或未返回正确的格式！')
      err.code = '404'
      Message.warning('模块异常')
      store.commit('logout')
      // router.replace({ name: "login" });
      // router.replace({ name: "login" });
      throw err
    }
   
    // data.code == '1' ||
    // data.code == '2' ||
    // data.code == '3' ||
    // data.code == '4' ||
    // data.code == '5' ||
    // data.code == '6' ||
    // data.code == '7' ||
    // data.code == '8' ||
    // data.code == '9' ||
    // data.code == '10' ||
    // data.code == '11' ||
    // data.code == '12'
    
    //下载的特殊处理
    if(response.request&&response.request.responseType=='blob'){
      return response
    }
    if (
      data.code == '0'
    ) {
      return response
    } else {
      console.log(data)
      Message.warning(data.message)

    }
  },
  (error) => {
    NProgress.done()
    // if (
    //   Number(error.response.status) > 299 ||
    //   Number(error.response.status) < 200
    // ) {
    // }
    throw error
  }
)

author.uploadFile = function(file, url = '/file/upload/image') {
  var warning = Notification.warning({
    title: '上传中……',
    message:
      '<i class="el-icon-fa-spinner el-icon-fa-spin"></i> 上传完成前请不要关闭或刷新窗口！',
    dangerouslyUseHTMLString: true,
    duration: 0,
  })
  var f = new FormData()
  f.append('file', file)
  return this.post(url, f)
    .then(({ data }) => {
      warning.close()
      if (data.code == '0') {
        Message.success('上传完成！')
        // console.log(data.data)
        return Promise.resolve(data.data.filePath)
      } else {
        // return Promise.resolve(data.data.list);
        //throw new Error(data.meta.message);
      }
    })
    .catch((err) => {
      warning.close()
      // if(!url){
      //   Message.error(err.message);
      // }
      return Promise.reject(err)
    })
}

// 视频上传新增加的方法 返回的参数问题修改的
author.uploadFile1 = function(file, url = '/file/upload/video') {
  var warning = Notification.warning({
    title: '上传中……',
    message:
      '<i class="el-icon-fa-spinner el-icon-fa-spin"></i> 上传完成前请不要关闭或刷新窗口！',
    dangerouslyUseHTMLString: true,
    duration: 0,
  })
  var f = new FormData()
  f.append('file', file)
  return this.post(url, f)
    .then(({ data }) => {
      warning.close()
      if (data.code == '0') {
        Message.success('上传完成！')
        // console.log(data.data)
        return Promise.resolve(data)
      } else {
        // return Promise.resolve(data.data.list);
        //throw new Error(data.meta.message);
      }
    })
    .catch((err) => {
      warning.close()
      // if(!url){
      //   Message.error(err.message);
      // }
      return Promise.reject(err)
    })
}
// 图片上传的 返回的参数问题修改的
author.uploadFile2 = function(file, url = '/file/upload/image') {
  var warning = Notification.warning({
    title: '上传中……',
    message:
      '<i class="el-icon-fa-spinner el-icon-fa-spin"></i> 上传完成前请不要关闭或刷新窗口！',
    dangerouslyUseHTMLString: true,
    duration: 0,
  })
  var f = new FormData()
  f.append('file', file)
  return this.post(url, f)
    .then(({ data }) => {
      warning.close()
      if (data.code == '0') {
        Message.success('上传完成！')
        // console.log(data.data)
        return Promise.resolve(data)
      } else {
        // return Promise.resolve(data.data.list);
        //throw new Error(data.meta.message);
      }
    })
    .catch((err) => {
      warning.close()
      // if(!url){
      //   Message.error(err.message);
      // }
      return Promise.reject(err)
    })
}
// 上传文件最大上限设置
/**
 * @param {String} size 文件大小 必传.
 * @param {Number} maxSize 限制文件上传的最大值(MB) 必传.
 */
author.upLoadFileMaxsize = function(size, maxSize) {
  if (size.includes('M') && parseFloat(size) > maxSize) {
    Message.warning(`文件过大不能大于${maxSize}M`)
    return false
  } else {
    return true
  }
}
// 文件下载
/**
 * @param {String} attachAddr 文件id  必传.
 */
author.downloadFile = function(id) {
  let url = baseURL == '' ? 'http://192.168.3.143:8610' : baseURL
  window.open(`${url}/system/fileCtrl/fileDownload?id=${id}`)
}



author.getCodeSelect = function(codeType) {
  return this.post('/system/codeCtrl/getCodeSelect', {
    codeType,
  })
    .then(({ data }) => {
      if (data.meta.code === '100') {
        return Promise.resolve(data.data.list)
      } else {
        throw new Error(data.meta.message)
      }
    })
    .catch((err) => {
      Message.error(err.message)
      console.error(err)
      return Promise.reject(err)
    })
}

const unauth = axios.create({
  baseURL,
})

unauth.interceptors.request.use(
  (config) => {
    console.log(config)
    NProgress.start()
    return config
  },
  (error) => {
    NProgress.done()
    return Promise.reject(error)
  }
)
unauth.interceptors.response.use(
  (response) => {
    NProgress.done()
    return response
  },
  (error) => {
    NProgress.done()
    return Promise.reject(error)
  }
)
const apiPost= (url,params) => {
  
  return unauth.post(url, params)
}

const apiGet=  (urls) => {
  return unauth.get(urls)
}

export { $http, author, unauth, baseURL,apiPost,apiGet }
