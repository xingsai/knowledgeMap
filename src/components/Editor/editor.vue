<template lang="html">
  <!-- 输入本文框 -->
  <div class="editor">
    <div ref="toolbar" class="toolbar">
      <!-- <div class="w-e-menu" @click="getMorePicture">
        <i @click="getMorePicture" class="el-icon-share"></i>
        <img src="@/assets/image/sucai.png" width="13px" height="13px" alt="" />
      </div> -->
    </div>
    <div ref="editor" class="text"></div>
    <div class="video-btn w-e-menu" @click="uploadVideo">
      <i class="w-e-icon-play" id="video-icon"/>
    </div>
    <el-upload
			class="video-uploader"
			:accept="acct"
			action="/file/upload/video"
			:http-request="videoRequest"
		/>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name: 'editoritem',
  data() {
    return {
      editor: null,
      info_: null,
      acct: '.mp4,.mov,.MP4,.MOV', //视频上传格式
    }
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    isClear: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: 0
    }
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear()
        this.info_ = null
      }
    },
    value: function(value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value)
      }
    },
    //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  mounted() {
    this.seteditor()
    this.editor.txt.html(this.value)
  },
  methods: {
    uploadVideo () {
      console.log(this.index)
      document.getElementsByClassName('el-upload__input')[this.index-1].click()
    },
    // 视频
		videoRequest(config) {
			let { file } = config
			// 获取文件大小
			let fileSize = this.$util.wxc_countFileSize(file.size)
			// 限制文件大小的工具方法
			this.$http.author.upLoadFileMaxsize(fileSize, 100) &&
				this.$http.author
				.uploadFile1(config.file, '/file/upload/video/richtext')
				.then((data) => {
          let filePath = data.data.video.filePath
          var video = document.createElement("video");
          video.setAttribute("width", "480");
          video.setAttribute("height", "270");
          video.setAttribute("controls", "controls");
          video.setAttribute("src", `${filePath}`);
         // document.getElementsByClassName('w-e-text')[this.index - 1].append(video)
          this.editor.txt.append(video)
          //添加标签，video 后可编辑
          this.editor.txt.append('<p><br></p>')
				}).catch(() => {
					this.$message.error('视频插入失败！')
				})
		},
    getMorePicture() {
      this.$emit('getMorePicture')
    },
    getWangEditorContent() {
      let content = this.editor.txt.html()
    },
    clearWangEditor() {
      this.editor.txt.clear()
    },
    seteditor() {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor)
      this.editor.customConfig.uploadImgShowBase64 = true // base 64 存储图片
      // this.editor.customConfig.uploadImgServer = 'http://otp.cdinfotech.top/file/upload_images'// 配置服务器端地址
      // this.editor.customConfig.uploadImgHeaders = { }// 自定义 header
      // this.editor.customConfig.uploadFileName = 'file' // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
      // this.editor.customConfig.uploadImgMaxLength = 6 // 限制一次最多上传 3 张图片
      // this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
      // 配置菜单
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        // 'backColor', // 背景颜色
        // 'link', // 插入链接
        // 'list', // 列表
        // 'justify', // 对齐方式
        // 'quote', // 引用
        // 'emoticon', // 表情
        'image', // 插入图片
        // 'table', // 表格
        //'video', // 插入视频
        // 'code', // 插入代码
        // 'undo', // 撤销
        // 'redo', // 重复
        // 'fullscreen' // 全屏
      ]

      this.editor.customConfig.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          // 图片上传成功回调
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result, editor) => {
          // 图片上传成功，插入图片的回调
          //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
          // console.log(result.data[0].url)
          //insertImg()为插入图片的函数
          //循环插入图片
          // for (let i = 0; i < 1; i++) {
          // console.log(result)
          let url = 'http://otp.cdinfotech.top' + result.url
          insertImg(url)
          // }
        },
      }
      this.editor.customConfig.onchange = (html) => {
        this.info_ = html // 绑定当前逐渐地值
        this.$emit('change', this.info_) // 将内容同步到父组件中
      }
      // 创建富文本编辑器
      this.editor.create()
    },
  },
}
</script>

<style lang="less" scoped>
.editor {
  /* width: 100%; */
  /* margin: 20px; */
  position: relative;
  z-index: 0;
  background-color: #fff;
  .video-btn {
    position: absolute;
    top: 3px;
    left: 324px;
    & #video-icon {
      color: #999!important;
      cursor: pointer;
      &:hover {
        color: #333!important;
      }
    }
  }
  .video-uploader {
    display: none;
  }
  .video {
    width: 200px;
    height:200px;
  }
  .toolbar {
    border: 1px solid #d9d9d9;
    background: #fafbfc;
    height: 32px;
    line-height: 28px;
  }
  .text {
    border: 1px solid #d9d9d9;
    min-height: 368px;
    border-top: 0 none;
  }
  .w-e-text p {
    margin: 5px 0;
  }
  
.w-e-text-container{
    height: 368px !important;/*!important是重点，因为原div是行内样式设置的高度300px*/
}
}
</style>
