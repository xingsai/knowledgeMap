<template>
    <div class="file-upload" >
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="900px"
        :before-close="handleClose">
        <el-row style="margin-bottom:18px">
          <el-col :span="24">
            <div class="table-file">
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
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="fileSize"
                  label="大小">
                </el-table-column>
                <el-table-column
                  prop="releaseDate"
                  label="上传时间"
                  width="180"
                >
                </el-table-column>
                <el-table-column
                  prop="action"
                  width="120"
                  label="操作">
                  <template slot-scope="{row}">
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
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
      
    </div>
</template>
<script>
import {author} from '@/service'
export default {
    props: {
      attachPath: {
        type: String,
        defualt:'',
      },
      dialogVisible:{
        type: Boolean,
      }
    },
    watch: {
      dialogVisible: {
        handler(newName, oldName) {
          if(newName== true){
            this.getFileList();
          }
        },
        immediate: true,
        deep: true
      }
    },
    data() {
      return {
        tableData: [
          {
          id:'1',
          fileName: '文件名称1',
          fileSize: '10KB',
          fileExtType:'doc',
          releaseDate: '2019-12-12 10:10:10',
        },
        {
          id:'2',
          fileName: '文件名称2',
          fileSize: '10KB',
          fileExtType:'docx',
          releaseDate: '2019-12-13 10:10:10',
        }
        ]
      };
    },
    methods: {
      // 查看文件
      check(row){
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
        this.$http.author.post('/system/fileCtrl/findFileList',
        {
          attachPath:this.attachPath
        }).then(res => {
          let needData = res.data;
          if(needData.meta.code === '100'){
            this.tableData = needData.data.list;
          }
        })
      },
      handleClose(){
        this.$emit('closeDialig',false);
      }
    },
    mounted() {
      // this.getFileList();
    },

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
</style>