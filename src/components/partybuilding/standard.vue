/* * @Author: mikey.ZGH * @Date: 2020-09-15 16:46:08 * @Last Modified by:
mikey.ZGH * @Last Modified time: 2020-09-15 16:46:08 */
<template>
  <!-- 维护查询页面 -->
  <div class="Initiatint-wap" ref="tableBox">
    <div class="wxc-tabs " v-if="serch">
      <!-- 搜索区域 start -->
      <div class="search-wrap">
        <div class="search-form-wrap">
          <el-row :gutter="20" style="margin-bottom: 20px">
            <el-col :span="10">
              <div class="flex-wrap">
                <div class="input-label">时间范围</div>
                <el-date-picker
                  v-model="searchParams.date"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex-wrap">
                <div class="input-label">标题</div>
                <el-input
                  size="small"
                  type="text"
                  :clearable="true"
                  v-model="searchParams.materialTittle"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="search-btn-wrap">
                <el-button type="primary" size="small" @click="searchTableInfo"
                  >查询</el-button
                >
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-row class="tableBox">
        <el-row>
          <el-row class="btnlist">
            <el-button size="small" @click="articlelist" v-if="btoon1">
              新增文章
            </el-button>
            <el-button size="small" @click="addimglist" v-if="btoon2"
              >新增图片</el-button
            >
            <el-button size="small" @click="addvideo" v-if="btoon3"
              >新增视频</el-button
            >
            <el-button size="small" @click="dialogbtoon" v-if="btoon4"
              >删除</el-button
            >
            <el-button size="small" @click="TitleRules" v-if="btoon5"
              >题目规则</el-button
            >
            <el-button size="small" @click="Integralrule" v-if="btoon6"
              >积分规则</el-button
            >
            <el-button size="small" @click="Learning" v-if="btoon7"
              >学习感悟</el-button
            >
            <el-button size="small" @click="Speechspirit" v-if="btoon8"
              >讲话精神</el-button
            >
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
            v-if="btoon14"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="indexs" label="序号"> </el-table-column>
            <el-table-column
              prop="materialTittle"
              label="标题"
              width="400"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span class="limitSP">{{ scope.row.materialTittle }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="materialTypeName" label="类型">
              <template slot-scope="scope">
                <span>{{ scope.row.materialTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="businessTypeName"
              label="分类"
              v-if="btoon13"
            >
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
                  v-if="btoon9"
                  style="color:#1578ff; cursor: pointer;float: left;margin-right: 10px;"
                  >详情</span
                >
                <span
                  @click="handedit(scope.row)"
                  v-if="btoon10"
                  style="color:#1578ff; cursor: pointer;float: left;margin-right: 10px;"
                  >编辑</span
                >
                <span
                  @click="handleClick()"
                  v-if="btoon11"
                  style="color:#1578ff; cursor: pointer;float: left;margin-right: 10px;"
                  >公开</span
                >
                <span
                  @click="handleClick()"
                  v-if="btoon12"
                  style="color:#F79300; cursor: pointer;float: left;margin-right: 10px;"
                  >不公开</span
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 民意直通字段过多不一样新的table展示 -->
          <el-table
            style="width: 100%"
            :data="tableData"
            @select-all="handleSelectAll"
            @select="handleSelect"
            v-loading="loading1"
            size="small"
            border
            v-if="btoon15"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="indexs" label="序号">
              <template slot-scope="scope">
                <span>{{ scope.row.indexs }}</span>
              </template>
            </el-table-column>
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
            <el-table-column
              prop="businessTypeName"
              label="分类"
              v-if="btoon13"
            >
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
            <el-table-column prop label="操作" width="200" class="columnEdit">
              <template>
                <span
                  @click="handleClick1()"
                  v-if="btoon9"
                  style="color:#1578ff; cursor: pointer;float: left;margin-right: 10px;"
                  >详情</span
                >
                <span
                  @click="handedit2()"
                  v-if="btoon10"
                  style="color:#1578ff; cursor: pointer;float: left;margin-right: 10px;"
                  >编辑</span
                >
                <span
                  @click="handleClick2()"
                  v-if="btoon11"
                  style="color:#1578ff; cursor: pointer;float: left;margin-right: 10px;"
                  >公开</span
                >
                <span
                  @click="handleClick3()"
                  v-if="btoon12"
                  style="color:#F79300; cursor: pointer;float: left;margin-right: 10px;"
                  >不公开</span
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

    <!-- 这里是新增编辑部分的页面 组件太麻烦了-->
    <!-- 维护页面的新增编辑 -->
    <div class="content_wrap" v-if="sercadd">
      <!-- 返回按钮 -->
      <div class="layout_header">
        <span>
          <el-button
            type="text"
            class="layout_size"
            icon="el-icon-arrow-left"
            @click="resetForm()"
            >返回</el-button
          >
        </span>
        <span>{{ title }}</span>
      </div>
      <!-- 新增编辑修改 -->
      <div class="layout_main">
        <el-form
          :model="ruleForm"
          :rules="rules"
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
          <el-form-item v-if="isconter">
            <span slot="label">
              <i class="redStae">*</i>
              内容
            </span>
            <richtextEditor
              :value="ruleForm.materialContent"
              ref="richtextEditor"
              :index="'1'"
            ></richtextEditor>
          </el-form-item>
          <el-form-item v-if="isimgs">
            <span slot="label">
              <i class="redStae">*</i>
              图片
            </span>
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
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
          <el-form-item class="uploaddeom" v-if="isvideos">
            <span slot="label">
              <i class="redStae">*</i>
              视频
            </span>
            <el-upload
              class="upload-demo"
              :accept="acct"
              action="/file/upload/video"
              :http-request="avatarUpload"
              :file-list="filevideo"
              :before-upload="beforeUpload1"
              :on-remove="handleRemove1"
              :limit="limit"
            >
              <el-button size="small" type="primary">上传视频</el-button>
              <div slot="tip" class="el-upload__tip">
                支持上传mp4文件,不超过100M
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <!-- 新增文章的发布按钮 -->
            <el-button
              type="primary"
              v-if="issubmax"
              @click="submitFormax('ruleForm')"
              >发布</el-button
            >
            <!-- 新增视频图片的发布按钮 -->
            <el-button
              type="primary"
              v-if="issubpor"
              @click="submitForm('ruleForm')"
              >发布</el-button
            >
            <!-- 文章修改发布的按钮 -->
            <el-button
              type="primary"
              v-if="issubmpor"
              @click="submitFormpor('ruleForm')"
              >发布</el-button
            >
            <!-- 视频图片发布的按钮 -->
            <el-button
              type="primary"
              v-if="issubFormbt"
              @click="submitFormbt('ruleForm')"
              >发布</el-button
            >
            <el-button @click="resetForm()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 查看图片的详情 -->
    <div class="content_wrap" v-if="kanimg">
      <!-- 返回按钮 -->
      <div class="layout_header">
        <span>
          <el-button
            type="text"
            class="layout_size"
            icon="el-icon-arrow-left"
            @click="resetodu()"
            >返回</el-button
          >
        </span>
        <span>详情</span>
      </div>
      <div style="padding: 0 20px;">
        <div class="edity_title">
          <p>{{ schor.materialTittle }}</p>
          <span v-if="btoon16">分类：{{ schor.businessTypeName }}</span>
        </div>
        <div class="edity_url">
          <img :src="schor.imageUrl" alt="" />
        </div>
      </div>
    </div>
    <!-- 查看视频的详情 -->
    <div class="content_wrap" v-if="kanvideo">
      <!-- 返回按钮 -->
      <div class="layout_header">
        <span>
          <el-button
            type="text"
            class="layout_size"
            icon="el-icon-arrow-left"
            @click="resetodu()"
            >返回</el-button
          >
        </span>
        <span>详情</span>
      </div>
      <div style="padding: 0 20px;">
        <div class="edity_title">
          <p>{{ schor.materialTittle }}</p>
          <span v-if="btoon17">分类：{{ schor.businessTypeName }}</span>
        </div>
        <div class="edity_url">
          <videowrap :options="options"></videowrap>
        </div>
      </div>
    </div>
    <!-- 查看文章的详情 -->
    <div class="content_wrap" v-if="kanconter">
      <!-- 返回按钮 -->
      <div class="layout_header">
        <span>
          <el-button
            type="text"
            class="layout_size"
            icon="el-icon-arrow-left"
            @click="resetodu()"
            >返回</el-button
          >
        </span>
        <span>详情</span>
      </div>
      <div style="padding: 0 20px;">
        <div class="edity_title">
          <p>{{ schor.materialTittle }}</p>
          <span v-if="btoon18">分类：{{ schor.businessTypeName }}</span>
        </div>
        <div class="edity_iocs">
          <div
            style="line-height: 25px;"
            v-html="schor.materialContentHtml"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { baseURL, author } from '@/service'
import { tableMethods } from '@/libs/mixintable'
import newlyadded from '@/components/partybuilding/newlyadded_edit'
import richtextEditor from '@/components/Editor/editor'
import videowrap from '@/components/common/video'
export default {
  props: {
    activeName: '',
    value: '',
  },
  name: 'standard',
  mixins: [tableMethods],
  components: { newlyadded, richtextEditor, videowrap },
  data() {
    return {
      limit: 1,
      dialogVisible1: false,
      // 根据不同的值渲染不同的按钮和table
      btoon1: true, // 新增文章
      btoon2: true, //新增图片
      btoon3: true, //新增视频
      btoon4: true, //删除
      btoon5: true, //题目规则
      btoon6: true, //积分规则
      btoon7: true, //学习感悟
      btoon8: true, //讲话精神
      // 按钮
      btoon9: true, //详情
      btoon10: true, //编辑
      btoon11: true, //公开
      btoon12: true, //不公开
      // table
      btoon13: true,
      btoon14: true,
      btoon14: false,
      btoon15: false,
      searchParams: {
        date: [],
        materialTittle: '',
      },
      tableData: [],
      loading1: false,
      //查询部分的显示影藏
      serch: true,
      sercadd: false,
      // 新增修改的部分显示影藏
      isconter: false, //新增修改文章的显示影藏
      isimgs: false, //新增修改图片的显示影藏
      isvideos: false, //新增修改视频的显示影藏
      issubmax: true, //新增修改文章按钮不同的显示影藏 接口不一样
      issubpor: false, //新增修改文章按钮不同的显示影藏 接口不一样
      busType: true,
      issubmpor: false,
      issubFormbt: false,
      // 新增编辑部分
      ruleForm: {
        materialContent: '', //内容
        id: '', //类型：String  必有字段  备注：无
        materialTittle: '', //类型：String  必有字段  备注：素材标题
        businessType: '', //类型：String  必有字段  备注：分类
        businessTypeName: '', //类型：String  必有字段  备注：分类名称
        imageUrl: '', //类型：String  必有字段  备注：图片url
        videoUrl: '', //类型：String  必有字段  备注：视频url
        videoImageUrl: '', //类型：String  必有字段  备注：视频缩略图url
        format: '', //类型：String  必有字段  备注：视频或图片格式
        videoImageFormat: '', //类型：String  必有字段  备注：视频缩略图格式
      },
      // 校验
      rules: {
        materialTittle: [
          { required: true, message: '请输入标题', trigger: 'blur' },
        ],
        // businessType: [
        //   { required: true, message: '请选择分类', trigger: 'change' },
        // ],
        // materialContent: [
        //   { required: true, message: '请输入内容', trigger: 'change' },
        // ],
      },
      optionslist: [],
      title: '',
      dialogImageUrl: '',
      dialogVisible: false,
      // value: '',
      imageUrl: '',
      imgId: {},
      imageUrllist: [],
      filevideour: [],
      // 视频
      filePathlist: [], //记录所有的返回地址id
      fileList: [],
      filevideo: [],
      filevideolist: [], //记录所有的返回地址id
      acept: '.png,.jpg,.jpeg,.PNG,.JPG,.JPEG', //文件上传格式
      acct: '.mp4,.MP4,', //视频上传格式

      // 查看部分的显示影藏
      kanimg: false, //图片的影藏
      kanvideo: false, //视频的影藏
      kanconter: false,
      btoon16: true,
      btoon17: true,
      btoon18: true,
      //
      schor: {
        materialTittle: '',
        businessTypeName: '',
        imageUrl: '', //类型：String  必有字段  备注：图片url
        videoUrl: '', //类型：String  必有字段  备注：视频url
        videoImageUrl: '', //类型：String  必有字段  备注：视频缩略图url
        format: '', //类型：String  必有字段  备注：视频或图片格式
        videoImageFormat: '', //类型：String  必有字段  备注：视频缩略图格式
      },
      options: {},
      editor: '',
      // editor: '', //清空富文本时需要添加的
    }
  },
  watch: {
    activeName(val, oldVal) {
      this.reser()
      this.activeName = val
      this.getifelse()
      this.serch = true
      this.sercadd = false
      this.searchTableInfo()
    },
  },

  methods: {
    findWaitEntryList() {},
    handleSelectionChange() {},
    // 判断
    getifelse() {
      // console.log(this.activeName)
      let v = this.activeName
      if (v == '02') {
        this.reser()
        this.btoon1 = true
        this.btoon2 = false
        this.btoon3 = true
        this.btoon4 = true
        this.btoon5 = false
        this.btoon6 = true
        this.btoon7 = true
        this.btoon8 = true
        this.btoon9 = true
        this.btoon10 = true
        this.btoon11 = false
        this.btoon12 = false
        this.btoon13 = true
        this.btoon14 = true
        this.btoon15 = false
        this.busType = true
        this.btoon16 = false
        this.btoon17 = false
        this.btoon18 = false
        this.kanimg = false //图片的影藏
        this.kanvideo = false //视频的影藏
        this.kanconter = false
      } else if (v == '03') {
        this.reser()
        this.btoon1 = true
        this.btoon2 = true
        this.btoon3 = true
        this.btoon4 = true
        this.btoon5 = true
        this.btoon6 = false
        this.btoon7 = false
        this.btoon8 = false
        this.btoon9 = true
        this.btoon10 = true
        this.btoon11 = false
        this.btoon12 = false
        this.btoon13 = false
        this.btoon14 = true
        this.btoon15 = false
        this.busType = false
        this.btoon16 = false
        this.btoon17 = false
        this.btoon18 = false
        this.kanimg = false //图片的影藏
        this.kanvideo = false //视频的影藏
        this.kanconter = false
      } else if (v == '04') {
        this.reser()
        this.btoon1 = true
        this.btoon2 = true
        this.btoon3 = true
        this.btoon4 = true
        this.btoon5 = false
        this.btoon6 = false
        this.btoon7 = false
        this.btoon8 = false
        this.btoon9 = true
        this.btoon10 = true
        this.btoon11 = false
        this.btoon12 = false
        this.btoon13 = false
        this.btoon14 = true
        this.btoon15 = false
        this.busType = false
        this.btoon16 = false
        this.btoon17 = false
        this.btoon18 = false
        this.kanimg = false //图片的影藏
        this.kanvideo = false //视频的影藏
        this.kanconter = false
      } else if (v == '05') {
        this.reser()
        this.btoon1 = true
        this.btoon2 = true
        this.btoon3 = false
        this.btoon4 = true
        this.btoon5 = false
        this.btoon6 = false
        this.btoon7 = false
        this.btoon8 = false
        this.btoon9 = true
        this.btoon10 = true
        this.btoon11 = false
        this.btoon12 = false
        this.btoon13 = false
        this.btoon14 = true
        this.btoon15 = false
        this.busType = false
        this.btoon16 = false
        this.btoon17 = false
        this.btoon18 = false
        this.kanimg = false //图片的影藏
        this.kanvideo = false //视频的影藏
        this.kanconter = false
      } else if (v == '06') {
        this.reser()
        this.btoon1 = true
        this.btoon2 = true
        this.btoon3 = true
        this.btoon4 = true
        this.btoon5 = false
        this.btoon6 = false
        this.btoon7 = false
        this.btoon8 = false
        this.btoon9 = true
        this.btoon10 = true
        this.btoon11 = false
        this.btoon12 = false
        this.btoon13 = false
        this.btoon14 = true
        this.btoon15 = false
        this.busType = false
        this.btoon16 = false
        this.btoon17 = false
        this.btoon18 = false
        this.kanimg = false //图片的影藏
        this.kanvideo = false //视频的影藏
        this.kanconter = false
      } else if (v == '07') {
        this.reser()
        this.btoon1 = true
        this.btoon2 = true
        this.btoon3 = false
        this.btoon4 = true
        this.btoon5 = false
        this.btoon6 = false
        this.btoon7 = false
        this.btoon8 = false
        this.btoon9 = true
        this.btoon10 = true
        this.btoon11 = false
        this.btoon12 = false
        this.btoon13 = false
        this.btoon14 = true
        this.btoon15 = false
        this.busType = false
        this.btoon16 = false
        this.btoon17 = false
        this.btoon18 = false
        this.kanimg = false //图片的影藏
        this.kanvideo = false //视频的影藏
        this.kanconter = false
      } else if (v == '08') {
        this.reser()
        this.btoon1 = false
        this.btoon2 = false
        this.btoon3 = true
        this.btoon4 = true
        this.btoon5 = false
        this.btoon6 = false
        this.btoon7 = false
        this.btoon8 = false
        this.btoon9 = true
        this.btoon10 = true
        this.btoon11 = false
        this.btoon12 = false
        this.btoon13 = true
        this.btoon14 = true
        this.btoon15 = false
        this.busType = true
        this.btoon16 = false
        this.btoon17 = false
        this.btoon18 = false
        this.kanimg = false //图片的影藏
        this.kanvideo = false //视频的影藏
        this.kanconter = false
      } else if (v == '09') {
        this.serch = false
        this.sercadd = false
        this.btoon15 = false
        this.reser()
      } else if (v == '10') {
        this.serch = false
        this.sercadd = false
        this.btoon15 = false
        this.reser()
        // this.reser()
        // this.btoon1 = false
        // this.btoon2 = false
        // this.btoon3 = false
        // this.btoon4 = false
        // this.btoon5 = false
        // this.btoon6 = false
        // this.btoon7 = false
        // this.btoon8 = false
        // this.btoon9 = false
        // this.btoon10 = false
        // this.btoon11 = true
        // this.btoon12 = true
        // this.btoon16 = false
        // this.btoon17 = false
        // this.btoon18 = false
        // this.kanimg = false //图片的影藏
        // this.kanvideo = false //视频的影藏
        // this.kanconter = false
      } else if (v == '11') {
        this.serch = false
        this.sercadd = false
        this.btoon15 = false
        this.reser()
        // this.btoon1 = false
        // this.btoon2 = false
        // this.btoon3 = false
        // this.btoon4 = false
        // this.btoon5 = false
        // this.btoon6 = false
        // this.btoon7 = false
        // this.btoon8 = false
        // this.btoon9 = false
        // this.btoon10 = false
        // this.btoon11 = false
        // this.btoon12 = false
        // this.btoon16 = false
        // this.btoon17 = false
        // this.btoon18 = false
        // this.kanimg = false //图片的影藏
        // this.kanvideo = false //视频的影藏
        // this.kanconter = false
      }
    },
    // 查询方法
    searchTableInfo() {
      let v = this.activeName
      if (v == '09') {
        this.serch = false
        this.sercadd = false
        this.btoon15 = false
        this.reser()
        this.$message({
          message: '正在开发中',
          type: 'warning',
        })
      } else if (v == '10') {
        this.serch = false
        this.sercadd = false
        this.btoon15 = false
        this.reser()
        this.$message({
          message: '正在开发中',
          type: 'warning',
        })
      } else if (v == '11') {
        this.serch = false
        this.sercadd = false
        this.btoon15 = false
        this.reser()
        this.$message({
          message: '正在开发中',
          type: 'warning',
        })
      } else {
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
      }
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
            this.searchTableInfo()
          }
        })
        .catch((err) => {
          // this.$message({
          //   type: 'warning',
          // })
        })
    },

    //分类下拉
    getinnoSort() {
      this.$http.author
        .post('/party/materialCenter/getBusinessTypeList', {
          moduleCode: this.activeName,
        })
        .then((res) => {
          let result = res.data
          this.optionslist = result.data.businessTypeList
        })
    },
    // 取消返回的处理逻辑
    resetForm() {
      this.getempty()
      this.serch = true
      this.sercadd = false
      this.searchTableInfo()
    },
    // 清空from表达的所有输入框
    getempty() {
      this.ruleForm = {
        materialTittle: '',
        businessType: '',
        materialContent: '',
      }
      this.fileList = []
      this.filevideo = []
      this.filePathlist = []
      this.filevideolist = []
      // this.$refs.richtextEditor.editor.txt.clear() //清空富文本的内容
    },
    // 新增文章
    articlelist() {
      this.serch = false
      this.sercadd = true
      this.title = '新增文章'
      this.getinnoSort()
      this.isconter = true
      this.isimgs = false
      this.isvideos = false
      this.issubmax = true
      this.issubpor = false
      this.materialType = '01'
      this.issubmpor = false
    },
    //新增文章的提交
    submitFormax(formName) {
      let parents = {
        moduleCode: this.activeName, //类型：String  必有字段  备注：党建模块
        materialTittle: this.ruleForm.materialTittle, //类型：String  必有字段  备注：文件标题
        materialType: this.materialType, //类型：String  必有字段  备注：素材类型 01：文章 02：图片 03：视频
        businessType: this.ruleForm.businessType, //类型：String  必有字段  备注：分类
        materialContent: this.$refs.richtextEditor.editor.txt.text(), //类型：String  必有字段  备注：文本内容
        materialContentHtml: this.$refs.richtextEditor.editor.txt.html(), //类型：String  必有字段  备注：带html的内容
      }
      if (this.$refs.richtextEditor.editor.txt.text() == '') {
        this.$message({
          message: '请填写内容',
          type: 'warning',
        })
      } else {
        this.$refs[formName].validate((valid) => {
          this.$http.author
            .post('/party/materialCenter/addmaterialArticle', parents)
            .then(({ data }) => {
              if (data.code == 0) {
                this.$message({
                  message: '发布成功',
                  type: 'success',
                })
              }
              this.getempty()
              this.serch = true
              this.sercadd = false
              this.searchTableInfo()
            })
            .catch((err) => {
              // this.$message({
              //   // message: '',
              //   type: 'warning',
              // })
            })
        })
      }
    },
    //新增图片
    addimglist() {
      this.serch = false
      this.sercadd = true
      this.title = '新增图片'
      this.getinnoSort()
      this.isconter = false
      this.isimgs = true
      this.isvideos = false
      this.issubmax = false
      this.issubpor = true
      this.materialType = '02'
      // let filePaid = this.filePathid
    },
    //新增视频
    addvideo() {
      this.serch = false
      this.sercadd = true
      this.title = '新增视频'
      this.getinnoSort()
      this.isconter = false
      this.isimgs = false
      this.isvideos = true
      this.issubmax = false
      this.issubpor = true
      this.materialType = '03'
      this.issubFormbt = false
      // let filePaid = this.imgpower
    },
    // 新增视频图片的发布按钮
    submitForm(formName) {
      if (this.materialType == '02') {
        this.filePaid = this.filePathlist[0]
      } else if (this.materialType == '03') {
        this.filePaid = this.filevideolist[0]
      }
      let parames = {
        moduleCode: this.activeName, //类型：String  必有字段  备注：党建模块
        materialTittle: this.ruleForm.materialTittle, //类型：String  必有字段  备注：文件标题
        materialType: this.materialType, //类型：String  必有字段  备注：素材类型 01：文章 02：图片 03：视频
        businessType: this.ruleForm.businessType, //类型：String  必有字段  备注：分类
        fileId: this.filePaid,
        artType: 'MI0002', //类型：String  必有字段  备注：档案类型
      }

      if (this.filePaid == undefined) {
        this.$message({
          message: '至少选择一个文件',
          type: 'warning',
        })
      } else {
        this.$refs[formName].validate((valid) => {
          this.$http.author
            .post('/party/materialCenter/addmaterialImgVideo', parames)
            .then(({ data }) => {
              if (data.code == 0) {
                this.$message({
                  message: '发布成功',
                  type: 'success',
                })
              }
              this.getempty()
              this.serch = true
              this.sercadd = false
              this.searchTableInfo()
            })
            .catch((err) => {})
        })
      }
    },
    //题目规则
    addsubject() {},
    //积分规则
    addintegral() {},
    //学习感悟
    addstudy() {},
    //讲话精神
    addspirit() {},

    // 图片视频处理部分
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
    beforeUpload1(file) {
      // console.log(file)
      return this.$util.checkFileType(file, this.acct)
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
    avatarUpload(config) {
      let { file, data } = config
      // 获取文件大小
      let fileSize = this.$util.wxc_countFileSize(file.size)
      // 限制文件大小的工具方法
      this.$http.author.upLoadFileMaxsize(fileSize, 100) &&
        this.$http.author
          .uploadFile1(config.file, '/file/upload/video')
          .then((data) => {
            this.imgpower = data.data.video.id
            this.filevideolist.push(this.imgpower)
          })
    },
    handleRemove(file, filePathlist) {
      // 删除多余的图片
      var index = this.filePathlist.findIndex((item) => {})
      this.filePathlist.splice(index, 1)
    },
    // 图片查看
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    // 删除视频
    handleRemove1(file, filevideolist) {
      var index = this.filevideolist.findIndex((item) => {})
      this.filevideolist.splice(index, 1)
    },
    handleClick1() {
      alert(1111)
    },
    handleClick2() {
      alert(1111)
    },
    handleClick3() {
      alert(1111)
    },
    // 编辑回显
    handedit(v) {
      // console.log(v)
      let r = v.materialType
      // console.log(r)
      if (r == '01') {
        this.isconter = true
        this.isimgs = false
        this.isvideos = false
        this.title = '编辑文章'
        this.issubmax = false
        this.issubpor = false
        this.issubmpor = true
        this.issubFormbt = false
      } else if (r == '02') {
        this.isconter = false
        this.isimgs = true
        this.isvideos = false
        this.title = '编辑图片'
        this.issubmax = false
        this.issubpor = false
        this.issubmpor = false
        this.issubFormbt = true
      } else if (r == '03') {
        this.isconter = false
        this.isimgs = false
        this.isvideos = true
        this.title = '编辑视频'
        this.issubmax = false
        this.issubpor = false
        this.issubmpor = false
        this.issubFormbt = true
      }
      this.serch = false
      this.sercadd = true
      this.$http.author
        .post('/party/materialCenter/getBaseDetail', {
          id: v.id,
          moduleCode: this.activeName,
        })
        .then((res) => {
          let result = res.data
          this.ruleForm = result.data
          this.ruleForm.materialContent = result.data.materialContentHtml
          let fileListimage = []
          let filePali = []
          for (let index = 0; index < result.data.fileArray.length; index++) {
            result.data.fileArray[index].url =
              result.data.fileArray[index].filePath
            filePali.push(result.data.fileArray[index].id)
            fileListimage.push(result.data.fileArray[index])
          }
          this.filePathlist = filePali
          this.fileList = fileListimage

          this.filevideo = result.data.fileArray
          let filevilt = []
          for (let index = 0; index < result.data.filevideo.length; index++) {
            filevilt.push(result.data.filevideo[index].id)
          }

          this.filevideolist = filevilt
        })
      this.getinnoSort()
    },
    // 文章的发布按钮
    submitFormpor(formName) {
      let parents = {
        id: this.ruleForm.id,
        moduleCode: this.activeName, //类型：String  必有字段  备注：党建模块
        materialTittle: this.ruleForm.materialTittle, //类型：String  必有字段  备注：文件标题
        materialType: this.materialType, //类型：String  必有字段  备注：素材类型 01：文章 02：图片 03：视频
        businessType: this.ruleForm.businessType, //类型：String  必有字段  备注：分类
        materialContent: this.$refs.richtextEditor.editor.txt.text(), //类型：String  必有字段  备注：文本内容
        materialContentHtml: this.$refs.richtextEditor.editor.txt.html(), //类型：String  必有字段  备注：带html的内容
      }
      if (this.$refs.richtextEditor.editor.txt.text() == '') {
        this.$message({
          message: '请填写内容',
          type: 'warning',
        })
      } else {
        this.$refs[formName].validate((valid) => {
          this.$http.author
            .post('/party/materialCenter/updatematerialArticle', parents)
            .then(({ data }) => {
              if (data.code == 0) {
                this.$message({
                  message: '发布成功',
                  type: 'success',
                })
              }
              this.getempty()
              this.serch = true
              this.sercadd = false
              this.searchTableInfo()
            })
            .catch((err) => {})
        })
      }
    },
    //图片视频的发布按钮
    submitFormbt(formName) {
      let res = this.ruleForm.materialType
      if (res == '02') {
        this.filePaid = this.filePathlist[0]
      } else if (res == '03') {
        this.filePaid = this.filevideolist[0]
      }
      let parames = {
        id: this.ruleForm.id,
        moduleCode: this.activeName, //类型：String  必有字段  备注：党建模块
        materialTittle: this.ruleForm.materialTittle, //类型：String  必有字段  备注：文件标题
        materialType: this.materialType, //类型：String  必有字段  备注：素材类型 01：文章 02：图片 03：视频
        businessType: this.ruleForm.businessType, //类型：String  必有字段  备注：分类
        fileId: this.filePaid,
        artType: 'MI0002', //类型：String  必有字段  备注：档案类型
      }
      if (this.filePaid == undefined) {
        this.$message({
          message: '至少选择一个文件',
          type: 'warning',
        })
      } else {
        this.$refs[formName].validate((valid) => {
          this.$http.author
            .post('/party/materialCenter/updatematerialImgVideo', parames)
            .then(({ data }) => {
              if (data.code == 0) {
                this.$message({
                  message: '发布成功',
                  type: 'success',
                })
              }
              this.getempty()
              this.serch = true
              this.sercadd = false
              this.searchTableInfo()
            })
            .catch((err) => {})
        })
      }
    },

    // 详情按钮
    detailspy(v) {
      let r = v.materialType
      if (r == '01') {
        this.kanconter = true
      } else if (r == '02') {
        this.kanimg = true
      } else if (r == '03') {
        this.kanvideo = true
      }
      let add = this.activeName
      if (add == '02') {
        this.btoon16 = true
        this.btoon17 = true
        this.btoon18 = true
      } else if (add == '08') {
        this.btoon16 = true
        this.btoon17 = true
        this.btoon18 = true
      } else {
        this.btoon16 = false
        this.btoon17 = false
        this.btoon18 = false
      }
      this.serch = false
      this.sercadd = false
      this.$http.author
        .post('/party/materialCenter/getBaseDetail', {
          id: v.id,
          moduleCode: this.activeName,
        })
        .then(({ data }) => {
          if (data.success === true) {
            this.schor = data.data
            this.schor.imageUrl = this.schor.fileArray[0].filePath
            this.options = Object.assign(
              {},
              {
                sources: [
                  {
                    //type: "video/mp4",
                    src: this.schor.fileArray[0].filePath, //"http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ"//
                  },
                ],
                poster: this.schor.fileArray[0].extFilePath, //"http://static.fdc.com.cn/avatar/usercenter/5996999fa093c04d4b4dbaf1_162.jpg ",
              }
            )
          } else {
            console.log()
          }
        })
    },
    // 详情取消
    resetodu() {
      this.serch = true
      this.sercadd = false
      this.kanimg = false //图片的影藏
      this.kanvideo = false //视频的影藏
      this.kanconter = false
      this.searchTableInfo()
    },
    reser() {
      this.searchParams = Object.assign(
        {},
        {
          date: [],
          materialTittle: '',
        }
      )
      console.log(111111)
      console.log(this.searchParams)
    },
    // 题目规则
    TitleRules() {
      this.$router.push({ name: 'gameQuestionRule' })
    },
    // 积分规则
    Integralrule() {
      this.$router.push({ name: 'integralRule' })
    },
    // 学习感悟
    Learning() {
      this.$message({
        message: '正在开发中',
        type: 'warning',
      })
    },
    // 讲话精神
    Speechspirit() {
      this.$message({
        message: '正在开发中',
        type: 'warning',
      })
    },
  },
}
</script>
<style lang="less" scoped>
@import '~@/assets/css/searchWrap.less';
.Initiatint-wap {
  padding-top: 30px;
  background-color: #fff;
}
.Initiatint-wap .searchArea {
  padding: 0 20px;
}
.Initiatint-wap .el-range-editor.el-input__inner,
.Initiatint-wap .el-date-editor.el-input {
  // width: 100%;
}
.Initiatint-wap .butBox {
  text-align: right;
  // margin-top: 18px;
}
.Initiatint-wap .cancelBtn {
  border-color: #42c5be;
  color: #42c5be;
}
.Initiatint-wap .tableBox {
  padding: 10px 20px 20px 20px;
  // min-height: 80vh;
  /* background-color: #f2f2f2; */
}
.Initiatint-wap .btnlist {
  // text-align: right;
}
.Initiatint-wap .dataTable {
  margin-top: 16px;
}
.Initiatint-wap .textarea {
  position: relative;
}
.Initiatint-wap .textarea .tit {
  position: absolute;
  bottom: 0px;
  right: 5px;
  font-size: 12px;
  color: #ccc;
}
.Initiatint-wap .redColor {
  color: #ca5a59;
}
.Initiatint-wap .giveBtn {
  color: #ca5a59;
}
.Initiatint-wap .vue-treeselect__control-arrow-container {
  display: none !important;
}
.Initiatint-wap .treeIcon {
  position: absolute;
  right: 10px;
  top: 8px;
  color: #42c5be;
  background-color: #fff;
}
.Initiatint-wap .overHidden {
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
  white-space: nowrap;
}
.Initiatint-wap .el-form-item--small.el-form-item {
  margin-bottom: 25px;
}
.Initiatint-wap .el-dialog__body {
  padding-bottom: 20px;
  color: #666;
}
.Initiatint-wap .curser {
  cursor: pointer;
}
.Initiatint-wap .el-form--inline .el-form-item__content {
  display: inline-block !important;
  margin-left: 10px;
}
.Initiatint-wap .el-button--small {
  padding: 8px 12px;
}
.Initiatint-wap .btnlist .el-button--small {
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
  margin: 30px 250px;
  img {
    width: 100%;
    height: 100%;
  }
}
.edity_iocs {
  height: 100%;
  margin: 30px 100px;
  p {
    line-height: 25px !important;
  }
  img {
    margin: 20px !important;
  }
  video {
    margin: 20px !important;
  }
}
.redStae {
  color: #f56c6c;
  margin-right: 1px;
}
.layout_size {
  cursor: pointer;
}
.Initiatint-wap .el-button [class*='el-icon-'] + span {
  margin-left: 10px;
}
.limitSP {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
