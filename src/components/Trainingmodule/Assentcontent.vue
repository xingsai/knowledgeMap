/* * @Author: mikey.ZGH * @Date: 2020-09-21 11:30:57 * @Last Modified by:
mikey.ZGH * @Last Modified time: 2020-09-21 11:30:57 */
<template>
  <!-- 培训管理-考核内容-组件 -->
  <div class="Initiat-wap" ref="tableBox">
    <div class="wxc-tabs ">
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
            <el-table-column prop="indexs" label="序号" width="70">
            </el-table-column>
            <el-table-column
              prop="examTopic"
              label="题目名称"
              show-overflow-tooltip
              width="400"
            >
              <template slot-scope="scope">
                <span
                  @click="artdetails(scope.row.id)"
                  style="color:#1578ff;cursor: pointer;"
                  >{{ scope.row.examTopic }}</span
                >
              </template>
            </el-table-column>
            <el-table-column prop="examTypeName" label="题型">
              <template slot-scope="scope">
                <span>{{ scope.row.examTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="examSortName"
              label="知识分类"
              show-overflow-tooltip
              width="200"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.examSortName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="correctAnswer"
              label="正确答案"
              width="300"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span class="limitSP">{{ scope.row.correctAnswer }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" class="columnEdit">
              <template slot-scope="scope">
                <span
                  @click="handedit(scope.row)"
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
    <!-- 新增题目 -->
    <div class="content_wrap" v-if="sercadd">
      <!-- 返回按钮 -->
      <div class="layout_header">
        <span>
          <el-button type="text" icon="el-icon-arrow-left" @click="resetForm()"
            >返回</el-button
          >
        </span>
        <span>{{ title }}</span>
      </div>
      <!-- 新增编辑修改 -->
      <div class="layout_main">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="165px"
          class="demo-ruleForm"
        >
          <el-form-item label="标题" prop="materialTittle">
            <el-input v-model="ruleForm.materialTittle"></el-input>
          </el-form-item>
          <el-form-item
            label="分类"
            prop="businessType"
            value-key="id"
            v-if="busType"
          >
            <el-select
              v-model="ruleForm.businessType"
              value-key="id"
              placeholder="请选择"
            >
              <el-option
                v-for="item in optionslist"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <!-- 新增文章的发布按钮 -->
            <el-button type="primary" @click="submitFormax('ruleForm')"
              >保存</el-button
            >
            <el-button @click="resetForm()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 详情 -->
    <el-dialog :visible.sync="dialogFormVisible1" class="dioginsf">
      <span class="dialongspan" slot="title">查看题目</span>
      <el-form :model="radioForm">
        <el-form-item>
          <span>{{ radioForm.examTopic }}</span>
        </el-form-item>
        <el-form-item v-if="radiomay">
          <el-radio-group v-model="radioForm.checkList">
            <el-radio
              v-for="(item, index) in checkboxlist"
              :key="index"
              :label="item.id"
              >{{ item.examAnswer }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="checkboxmay">
          <el-checkbox-group v-model="radioForm.checkList">
            <el-checkbox
              v-for="(item, index) in checkboxlist"
              :key="index"
              :label="item.id"
              >{{ item.examAnswer }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="judgemax">
          <el-radio-group v-model="radioForm.checkList">
            <el-radio
              v-for="(item, index) in checkboxlist"
              :key="index"
              :label="item.id"
              >{{ item.examAnswer }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增修改页面 -->
  </div>
</template>
<script>
import { baseURL, author } from '@/service'
import { tableMethods } from '@/libs/mixintable'
export default {
  name: 'Assentcontent',
  props: { activeName: '' },
  mixins: [tableMethods],
  data() {
    return {
      searchParams: {
        date: [],
        materialTittle: '',
      },
      dialogVisible1: false,
      dialogFormVisible1: false,
      tableData: [],
      loading1: false,
      ruleForm: {},
      title: '',
      sercadd: false,

      radioForm: {
        id: '', //类型：String  必有字段  备注：题目id
        examSort: '', //类型：String  必有字段  备注：知识分类
        examSortName: '', //类型：String  必有字段  备注：知识分类名称
        examType: '', //类型：String  必有字段  备注：题型 01：单选 02：多选 03：判断
        examTopic: '', //类型：String  必有字段  备注：题目
        // examAnswerList: [], //类型：Array  必有字段  备注：答案list
        isCorrect: '',
      },
      examAnswerList: [],
      checkboxlist: [],
      radiomay: false,
      checkboxmay: false,
      judgemax: false,
    }
  },
  // mounted() {
  //   this.searchTableInfo()
  // },
  created() {
    this.searchTableInfo()
  },

  methods: {
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
        .post('/training/examTopic/delExamTopics', {
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
        .post('/training/examTopic/getExamTopicList', {
          currentPage: this.page, //类型：String  必有字段  备注：当前所在页码
          pageSize: this.pageSize, //类型：String  必有字段  备注：每页记录数
        })
        .then(({ data }) => {
          this.loading = false
          if (data.success === true) {
            /*添加序号*/
            let resultData = []
            if (data.data.examTopicList && data.data.examTopicList.length > 0) {
              data.data.examTopicList.forEach((item, index) => {
                item.indexs =
                  this.page * this.pageSize + index - (this.pageSize - 1)
                resultData.push(item)
              })
            }
            this.tableData = resultData
            this.totalCount = data.data.examTopicTotal
          } else {
            console.log(data.message)
          }
        })
    },
    // 详情
    artdetails(v) {
      this.dialogFormVisible1 = true
      this.$http.author
        .post('/training/examTopic/getExamTopicDetail', {
          id: v,
        })
        .then((data) => {
          let result = data.data.data
          let examType = result.examType
          if (examType == '01') {
            this.radiomay = true
            this.checkboxmay = false
            this.judgemax = false
          } else if (examType == '02') {
            this.radiomay = false
            this.checkboxmay = true
            this.judgemax = false
          } else if (examType == '03') {
            this.radiomay = false
            this.checkboxmay = false
            this.judgemax = true
          }
          this.radioForm = result
          this.checkboxlist = result.examAnswerList
          let list1 = [],
            str
          for (let i = 0; i < result.examAnswerList.length; i++) {
            if (result.examAnswerList[i].isCorrect == '1') {
              if (examType == '02') {
                list1.push(result.examAnswerList[i].id)
              } else {
                str = result.examAnswerList[i].id
              }

              console.log(list1)
              console.log(str)
            }
            if (examType == '02') {
              this.$set(this.radioForm, 'checkList', list1)
            } else {
              this.$set(this.radioForm, 'checkList', str)
            }
          }
        })
    },
    // 新增
    articlelist() {
      this.$router.push({
        path: '/partytrain/added',
        query: {
          id: 2,
        },
      })
    },
    // 编辑
    handedit(item) {
      this.$router.push({
        path: '/partytrain/added',
        query: {
          id: 3,
          topicId: item.id,
          sign: true,
        },
      })
    },
  },
}
</script>
<style lang="less">
.Initiat-wap {
  padding-top: 30px;
  background-color: #fff;
}
.Initiat-wap .searchArea {
  padding: 0 20px;
}
.Initiat-wap .el-range-editor.el-input__inner,
.Initiat-wap .el-date-editor.el-input {
  width: 100%;
}
.Initiat-wap .butBox {
  text-align: right;
  // margin-top: 18px;
}
.Initiat-wap .cancelBtn {
  border-color: #42c5be;
  color: #42c5be;
}
.Initiat-wap .tableBox {
  padding: 10px 20px 20px 20px;
  // min-height: 80vh;
  /* background-color: #f2f2f2; */
}
.Initiat-wap .btnlist {
  // text-align: right;
}
.Initiat-wap .dataTable {
  margin-top: 16px;
}
.Initiat-wap .textarea {
  position: relative;
}
.Initiat-wap .textarea .tit {
  position: absolute;
  bottom: 0px;
  right: 5px;
  font-size: 12px;
  color: #ccc;
}
.Initiat-wap .redColor {
  color: #ca5a59;
}
.Initiat-wap .giveBtn {
  color: #ca5a59;
}
.Initiat-wap .vue-treeselect__control-arrow-container {
  display: none !important;
}
.Initiat-wap .treeIcon {
  position: absolute;
  right: 10px;
  top: 8px;
  color: #42c5be;
  background-color: #fff;
}
.Initiat-wap .overHidden {
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
  white-space: nowrap;
}
.Initiat-wap .el-form-item--small.el-form-item {
  margin-bottom: 10px;
}
.Initiat-wap .el-dialog__body {
  padding-bottom: 20px;
  color: #666;
  padding: 20px;
}
.Initiat-wap .curser {
  cursor: pointer;
}
.Initiat-wap .el-form--inline .el-form-item__content {
  display: inline-block !important;
  margin-left: 10px;
}
.Initiat-wap .el-button--small {
  padding: 8px 12px;
}
.Initiat-wap .btnlist .el-button--small {
  background: #ffffff;
  border: 1px solid #1890ff;
  border-radius: 2px;
  font-size: 14px;
  color: #1578ff;
}

.Initiat-wap .content_wrap {
  padding: 0;
}
.Initiat-wap .content_wrap .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.Initiat-wap .content_wrap .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.Initiat-wap .content_wrap .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.Initiat-wap .content_wrap .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.Initiat-wap .content_wrap .layout_main {
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

.Initiat-wap .uploaddeom .el-upload {
  float: left;
  margin-right: 15px;
}
.Initiat-wap .el-upload__tip {
  margin-top: 0;
}
.Initiat-wap .el-upload-list {
  width: 600px;
}

//
.Initiat-wap .edity_title {
  width: 100%;
  text-align: center;
  // margin-top: 60px;
  height: 120px;
  border-bottom: 1px solid #dfe6ec;
  p {
    font-size: 24px;
    color: #333333;
    padding: 50px 0 20px 0;
  }
  span {
    font-size: 14px;
    color: #999999;
  }
}
.Initiat-wap .edity_url {
  height: 500px;
  margin: 30px 600px;
  img {
    width: 100%;
    height: 100%;
  }
}
.Initiat-wap .dialog_wap .el-dialog__header {
  // border-bottom: 1px solid #e1e1e1;
  padding-bottom: 20px;
  padding: 20px;
  padding-bottom: 10px;
  font-size: 18px;
  color: #333;
}
.Initiat-wap .el-radio-group {
  display: inherit;
}
.Initiat-wap .el-radio {
  width: 100%;
  margin-right: 0;
  margin-bottom: 10px;
  white-space: normal;
}
.dioginsf .el-form-item--small .el-form-item__content {
  line-height: 20px;
}
.limitSP {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dioginsf .el-checkbox__input {
  display: inherit;
  float: left;
}
.dioginsf .el-checkbox {
  margin-right: 5px;
  display: inherit;
  margin: 10px 0;
}
.dioginsf .el-checkbox__label {
  white-space: normal;
  padding-right: 20px;
}
.dioginsf .el-checkbox__inner {
  margin-top: 3px;
}
.el-dialog__header {
  // border-bottom: 1px solid #e1e1e1;
  padding-bottom: 20px;
  padding: 20px;
  padding-bottom: 10px;
  font-size: 18px;
  color: #333;
}
// .dioginsf .el-dialog__header {
//   border-bottom: 1px solid #ccc;
// }
</style>
