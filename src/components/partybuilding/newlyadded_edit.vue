/* * @Author: mikey.ZGH * @Date: 2020-09-16 18:27:39 * @Last Modified by:
mikey.ZGH * @Last Modified time: 2020-09-16 18:27:39 */
<template>
  <!-- 维护页面的新增编辑 -->
  <div class="content_wrap">
    <!-- 返回按钮 -->
    <div class="layout_header"><goback :title="title"></goback></div>
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
        <el-form-item label="分类" prop="businessType">
          <el-select
            v-model="ruleForm.businessType"
            value-key="id"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            list-type="picture-card"
            :accept="acept"
            action="/file/upload/image"
            :http-request="fileRequest"
            :before-upload="beforeUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="视频" class="uploaddeom">
          <el-upload
            class="upload-demo"
            :accept="acct"
            action="/file/upload/video"
            :http-request="avatarUpload"
            :before-remove="beforeRemove"
            :file-list="filevideo"
            :before-upload="beforeUpload1"
            :on-remove="handleRemove1"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <div slot="tip" class="el-upload__tip">
              支持上传mp4文件，且不超过100M
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">发布</el-button>
          <el-button @click="resetForm()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import richtextEditor from '@/components/Editor/editor'
export default {
  components: { richtextEditor },
  name: 'newlyadded',
  data() {
    return {
      ruleForm: {
        id: 'mock', //类型：String  必有字段  备注：无
        materialTittle: 'mock', //类型：String  必有字段  备注：素材标题
        businessType: 'mock', //类型：String  必有字段  备注：分类
        businessTypeName: 'mock', //类型：String  必有字段  备注：分类名称
        imageUrl: 'mock', //类型：String  必有字段  备注：图片url
        videoUrl: 'mock', //类型：String  必有字段  备注：视频url
        videoImageUrl: 'mock', //类型：String  必有字段  备注：视频缩略图url
        format: 'mock', //类型：String  必有字段  备注：视频或图片格式
        videoImageFormat: 'mock', //类型：String  必有字段  备注：视频缩略图格式
      },
      options: [],
      title: '图片新增',
      dialogImageUrl: '',
      dialogVisible: false,
      acept: '.png,.jpg', //文件上传格式
      acct: '.mp4,.mov', //视频上传格式
    }
  },
  modules: {},
}
</script>
<style lang="less">
.content_wrap {
  padding: 20px;
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
</style>
