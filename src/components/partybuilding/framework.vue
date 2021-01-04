/* * @Author: mikey.ZGH * @Date: 2020-09-15 13:47:47 * @Last Modified by:
mikey.ZGH * @Last Modified time: 2020-09-15 13:47:47 */
<template>
  <!-- 支部组织架构 -->
  <div class="framework">
    <div class="homepage" v-show="ciks1 == 1">
      <el-row>
        <el-col :span="24">
          <el-button @click="editd">编辑</el-button>
        </el-col>
        <el-col :span="24">
          <div class="srcimg">
            <img :src="ruleForm.imageUrl" alt="" />
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 编辑页面 -->
    <div v-show="ciks2 == 1">
      <div>
        <el-row>
          <el-col :span="24" style="margin-bottom: 40px;">
            <span
              style="font-size: 16px;color: #1578FF;cursor: pointer;"
              @click="returncl"
            >
              <i class="el-icon-arrow-left" style="margin-right: 10px;"></i>
              返回
            </span>
            <span style="font-size: 16px; color: #333333;margin-left: 20px;">
              编辑
            </span>
          </el-col>
          <el-col :span="24" class="wapsize">
            <span class="spans">图片</span>
            <div>
              <el-upload
                list-type="picture-card"
                :accept="acept"
                action="/file/upload/image"
                :http-request="fileRequest"
                :before-upload="beforeUpload"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :limit="limit"
              >
                <i class="el-icon-plus"></i>
                <!-- <span
                  >支持jpg/png格式<br />
                  <p>不超过15M</p></span
                > -->
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </div>
          </el-col>
          <el-col :span="24" class="wapbut">
            <el-button class="butt" @click="submit()">发布</el-button>
            <el-button class="bott" @click="returncl">取消</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { baseURL, author } from '@/service'
export default {
  name: 'framework',
  props: {
    activeName: '',
  },
  data() {
    return {
      ciks1: 1,
      ciks2: 2,
      ruleForm: {
        imageUrl: '',
      },
      dialogImageUrl: '',
      dialogVisible: false,
      acept: '.png,.jpg,.jpeg', //文件上传格式
      // value: '',
      imageUrl: '',
      imgId: {},
      imageUrllist: [],
      filevideour: [],
      // 视频
      filePathlist: [], //记录所有的返回地址id
      fileList: [],
      limit: 1,
    }
  },
  created() {
    this.getimgs()
  },
  methods: {
    editd() {
      this.ciks1 = 2
      this.ciks2 = 1
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 进页面调取方法
    getimgs() {
      this.$http.author
        .post('/party/materialCenter/getBaseDetail', {
          id: '',
          moduleCode: '01',
        })
        .then(({ data }) => {
          if (data.code === 0) {
            this.ruleForm = data.data
            this.ruleForm.imageUrl = data.data.fileArray[0].filePath
            let fileListimage = []
            let filePali = []
            for (let index = 0; index < data.data.fileArray.length; index++) {
              data.data.fileArray[index].url =
                data.data.fileArray[index].filePath
              filePali.push(data.data.fileArray[index].id)
              fileListimage.push(data.data.fileArray[index])
            }
            this.filePathlist = filePali
            this.fileList = fileListimage
          } else {
            console.log()
            // catch((err) => {}) partytrain
          }
        })
    },
    // 返回的方法
    returncl() {
      this.ciks1 = 1
      this.ciks2 = 2
    },
    uploadFile(config) {
      this.$http.author
        .uploadFile(config.file)
        .then((attachAddr) => {
          // console.log(attachAddr)
        })
        .catch()
    },
    beforeUpload(file) {
      // console.log(file)
      return this.$util.checkFileType(file, this.acept)
    },
    // 文件上传
    fileRequest(config) {
      let { file, data } = config
      // 获取文件大小
      let fileSize = this.$util.wxc_countFileSize(file.size)
      // 限制文件大小的工具方法
      this.$http.author.upLoadFileMaxsize(fileSize, 15) &&
        this.$http.author
          .uploadFile2(config.file, '/file/upload/image')
          .then((data) => {
            this.filePathid = data.data.id
            this.filePathlist.push(this.filePathid)
          })
    },
    // 图片查看
    handleRemove(file, filePathlist) {
      // 删除多余的图片
      var index = this.filePathlist.findIndex((item) => {})
      this.filePathlist.splice(index, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    // 提交
    submit() {
      this.$http.author
        .post('/party/materialCenter/upadateMaterialHeadImg', {
          artId: this.ruleForm.id,
          fileId: this.filePathlist[0],
          artType: '0MI0002',
        })
        .then(({ data }) => {
          debugger
          if (data.code == 0) {
            this.$message({
              message: '提交成功',
              type: 'success',
            })
            this.ciks1 = 1
            this.ciks2 = 2
            this.getimgs()
          }
        })
        .catch((err) => {})
    },
  },
}
</script>
<style lang="less">
.framework {
  padding: 22px 20px 0 20px;
}
.homepage .el-button--small {
  width: 56px;
  height: 32px;
  text-align: center;
  padding: 0;
  background: #ffffff;
  border: 1px solid #1890ff;
  border-radius: 2px;
  font-size: 14px;
  color: #1578ff;
}
.wapsize .spans {
  float: left;
  margin-right: 20px;
  margin-top: 10px;
}
.wapsize {
  margin-left: 160px;
}
.wapbut {
  margin-left: 210px;
  margin-top: 60px;
}
.butt {
  width: 65px;
  height: 30px;
  text-align: center;
  background: #1578ff;
  border-radius: 2px;
  font-size: 14px;
  color: #ffffff;
  padding: 8px 12px;
}
.bott {
  width: 65px;
  height: 30px;
  margin-left: 10px;
  background: #ffffff;
  text-align: center;
  border: 1px solid #dadada;
  border-radius: 2px;
  font-size: 14px;
  color: #666666;
  padding: 8px 12px;
}
.srcimg {
  margin-top: 40px;
  /* width: 100%; */
  height: 100%;
  text-align: center;
  padding: 0 20px 20px;
  /* margin: 20px; */
}
.el-button:active {
}
// .wapsize {
//   .el-upload--picture-card {
//     line-height: 0;
//     i {
//       margin: 45px 56px 10px;
//       color: #fff;
//       background-color: #3a8ee6;
//       border-radius: 15px;
//       font-size: 24px;
//     }
//     span {
//       line-height: 20px;
//       font-size: 12px;
//     }
//   }
// }
</style>
