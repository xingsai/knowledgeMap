/* * @Author: mikey.ZGH * @Date: 2020-09-21 11:25:24 * @Last Modified by:
mikey.ZGH * @Last Modified time: 2020-09-21 11:25:24 */
<template>
  <!--培训管理-培训计划-组件 -->
  <div class="Initiation-wap" ref="tableBox">
    <div class="wxc-tabs ">
      <el-form label-position="top" inline>
        <el-row class="searchArea">
          <el-col :span="5">
            <el-form-item prop="userName" label="计划名称">
              <el-input
                size="small"
                type="text"
                :clearable="true"
                v-model="searchParams.materialTittle"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="userName" label="创建人">
              <el-input
                size="small"
                type="text"
                :clearable="true"
                v-model="searchParams.materialTittle"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item prop="userName" label="创建时间">
              <el-input
                size="small"
                type="text"
                :clearable="true"
                v-model="searchParams.materialTittle"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item class="butBox">
              <el-button type="primary" size="small" @click="searchTableInfo"
                >查询</el-button
              >
              <!-- <el-button size="small" class="cancelBtn" @click="reset('1')"
                >重置</el-button
              > -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
          <!-- 复用的table -->
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
            <el-table-column prop="indexs" label="序号"> </el-table-column>
            <el-table-column prop="materialTittle" label="标题">
              <template slot-scope="scope">
                <span>{{ scope.row.materialTittle }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="materialTypeName" label="类型">
              <template slot-scope="scope">
                <span>{{ scope.row.materialTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="businessTypeName" label="分类">
              <template slot-scope="scope">
                <span>{{ scope.row.businessTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createUserName" label="创建人">
              <template slot-scope="scope">
                <span>{{ scope.row.createUserName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" class="columnEdit">
              <template slot-scope="scope">
                <span
                  @click="detailspy(scope.row)"
                  style="color:#1578ff; cursor: pointer;float: left;margin-right: 10px;"
                  >详情</span
                >
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
  </div>
</template>
<script>
import { baseURL, author } from '@/service'
import { tableMethods } from '@/libs/mixintable'
export default {
  name: 'trainingplan',
  props: { activeName: '' },
  mixins: [tableMethods],
  data() {
    return {
      searchParams: {
        date: [],
        materialTittle: '',
      },
      dialogVisible1: false,
      tableData: [],
      loading1: false,
    }
  },
  mounted() {},
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
        .post('/party/materialCenter/delBases', {
          ids: this.selectList,
        })
        .then(({ data }) => {
          if (data.code == 0) {
            this.$message({
              message: '删除成功',
              type: 'success',
            })
            this.dialogVisible1 = false
            // this.searchTableInfo()
          }
        })
        .catch((err) => {
          // this.$message({
          //   type: 'warning',
          // })
        })
    },

    // 查询
    searchTableInfo() {
      this.$http.author
        .post('/party/materialCenter/baseList', {
          moduleCode: this.activeName, //类型：String  必有字段  备注：党建模块(01：支部组织架构；02：支部规范动作；03：党建理论；04：支部成果展示；05：做法创新；06：廉政文化馆；07：典型引路；08：支部共建共享)
          createBeginTime: this.searchParams.date[0], //类型：String  可有字段  备注：创建开始时间
          createEndTime: this.searchParams.date[1], //类型：String  可有字段  备注：创建结束时间
          materialTittle: this.searchParams.materialTittle, //类型：String  可有字段  备注：素材标题
          currentPage: this.page, //类型：String  必有字段  备注：当前所在页码
          pageSize: this.pageSize, //类型：String  必有字段  备注：每页记录数
        })
        .then(({ data }) => {
          this.loading = false
          if (data.success === true) {
            /*添加序号*/
            let resultData = []
            if (data.data.baseList && data.data.baseList.length > 0) {
              data.data.baseList.forEach((item, index) => {
                item.indexs =
                  this.page * this.pageSize + index - (this.pageSize - 1)
                resultData.push(item)
              })
            }
            this.tableData = resultData
            this.totalCount = data.data.baseTotal
          } else {
            console.log(data.message)
          }
        })
    },
    // 新增
    articlelist() {},
  },
}
</script>
<style lang="less">
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
</style>
