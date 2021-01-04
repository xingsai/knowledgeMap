<template>
    <div class="file-upload" >
      <el-row>
        <el-col :span="24">
          <el-upload
              class="upload-demo"
              :http-request="fileRequest"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :limit="10"
              :accept="accept"
              multiple
              action="/system/fileCtrl/fileUpload"
              >
              <el-button v-if="isShowBtn== true" type="text" icon="el-icon-fa-upload">附件上传</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
        <div v-show="tableData.length>0" class="table-file">
           <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="fileName"
              label="文件名称"
            >
              <template slot-scope="{row}">
                <i class="el-icon-fa-paperclip mr-5"></i>{{row.fileName}}
              </template>
            </el-table-column>
            <el-table-column
              prop="fileExtType"
              label="类型"
            >
            </el-table-column>
            <el-table-column
              prop="fileSize"
              label="大小">
            </el-table-column>
            <el-table-column
              prop="releaseDate"
              label="上传时间"

            >
            </el-table-column>
            <!-- <el-table-column
              prop="status"
              label="上传进度">
            </el-table-column> -->
            <el-table-column
              prop="action"
              width="120"
              label="操作">
              <template slot-scope="{row,$index}">
                <div class="text-center">
                  <el-tooltip effect="dark" content="下载" placement="bottom">
                    <el-button type="text" @click="download(row)">
                      <i class="el-icon-fa-download" style="color: #42c5be;"></i>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip effect="dark" content="查看" placement="bottom">
                    <el-button type="text" @click="check(row)">
                      <i class="el-icon-fa-eye" style="color: #42c5be;"></i>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip v-if="isShowBtn" effect="dark" content="删除" placement="bottom">
                    <el-button type="text" @click="deleteFile(row,$index)">
                      <i class="el-icon-fa-trash" style="color: #42c5be;"></i>
                    </el-button>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        </el-col>
      </el-row>
    </div>
</template>
<script>
import {author} from '@/service'
export default {
    props: {
      attachPath: {
        type: String,
        default:'',
      },
      isShowBtn:{
        type: Boolean,
        default:true,
      }
    },
    watch: {
      tableData: {
        handler(newName, oldName) {
          this.getAttachAddr(newName);
        },
        immediate: true,
        deep: true
      },
      attachPath: {
        handler(newName, oldName) {
          this.getFileList();
        },
        immediate: true,
        deep: true
      }
    },
    data() {
      return {
       accept:'doc,docx,xls,xlsx,ppt,pptx,pdf,txt,jpg,png',
       attachAddr:[],// 获取文件属类型
       attachStr:'111', // 获取文件ids
       tableData: [
        //   {
        //   id:'1',
        //   fileName: '文件名称1',
        //   fileSize: '10KB',
        //   fileExtType:'doc',
        //   releaseDate: '2019-12-12 10:10:10',
        // },
        // {
        //   id:'2',
        //   fileName: '文件名称2',
        //   fileSize: '10KB',
        //   fileExtType:'docx',
        //   releaseDate: '2019-12-13 10:10:10',
        // }
        ]
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
          } else {
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
          this.tableData.push(data);
          this.attachAddr.push(data.id)
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
      // 删除文件
      deleteFile(row,$index){
        this.tableData.splice($index,1);
      },
      // 查看文件
      check(row){
        // window.open(`/system/fileCtrl/fileDownload?id=${row.id}_blank`)
        let types = ['.xls','.xlsx','.doc','.docx','.ppt','.pptx','.txt','.png','.jpg']
        if(types.indexOf(row.fileExtType) > -1){
          author.lookFile(row.id)
        }else{
          this.$message.error('该附件类型不支持预览')
        }

      },
      // 下载文件
      download(row){
        author.downloadFile(row.id)
      },
      // 获取附件列表
      getFileList(){
        // if(this.attachPath){
          this.$http.author.post('/system/fileCtrl/findFileList',
          {
            attachPath:this.attachPath==null ? '' :this.attachPath
          }).then(res => {
            let needData = res.data;
            if(needData.meta.code === '100'){
              if(needData.data==""){
                this.tableData=[]
              }else{
                this.tableData = needData.data.list;
              }
            }
          })
        // }
      },
      getAttachAddr(value){
        this.attachAddr=[];
        value.forEach(item => {
          this.attachAddr.push(item.id)
        })
        let copyAttachAddr= [...this.attachAddr];
        this.attachStr = copyAttachAddr.join();
      }
    },
    mounted(data) {
        // this.$emit('input', this.value);
        this.getFileList();
    },

}
</script>
<style scoped>
.rela-order-editor button {
  color: #42c5be;
}
.table-file{
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #e1e1e1;
  background: #ffffff;
}
.mr-5{
  margin-right: 5px;
  color: #666;
}
</style>
