/* * @Author: mikey.ZGH * @Date: 2020-09-21 11:30:10 * @Last Modified by:
mikey.ZGH * @Last Modified time: 2020-09-21 11:30:10 */
<template>
  <!-- 培训管理-培训内容-组件  -->
  <div class="Initiation-wap" ref="tableBox">
    <div class="wxc-tabs " v-if="searchtable">
      <el-row class="tableBox">
        <el-row>
          <el-row class="btnlist">
            <el-button size="small" @click="articlelist">
              新增
            </el-button>
            <el-button size="small" @click="dialogbtoon">删除</el-button>
          </el-row>
        </el-row>
        <el-row v-loading="loading" class="dataTable" style="marginTop:20px">
          <el-table
            style="width: 100%"
            :data="tableData"
            @select-all="handleSelectAll"
            @select="handleSelect"
            v-loading="loading1"
            size="small"
            border
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="indexs" label="序号" width="100">
            </el-table-column>
            <el-table-column
              prop="trainName"
              label="培训内容"
              show-overflow-tooltip
              width="400"
            >
              <template slot-scope="scope">
                <span
                  class="limitSP"
                  @click="artdetails(scope.row.id)"
                  style="color:#1578ff;cursor: pointer;"
                  >{{ scope.row.trainName }}</span
                >
              </template>
            </el-table-column>
            <el-table-column prop="trainSortName" label="培训类别">
              <template slot-scope="scope">
                <span>{{ scope.row.trainSortName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="trainer"
              label="培训讲师"
              width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span class="limitSP">{{ scope.row.trainer }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="150">
              <template slot-scope="scope">
                <span
                  v-text="
                    scope.row.createTime
                      ? new Date(scope.row.createTime).Format('yyyy-MM-dd')
                      : ''
                  "
                ></span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" class="columnEdit">
              <template slot-scope="scope">
                <span
                  @click="detailspy(scope.row)"
                  style="color:#1578ff; cursor: pointer;float: left;margin-right: 10px;"
                  >评价</span
                >
                <span
                  @click="handedit(scope.row.id)"
                  style="color:#1578ff; cursor: pointer;float: left;margin-right: 10px;"
                  >编辑</span
                >
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <div style="margin-top: 20px;">
          <el-pagination
            style="float:right;"
            @current-change="changePage"
            @size-change="changeSize"
            :current-page.sync="page"
            :page-sizes="pageSizeOpts"
            :page-size="pageSize"
            layout="total,  prev, pager, next, sizes"
            :total="Number(totalCount)"
          ></el-pagination>
        </div>
      </el-row>
    </div>
    <el-dialog title="删除" :visible.sync="dialogVisible1" width="30%">
      <span
        style="font-size: 14px;
color: #666666;"
        ><i
          class="el-icon-info"
          style="font-size: 24px;
              color: #CE9047;
              margin-right: 4px;"
        ></i>
        该内容删除后不可恢复,请确认是否删除？
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false" class="bott">
          取消
        </el-button>
        <el-button class="butt" type="primary" @click="importIt()"
          >删除</el-button
        >
      </span>
    </el-dialog>
    <!-- 新增修改 -->
    <div class="content_wrap" v-if="addlist">
      <div class="layout_header">
        <span>
          <el-button
            type="text"
            class="layout_size"
            icon="el-icon-arrow-left"
            @click="editorsec()"
            >返回</el-button
          >
        </span>
        <span>{{ title }}</span>
      </div>
      <div class="layout_main">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="165px"
          class="demo-ruleForm"
        >
          <el-form-item label="培训内容名称" prop="trainName">
            <el-input
              v-model="ruleForm.trainName"
              placeholder="请输入"
              maxlength="50"
            ></el-input>
          </el-form-item>
          <el-form-item label="培训导师" prop="trainer">
            <el-input
              v-model="ruleForm.trainer"
              placeholder="请输入"
              maxlength="50"
            ></el-input>
          </el-form-item>
          <el-form-item label="培训类别">
            <el-cascader
              v-model="values"
              :options="listpy"
              @change="select_active"
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="学分" prop="credit" class="intperts">
            <el-input
              v-model="ruleForm.credit"
              placeholder="请输入数字"
              maxlength="2"
              type="number"
            ></el-input>
            <!-- onkeyup="value=value.replace(/[^\d]/g,'')" -->
          </el-form-item>
          <el-form-item label="培训说明" prop="remark">
            <el-input
              v-model="ruleForm.remark"
              placeholder="请输入"
              maxlength="200"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传附件" class="colores">
            <el-upload
              class="upload-demo"
              :accept="acct"
              :action="action"
              :http-request="avatarUpload"
              :before-remove="beforeRemove"
              :file-list="filevideopy"
              :before-upload="beforeUpload1"
              :on-remove="handleRemove1"
              :limit="1"
            >
              <i class="el-icon-fa-upload iconsk"></i>
              <p class="colores_p">上传</p>
              <div class="text">支持PDF和MP4等格式，大小不超过100M</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="参考资料上传" class="colores">
            <el-upload
              class="upload-demo"
              :accept="acct"
              :action="action"
              :http-request="avatarUpload2"
              :before-remove="beforeRemove"
              :file-list="filevideo"
              :before-upload="beforeUpload1"
              :on-remove="handleRemove2"
              :limit="5"
            >
              <i class="el-icon-fa-upload iconsk"></i>
              <p class="colores_p">上传</p>
              <div class="text">
                支持PDF和MP4等格式，大小不超过100M,最多上传五个文件
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="培训封面" class="colores">
            <el-upload
              :accept="acept"
              action="/file/upload/image"
              :http-request="fileRequest"
              :before-upload="beforeUpload"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :limit="1"
            >
              <i class="el-icon-fa-upload iconsk"></i>
              <p class="colores_p">上传</p>
              <div class="text">
                建议图片比例4:3，支持JPG和PNG等图片格式，大小大不超过10M
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitFormA('ruleForm')"
              v-if="sub1"
              >保存</el-button
            >
            <el-button
              type="primary"
              @click="submitFormB('ruleForm')"
              v-if="sub2"
              >保存</el-button
            >
            <el-button @click="editorsec()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { baseURL, author } from '@/service'
import { tableMethods } from '@/libs/mixintable'
export default {
  name: 'Trainingcontent',
  props: { activeName: '' },
  mixins: [tableMethods],
  data() {
    return {
      dialogVisible1: false,
      tableData: [],
      loading1: false,
      optionslist: [],
      //
      values: '',
      listpy: [],
      searchtable: true,
      addlist: false,
      title: '',
      ruleForm: {
        trainName: '',
        trainer: '',
        trainSort: '',
        credit: '',
        remark: '',
        attachmentFileId: '',
        referenceFileIdList: [],
        coverFileId: '',
      },
      // 图片视频
      // 附件
      filevideopy: [],
      filevideopylist: [], //记录所有的返回地址id
      // 参考
      filevideo: [],
      filevideolist: [], //记录所有的返回地址id
      // 封面
      fileList: [],
      filePathlist: [], //记录所有的返回地址id
      acept: '.png,.jpg,.jpeg,.PNG,.JPG,.JPEG',
      acct: '.mp4,.MP4,.PDF,.pdf',
      action: '/file/upload/video',
      format: '',

      sub1: false,
      sub2: false,
    }
  },
  created() {
    this.searchTableInfo()
  },
  methods: {
    artdetails(id) {
      this.$router.push({
        path: '/trainingDetail',
        query: {
          id: id,
        },
      })
    },
    //表格选择事件
    handleSelect(selection, row) {
      let selectList = []
      selection.forEach((item) => {
        selectList.push(item.id)
      })
      this.selectList = selectList
    },
    //全选事件
    handleSelectAll(selection) {
      let selectList = []
      selection.forEach((item) => {
        selectList.push(item.id)
      })
      this.selectList = selectList
    },
    // 删除方法 弹窗
    dialogbtoon() {
      if (this.selectList > '0') {
        this.dialogVisible1 = true
      } else {
        this.$message({
          message: '请选择需要删除的数据',
          type: 'warning',
        })
      }
    },
    // 删除
    importIt() {
      this.$http.author
        .post('/training/training/delTrainings', {
          ids: this.selectList,
        })
        .then(({ data }) => {
          if (data.code == 0) {
            this.$message({
              message: '删除成功',
              type: 'success',
            })
            this.dialogVisible1 = false
            this.searchTableInfo()
          }
        })
        .catch((err) => {})
    },

    // 查询
    searchTableInfo() {
      this.$http.author
        .post('/training/training/getTrainingList', {
          currentPage: this.page, //类型：String  必有字段  备注：当前所在页码
          pageSize: this.pageSize, //类型：String  必有字段  备注：每页记录数
        })
        .then(({ data }) => {
          this.loading = false
          if (data.success === true) {
            /*添加序号*/
            let resultData = []
            if (data.data.trainingList && data.data.trainingList.length > 0) {
              data.data.trainingList.forEach((item, index) => {
                item.indexs =
                  this.page * this.pageSize + index - (this.pageSize - 1)
                resultData.push(item)
              })
            }
            this.tableData = resultData
            this.totalCount = data.data.trainingTotal
          } else {
            console.log(data.message)
          }
        })
    },

    // 新增修改的级联下拉
    _getGameExamCascader() {
      this.$http.author
        .post('/party/gameExam/getGameExamCascader', {})
        .then(({ data }) => {
          this.listpy = data.data.gameExamList
        })
    },
    select_active(e) {
      this.ruleForm.trainSort = e[e.length - 1]
    },
    // 新增
    articlelist() {
      this.empty()
      this.sub1 = true
      this.sub2 = false
      this.searchtable = false
      this.addlist = true
      this.title = '新增培训内容'
      this._getGameExamCascader()
    },
    handedit(v) {
      this.sub1 = false
      this.sub2 = true
      this.searchtable = false
      this.addlist = true
      this.title = '编辑培训内容'
      this._getGameExamCascader()
      this.$http.author
        .post('/training/training/trainingInfo', {
          trainId: v,
        })
        .then((res) => {
          let result = res.data
          this.ruleForm = result.data
          this.values = result.data.trainSort
          console.log(11111)
          console.log(this.values)
          // 图片回显
          let fileListimage = []
          let filePali = []
          for (let index = 0; index < result.data.coverList.length; index++) {
            result.data.coverList[index].url =
              result.data.coverList[index].filePath
            filePali.push(result.data.coverList[index].id)
            fileListimage.push(result.data.coverList[index])
          }
          this.filePathlist = filePali
          this.fileList = fileListimage

          // 上传附件回显
          this.filevideopy = result.data.attachList
          let filevilt = []
          for (let index = 0; index < result.data.attachList.length; index++) {
            filevilt.push(result.data.attachList[index].id)
          }
          this.filevideopylist = filevilt

          // 参考资料的回显
          this.filevideo = result.data.refMaterialList
          let filevPath = []
          for (
            let index = 0;
            index < result.data.refMaterialList.length;
            index++
          ) {
            filevPath.push(result.data.refMaterialList[index].id)
          }
          // console.log(222223333)
          // console.log(filevPath)
          this.filevideolist = filevPath

          // console.log(this.filevideolist)
        })
    },
    // 取消按钮
    editorsec() {
      this.empty()
      this.searchtable = true
      this.addlist = false
      this.searchTableInfo()
    },
    // 新增保存按钮
    submitFormA(formName) {
      let parents = {
        trainName: this.ruleForm.trainName, //类型：String  必有字段  备注：培训内容名称
        trainer: this.ruleForm.trainer, //类型：String  必有字段  备注：培训导师
        trainSort: this.ruleForm.trainSort, //类型：String  必有字段  备注：培训类别
        credit: this.ruleForm.credit, //类型：String  必有字段  备注：学分
        remark: this.ruleForm.remark, //类型：String  可有字段  备注：培训说明
        attachmentFileId: this.filevideopylist[0], //类型：String  必有字段  备注：附件id，只能上传一个
        coverFileId: this.filePathlist[0], //类型：String  必有字段  备注：封面id
        referenceFileIdList: this.filevideolist, //类型：Array  可有字段  备注：参考资料id，最多上传五个
      }
      this.$refs[formName].validate((valid) => {
        this.$http.author
          .post('/training/training/addTrainingAndFileArt', parents)
          .then(({ data }) => {
            if (data.code == 0) {
              this.$message({
                message: '发布成功',
                type: 'success',
              })
            }
            this.empty()
            this.editorsec()
            this.searchtable = true
            this.addlist = false
            this.searchTableInfo()
          })
          .catch((err) => {})
      })
    },

    // 编辑保存
    submitFormB(formName) {
      let parents = {
        artId: this.ruleForm.id,
        trainName: this.ruleForm.trainName, //类型：String  必有字段  备注：培训内容名称
        trainer: this.ruleForm.trainer, //类型：String  必有字段  备注：培训导师
        trainSort: this.ruleForm.trainSort, //类型：String  必有字段  备注：培训类别
        credit: this.ruleForm.credit, //类型：String  必有字段  备注：学分
        remark: this.ruleForm.remark, //类型：String  可有字段  备注：培训说明
        attachmentFileId: this.filevideopylist[0], //类型：String  必有字段  备注：附件id，只能上传一个
        coverFileId: this.filePathlist[0], //类型：String  必有字段  备注：封面id
        referenceFileIdList: this.filevideolist, //类型：Array  可有字段  备注：参考资料id，最多上传五个
      }
      this.$refs[formName].validate((valid) => {
        this.$http.author
          .post('/training/training/updateTrainingAndFileArt', parents)
          .then(({ data }) => {
            if (data.code == 0) {
              this.$message({
                message: '发布成功',
                type: 'success',
              })
            }
            this.editorsec()
            this.searchtable = true
            this.addlist = false
            this.searchTableInfo()
          })
          .catch((err) => {})
      })
    },
    // 视频文件图片部分
    // 视频附件
    avatarUpload(config) {
      let { file, data } = config
      let g = file.name.substring(file.name.indexOf('.') + 1)
      let url
      if (['pdf', 'PDF'].indexOf(g) > -1) {
        url = '/file/upload/doc'
        this.action = url
        this.format = 'pdf'
      } else {
        url = '/file/upload/video'
        this.action = url
        this.format = 'mp4'
      }
      // 获取文件大小
      let fileSize = this.$util.wxc_countFileSize(file.size)
      // 限制文件大小的工具方法
      this.$http.author.upLoadFileMaxsize(fileSize, 100) &&
        this.$http.author.uploadFile1(config.file, url).then((data) => {
          if (this.format === 'pdf') {
            // this.ruleForm.attachmentFileId = data.data.id
            this.imgpower = data.data.id
            this.filevideopylist.push(this.imgpower)
          } else {
            // this.ruleForm.attachmentFileId = data.data.video.id
            this.imgpower = data.data.video.id
            this.filevideopylist.push(this.imgpower)
          }
        })
    },
    // 参考资料
    avatarUpload2(config) {
      let { file, data } = config
      let g = file.name.substring(file.name.indexOf('.') + 1)
      let url
      if (['pdf', 'PDF'].indexOf(g) > -1) {
        url = '/file/upload/doc'
        this.action = url
        this.format = 'pdf'
      } else {
        url = '/file/upload/video'
        this.action = url
        this.format = 'mp4'
      }
      // 获取文件大小
      let fileSize = this.$util.wxc_countFileSize(file.size)
      // 限制文件大小的工具方法
      this.$http.author.upLoadFileMaxsize(fileSize, 100) &&
        this.$http.author.uploadFile1(config.file, url).then((data) => {
          if (this.format === 'pdf') {
            this.FileIdListid = data.data.id
            this.filevideolist.push(this.FileIdListid)
            console.log(11111)
            console.log(this.filevideolist)
          } else {
            this.FileIdListid = data.data.video.id
            this.filevideolist.push(this.FileIdListid)
            console.log(222222)
            console.log(this.filevideolist)
          }
        })
    },
    beforeUpload1(file) {
      return this.$util.checkFileType(file, this.acct)
    },
    // 视频
    handleRemove1(file, filevideopylist) {
      var index = this.filevideopylist.findIndex((item) => {})
      this.filevideopylist.splice(index, 1)
    },
    handleRemove2(file, filevideolist) {
      var index = this.filevideolist.findIndex((item) => {})
      this.filevideolist.splice(index, 1)
    },
    // 移除的方法
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 图片文件上传
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
    beforeUpload(file) {
      // console.log(file)
      return this.$util.checkFileType(file, this.acept)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 图片查看
    handleRemove(file, filePathlist) {
      // 删除多余的图片
      var index = this.filePathlist.findIndex((item) => {})
      this.filePathlist.splice(index, 1)
    },

    // 评价
    detailspy() {
      this.$message({
        message: '正在开发中',
        type: 'warning',
      })
    },

    // 清空方法
    empty() {
      this.ruleForm = Object.assign(
        {},
        {
          trainName: '',
          trainer: '',
          trainSort: '',
          credit: '',
          remark: '',
          attachmentFileId: '',
          referenceFileIdList: [],
          coverFileId: '',
        }
      )
      this.filevideopy = []
      this.filevideopylist = []
      this.filevideo = []
      this.filevideolist = []
      this.fileList = []
      this.filePathlist = []
      this.values = ''
    },
  },
}
</script>
<style lang="less">
// @import '../../../assets/css/text.less';
// @import './index.less';
.Initiation-wap {
  padding-top: 30px;
  background-color: #fff;
}
.Initiation-wap .searchArea {
  padding: 0 20px;
}
.Initiation-wap .el-range-editor.el-input__inner,
.Initiation-wap .el-date-editor.el-input {
  width: 100%;
}
.Initiation-wap .butBox {
  text-align: right;
  // margin-top: 18px;
}
.Initiation-wap .cancelBtn {
  border-color: #42c5be;
  color: #42c5be;
}
.Initiation-wap .tableBox {
  padding: 10px 20px 20px 20px;
  // min-height: 80vh;
  /* background-color: #f2f2f2; */
}
.Initiation-wap .btnlist {
  // text-align: right;
}
.Initiation-wap .dataTable {
  margin-top: 16px;
}
.Initiation-wap .textarea {
  position: relative;
}
.Initiation-wap .textarea .tit {
  position: absolute;
  bottom: 0px;
  right: 5px;
  font-size: 12px;
  color: #ccc;
}
.Initiation-wap .redColor {
  color: #ca5a59;
}
.Initiation-wap .giveBtn {
  color: #ca5a59;
}
.Initiation-wap .vue-treeselect__control-arrow-container {
  display: none !important;
}
.Initiation-wap .treeIcon {
  position: absolute;
  right: 10px;
  top: 8px;
  color: #42c5be;
  background-color: #fff;
}
.Initiation-wap .overHidden {
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
  white-space: nowrap;
}
.Initiation-wap .el-form-item--small.el-form-item {
  margin-bottom: 25px;
}
.Initiation-wap .el-dialog__body {
  padding-bottom: 20px;
  color: #666;
}
.Initiation-wap .curser {
  cursor: pointer;
}
.Initiation-wap .el-form--inline .el-form-item__content {
  display: inline-block !important;
  margin-left: 10px;
}
.Initiation-wap .el-button--small {
  padding: 8px 12px;
}
.Initiation-wap .btnlist .el-button--small {
  background: #ffffff;
  border: 1px solid #1890ff;
  border-radius: 2px;
  font-size: 14px;
  color: #1578ff;
}

//新增编辑部分样式
.content_wrap {
  padding: 0;
}
.content_wrap .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.content_wrap .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.content_wrap .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.content_wrap .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.content_wrap .layout_main {
  margin-top: 40px;
  .el-input {
    width: 600px;
  }
  .el-form-item--small .el-form-item__label {
    font-weight: normal;
  }
  .el-textarea {
    width: 600px;
  }
  .el-form-item__label {
    padding: 0 20px 0 0;
  }

  .editor {
    width: 700px;
    height: 400px;
  }
}

.uploaddeom .el-upload {
  float: left;
  margin-right: 15px;
}
.el-upload__tip {
  margin-top: 0;
}
.el-upload-list {
  width: 600px;
}

//
.edity_title {
  width: 100%;
  text-align: center;
  // margin-top: 60px;
  height: 120px;
  border-bottom: 1px solid #dfe6ec;
  p {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #333333;
    padding: 50px 0 20px 0;
  }
  span {
    font-size: 14px;
    color: #999999;
  }
}
.edity_url {
  height: 500px;
  margin: 30px 600px;
  img {
    width: 100%;
    height: 100%;
  }
}
.box-wrapper {
  padding: 0 0 10px 65px;
  box-sizing: border-box;
}

.colores .iconsk {
  color: #3a8ee6;
  float: left;
  margin-right: 10px;
  margin-top: 8px;
}
.colores .colores_p {
  text-align: left;
}
.limitSP {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
// .el-dialog__header {
//   border-bottom: 1px solid #e1e1e1;
//   padding-bottom: 20px;
// }
.layout_main .intperts .el-input__inner {
  padding: 0 0 0 15px;
}
</style>
