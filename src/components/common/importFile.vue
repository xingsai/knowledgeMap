<template>
    <div class="file-upload" >
      <el-upload
          class="upload-demo"
          :http-request="fileRequest"	
          :before-upload="beforeUpload"
          :show-file-list="false"
          :limit="10"
          :accept="accept"
          action="/system/fileCtrl/fileUpload"
          >
          <el-button type="text" icon="el-icon-fa-arrow-alt-circle-down">导入</el-button>
      </el-upload>
      <el-dialog
        title="系统提醒"
        :visible.sync="dialogVisible"
        width="680px"
        :before-close="handleClose">
        <span class="bad-title">
          <i class="mr-5 el-icon-fa-exclamation-triangle"></i>
          <span>导入失败,错误数据如下</span>
        </span>
        <div class="bad-content">
          <ul>
            <li v-for="(item,index) in badList" :key="index">
              <span>行号: <span>{{item.row}}</span></span>
              <span class="ml-25">列号: <span>{{item.col}}</span></span>
              <span class="ml-25">描述: <span>{{item.errorMsg}}</span></span>
            </li>
          </ul>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import {author} from '@/service'
export default {
    props: {
      url: {
        type: String,
        defualt:'',
      },
    },
    data() {
      return {
        accept:'doc,docx,xls,xlsx,ppt,pptx,pdf,txt,jpg,png',
        attachAddr:[],// 获取文件属类型
        attachStr:'', // 获取文件ids
        dialogVisible:false,
        badList:[],
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
      uploadFile(file,url = "/system/fileCtrl/fileUpload"){
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

      }
    },
    mounted() {

    }
}
</script>
<style scoped>
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
</style>