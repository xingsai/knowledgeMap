const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? './'
  : '/',
  configureWebpack: config => {
    config.resolve = {
      extensions: [".js", ".vue", ".json", ".css"],
      alias: {
        vue$: "vue/dist/vue.esm.js",
        '$assets': resolve('src/assets'),
        "@": resolve("src")
      }
    };
  },
  chainWebpack:config => {
   
    config.entry('index').add('babel-polyfill')
    config.resolve.symlinks(true);
  },
  devServer: {
    port: 8081,
    open:true,
    //autoOpenBrowser:true,
     //proxy: 'http://192.168.0.215:8011'
   // proxy: '', // 本地
    proxy: {
      '/apiV1': {
         target: 'http://192.168.0.198:8080',//测试地址
         
        //target: 'http://192.168.0.85:8887', //梦哥 
        //target: 'http://192.168.0.69:8887',//李思
       //target: 'http://192.168.3.104:8887',//刘乐
       //target: 'http://192.168.3.104:8887',//刘乐
      // target: 'http://192.168.3.186:8887',//香君
        changeOrigin: true,
        pathRewrite: {
          '^/apiV1': ''
        }
      }
    }

  }
};
