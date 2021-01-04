<template>
    <div class="file-upload" >
      <el-upload v-if="headName==''"
          class="upload-demo"
          :http-request="fileRequest"	
          :before-upload="beforeUpload"
          :show-file-list="false"
          :limit="10"
          :accept="accept"
          action="/talentplan/staffCtrl/uploadStaffHead"
          >
          <el-button type="text" icon="el-icon-fa-upload">上传头像</el-button>
      </el-upload>
      <el-button v-else type="text" icon="el-icon-fa-paperclip">
        <span @click="showImg">{{headName}}</span>
        <i @click="clearBtn" style="cursor:pointer;color:#c0c4cc;margin-top:8px;margin-left:5px" class="el-icon-fa-window-close"></i>
      </el-button>
      <div class="fixed-box" v-if="imgisShow">
        <div class="center-box">
          <img :src="imgSrc" alt="">
          <i @click="closeImg" class="el-icon-fa-times-circle pos-close"></i>
        </div>
      </div>
    </div>
</template>
<script>
import {author} from '@/service'
export default {
    data() {
      return {
        accept:'doc,docx,xls,xlsx,ppt,pptx,pdf,txt,jpg,png',
        dialogVisible:false,
        badList:[],
        headName:"",  // 图片名称
        headId:"",  // 图片ID
        imgisShow:false,
        imgSrc:'../../../public/images/boy.png'
      };
    },
    methods: {
      // 文件转化
      wxc_countFileSize(size){
        var fsize = parseFloat(size, 2);
        var fileSizeString;
        if (fsize < 1024) {
          fileSizeString = fsize.toFixed(2) + "B";
        } else if (fsize < 1048576) {
          fileSizeString = (fsize / 1024).toFixed(2) + "KB";
        } else if (fsize < 1073741824) {
          fileSizeString = (fsize / 1024 / 1024).toFixed(2) + "MB";
        } else if (fsize < 1024 * 1024 * 1024) {
          fileSizeString = (fsize / 1024 / 1024 / 1024).toFixed(2) + "GB";
        } else {
          fileSizeString = "0B";
        }
        return fileSizeString;
      },
      upLoadFileMaxsize(size, maxSize){
        if (size.includes("M") && parseFloat(size) > maxSize) {
          this.$message.warning(`文件过大不能大于${maxSize}M`);
          return false;
        } else {
          return true;
        }
      },
      uploadFile(file,url = "/talentplan/staffCtrl/uploadStaffHead"){
        var warning = this.$notify.warning({
        title: "上传中……",
        message:
          '<i class="el-icon-fa-spinner el-icon-fa-spin"></i> 上传完成前请不要关闭或刷新窗口！',
        dangerouslyUseHTMLString: true,
        duration: 0
      });
      var f = new FormData();
      f.append("file", file);
      return this.$http.author.post(url, f)
        .then(({ data }) => {
          warning.close();
          if (data.meta.code === "100") {
            this.$message.success("上传完成！");
            return Promise.resolve(data.data);
          } else if(data.meta.code === "212") {
            this.badList = data.data.list;
            this.dialogVisible = true;
          }else if(data.meta.code === "214"){
            this.$message.error(data.meta.message);
          }
        })
        .catch(err => {
          warning.close();
          return Promise.reject(err);
        });
      },
      fileRequest(config){
        let {file,data} = config
        // 获取文件大小
        let fileSize = this.wxc_countFileSize(file.size);
        // 限制文件大小的工具方法
        this.upLoadFileMaxsize(fileSize,Number(5)) &&
        this.uploadFile(config.file,this.url)
        .then(data => {
          // this.attachAddr.push(data.id)
          console.log('data', data);
          this.headId = data.headId;
          this.headName = data.headName;
          this.imgSrc = 'data:image/png;base64,'+data.headImg;
        })
      },
      checkFileType(file, accept){
        var a = file.name.split(".");
        var ext = "." + a[a.length - 1];
        var b = accept.split(",");
        if (b.indexOf(ext) == -1) {
          this.$message.error(`只允许以 ${accept} 结尾的文件`);
        }
        return b.indexOf(ext) > -1;
      },
      beforeUpload(file) {
        // this.checkFileType(file, this.accept);
      },
      handleClose(){
        this.dialogVisible = false;
      },
      // 清除
      clearBtn(){
        this.headName = "";
        this.headId = "";
      },
      // 显示详情
      showImg(){
        
        this.$http.author.post('/talentplan/staffCtrl/findStaffHead',{
          headId:this.headId
        }).then(res => {
          let needData = res.data;
          if(needData.meta.code === '100'){
            this.imgSrc = needData.data.headImg;
            this.imgisShow = true;
          }else{
            this.$message.warning('暂无图片')
          }
        })
      },
      // 关闭图片弹窗
      closeImg() {
        this.imgisShow =false;
      }
    },
    mounted() {
      console.log(this.url);
      
    }
}
</script>
<style scoped lang="less">
.rela-order-editor button {
  color: #42c5be;
}
.table-file{
  padding: 10px;
  border: 1px solid #ccc;
}
.mr-5{
  margin-right: 5px;
  color: #666;
}
.file-upload{
  display: inline-block;
  margin-right: 20px;
  margin-left: 10px;
  color: #666;
}
.bad-content{
  margin-bottom: 43px;
}
.bad-content ul li{
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #C16A4C;
  background: #F8F8F8;
  text-indent: 20px;
}
.bad-content ul li:nth-child(2n){
   background: #ffffff;
}
.bad-title{
  display: block;
  margin: 20px 0 20px;
}
.ml-25{
  margin-left: 25px;
}
.mr-5{
  margin-right: 10px;
  color: #C16A4C;
  font-size: 20px;
}
.fixed-box{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0,0,0,.6);
  z-index: 100;
}
.center-box{
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 200;
  
  transform: translate(-50%,-50%);
  img{
    width: 100px;
    height: auto;
    display: block;
  }
  .pos-close{
    top: -20px;
    right: -20px;
    z-index: 200;
    position: absolute;
    color: #fff;
    cursor: pointer;
    font-size: 20px;
  }
}
</style>